from rest_framework import serializers
from .models import *
import json

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('language_id', 'name')



class FilmSerializer(serializers.ModelSerializer):
    language = LanguageSerializer()
    class Meta:
        model = Film
        fields = ('film_id','title', 'language', 'description', 'release_year', 'rental_duration', 'rental_rate', 'length', 'replacement_cost', 'rating', 'special_features')

    def to_representation(self, instance):
        return {
            'film_id': instance.film_id,
            'title': instance.title,
            'language': instance.language.name,
            'language_id': instance.language.language_id,
            'description': instance.description,
            'release_year': instance.release_year,
            'rental_duration': instance.rental_duration,
            'rental_rate': instance.rental_rate,
            'length': instance.length,
            'replacement_cost': instance.replacement_cost,
            'rating': instance.rating,
            'special_features': instance.special_features
        }


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('category_id', 'name')



class FilmCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = FilmCategory
        fields = ('category', 'film', 'last_update')

    def to_representation(self, instance):
        return {
            'category_id': instance.category_id,
            'category': instance.category.name,
            'film': instance.film.title,
            'last_update': instance.last_update
        }




class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ('actor_id', 'first_name', 'last_name')


class FilmActorSerializer(serializers.ModelSerializer):
    actor = ActorSerializer()

    class Meta:
        model = FilmActor
        fields = ('actor', 'film', 'last_update')

    def to_representation(self, instance):
        return {
            'actor_id': instance.actor_id,
            'actor': instance.actor.first_name + ' ' + instance.actor.last_name,
            'film': instance.film.title,
            'last_update': instance.last_update
        }


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



class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('country_id', 'country', 'last_update')


class CitySerializer(serializers.ModelSerializer):
    country = CountrySerializer()
    class Meta:
        model = City
        fields = ('city_id', 'city', 'country', 'last_update')

    def to_representation(self, instance):
        return {
            'city_id': instance.city_id,
            'city': instance.city,
            'country': instance.country.country,
            'last_update': instance.last_update
        }


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('payment_id', 'customer', 'staff', 'rental', 'amount', 'payment_date')

    def to_representation(self, instance):
        return {
            'payment_id': instance.payment_id,
            'customer': instance.customer.first_name + ' ' + instance.customer.last_name,
            'staff': instance.staff.first_name + ' ' + instance.staff.last_name,
            'rental': instance.rental.rental_id,
            'amount': instance.amount,
            'payment_date': instance.payment_date
        }


class RentalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rental
        fields = ('rental_id', 'rental_date', 'inventory', 'customer', 'return_date', 'staff', 'payment', 'last_update')

    def to_representation(self, instance):
        return {
            'rental_id': instance.rental_id,
            'rental_date': instance.rental_date,
            'customer': instance.customer.first_name + ' ' + instance.customer.last_name,
            'return_date': instance.return_date,
            'staff': instance.staff.first_name + ' ' + instance.staff.last_name,
            'last_update': instance.last_update
        }



class FilmWithDetailsSerializer(serializers.Serializer):
    film =  FilmSerializer()
    actors = FilmActorSerializer(many=True)
    category = FilmCategorySerializer()
    cities = CitySerializer(many=True)
    rentals = RentalSerializer(many=True)
 

