from django.db import models


class DataSource(models.TextChoices):
    """DataSource enum."""

    GOOGLE_ADWORDS = ("GOOGLE_ADWORDS", "Google Adwords")
    GOOGLE_ANALYTICS = ("GOOGLE_ANALYTICS", "Google Analytics")
    FACEBOOK_ADS = ("FACEBOOK_ADS", "Facebook Ads")
    MAILCHIMP = ("MAILCHIMP", "Mailchimp")
