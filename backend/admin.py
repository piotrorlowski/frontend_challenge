from django.contrib import admin
from backend.models import Data


class DataAdmin(admin.ModelAdmin):
    """Django admin for Data."""

    exclude = []


admin.site.register(Data, DataAdmin)
