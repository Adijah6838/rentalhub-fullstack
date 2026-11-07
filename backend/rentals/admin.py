from django.contrib import admin
from .models import RentalAgreement

@admin.register(RentalAgreement)
class RentalAgreementAdmin(admin.ModelAdmin):
    list_display = ('tenant', 'unit', 'start_date', 'end_date', 'monthly_rent', 'status')
    list_filter = ('status', 'start_date')
    search_fields = ('tenant__user__email', 'unit__unit_number')