from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    # Override the default UserAdmin to remove the username field
    model = User
    list_display = ('email', 'first_name', 'last_name', 'role', 'is_staff')
    ordering = ('email',)
    
    # Remove username from the edit forms
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'phone')}),
        ('Permissions', {'fields': ('role', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'role'),
        }),
    )

admin.site.register(User, CustomUserAdmin)
from .models import TenantProfile

@admin.register(TenantProfile)
class TenantProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'assigned_unit', 'created_at')
    search_fields = ('user__email', 'user__first_name', 'user__last_name')