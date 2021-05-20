from rest_framework.pagination import PageNumberPagination


class DataPagination(PageNumberPagination):
    """PageNumberPagination for Data."""

    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 3000
