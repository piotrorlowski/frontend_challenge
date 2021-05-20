from backend.models import Data
from url_filter.filtersets import ModelFilterSet


class DataFilterSet(ModelFilterSet):
    """ModelFilterSet for Data model."""

    class Meta(object):
        model = Data
