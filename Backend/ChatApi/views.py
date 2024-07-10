from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError, ObjectDoesNotExist
from .models import RoomCode, Device
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
import random


# Create your views here.

class GenerateCTcode(APIView):
    def get(self, request):
        def generate_code(): return random.randint(1000, 9999)

        def is_code_available(x):
            return RoomCode.objects.filter(CT_code=x).exists()

        def get_unique_code():
            code = generate_code()
            while is_code_available(code):
                code = generate_code()
            return code

        try:
            unique_code = get_unique_code()
            return Response({'message': 'Code generated successfully', 'CT_code': unique_code}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Create device


class CreateRoomAndJoinDevice(APIView):
    def post(self, request):
        ct_code = request.data.get('ct_code')
        device_name = request.data.get('device_name')
        if ct_code is None or ct_code == '':
            return Response({'errors': 'CT Code is required'}, status=status.HTTP_400_BAD_REQUEST)
        if device_name is None:
            return Response({'errors': 'Device name is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            room_obj = RoomCode.objects.create_or_get(CT_code=int(ct_code))
        except ValidationError:
            return Response({'errors': 'CT Code already exist'}, status=status.HTTP_409_CONFLICT)
        device_obj, device_created = Device.objects.get_or_create(
            name=device_name, room=room_obj)
        response_status = status.HTTP_201_CREATED if device_created else status.HTTP_200_OK

        refresh = RefreshToken.for_user(device_obj)
        refresh["ct_code"] = ct_code
        refresh["device_name"] = device_name

        context = {
            'device_id': device_obj.id,
            'device_create_status': device_created,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        return Response(context, status=response_status)


class JoinDeviceToRoom(APIView):
    def post(self, request):
        ct_code = request.data.get('ct_code')
        device_name = request.data.get('device_name')
        if ct_code is None or ct_code == '':
            return Response({'errors': 'CT Code is required'}, status=status.HTTP_400_BAD_REQUEST)
        if device_name is None:
            return Response({'errors': 'Device name is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            room_obj = RoomCode.objects.get(CT_code=int(ct_code))
        except RoomCode.DoesNotExist:
            return Response({'errors': 'CT Code does not exist'}, status=status.HTTP_404_NOT_FOUND)

        device_obj, device_created = Device.objects.get_or_create(
            name=device_name, room=room_obj)
        response_status = status.HTTP_201_CREATED if device_created else status.HTTP_200_OK

        refresh = RefreshToken.for_user(device_obj)
        refresh["ct_code"] = ct_code
        refresh["device_name"] = device_name

        context = {
            'device_id': device_obj.id,
            'device_create_status': device_created,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        return Response(context, status=response_status)
