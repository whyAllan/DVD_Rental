from .models import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

# Create your views here

# Home View
class Index(APIView):
     
     def get(self, request):
          try:
               films = Film.objects.all()[:20].values()
               return Response(films, status=status.HTTP_200_OK)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)



# Category View
class Categories(APIView):
     
     def get(self, request):
          try:
               categories = Category.objects.all().values()
               return Response(categories, status=status.HTTP_200_OK)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)


# Category Films View
class CategoryFilms(APIView):

     def get(self, request, category_id):
          try:
               page = int(request.GET.get('page', 1))
               ids = FilmCategory.objects.filter(category=category_id).values_list('film_id', flat=True)
               films = Film.objects.filter( film_id__in=ids)[(page-1)*5:page*5].values()
               return Response(films, status=status.HTTP_200_OK)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)
               
