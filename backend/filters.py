from backend.enums import DataSource
from django import forms
from backend.models import Data
from url_filter.filters import Filter
from url_filter.filtersets import ModelFilterSet


class DataFilterSet(ModelFilterSet):
    """ModelFilterSet for Data model."""

    datasource = Filter(
        form_field=forms.MultipleChoiceField(choices=DataSource.choices)
    )

    class Meta(object):
        model = Data
        fields = ["datasource", "campaign"]
