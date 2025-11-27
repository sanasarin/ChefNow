from rest_framework import serializers
from recipes.models import Recipe
from rest_framework.reverse import reverse


class RecipeSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)
    diets = serializers.StringRelatedField(many=True, read_only=True)
    cuisines = serializers.StringRelatedField(many=True, read_only=True)
    creator = serializers.StringRelatedField(read_only=True)
    ingredients = serializers.StringRelatedField(many=True, read_only=True)
    avg_rating = serializers.SerializerMethodField(read_only=True)
    num_favourites = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Recipe
        fields = ('id', 'name', 'description', 'cook_time', 'prep_time', 'serving_size', 'diets', 'avg_rating',
                  'num_favourites', 'cuisines', 'ingredients', 'creator', 'url')

    def get_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(reverse('recipes:view-edit-delete-recipe', args=[obj.pk]))

    def get_avg_rating(self, obj):
        return obj.get_average_rating()

    def get_num_favourites(self, obj):
        return obj.get_num_favourites()
