from datetime import datetime, timedelta

from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.db.models import Count, Sum
from django.utils.timezone import now

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from core.models import Turf, Ground, Slot, Booking, Payment
from core.serializers import (
    TurfSerializer,
    BookingListSerializer,
    VendorTurfCreateSerializer,
)


# --------- Helpers

def _ensure_vendor(user: User) -> bool:
    # Minimal vendor rule: must be authenticated. You can tighten this later.
    return user and user.is_authenticated


# --------- Vendor Dashboard

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def vendor_dashboard(request):
    """Return stats for Vendor/Dashboard.jsx.

    Notes:
    - Your frontend currently uses dummy data; this endpoint gives real data
      based on turfs owned by the logged-in user.
    """

    if not _ensure_vendor(request.user):
        return Response({"detail": "Unauthorized"}, status=401)

    owner = request.user
    owned_turfs = Turf.objects.filter(owner=owner)
    turf_ids = list(owned_turfs.values_list("id", flat=True))

    # Bookings for owned turfs via Cart -> Turf
    bookings_qs = Booking.objects.filter(cart__turf_id__in=turf_ids)

    today = now().date()
    todays = bookings_qs.filter(cart__date=today).count()
    upcoming = bookings_qs.filter(cart__date__gt=today).count()

    # Earnings: sum successful payments for those bookings
    earnings = (
        Payment.objects.filter(booking__in=bookings_qs, status="SUCCESS")
        .aggregate(total=Sum("amount"))
        .get("total")
        or 0
    )

    pending_approvals = bookings_qs.filter(vendor_status__iexact="PENDING").count()

    data = {
        "stats": [
            {"title": "Total Turfs Owned", "value": owned_turfs.count(), "icon": "🏠"},
            {"title": "Today’s Bookings", "value": todays, "icon": "📅"},
            {"title": "Upcoming Bookings", "value": upcoming, "icon": "🗓️"},
            # amounts stored in paise; convert to rupees for display
            {"title": "Monthly Earnings", "value": round(earnings / 100, 2), "icon": "💲"},
            {"title": "Pending Approvals", "value": pending_approvals, "icon": "⏳"},
        ],
        # Keep these for UI compatibility (frontend shows these blocks)
        "coaches": [],
        "reviews": [],
    }

    return Response(data)


# --------- Turfs

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def vendor_list_turfs(request):
    turfs = Turf.objects.filter(owner=request.user)
    return Response(TurfSerializer(turfs, many=True).data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def vendor_add_turf(request):
    ser = VendorTurfCreateSerializer(data=request.data)
    ser.is_valid(raise_exception=True)
    payload = ser.validated_data

    turf_count = payload.get("turfCount") or 1

    turf = Turf.objects.create(
        name=payload["turfName"],
        location=payload["location"],
        latitude=payload.get("latitude"),
        longitude=payload.get("longitude"),
        price_per_hour=payload["price"],
        owner=request.user,
        is_approved=False,
    )

    for i in range(1, turf_count + 1):
        Ground.objects.create(turf=turf, name=f"Ground {i}")

    return Response({
        "success": True,
        "turf_id": turf.id
    })


# --------- Booking Management

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def vendor_booking_list(request):
    """Return bookings belonging to vendor-owned turfs."""
    turfs = Turf.objects.filter(owner=request.user)
    turf_ids = list(turfs.values_list("id", flat=True))
    qs = Booking.objects.select_related("user", "cart", "cart__turf", "cart__ground", "cart__slot").filter(
        cart__turf_id__in=turf_ids
    ).order_by("-created_at")

    data = BookingListSerializer(qs, many=True).data
    return Response(data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def vendor_update_booking_status(request):
    """Used by Vendor/BookingManagement.jsx (placeholder).

    Accepts:
      { bookingId: "#BK101" or 123, status: "Approved"|"Rejected"|"Cancelled" }
    We map this to Booking.vendor_status and optionally Booking.status.
    """
    booking_id = request.data.get("bookingId")
    status_text = (request.data.get("status") or "").strip()

    if not booking_id or not status_text:
        return Response({"success": False, "error": "bookingId and status required"}, status=400)

    # bookingId may come as "#BK101" in UI dummy; try to parse digits
    if isinstance(booking_id, str) and booking_id.startswith("#"):
        digits = "".join([c for c in booking_id if c.isdigit()])
        booking_id = int(digits) if digits else None

    try:
        booking = Booking.objects.select_related("cart", "cart__turf").get(id=booking_id)
    except Exception:
        return Response({"success": False, "error": "Booking not found"}, status=404)

    # Ensure booking belongs to vendor
    if booking.cart.turf.owner_id != request.user.id:
        return Response({"success": False, "error": "Forbidden"}, status=403)

    normalized = status_text.upper()
    if normalized == "APPROVED":
        booking.vendor_status = "APPROVED"
        booking.status = "CONFIRMED"
    elif normalized == "REJECTED":
        booking.vendor_status = "REJECTED"
        booking.status = "CANCELLED"
    elif normalized == "CANCELLED":
        booking.vendor_status = "CANCELLED"
        booking.status = "CANCELLED"
    else:
        booking.vendor_status = status_text

    booking.save(update_fields=["vendor_status", "status"])
    return Response({"success": True})


# --------- Schedule Time (Slots)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def vendor_list_slots(request):
    """List slots for a ground (and vendor must own the turf)."""
    ground_id = request.query_params.get("ground_id")
    if not ground_id:
        return Response({"error": "ground_id required"}, status=400)

    try:
        ground = Ground.objects.select_related("turf").get(id=ground_id)
    except Ground.DoesNotExist:
        return Response({"error": "Ground not found"}, status=404)

    if ground.turf.owner_id != request.user.id:
        return Response({"error": "Forbidden"}, status=403)

    slots = Slot.objects.filter(ground=ground).order_by("start_time")
    return Response(
        [
            {
                "id": s.id,
                "start_time": s.start_time,
                "end_time": s.end_time,
                "is_booked": s.is_booked,
            }
            for s in slots
        ]
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def vendor_create_slots(request):
    """Create slots for a ground.

    Expected payload:
      { ground_id: 1, slots: [{start_time: "06:00", end_time: "07:00"}, ...] }
    """
    ground_id = request.data.get("ground_id")
    slots = request.data.get("slots") or []

    if not ground_id or not isinstance(slots, list) or not slots:
        return Response({"success": False, "error": "ground_id and slots[] required"}, status=400)

    try:
        ground = Ground.objects.select_related("turf").get(id=ground_id)
    except Ground.DoesNotExist:
        return Response({"success": False, "error": "Ground not found"}, status=404)

    if ground.turf.owner_id != request.user.id:
        return Response({"success": False, "error": "Forbidden"}, status=403)

    created = 0
    for item in slots:
        st = item.get("start_time")
        et = item.get("end_time")
        if not st or not et:
            continue
        Slot.objects.create(ground=ground, start_time=st, end_time=et)
        created += 1

    return Response({"success": True, "created": created})


# --------- Discount (placeholder – no Discount model in backend yet)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def vendor_list_discounts(request):
    """Placeholder: frontend has DiscountPage but backend has no Discount model.

    Returns empty list for now.
    """
    return Response([])


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def vendor_create_discount(request):
    """Placeholder endpoint so frontend can submit Deal Request."""
    return Response({"success": True})
