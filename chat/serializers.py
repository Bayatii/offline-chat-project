from rest_framework import serializers
from .models import Message

class UsernameSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["id", "username", "text", "timestamp"]