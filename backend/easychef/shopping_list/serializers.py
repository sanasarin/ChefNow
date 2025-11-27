from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import ShoppingItem
from recipes.models import Recipe
from rest_framework.reverse import reverse
from recipes.serializers import RecipeSerializer

# class RecipeSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Recipe
#         fields = ('id', 'name', 'images')


class ShoppingItemSerializer(serializers.ModelSerializer):
    # used for get
    recipe = RecipeSerializer(read_only=True)

    # used for creation
    recipe_id = serializers.PrimaryKeyRelatedField(
        queryset=Recipe.objects.all(),
        source='recipe',
        write_only=True
    )

    class Meta:
        model = ShoppingItem
        fields = ['id','recipe_id', 'recipe', 'serving_size']


class ShoppingIngredientsSerializer(serializers.Serializer):
    # id = serializers.IntegerField()
    name = serializers.CharField()
    quantity = serializers.FloatField()
