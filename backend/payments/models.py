from django.db import models
from django.core.validators import MinValueValidator
from rentals.models import RentalAgreement

class Payment(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        COMPLETED = 'COMPLETED', 'Completed'
        FAILED = 'FAILED', 'Failed'
        OVERDUE = 'OVERDUE', 'Overdue'

    agreement = models.ForeignKey(
        RentalAgreement, 
        on_delete=models.PROTECT, 
        related_name='payments'
    )
    amount = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(0.01)]
    )
    payment_date = models.DateField()
    reference = models.CharField(max_length=100, unique=True)
    method = models.CharField(max_length=50, default='Simulated')
    status = models.CharField(
        max_length=20, 
        choices=Status.choices, 
        default=Status.COMPLETED
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.reference} - {self.amount} for {self.agreement.tenant.user.email}"