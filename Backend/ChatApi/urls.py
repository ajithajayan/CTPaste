from django.urls import path
from . import views



urlpatterns = [
    path('v1/generates/code/', views.GenerateCTcode.as_view(), name='generate'),
    path('v1/rooms/join/', views.CreateGetDevice.as_view(), name='create_device')
]