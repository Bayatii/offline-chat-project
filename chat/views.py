from rest_framework import static, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Message
from .serializers import UsernameSerializer, MessageSerializer

# Create your views here.

class SetUsernameView(APIView):
    def post(self, request):
        serializer = UsernameSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            return Response({"message": "username accepted", "username": username}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SendMessageView(APIView):
    def post(self, request):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetMessagesView(APIView):
    def get(self, request):
        messages = Message.objects.all().order_by("-timestamp")
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)