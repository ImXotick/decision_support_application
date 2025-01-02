from django.urls import path
from . import views

urlpatterns = [
    path("criteria/", views.CriteriaListView.as_view(), name="criteria-list"),
    path("companies/", views.CompanyListView.as_view(), name="company-list"),
    path("topsis/", views.TopsisValuesView.as_view(), name="topis-result"),
    path("ahp/", views.AHPValuesView.as_view(), name="ahp-result"),
    path("promethee/", views.PrometheeValuesView.as_view(), name="promethee-result"),
    path("wsm/", views.WSMValuesView.as_view(), name="wsm-result"),
    path("user/", views.UserDetailView.as_view(), name="user-details")
]