from django.db import models
from accounts.models import User

class Property(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    
    landlord = models.ForeignKey(
        User, 
        on_delete=models.PROTECT, 
        related_name='owned_properties',
        limit_choices_to={'role': 'LANDLORD'}
    )
    date_registered = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ('name', 'location')
        verbose_name_plural = 'Properties'

    def __str__(self):
        return f"{self.name} - {self.location}"


class RentalUnit(models.Model):
    property = models.ForeignKey(
        Property, 
        on_delete=models.CASCADE, 
        related_name='units'
    )
    unit_number = models.CharField(max_length=50)
    monthly_rent = models.DecimalField(max_digits=10, decimal_places=2)
    bedrooms = models.PositiveIntegerField(default=1)
    bathrooms = models.PositiveIntegerField(default=1)
    is_listed = models.BooleanField(default=True)

    class Meta:
        unique_together = ('property', 'unit_number')

    def __str__(self):
        return f"Unit {self.unit_number} at {self.property.name}"