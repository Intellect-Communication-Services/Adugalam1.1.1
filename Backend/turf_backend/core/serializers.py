from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Turf, Ground, Slot, Booking, Payment, AdminUser


class UserMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "is_active",
            "date_joined",
        ]


class TurfSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turf
        fields = ["id", "name", "location", "price_per_hour"]


class VendorTurfCreateSerializer(serializers.Serializer):
    turfName = serializers.CharField()
    location = serializers.CharField()
    latitude = serializers.DecimalField(
        max_digits=9, decimal_places=6, required=False
    )
    longitude = serializers.DecimalField(
        max_digits=9, decimal_places=6, required=False
    )
    turfCount = serializers.IntegerField(required=False)
    price = serializers.IntegerField()


class GroundSerializer(serializers.ModelSerializer):
    turf = TurfSerializer(read_only=True)

    class Meta:
        model = Ground
        fields = ["id", "turf", "turf_id", "name","game_type"]


class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = ["id", "ground_id", "start_time", "end_time", "is_booked"]


class BookingListSerializer(serializers.ModelSerializer):
    user = UserMiniSerializer(read_only=True)
    turf_name = serializers.CharField(source="cart.turf.name", read_only=True)
    ground_name = serializers.CharField(source="cart.ground.name", read_only=True)
    date = serializers.DateField(source="cart.date", read_only=True)
    slot_start = serializers.TimeField(source="cart.slot.start_time", read_only=True)
    slot_end = serializers.TimeField(source="cart.slot.end_time", read_only=True)
    amount = serializers.SerializerMethodField()

    def get_amount(self, obj):
        # In your backend, price is stored on Turf as price_per_hour.
        try:
            return obj.cart.turf.price_per_hour
        except Exception:
            return None

    class Meta:
        model = Booking
        fields = [
            "id",
            "user",
            "status",
            "created_at",
            "turf_name",
            "ground_name",
            "date",
            "slot_start",
            "slot_end",
            "amount",
        ]


class PaymentListSerializer(serializers.ModelSerializer):
    user = UserMiniSerializer(read_only=True)
    booking_id = serializers.IntegerField(source="booking.id", read_only=True)

    class Meta:
        model = Payment
        fields = [
            "id",
            "booking_id",
            "user",
            "razorpay_order_id",
            "razorpay_payment_id",
            "amount",
            "status",
            "created_at",
        ]
# ----------------adminserilization


class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = "__all__"
