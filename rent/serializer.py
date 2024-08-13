from rest_framework import serializers
from .models import *



class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('language_id', 'name')



class FilmSerializer(serializers.ModelSerializer):
    language = LanguageSerializer()
    class Meta:
        model = Film
        fields = ('film_id','title', 'language', 'description', 'release_year', 'rental_duration', 'rental_rate', 'length', 'replacement_cost', 'rating', 'special_features')



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('category_id', 'name')



class FilmCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = FilmCategory
        fields = ('category', 'film', 'last_update')




class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ('actor_id', 'first_name', 'last_name')


class FilmActorSerializer(serializers.ModelSerializer):
    actor = ActorSerializer()

    class Meta:
        model = FilmActor
        fields = ('actor', 'film', 'last_update')





class FilmWithDetailsSerializer(serializers.Serializer):
    film =  FilmSerializer()
    actors = FilmActorSerializer(many=True)
    category = FilmCategorySerializer()




