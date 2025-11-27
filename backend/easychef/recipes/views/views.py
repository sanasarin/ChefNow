from curses.ascii import isdigit

from django.core.exceptions import ObjectDoesNotExist
from django.db.models.functions import Coalesce
from django.http import Http404
from rest_framework import permissions, status, viewsets
from rest_framework.generics import ListAPIView, ListCreateAPIView, \
    RetrieveAPIView, \
    CreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from ..models import Ingredient, Recipe, Rate
from ..serializers import IngredientSerializer, RecipeSerializer, RateSerializer


from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import GenericAPIView
from django.shortcuts import get_object_or_404
from django.db.models import Count, Avg, FloatField
from ..permissions import IsRecipeOwner, RecipePermissionMixin


class RecipeCreateAPIView(RecipePermissionMixin, ListCreateAPIView):
    """
    Create a recipe instance

    URL: /recipes/
    """
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


# TODO: test it when ratings are done!
class PopularRecipesAPIView(RecipePermissionMixin, ListAPIView):
    """
    Display popular recipes based on number of favourites and average rating!

    URL: /recipes/popular
    """
    permission_classes = [AllowAny]
    serializer_class = RecipeSerializer

    def get_queryset(self):
        queryset = Recipe.objects.all()

        # Add num favourites
        queryset = queryset.annotate(
            num_favourites=Coalesce(Count('favourited_by'), 0))

        # Add average rating
        queryset = queryset.annotate(
            avg_rating=Coalesce(Avg('ratings__rating',
                                    output_field=FloatField()), 0.0,
                                output_field=FloatField()))

        return queryset

    def filter_queryset(self, queryset):
        """
        Override default ordering to order by average rating and number of
        favourites (desc order).

        """
        queryset = super().filter_queryset(queryset)
        queryset = queryset.order_by('-avg_rating', '-num_favourites')
        return queryset


class RecipeRetrieveUpdateDestroyAPIView(RecipePermissionMixin,
                                         RetrieveUpdateDestroyAPIView):
    """
    Get,Edit,Delete a single instance of a recipe with the given primary key.

    URL: /recipes/<int:pk>
    """
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def get_serializer_context(self):
        """
        Add the `serving_size` GET parameter to the serializer context.
        """
        context = super().get_serializer_context()

        if self.request.GET.get('serving_size') and isdigit(self.request.GET.get('serving_size')):
            context['serving_size'] = int(self.request.GET.get('serving_size'))

        return context

    # disable put
    def put(self, request, *args, **kwargs):
        return Response({"detail": "Method \"PUT\" not allowed."},
                        status=status.HTTP_405_METHOD_NOT_ALLOWED)


class FavouriteRecipeAPIView(GenericAPIView):
    """
    View for adding or deleting a favourite from a recipe
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        extract the recipe id from the URL
        """
        recipe_id = self.kwargs['pk']
        try:
            recipe = Recipe.objects.get(pk=recipe_id)
        except Recipe.DoesNotExist:
            return Response({"detail": "Recipe not found with the given pk."},
                            status=status.HTTP_404_NOT_FOUND)

        # recipe_id = self.kwargs.get('pk')
        # recipe = get_object_or_404(Recipe, id=recipe_id)

        user = self.request.user

        if recipe in user.favourite_recipes.all():
            return Response({"detail": "Recipe already in favourites."},
                            status=status.HTTP_409_CONFLICT)

        user.favourite_recipes.add(recipe)
        user.save()

        # not sure if appropriate status code
        return Response(status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        recipe_id = self.kwargs['pk']
        try:
            recipe = Recipe.objects.get(pk=recipe_id)
        except Recipe.DoesNotExist:
            return Response({"detail": "Recipe not found with the given pk."},
                            status=status.HTTP_404_NOT_FOUND)

        user = self.request.user

        if recipe not in user.favourite_recipes.all():
            return Response({"detail": "Recipe not in favourites."},
                            status=status.HTTP_404_NOT_FOUND)

        user.favourite_recipes.remove(recipe)
        user.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, *args, **kwargs):
        recipe_id = self.kwargs['pk']
        try:
            recipe = Recipe.objects.get(pk=recipe_id)
        except Recipe.DoesNotExist:
            return Response({"detail": "Recipe not found with the given pk."},
                            status=status.HTTP_404_NOT_FOUND)

        user = self.request.user
        is_favorited = recipe in user.favourite_recipes.all()

        return Response({"is_favorited": is_favorited})

# ingredients autofill
class IngredientsAPIView(ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = IngredientSerializer

    def get_queryset(self):
        name = self.request.query_params.get('name', None)
        queryset = Ingredient.objects.all()

        queryset = queryset.filter(name__startswith=name)

        return queryset

    def get(self, request, *args, **kwargs):
        name = request.query_params.get('name', None)

        if not name:
            return Response({'error': 'name is required'},
                            status=status.HTTP_400_BAD_REQUEST)

        return super().get(request, *args, **kwargs)


class RatingsAPIView(CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView):
    """
    Add rating
    Delete rating
    Edit rating
    """
    permission_classes = [permissions.IsAuthenticated]
    queryset = Rate.objects.all()
    serializer_class = RateSerializer

    def get_object(self):
        recipe_id = self.kwargs.get('pk')
        recipe = get_object_or_404(Recipe, id=recipe_id)

        try:
            curr_rating = Rate.objects.get(user=self.request.user, recipe=recipe)
        except ObjectDoesNotExist:
            curr_rating = None

        return curr_rating

    def create(self, request, *args, **kwargs):

        try:
            recipe_id = self.kwargs['pk']
            Recipe.objects.get(pk=recipe_id)
        except Recipe.DoesNotExist:
            return Response({"detail": "Recipe not found with the given pk."},
                            status=status.HTTP_404_NOT_FOUND)

        rate = self.get_object()
        if rate is None:
            recipe_id = self.kwargs.get('pk')
            recipe = get_object_or_404(Recipe, id=recipe_id)

            serializer = RateSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=self.request.user, recipe=recipe)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({"detail":
                            "You can not rate a recipe more than once"},
                            status=status.HTTP_409_CONFLICT)

    def update(self, request, *args, **kwargs):

        try:
            recipe_id = self.kwargs['pk']
            Recipe.objects.get(pk=recipe_id)
        except Recipe.DoesNotExist:
            return Response({"detail": "Recipe not found with the given pk."},
                            status=status.HTTP_404_NOT_FOUND)

        instance = self.get_object()

        if not instance:
            return Response({"detail": "Rating not found"},
                            status=status.HTTP_404_NOT_FOUND)

        serializer = RateSerializer(instance, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        try:
            recipe_id = self.kwargs['pk']
            Recipe.objects.get(pk=recipe_id)
        except Recipe.DoesNotExist:
            return Response({"detail": "Recipe not found with the given pk."},
                            status=status.HTTP_404_NOT_FOUND)

        instance = self.get_object()

        if not instance:
            # Create a new rating
            recipe_id = self.kwargs.get('pk')
            recipe = get_object_or_404(Recipe, id=recipe_id)

            serializer = RateSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=self.request.user, recipe=recipe)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Update the existing rating
            serializer = RateSerializer(instance, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        try:
            recipe_id = self.kwargs['pk']
            Recipe.objects.get(pk=recipe_id)
        except Recipe.DoesNotExist:
            return Response({"detail": "Recipe not found with the given pk."},
                            status=status.HTTP_404_NOT_FOUND)

        instance = self.get_object()

        if not instance:
            return Response(status=status.HTTP_404_NOT_FOUND)

        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AvgRatingsAPIView(ListAPIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            recipe_id = self.kwargs['pk']
            recipe = Recipe.objects.get(pk=recipe_id)
        except Recipe.DoesNotExist:
            return Response({"detail": "Recipe not found with the given pk."},
                            status=status.HTTP_404_NOT_FOUND)

        average_rating = recipe.get_average_rating()
        return Response({"avg_rating": average_rating})