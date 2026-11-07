from django.db import models
from accounts.models import TenantProfile, User
from properties.models import Property, RentalUnit

class MaintenanceRequest(models.Model):
    class Priority(models.TextChoices):
        LOW = 'LOW', 'Low'
        MEDIUM = 'MEDIUM', 'Medium'
        HIGH = 'HIGH', 'High'
        EMERGENCY = 'EMERGENCY', 'Emergency'

    class Status(models.TextChoices):
        SUBMITTED = 'SUBMITTED', 'Submitted'
        ASSIGNED = 'ASSIGNED', 'Assigned'
        IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
        COMPLETED = 'COMPLETED', 'Completed'
        REJECTED = 'REJECTED', 'Rejected'

    tenant = models.ForeignKey(TenantProfile, on_delete=models.CASCADE, related_name='maintenance_requests')
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='maintenance_requests')
    unit = models.ForeignKey(RentalUnit, on_delete=models.CASCADE, related_name='maintenance_requests')
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    
    priority = models.CharField(max_length=20, choices=Priority.choices, default=Priority.MEDIUM)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.SUBMITTED)
    
    assigned_to = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='assigned_requests',
        limit_choices_to={'role': 'MAINTENANCE'}
    )
    
    submitted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.unit.unit_number} ({self.status})"

class MaintenanceNote(models.Model):
    request = models.ForeignKey(MaintenanceRequest, on_delete=models.CASCADE, related_name='notes')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    note = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Note by {self.author.email} on {self.request.title}"
