from rest_framework import serializers
from backend.models import DataEntry


class DateEntrySerializer(serializers.ModelSerializer):
    """Model serializer for DataEntry."""

    class Meta:
        model = DataEntry
        fields = ["date", "datasource", "campaign", "clicks", "impressions"]
