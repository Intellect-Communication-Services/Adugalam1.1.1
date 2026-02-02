from django.urls import path

from core.vendor_views import (
    vendor_dashboard,
    vendor_list_turfs,
    vendor_add_turf,
    vendor_booking_list,
    vendor_update_booking_status,
    vendor_list_slots,
    vendor_create_slots,
    vendor_list_discounts,
    vendor_create_discount,
)


urlpatterns = [
    # Dashboard
    path("vendor/dashboard/", vendor_dashboard),

    # Turfs
    path("vendor/turfs/", vendor_list_turfs),
    path("vendor/turfs/create/", vendor_add_turf),

    # Bookings
    path("vendor/bookings/", vendor_booking_list),
    path("vendor/bookings/update/", vendor_update_booking_status),

    # Schedule / Slots
    path("vendor/slots/", vendor_list_slots),
    path("vendor/slots/create/", vendor_create_slots),

    # Discounts
    path("vendor/discounts/", vendor_list_discounts),
    path("vendor/discounts/create/", vendor_create_discount),
]
