from rest_framework import serializers
from .models import MaintenanceRequest, MaintenanceNote

class MaintenanceNoteSerializer(serializers.ModelSerializer):
    author_email = serializers.ReadOnlyField(source='author.email')
    class Meta:
        model = MaintenanceNote
        fields = '__all__'
        read_only_fields = ('id', 'created_at')

class MaintenanceRequestSerializer(serializers.ModelSerializer):
    tenant_email = serializers.ReadOnlyField(source='tenant.user.email')
    assigned_to_email = serializers.ReadOnlyField(source='assigned_to.email')
    notes = MaintenanceNoteSerializer(many=True, read_only=True)

    class Meta:
        model = MaintenanceRequest
        fields = '__all__'
        read_only_fields = ('id', 'submitted_at', 'updated_at')
