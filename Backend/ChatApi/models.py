from django.db import models

# Create your models here.


class RoomCode(models.Model):
    CT_code = models.IntegerField(unique=True)
    created_time = models.DateTimeField(auto_now_add=True)


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
