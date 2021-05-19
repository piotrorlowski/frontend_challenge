from django.contrib import admin
from backend.models import DataEntry


class DataEntryAdmin(admin.ModelAdmin):
    """Django admin for DataEntry."""

    exclude = []


admin.site.register(DataEntry, DataEntryAdmin)
