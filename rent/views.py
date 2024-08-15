from .models import *
from .serializer import *
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
               films = Film.objects.filter( film_id__in=ids)[(page-1)*5:page*5]
               films = FilmSerializer(films, many=True).data
               has_next = Film.objects.filter( film_id__in=ids).count() > page*5
               return Response({'films': films, 'has_next': has_next}, status=status.HTTP_200_OK)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)




# Film Detail View
class FilmDetail(APIView):

     def get(self, request, film_id):
          try:
               film = Film.objects.get(film_id=film_id)
               actors = FilmActor.objects.filter(film=film_id)
               category = FilmCategory.objects.get(film=film_id)
               Inventories = Inventory.objects.filter(film_id=film_id).values('store_id')
               rentals = Rental.objects.filter(inventory__in=Inventories)
               cities = City.objects.filter(address__store__in=Inventories)
               serializedFilm = FilmWithDetailsSerializer({
                   'film': film,
                   'actors': actors,
                   'category': category,
                   'cities': cities,
                   'rentals': rentals
               }).data 
               
               return Response(serializedFilm, status=status.HTTP_200_OK)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)
               
