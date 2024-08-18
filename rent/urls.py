
from django.urls import path
from . import views

urlpatterns = [
    path('', views.Index.as_view()),
    path('categories/', views.Categories.as_view()),
    path('films/category/<int:category_id>/', views.CategoryFilms.as_view()),
    path('film/<int:film_id>/', views.FilmDetail.as_view()),
    path('filter/<str:type>/<int:value>/', views.FilterFilms.as_view()),
]