from django.urls import path
from . import views

urlpatterns = [
    path('set-username/', views.SetUsernameView.as_view(), name='set-username'),
    path('send-message/', views.SendMessageView.as_view(), name='send-message'),
    path('get-messages/', views.GetMessagesView.as_view(), name='get-messages'),
]