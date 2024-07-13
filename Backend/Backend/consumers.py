import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from ChatApi.models import Messages, Device, RoomCode
from django.core.exceptions import ObjectDoesNotExist


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.ct_code = self.scope['url_route']['kwargs']['ct_code']
        self.roomGroupName = f"chat_{self.ct_code}"
        await self.channel_layer.group_add(
            self.roomGroupName,
            self.channel_name
        )
        await self.accept()
        await self.send_existing_messages()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.roomGroupName,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json.get('message')
        device_name = text_data_json.get('device')

        # Save message to the database
        saved_message = await self.save_message(device_name, message)

        # Broadcast message to the group
        await self.channel_layer.group_send(
            self.roomGroupName,
            {
                'type': 'chat_message',
                'message': message,
                'device': device_name,
                'user_id': saved_message.device.id,
                'created_time': saved_message.created_time.isoformat()

            }
        )

    @database_sync_to_async
    def get_existing_messages(self):
        return list(Messages.objects.filter(room__CT_code=self.ct_code).order_by('created_time').values('device__name', 'text', 'created_time', 'device__id'))

    async def send_existing_messages(self):
        existing_messages = await self.get_existing_messages()
        for message in existing_messages:
            await self.send(text_data=json.dumps({
                'device': message['device__name'],
                'message': message['text'],
                'user_id': message['device__id'],
                'created_time': message['created_time'].isoformat()
            }))

    @database_sync_to_async
    def save_message(self, device_name, message_text):
        print(self.ct_code)

        try:
            room = RoomCode.objects.get(CT_code=self.ct_code)
            device = Device.objects.get(
                name=device_name, room__CT_code=self.ct_code)
        except ObjectDoesNotExist:
            raise {"error": "Object with given details not found"}
        return Messages.objects.create(room=room, device=device, text=message_text)

    # Similar to serializer
    async def chat_message(self, event):
        message = event.get('message')
        device = event.get('device')
        user_id = event.get('user_id')
        created_time = event.get('created_time')

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'device': device,
            'message': message,
            'user_id': user_id,
            'created_time': created_time
        }))
