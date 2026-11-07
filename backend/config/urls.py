from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/', include('properties.urls')),
    path('api/', include('payments.urls')),
    path('api/', include('maintenance.urls')),
    path('api/dashboard/', include('dashboard.urls')),
]
