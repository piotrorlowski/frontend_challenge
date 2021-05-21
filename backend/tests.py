import datetime

from django.test import TestCase
from rest_framework.test import APIRequestFactory

from backend.models import Data
from backend.views import DataViewSet


class DataTestCase(TestCase):
    """Data model test case."""

    def setUp(self):
        """Set up data objects for test case."""
        Data.objects.create(
            date="2021-01-01",
            datasource="Some datasource",
            campaign="Some campaign",
            clicks="1234",
            impressions="1234",
        )

    def test_data_models_is_saved_correctly(self):
        """Test model creation is correct."""
        data = Data.objects.get(date="2021-01-01")
        self.assertEqual(data.date, datetime.date(2021, 1, 1))


class DataViewSetTestCase(TestCase):
    """DataViewSet test case."""

    def setUp(self):
        """Set up data objects for test case."""
        self.factory = APIRequestFactory()

    def test_data_view_set_returns_correct_data(self):
        """Test api DataViewSet if it correctly returns data."""
        view = DataViewSet.as_view({"get": "list"})
        request = self.factory.get("/api/data/")
        response = view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["count"], 31692)
