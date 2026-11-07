from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MaintenanceRequestViewSet, MaintenanceNoteViewSet

router = DefaultRouter()
router.register(r'maintenance', MaintenanceRequestViewSet, basename='maintenance')
router.register(r'notes', MaintenanceNoteViewSet, basename='note')

urlpatterns = [
    path('', include(router.urls)),
]
