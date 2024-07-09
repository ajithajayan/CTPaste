from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views



urlpatterns = [
    # Generate Token (Only for testing purpose)
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # To Generate refreshed token using existing token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('v1/generates/code/', views.GenerateCTcode.as_view(), name='generate'),
    path('v1/rooms/join/', views.CreateGetDevice.as_view(), name='create_device'),
    path('v1/a/', views.test_purpose.as_view(), name='create_device')
]