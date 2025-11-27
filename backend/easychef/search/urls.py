from django.urls import path
from .views import RecipeSearchView

urlpatterns = [
    path('', RecipeSearchView.as_view()),
]