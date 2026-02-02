"""Django admin configuration for the Turf Booking backend.

Registers core models so they are manageable in Django Admin.
"""

from django.contrib import admin

from .models import Booking, Cart, Ground, OTP, Payment, Slot, Turf


@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    list_display = ("mobile", "otp", "is_verified", "created_at")
    list_filter = ("is_verified",)
    search_fields = ("mobile",)
    ordering = ("-created_at",)


class GroundInline(admin.TabularInline):
    model = Ground
    extra = 0


class SlotInline(admin.TabularInline):
    model = Slot
    extra = 0


@admin.register(Turf)
class TurfAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "location", "price_per_hour")
    search_fields = ("name", "location")
    list_filter = ("location",)
    inlines = (GroundInline,)


@admin.register(Ground)
class GroundAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "turf")
    search_fields = ("name", "turf__name")
    list_filter = ("turf",)
    inlines = (SlotInline,)


@admin.register(Slot)
class SlotAdmin(admin.ModelAdmin):
    list_display = ("id", "ground", "start_time", "end_time", "is_booked")
    list_filter = ("is_booked", "ground__turf")
    search_fields = ("ground__name", "ground__turf__name")
    ordering = ("ground", "start_time")


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "turf", "ground", "slot", "date")
    list_filter = ("date", "turf")
    search_fields = (
        "user__username",
        "user__email",
        "turf__name",
        "ground__name",
    )


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("user__username", "user__email")
    readonly_fields = ("created_at",)


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "booking", "amount", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = (
        "user__username",
        "user__email",
        "razorpay_order_id",
        "razorpay_payment_id",
    )
    readonly_fields = ("created_at",)
