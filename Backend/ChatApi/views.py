from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError, ObjectDoesNotExist
from .models import RoomCode, Device
import random


# Create your views here.

class GenerateCTcode(APIView):
    def get(self, request):
        def generate_code(): return random.randint(1000, 9999)

        def is_code_available(x):
            return RoomCode.objects.filter(CT_code=x).exists()

        def get_unique_code():
            code = generate_code()
            while not is_code_available(code):
                code = generate_code()
            return code

        try:
            unique_code = get_unique_code()
            return Response({'message': 'Code generated successfully', 'CT_code': unique_code}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Create device


class CreateGetDevice(APIView):
    def post(self, request):
        ct_code = request.data.get('ct_code')
        device_name = request.data.get('device_name')
        if ct_code is None:
            return Response({'errors': 'CT Code is required'}, status=status.HTTP_400_BAD_REQUEST)
        if device_name is None:
            return Response({'errors': 'Device name is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            room_obj = RoomCode.objects.create(CT_code=int(ct_code))
        except ValidationError:
            return Response({'errors': 'CT Code already exist'}, status=status.HTTP_409_CONFLICT)
        device_obj, device_created = Device.objects.get_or_create(
            name=device_name, room=room_obj.id)
        response_status = status.HTTP_201_CREATED if device_created else status.HTTP_200_OK
        context = {
            'device_id': device_obj.id,
            'device_create_status': device_created
        }
        return Response(context, status=response_status)
