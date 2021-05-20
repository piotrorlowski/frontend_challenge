from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from backend import views

router = routers.DefaultRouter()
router.register(r"data", views.DataViewSet)
router.register(r"campaign", views.CampaignViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]
