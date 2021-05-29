from rest_framework import serializers

from backend.models import Campaign, Data


class DataSerializer(serializers.ModelSerializer):
    """Model serializer for Data."""

    class Meta:
        """Meta options for DataSerializer."""

        model = Data
        fields = ["date", "datasource", "campaign", "clicks", "impressions"]


class CampaignSerializer(serializers.ModelSerializer):
    """Model serializer for Campaign."""

    class Meta:
        """Meta options for CampaignSerializer."""

        model = Campaign
        fields = ["name"]
