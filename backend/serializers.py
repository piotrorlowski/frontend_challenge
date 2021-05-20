from rest_framework import serializers
from backend.models import Data, Campaign


class DataSerializer(serializers.ModelSerializer):
    """Model serializer for Data."""

    class Meta:
        model = Data
        fields = ["date", "datasource", "campaign", "clicks", "impressions"]


class CampaignSerializer(serializers.ModelSerializer):
    """Model serializer for Campaign."""

    class Meta:
        model = Campaign
        fields = ["name"]
