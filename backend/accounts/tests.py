from django.test import TestCase
from rest_framework.test import APIClient
from .models import User
from properties.models import Property

class RentalHubTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin = User.objects.create_superuser(email='testadmin@test.com', password='password123')
        self.landlord = User.objects.create_user(email='testlandlord@test.com', password='password123', role='LANDLORD')
        
    def test_unauthorized_property_creation(self):
        response = self.client.post('/api/properties/', {'name': 'Test', 'location': 'Test', 'landlord': self.landlord.id})
        self.assertEqual(response.status_code, 401)

    def test_landlord_can_create_property(self):
        self.client.force_authenticate(user=self.landlord)
        response = self.client.post('/api/properties/', {'name': 'Valid Property', 'location': 'Nairobi', 'landlord': self.landlord.id})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Property.objects.count(), 1)
