from django.urls import path

from . import admin_views


urlpatterns = [
    path("admin/dashboard/summary/", admin_views.dashboard_summary, name="admin_dashboard_summary"),
    path("admin/dashboard/weekly/", admin_views.dashboard_weekly, name="admin_dashboard_weekly"),
    path("admin/vendors/", admin_views.vendors_list, name="admin_vendors_list"),
    path("admin/vendors/<int:user_id>/approve/", admin_views.vendor_approve, name="admin_vendor_approve"),
    path("admin/vendors/<int:user_id>/reject/", admin_views.vendor_reject, name="admin_vendor_reject"),
    path("admin/users/", admin_views.users_list, name="admin_users_list"),
    path("admin/users/<int:user_id>/toggle-active/", admin_views.user_toggle_active, name="admin_user_toggle_active"),
    path("admin/turfs/", admin_views.turfs_list, name="admin_turfs_list"),
    path("admin/bookings/", admin_views.bookings_list, name="admin_bookings_list"),
    path("admin/bookings/<int:booking_id>/cancel/", admin_views.booking_cancel, name="admin_booking_cancel"),
    path("admin/payments/", admin_views.payments_list, name="admin_payments_list"),
    path("admin/turfs/<int:turf_id>/approve/", admin_views.turfs_approve,name="admin_turfs_approve"),
    path("admin/turfs/<int:turf_id>/reject/", admin_views.turfs_reject,name="admin_turfs_reject"),
]
