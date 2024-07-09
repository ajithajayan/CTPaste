from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin

# Create your models here.


class CustomUserManager(BaseUserManager):
    def create_user(self, CT_code):
        if not CT_code:
            raise ValueError("User must have an CT_code")
        user = self.model(
            CT_code=CT_code
        )

        user.is_active = True
        user.set_password(str(CT_code))
        user.save(using=self._db)
        return user

    def create_superuser(self, CT_code, password):
        user = self.create_user(
            CT_code=CT_code,
        )
        user.set_password(password)
        user.is_active = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class RoomCode(AbstractBaseUser, PermissionsMixin):
    CT_code = models.IntegerField(unique=True)
    created_time = models.DateTimeField(auto_now_add=True)
    is_staff = models.BooleanField(default=True)
    last_login = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'CT_code'
    objects = CustomUserManager()


class Device(models.Model):
    name = models.CharField(max_length=45)
    created_time = models.DateTimeField(auto_now_add=True)
    room = models.ForeignKey(
        RoomCode, on_delete=models.CASCADE, related_name='room_code')
    last_visited = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)  # Soft delete field

    class Meta:
        unique_together = ('name', 'room',)
        indexes = [
            models.Index(fields=['created_time']),
        ]

    def __str__(self):
        return f"Device {self.name} in Room {self.room.CT_code}"


class Messages(models.Model):
    room = models.ForeignKey(
        RoomCode, on_delete=models.CASCADE, related_name='room')
    device = models.ForeignKey(
        Device, on_delete=models.CASCADE, related_name='message_device')
    text = models.CharField(max_length=4000)
    created_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from Device {self.device.name} in Room {self.room.CT_code}"

    class Meta:
        indexes = [
            models.Index(fields=['created_time']),
        ]
