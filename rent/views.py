from .models import *
from .serializer import *
from .utils import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.core.paginator import Paginator
from django.db.models import Q
# Create your views here

# Home View (not being used)
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





# Store List View
class StoreList(APIView):
     def get(self, request):
          try:
               stores = Store.objects.all()
               stores = StoreSerializer(stores, many=True).data
               return Response(stores, status=status.HTTP_200_OK)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)


# Store View
class StoreView(APIView):
     def get(self, request, store_id):
          try:
               store = Store.objects.get(store_id=store_id)
               store = StoreSerializer(store).data
               return Response(store, status=status.HTTP_200_OK)
          except Exception as e:
               print(e)
               return Response(status=status.HTTP_400_BAD_REQUEST)



# Search Actors View
class SearchActors(APIView):
     def get(self, request):
          try:
              q = request.GET.get('q').lower().split()
              actors = set([])
              for word in q:
                   result = Actor.objects.filter(Q(last_name__icontains=word) | Q(first_name__icontains=word))[:5]
                   actors = actors.union(result)

              actors = ActorSerializer(actors, many=True).data
              actors = OrganizeByAccuracy(actors, q) 
              return Response(actors, status=status.HTTP_200_OK)
          except Exception as e:
               print(e)
               return Response(status=status.HTTP_400_BAD_REQUEST)


# Search View
class Search(APIView):
     def get(self, request):
          try:
               q = request.GET.get('q')
               films = Film.objects.filter(title__icontains=q).values()[:20]
               return Response(films, status=status.HTTP_200_OK)
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
               stores = Store.objects.filter(store_id__in=Inventories)
               serializedFilm = FilmWithDetailsSerializer({
                   'film': film,
                   'actors': actors,
                   'category': category,
                   'stores': stores,
                   'rentals': rentals
               }).data 
               
               return Response(serializedFilm, status=status.HTTP_200_OK)
          except Exception as e:
               print(e)
               return Response(status=status.HTTP_400_BAD_REQUEST)
               



#  type: category, actor, language, store
class FilterFilms(APIView):
     def get(self, request, type, value):
          try:

               page = int(request.GET.get('page', 1))
               if page < 1:
                    return Response(status=status.HTTP_400_BAD_REQUEST)

               if type == 'category': 
                    ids = FilmCategory.objects.filter(category=value).values_list('film_id', flat=True)  
                    films = Film.objects.filter(film_id__in=ids)[(page-1)*20:page*20]
                    has_next = Film.objects.filter( film_id__in=ids).count() > page*20
              
               elif type == 'actor':
                    ids = FilmActor.objects.filter(actor=value).values_list('film_id', flat=True)
                    films = Film.objects.filter(film_id__in=ids)[(page-1)*20:page*20]
                    has_next = Film.objects.filter( film_id__in=ids).count() > page*20
              
               elif type == 'language':
                    films = Film.objects.filter(language=value)[(page-1)*20:page*20]
              
                    has_next = Film.objects.filter(language=value).count() > page*20
               elif type == 'store':
                    ids = Inventory.objects.filter(store_id=value).values_list('film_id', flat=True)
                    films = Film.objects.filter(film_id__in=ids)[(page-1)*20:page*20]
                    has_next = Film.objects.filter( film_id__in=ids).count() > page*20
     
               else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)

               films = FilmSerializer(films, many=True).data
               return Response({'films': films, 'has_next': has_next}, status=status.HTTP_200_OK)

          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)