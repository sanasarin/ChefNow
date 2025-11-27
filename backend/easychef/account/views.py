from django.http import Http404
from django.shortcuts import get_object_or_404, render

# Create your views here.

from rest_framework import generics, permissions, status
from rest_framework.exceptions import MethodNotAllowed
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.generics import RetrieveUpdateAPIView
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from .serializers import CustomUserSerializer
from .models import CustomUser
from rest_framework.generics import ListAPIView
from recipes.models import Recipe
from recipes.serializers import RecipeSerializer


# Login
class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})


# Register
class RegisterView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    model = get_user_model()
    serializer_class = CustomUserSerializer


# Logout
class LogoutView(generics.DestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def destroy(self, request, *args, **kwargs):
        Token.objects.filter(user=request.user).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# View, Edit profile
# TODO: Ignore `id` and `username` fields if provided in PATCH
class AccountRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user

    # Disable PUT
    def update(self, request, *args, **kwargs):
        if request.method == 'PUT':
            raise MethodNotAllowed('PUT')
        return super().update(request, *args, **kwargs)


class AllFavouriteRecipesAPIView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RecipeSerializer

    def get_queryset(self):
        return self.request.user.favourite_recipes.all()


class UserInteractionsAPIView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()

    # (interaction means create, like, rate, or comment)
    def get_queryset(self):
        queryset = Recipe.objects.all()
        user = self.request.user

        # recipes that the user commented on
        comments = user.comments.all()

        # i wanna add the recipe inside the comment to the result
        comment_recipe_ids = [comment.recipe.id for comment in comments]

        # recipe that the user favourite
        favourites = user.favourite_recipes.all()

        favourite_recipe_ids = [recipe.id for recipe in favourites]

        # recipe that the user rate
        rates = user.rated_recipes.all()
        rated_recipes_id = [rate.recipe.id for rate in rates]

        # recipe that the user create
        user_recipes = user.recipes.all()
        user_recipes_id = [recipe.id for recipe in user_recipes]

        # combine all
        interaction_recipe_ids = comment_recipe_ids + favourite_recipe_ids \
                                        + rated_recipes_id + user_recipes_id

        queryset = queryset.filter(pk__in=interaction_recipe_ids)

        return queryset


class MyRecipesAPIView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RecipeSerializer

    def get_queryset(self):
        return self.request.user.recipes.all()
