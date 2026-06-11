from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('artists/', views.CreatorsListView.as_view(), name='api-artists'),
    path('merch/', views.ProductsListView.as_view(), name='api-merch'),
    path('artists/<slug:slug>/', views.CreatorDetailView.as_view(), name='api-artist-detail'),
    path('checkout/', views.CheckoutView.as_view(), name='api-checkout'),
    # Auth
    path('auth/register/', views.RegisterView.as_view(), name='api-register'),
    path('auth/login/', views.LoginView.as_view(), name='api-login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='api-token-refresh'),
    path('auth/profile/', views.ProfileView.as_view(), name='api-profile'),
]
