from rest_framework import viewsets
from backend.models import DataEntry
from backend.serializers import DateEntrySerializer


class DataEntryViewSet(viewsets.ModelViewSet):
    """API endpoint for DataEntry."""

    queryset = DataEntry.objects.all()
    serializer_class = DateEntrySerializer
    permission_classes = []
    ordering = ["created"]

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = DataEntry.objects.all()
        campaign = self.request.query_params.get("campaign")
        if campaign is not None:
            queryset = queryset.filter(campaign=campaign)
        return queryset
