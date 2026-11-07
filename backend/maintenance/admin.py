from django.contrib import admin
from .models import MaintenanceRequest, MaintenanceNote

class MaintenanceNoteInline(admin.TabularInline):
    model = MaintenanceNote
    extra = 1

@admin.register(MaintenanceRequest)
class MaintenanceRequestAdmin(admin.ModelAdmin):
    list_display = ('title', 'tenant', 'unit', 'priority', 'status', 'assigned_to')
    list_filter = ('status', 'priority')
    search_fields = ('title', 'description')
    inlines = [MaintenanceNoteInline]

@admin.register(MaintenanceNote)
class MaintenanceNoteAdmin(admin.ModelAdmin):
    list_display = ('request', 'author', 'created_at')
