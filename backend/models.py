from django.db import models


class DataEntry(models.Model):
    """Model for DataEntry."""

    date = models.DateField(null=True)
    datasource = models.CharField(max_length=20, default="")
    campaign = models.CharField(max_length=100, default="")
    clicks = models.CharField(max_length=10, default="")
    impressions = models.CharField(max_length=10, default="")
    created = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["created"]
