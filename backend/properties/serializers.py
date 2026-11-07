from rest_framework import serializers
from .models import Property, RentalUnit

class RentalUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = RentalUnit
        fields = '__all__'
        read_only_fields = ('id',)

class PropertySerializer(serializers.ModelSerializer):
    landlord_email = serializers.ReadOnlyField(source='landlord.email')
    units = RentalUnitSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = '__all__'
        read_only_fields = ('id', 'date_registered', 'is_active')
