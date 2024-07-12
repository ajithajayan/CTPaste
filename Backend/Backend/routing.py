from django.urls import re_path, path

from . import consumers

websocket_urlpatterns = [
    path(r'ws/chat/<int:ct_code>', consumers.ChatConsumer.as_asgi()),
]