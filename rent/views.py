from .models import Actor
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

# Create your views here


class Index(APIView):
     # Create new auction
     def get(self, request):
          try:
               actors = Actor.objects.all().values()
               return Response(actors, status=status.HTTP_200_OK)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)