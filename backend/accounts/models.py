from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    """
    Custom manager where email is the unique identifier 
    for authentication instead of usernames.
    """
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', User.Role.ADMIN)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        LANDLORD = 'LANDLORD', 'Landlord'
        TENANT = 'TENANT', 'Tenant'
        MAINTENANCE = 'MAINTENANCE', 'Maintenance'

    # Remove the default username field
    username = None 
    
    # Make email required and unique (used for login)
    email = models.EmailField(unique=True)
    
    # Add our custom fields
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.TENANT)
    phone = models.CharField(max_length=15, blank=True, null=True)

    # Tell Django to use email for logging in
    USERNAME_FIELD = 'email'
    
    # Fields required when creating a superuser via terminal
    REQUIRED_FIELDS = ['first_name', 'last_name']

    # Attach the custom manager
    objects = UserManager()

    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"


class TenantProfile(models.Model):
    # Link 1-to-1 with the User model
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        related_name='tenant_profile'
    )
    # We use a string reference 'properties.RentalUnit' to avoid circular imports
    assigned_unit = models.ForeignKey(
        'properties.RentalUnit', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='tenants'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Tenant Profile: {self.user.email}"