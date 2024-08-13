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


class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = ('inventory_id', 'film', 'store_id', 'last_update')


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ('store_id', 'manager_staff', 'address', 'last_update')


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('address_id', 'address', 'address2', 'district', 'city', 'postal_code', 'phone', 'last_update')


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('city_id', 'city', 'country', 'last_update')


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('country_id', 'country', 'last_update')


class FilmWithDetailsSerializer(serializers.Serializer):
    film =  FilmSerializer()
    actors = FilmActorSerializer(many=True)
    category = FilmCategorySerializer()
    cities = CitySerializer(many=True)
    countries = CountrySerializer(many=True)
 

