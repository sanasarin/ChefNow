from django.shortcuts import render

# Create your views here.
from django.db.models.functions import Coalesce
from rest_framework import generics, filters
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from recipes.models import Recipe
from recipes.serializers import RecipeSerializer
from django.db.models import Count, Avg, FloatField


class RecipeSearchView(ListAPIView):
    """
    Search through recipes by their name, ingredients,
    or creator.

    Filter recipes based on cuisine, diet, or cooking time.

    Sorted based on a combination of overall rating and number of favourites
    """
    permission_classes = [AllowAny]
    serializer_class = RecipeSerializer

    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'ingredients__name', 'creator__username']
    # search_fields = ['name__icontains', 'ingredients__name__icontains', 'creator__username__icontains']

    def get_queryset(self):
        queryset = Recipe.objects.all()

        # Filter by cuisine
        cuisines = self.request.query_params.get('cuisines', None)
        if cuisines:
            cuisines_list = cuisines.split(',')
            # queryset = queryset.filter(cuisines__name=cuisine)
            # queryset = queryset.filter(cuisines__name__in=cuisines_list)

            for cuisine in cuisines_list:
                c = [cuisine]
                queryset = queryset.filter(cuisines__name__in=c)

        # Filter by diet
        diets = self.request.query_params.get('diets', None)
        if diets:
            diets_list = diets.split(',')
            # queryset = queryset.filter(diets__name__in=diets_list)

            for diet in diets_list:
                d = [diet]
                queryset = queryset.filter(diets__name__in=d)

        # Filter by cooking time
        min_cook_time = self.request.query_params.get('min_cook_time', None)
        max_cook_time = self.request.query_params.get('max_cook_time', None)

        if min_cook_time:
            queryset = queryset.filter(cook_time__gte=min_cook_time)
        if max_cook_time:
            queryset = queryset.filter(cook_time__lte=max_cook_time)

        # Add num favourites
        queryset = queryset.annotate(num_favourites=Coalesce(Count('favourited_by'), 0))

        # Add average rating
        queryset = queryset.annotate(avg_rating=Coalesce(Avg('ratings__rating', output_field=FloatField()), 0.0, output_field=FloatField()))

        return queryset.distinct()

    def filter_queryset(self, queryset):
        """
        Override default ordering to order by average rating and number of
        favourites (desc order).

        """
        queryset = super().filter_queryset(queryset)
        queryset = queryset.order_by('-avg_rating', '-num_favourites')
        return queryset
