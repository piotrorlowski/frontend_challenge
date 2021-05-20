from backend.pagination import DataPagination
from backend.filters import DataFilterSet
from rest_framework import viewsets
from backend.models import Data, Campaign
from backend.serializers import DataSerializer, CampaignSerializer
from url_filter.integrations.drf import DjangoFilterBackend


class DataViewSet(viewsets.ModelViewSet):
    """API endpoint for Data."""

    queryset = Data.objects.all()
    serializer_class = DataSerializer
    filter_backends = [DjangoFilterBackend]
    filter_class = DataFilterSet
    pagination_class = DataPagination
    permission_classes = []
    filterset_fields = ["campaign", "datasource"]
    ordering = ["created"]


class CampaignViewSet(viewsets.ModelViewSet):
    """API endpoint for Campaign."""

    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    filter_backends = [DjangoFilterBackend]
    permission_classes = []
    ordering = ["name"]
