from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.models import User
from django.db.models import Count, Sum
from django.http import JsonResponse
from django.utils import timezone

from .models import Turf, Booking, Payment


@staff_member_required
def dashboard_summary(request):
    """Admin dashboard KPIs similar to your React admin pages."""
    total_users = User.objects.count()
    total_turfs = Turf.objects.count()

    # You don't have a Vendor model in this backend; return 0 so UI can render.
    total_vendors = 0

    total_bookings = Booking.objects.count()
    today = timezone.localdate()
    today_bookings = Booking.objects.filter(created_at__date=today).count()
    today_new_users = User.objects.filter(date_joined__date=today).count()

    # Revenue from successful payments (amount stored in paise)
    total_revenue_paise = (
        Payment.objects.filter(status="SUCCESS").aggregate(s=Sum("amount"))["s"] or 0
    )
    today_revenue_paise = (
        Payment.objects.filter(status="SUCCESS", created_at__date=today).aggregate(s=Sum("amount"))["s"]
        or 0
    )

    payload = {
        "total_users": total_users,
        "total_vendors": total_vendors,
        "total_turfs": total_turfs,
        "total_bookings": total_bookings,
        "today": {
            "bookings": today_bookings,
            "revenue_paise": today_revenue_paise,
            "new_users": today_new_users,
            "new_vendors": 0,
        },
        "revenue": {
            "total_paise": total_revenue_paise,
        },
    }
    return JsonResponse(payload)


@staff_member_required
def dashboard_weekly(request):
    """Returns last 7 days booking counts and revenue totals for chart."""
    today = timezone.localdate()
    start = today - timezone.timedelta(days=6)
    days = [start + timezone.timedelta(days=i) for i in range(7)]

    booking_counts = {
        row["d"]: row["c"]
        for row in Booking.objects.filter(created_at__date__gte=start, created_at__date__lte=today)
        .extra(select={"d": "date(created_at)"})
        .values("d")
        .annotate(c=Count("id"))
    }

    revenue = {
        row["d"]: row["s"]
        for row in Payment.objects.filter(
            status="SUCCESS", created_at__date__gte=start, created_at__date__lte=today
        )
        .extra(select={"d": "date(created_at)"})
        .values("d")
        .annotate(s=Sum("amount"))
    }

    payload = {
        "labels": [d.strftime("%a") for d in days],
        "bookings": [int(booking_counts.get(d, 0)) for d in days],
        "revenue_paise": [int(revenue.get(d, 0) or 0) for d in days],
    }
    return JsonResponse(payload)


@staff_member_required
def users_list(request):
    qs = User.objects.all().order_by("-date_joined")
    data = [
        {
            "id": u.id,
            "username": u.username,
            "first_name": u.first_name,
            "last_name": u.last_name,
            "email": u.email,
            "is_active": u.is_active,
            "date_joined": u.date_joined,
        }
        for u in qs
    ]
    return JsonResponse({"results": data})


@staff_member_required
def user_toggle_active(request, user_id: int):
    if request.method not in ("POST", "PATCH"):
        return JsonResponse({"detail": "Method not allowed"}, status=405)
    try:
        u = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return JsonResponse({"detail": "User not found"}, status=404)
    u.is_active = not u.is_active
    u.save(update_fields=["is_active"])
    return JsonResponse({"id": u.id, "is_active": u.is_active})


@staff_member_required
def turfs_list(request):
    qs = Turf.objects.all().order_by("-id")

    data = [
        {
            "id": t.id,
            "name": t.name,
            "location": t.location,
            "latitude": t.latitude,
            "longitude": t.longitude,
            "price_per_hour": t.price_per_hour,
            "owner": {
                "id": t.owner.id,
                "username": t.owner.username,
                "email": t.owner.email,
            },
            "is_approved": t.is_approved,
        }
        for t in qs
    ]

    return JsonResponse({"results": data})


@staff_member_required
def bookings_list(request):
    qs = Booking.objects.select_related("user", "cart", "cart__turf", "cart__ground", "cart__slot").order_by(
        "-created_at"
    )
    data = []
    for b in qs:
        data.append(
            {
                "id": b.id,
                "status": b.status,
                "created_at": b.created_at,
                "user": {
                    "id": b.user.id,
                    "username": b.user.username,
                    "email": b.user.email,
                },
                "turf": {
                    "id": b.cart.turf_id,
                    "name": getattr(b.cart.turf, "name", None),
                },
                "ground": {
                    "id": b.cart.ground_id,
                    "name": getattr(b.cart.ground, "name", None),
                },
                "date": b.cart.date,
                "slot": {
                    "id": b.cart.slot_id,
                    "start_time": getattr(b.cart.slot, "start_time", None),
                    "end_time": getattr(b.cart.slot, "end_time", None),
                },
                "amount_paise": getattr(b.cart.turf, "price_per_hour", None),
            }
        )
    return JsonResponse({"results": data})


@staff_member_required
def booking_cancel(request, booking_id: int):
    if request.method not in ("POST", "PATCH"):
        return JsonResponse({"detail": "Method not allowed"}, status=405)
    try:
        b = Booking.objects.get(id=booking_id)
    except Booking.DoesNotExist:
        return JsonResponse({"detail": "Booking not found"}, status=404)
    b.status = "CANCELLED"
    b.save(update_fields=["status"])
    return JsonResponse({"id": b.id, "status": b.status})


@staff_member_required
def payments_list(request):
    qs = Payment.objects.select_related("user", "booking").order_by("-created_at")
    data = [
        {
            "id": p.id,
            "booking_id": p.booking_id,
            "user": {
                "id": p.user.id,
                "username": p.user.username,
                "email": p.user.email,
            },
            "razorpay_order_id": p.razorpay_order_id,
            "razorpay_payment_id": p.razorpay_payment_id,
            "amount": p.amount,
            "status": p.status,
            "created_at": p.created_at,
        }
        for p in qs
    ]
    return JsonResponse({"results": data})


# --- Vendor endpoints (stub) ---
# Your backend doesn't include a Vendor model yet.
# These endpoints exist so your Admin React flow won't break.


@staff_member_required
def vendors_list(request):
    return JsonResponse({"results": []})


@staff_member_required
def vendor_approve(request, user_id: int):
    return JsonResponse({"detail": "Vendor module not implemented in backend"}, status=501)


@staff_member_required
def vendor_reject(request, user_id: int):
    return JsonResponse({"detail": "Vendor module not implemented in backend"}, status=501)

@staff_member_required
def turfs_approve(request, turf_id):
    if request.method not in ("POST", "PATCH"):
        return JsonResponse({"detail": "Method not allowed"}, status=405)

    try:
        turf = Turf.objects.get(id=turf_id)
    except Turf.DoesNotExist:
        return JsonResponse({"detail": "Turf not found"}, status=404)

    turf.is_approved = True
    turf.save(update_fields=["is_approved"])

    return JsonResponse({
        "id": turf.id,
        "is_approved": True,
        "message": "Turf approved"
    })


@staff_member_required
def turfs_reject(request, turf_id):
    if request.method not in ("POST", "PATCH"):
        return JsonResponse({"detail": "Method not allowed"}, status=405)

    try:
        turf = Turf.objects.get(id=turf_id)
    except Turf.DoesNotExist:
        return JsonResponse({"detail": "Turf not found"}, status=404)

    turf.is_approved = False
    turf.save(update_fields=["is_approved"])

    return JsonResponse({
        "id": turf.id,
        "is_approved": False,
        "message": "Turf rejected"
    })
