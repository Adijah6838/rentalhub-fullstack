from django.contrib import admin
from .models import Payment

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('reference', 'agreement', 'amount', 'payment_date', 'status')
    list_filter = ('status', 'payment_date', 'method')
    search_fields = ('reference', 'agreement__tenant__user__email')
    readonly_fields = ('created_at',)