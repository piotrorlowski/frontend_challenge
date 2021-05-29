from django.db import models


class Data(models.Model):
    """Model for Data objects."""

    date = models.DateField(null=True)
    datasource = models.CharField(max_length=20, default="")
    campaign = models.CharField(max_length=100, default="")
    clicks = models.IntegerField(default=0)
    impressions = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now=True)

    class Meta:
        """Meta options for Data model."""

        ordering = ["created"]


class Campaign(models.Model):
    """Model for Campaign options."""

    name = models.CharField(max_length=200, default="")

    class Meta:
        """Meta options for Campaign model."""

        ordering = ["name"]
