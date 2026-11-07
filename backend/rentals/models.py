from django.db import models
from django.core.exceptions import ValidationError
from accounts.models import TenantProfile
from properties.models import RentalUnit

class RentalAgreement(models.Model):
    class Status(models.TextChoices):
        ACTIVE = 'ACTIVE', 'Active'
        TERMINATED = 'TERMINATED', 'Terminated'
        EXPIRED = 'EXPIRED', 'Expired'

    tenant = models.ForeignKey(
        TenantProfile, 
        on_delete=models.PROTECT, 
        related_name='agreements'
    )
    unit = models.ForeignKey(
        RentalUnit, 
        on_delete=models.PROTECT, 
        related_name='agreements'
    )
    start_date = models.DateField()
    end_date = models.DateField()
    monthly_rent = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=20, 
        choices=Status.choices, 
        default=Status.ACTIVE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if self.start_date and self.end_date and self.start_date >= self.end_date:
            raise ValidationError("End date must be after the start date.")
        
        if self.status == self.Status.ACTIVE:
            existing_active_agreement = RentalAgreement.objects.filter(
                unit=self.unit, 
                status=self.Status.ACTIVE
            ).exclude(pk=self.pk) 
            
            if existing_active_agreement.exists():
                raise ValidationError("This unit already has an active rental agreement.")

    def __str__(self):
        return f"Agreement: {self.tenant.user.email} - Unit {self.unit.unit_number} ({self.status})"