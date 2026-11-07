from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, RentalUnitViewSet

router = DefaultRouter()
router.register(r'properties', PropertyViewSet, basename='property')
router.register(r'units', RentalUnitViewSet, basename='unit')

urlpatterns = [
    path('', include(router.urls)),
]
