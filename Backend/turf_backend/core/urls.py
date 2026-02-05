from django.urls import path
from core import views

urlpatterns = [

    # ---------- USER AUTH ----------
    path("send-otp/", views.send_otp),
    path("verify-otp/", views.verify_otp),
    path("signup/", views.signup),
    path("login/", views.login),
    path("reset-password/", views.reset_password),
    path("home/", views.home),

    # ---------- TURFS ----------
    path("turfs/", views.list_turfs),
    path("turfs/<int:turf_id>/", views.turf_details),
    path("turfs/<int:turf_id>/games/", views.turf_games),
    path("turfs/nearby/", views.nearby_turfs),
    path("grounds/<int:ground_id>/availability/", views.ground_availability),

    # ---------- BOOKINGS ----------
    path("cart/add/", views.add_to_cart),
    path("booking/confirm/", views.confirm_booking),
    path("my-bookings/", views.my_bookings),

    # ---------- PAYMENTS ----------
    path("payment/create-order/", views.create_payment_order),
    path("payment/verify/", views.verify_payment),

    # ---------- ADMIN ----------
    path("admin/send-otp/", views.admin_send_otp),
    path("admin/verify-otp/", views.admin_verify_otp),
    path("admin/login/", views.admin_login),

    path("admin/dashboard/summary/", views.dashboard_summary),
    path("admin/dashboard/weekly/", views.dashboard_weekly),

    path("admin/users/", views.users_list),
    path("admin/users/<int:user_id>/toggle-active/", views.user_toggle_active),

    path("admin/turfs/", views.turfs_list),
    path("admin/turfs/<int:turf_id>/approve/", views.turfs_approve),
    path("admin/turfs/<int:turf_id>/reject/", views.turfs_reject),

    path("admin/bookings/", views.bookings_list),
    path("admin/bookings/<int:booking_id>/cancel/", views.booking_cancel),

    path("admin/payments/", views.payments_list),

    path("admin/vendors/", views.vendors_list),
    path("admin/vendors/<int:user_id>/approve/", views.vendor_approve),
    path("admin/vendors/<int:user_id>/reject/", views.vendor_reject),

    # ---------- VENDOR ----------
    path("vendor/dashboard/", views.vendor_dashboard),
    path("vendor/turfs/", views.vendor_list_turfs),
    path("vendor/turfs/create/", views.vendor_add_turf),

    path("vendor/bookings/", views.vendor_booking_list),
    path("vendor/bookings/update/", views.vendor_update_booking_status),

    path("vendor/slots/", views.vendor_list_slots),
    path("vendor/slots/create/", views.vendor_create_slots),

    path("vendor/discounts/", views.vendor_list_discounts),
    path("vendor/discounts/create/", views.vendor_create_discount),
]
