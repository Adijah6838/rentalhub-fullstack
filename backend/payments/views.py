from rest_framework import viewsets
from .models import Payment
from .serializers import PaymentSerializer
from rest_framework.permissions import IsAuthenticated

class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            return Payment.objects.all()
        elif user.role == 'LANDLORD':
            return Payment.objects.filter(agreement__unit__property__landlord=user)
        elif user.role == 'TENANT':
            return Payment.objects.filter(agreement__tenant__user=user)
        return Payment.objects.none()
