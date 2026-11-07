from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from accounts.models import User
from properties.models import Property, RentalUnit
from rentals.models import RentalAgreement
from maintenance.models import MaintenanceRequest

class DashboardSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total_properties = Property.objects.count()
        total_units = RentalUnit.objects.count()
        occupied_units = RentalAgreement.objects.filter(status='ACTIVE').count()
        vacant_units = total_units - occupied_units
        total_tenants = User.objects.filter(role='TENANT').count()
        open_requests = MaintenanceRequest.objects.exclude(status__in=['COMPLETED', 'REJECTED']).count()

        data = {
            'total_properties': total_properties,
            'total_units': total_units,
            'occupied_units': occupied_units,
            'vacant_units': vacant_units,
            'total_tenants': total_tenants,
            'open_requests': open_requests,
        }
        return Response(data)
