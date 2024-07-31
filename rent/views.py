from .models import Actor, Film
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

# Create your views here

# Home View
class Index(APIView):
     
     def get(self, request):
          try:
               films = Film.objects.all()[:5].values()
               return Response(films, status=status.HTTP_200_OK)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)