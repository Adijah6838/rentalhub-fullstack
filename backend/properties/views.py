from rest_framework import viewsets
from .models import Property, RentalUnit
from .serializers import PropertySerializer, RentalUnitSerializer
from .permissions import IsAdminOrLandlordOwner

class PropertyViewSet(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    permission_classes = [IsAdminOrLandlordOwner]

    def get_queryset(self):
        user = self.request.user
        if user.role in ['ADMIN', 'MAINTENANCE']:
            return Property.objects.all()
        elif user.role == 'LANDLORD':
            return Property.objects.filter(landlord=user)
        elif user.role == 'TENANT':
            return Property.objects.filter(units__tenants__user=user).distinct()
        return Property.objects.none()

    def perform_create(self, serializer):
        if self.request.user.role == 'LANDLORD':
            serializer.save(landlord=self.request.user)
        else:
            serializer.save()

class RentalUnitViewSet(viewsets.ModelViewSet):
    serializer_class = RentalUnitSerializer
    permission_classes = [IsAdminOrLandlordOwner]

    def get_queryset(self):
        user = self.request.user
        if user.role in ['ADMIN', 'MAINTENANCE']:
            return RentalUnit.objects.all()
        elif user.role == 'LANDLORD':
            return RentalUnit.objects.filter(property__landlord=user)
        elif user.role == 'TENANT':
            return RentalUnit.objects.filter(tenants__user=user)
        return RentalUnit.objects.none()
