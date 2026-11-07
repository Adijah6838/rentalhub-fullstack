from rest_framework import viewsets
from .models import MaintenanceRequest, MaintenanceNote
from .serializers import MaintenanceRequestSerializer, MaintenanceNoteSerializer
from rest_framework.permissions import IsAuthenticated

class MaintenanceRequestViewSet(viewsets.ModelViewSet):
    serializer_class = MaintenanceRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role in ['ADMIN', 'LANDLORD']:
            return MaintenanceRequest.objects.all()
        elif user.role == 'TENANT':
            return MaintenanceRequest.objects.filter(tenant__user=user)
        elif user.role == 'MAINTENANCE':
            return MaintenanceRequest.objects.filter(assigned_to=user)
        return MaintenanceRequest.objects.none()

class MaintenanceNoteViewSet(viewsets.ModelViewSet):
    serializer_class = MaintenanceNoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return MaintenanceNote.objects.filter(request__in=MaintenanceRequestViewSet(request=self.request).get_queryset())

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
