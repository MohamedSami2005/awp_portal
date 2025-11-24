from django.urls import path
from . import views

urlpatterns = [
    path('alumni/register/', views.register_alumni),
    path('alumni/list/', views.get_alumni_list),
    path('achievements/', views.get_achievements),
    path('events/', views.get_events),
    path('admin-login/', views.admin_login),
    path('alumni/pending/', views.get_pending_alumni),
    path('alumni/approve/<int:id>/', views.approve_alumni),
    path('alumni/reject/<int:id>/', views.reject_alumni),
    path('achievements/delete/<int:id>/', views.delete_achievement),
    path('admin/stats/', views.get_admin_stats),
    path('events/create/', views.create_event),
    path('events/delete/<int:id>/', views.delete_event),
    path('achievements/create/', views.create_achievement),
    path('alumni/<int:id>/', views.get_alumni_detail),
]