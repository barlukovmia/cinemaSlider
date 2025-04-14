from django.urls import path
from .views import slider

urlpatterns = [
    path('', slider, name='slider'),
]
