# recipes/serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import CommentImage, CommentVideo, Recipe, RecipeImage, \
    RecipeIngredient, Step, \
    Comment, Rate, \
    Diet, Cuisine, Ingredient, StepImage, StepVideo, RecipeVideo
from django.core.exceptions import ValidationError
import mimetypes
from django.core import validators


# takes in primary key for writes, but returns url for read
class ImageIDField(serializers.PrimaryKeyRelatedField):
    def to_representation(self, value):
        return {
            'id': value.id,
            'image': value.image.url
        }


class VideoIDField(serializers.PrimaryKeyRelatedField):
    def to_representation(self, value):
        return {
            'id': value.id,
            'video': value.video.url
        }


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['first_name', 'last_name', 'profile_picture', 'username']


class RecipeImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeImage
        fields = ['id', 'image']

    def validate_image(self, value):
        max_size = 1 * 1024 * 1024  # 1 MB
        if value.size > max_size:
            raise serializers.ValidationError(
                "The image size must not exceed 1 MB.")
        return value


class RecipeVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeVideo
        fields = ['id', 'video']

    def validate_video(self, value):
        # List of allowed video content types
        allowed_content_types = [
            'video/mp4',
            'video/quicktime',  # .mov
            'video/x-msvideo',  # .avi
            'video/x-ms-wmv',  # .wmv
            # Add any other video content types you want to allow
        ]

        content_type, _ = mimetypes.guess_type(value.name)
        if content_type not in allowed_content_types:
            raise serializers.ValidationError(
                "Invalid file type. Please upload a video file.")

        max_size = 5 * 1024 * 1024  # 5 MB
        if value.size > max_size:
            raise serializers.ValidationError(
                "The video size must not exceed 5 MB.")

        return value


class StepImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = StepImage
        fields = ['id', 'image']

    def validate_image(self, value):
        max_size = 1 * 1024 * 1024  # 1 MB
        if value.size > max_size:
            raise serializers.ValidationError(
                "The image size must not exceed 1 MB.")
        return value


class StepVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = StepVideo
        fields = ['id', 'video']

    def validate_video(self, value):
        # List of allowed video content types
        allowed_content_types = [
            'video/mp4',
            'video/quicktime',  # .mov
            'video/x-msvideo',  # .avi
            'video/x-ms-wmv',  # .wmv
            # Add any other video content types you want to allow
        ]

        content_type, _ = mimetypes.guess_type(value.name)
        if content_type not in allowed_content_types:
            raise serializers.ValidationError(
                "Invalid file type. Please upload a video file.")

        max_size = 5 * 1024 * 1024  # 5 MB
        if value.size > max_size:
            raise serializers.ValidationError(
                "The video size must not exceed 5 MB.")

        return value


class CommentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentImage
        fields = ['id', 'image']

    def validate_image(self, value):
        max_size = 1 * 1024 * 1024  # 1 MB
        if value.size > max_size:
            raise serializers.ValidationError(
                "The image size must not exceed 2 MB.")
        return value

    def validate_video(self, value):
        # List of allowed video content types
        allowed_content_types = [
            'video/mp4',
            'video/quicktime',  # .mov
            'video/x-msvideo',  # .avi
            'video/x-ms-wmv',  # .wmv
            # Add any other video content types you want to allow
        ]

        content_type, _ = mimetypes.guess_type(value.name)
        if content_type not in allowed_content_types:
            raise serializers.ValidationError(
                "Invalid file type. Please upload a video file.")

        max_size = 5 * 1024 * 1024  # 5 MB
        if value.size > max_size:
            raise serializers.ValidationError(
                "The video size must not exceed 5 MB.")

        return value


class CommentVideoSerializer(StepVideoSerializer):
    class Meta:
        model = CommentVideo
        fields = ['id', 'video']


class DietSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diet
        fields = ['name']


class CuisineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuisine
        fields = ['name']


class IngredientSerializer(serializers.ModelSerializer):
    quantity = serializers.FloatField(write_only=True)

    class Meta:
        model = Ingredient
        fields = ['name', 'quantity']


class StepSerializer(serializers.ModelSerializer):
    images = ImageIDField(queryset=StepImage.objects.all(), many=True,
                          required=False)

    videos = VideoIDField(queryset=StepVideo.objects.all(), many=True,
                          required=False)

    class Meta:
        model = Step
        fields = ['description', 'images', 'videos', 'prep_time',
                  'cook_time']


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)

    images = ImageIDField(queryset=CommentImage.objects.all(), many=True,
                          required=False)

    videos = VideoIDField(queryset=CommentVideo.objects.all(), many=True,
                          required=False)

    class Meta:
        model = Comment
        fields = ['id', 'description', 'user',
                  'images', 'videos', 'date_created']

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user)
        return serializer.data


class UpdateCommentSerializer(serializers.ModelSerializer):
    images = ImageIDField(queryset=CommentImage.objects.all(), many=True,
                          required=False)

    videos = VideoIDField(queryset=CommentVideo.objects.all(), many=True,
                          required=False)

    class Meta:
        model = Comment
        fields = ['id', 'description', 'images', 'videos']


class RateSerializer(serializers.ModelSerializer):
    avg_rating = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Rate
        fields = ['rating', 'avg_rating']

    def get_avg_rating(self, obj):
        return obj.recipe.get_average_rating()


class RecipeSerializer(serializers.ModelSerializer):
    diets = DietSerializer(many=True)

    cuisines = CuisineSerializer(many=True)

    ingredients = IngredientSerializer(many=True, write_only=True)

    ingredients_list = serializers.SerializerMethodField()

    avg_rating = serializers.SerializerMethodField(read_only=True)

    num_favourites = serializers.SerializerMethodField(read_only=True)

    steps = StepSerializer(many=True)

    images = ImageIDField(queryset=RecipeImage.objects.all(), many=True,
                          required=False)

    videos = VideoIDField(queryset=RecipeVideo.objects.all(), many=True,
                          required=False)

    read_only_fields = ['id']

    creator = serializers.StringRelatedField()

    active_serving_size = serializers.SerializerMethodField(read_only=True)

    base_recipe_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Recipe
        # fields = '__all__'
        fields = ['id', 'name', 'description', 'prep_time', 'cook_time',
                  'serving_size', 'active_serving_size', 'avg_rating',
                  'num_favourites', 'diets', 'cuisines', 'ingredients_list',
                  'steps', 'images', 'videos', 'base_recipe', 'creator',
                  'ingredients', 'base_recipe_name']

    def create(self, validated_data):
        """Create a recipe"""

        # pop these out.. so we don't get direct assignment errors
        diets_data = validated_data.pop('diets', [])
        cuisines_data = validated_data.pop('cuisines', [])
        ingredients_data = validated_data.pop('ingredients', [])
        steps_data = validated_data.pop('steps', [])
        images = validated_data.pop('images', [])
        videos = validated_data.pop('videos', [])

        # Create the Recipe object
        recipe = Recipe.objects.create(**validated_data,
                                       creator=self.context['request'].user)

        # Set the related diets
        diets = [Diet.objects.get_or_create(**diet)[0] for diet in diets_data]
        recipe.diets.set(diets)

        # Set the related cuisines
        cuisines = [Cuisine.objects.get_or_create(**cuisine)[0]
                    for cuisine in cuisines_data]

        recipe.cuisines.set(cuisines)

        # Create the related ingredients
        for ingredient_data in ingredients_data:

            name = ingredient_data['name']

            if (name):
                name = name.lower()

            ingredient, _ = \
                Ingredient.objects.get_or_create(name=name)

            RecipeIngredient.objects.create(recipe=recipe,
                                            ingredient=ingredient,
                                            quantity=ingredient_data['quantity']
                                            )

        # Create the related steps
        # for future, can't i get the step serializer to handle creation?

        for step_data in steps_data:
            step_images = step_data.pop('images', [])
            step_videos = step_data.pop('videos', [])
            s = Step.objects.create(**step_data,
                                    recipe=recipe)
            s.images.add(*step_images)
            s.videos.add(*step_videos)

        # add the images
        recipe.images.add(*images)

        # add the videos PLEASE DOUBLE TEST THIS
        recipe.videos.add(*videos)

        return recipe

    def update(self, instance, validated_data):
        instance.steps.all().delete()

        # Update direct fields
        # instance = super().update(instance, validated_data)
        # -- experiment with this later
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description',
                                                  instance.description)
        instance.prep_time = validated_data.get(
            'prep_time', instance.prep_time)
        instance.cook_time = validated_data.get(
            'cook_time', instance.cook_time)
        instance.serving_size = validated_data.get('serving_size',
                                                   instance.serving_size)
        images = validated_data.get('images', None)
        videos = validated_data.get('videos', None)

        # Update many-to-many fields
        if 'diets' in validated_data:
            instance.diets.clear()
            diets_data = validated_data['diets']
            diets = [Diet.objects.get_or_create(**diet)[0] for diet in
                     diets_data]
            instance.diets.set(diets)

        if 'cuisines' in validated_data:
            instance.cuisines.clear()
            cuisines_data = validated_data['cuisines']
            cuisines = [Cuisine.objects.get_or_create(**cuisine)[0] for cuisine
                        in cuisines_data]
            instance.cuisines.set(cuisines)

        if 'ingredients' in validated_data:
            instance.ingredients.clear()
            recipe_ingredients_data = validated_data['ingredients']
            for recipe_ingredient_data in recipe_ingredients_data:

                name = recipe_ingredient_data['name']
                if (name):
                    name = name.lower()

                # recipe_ingredient_data['name']

                ingredient, _ = Ingredient.objects.get_or_create(
                    name=name)
                RecipeIngredient.objects.create(
                    recipe=instance,
                    ingredient=ingredient,
                    quantity=recipe_ingredient_data['quantity'],
                )

        # many to one relationship.. must be handled differently.
        if 'steps' in validated_data:
            instance.steps.all().delete()  # its ok to delete - steps r specific
            steps = validated_data['steps']
            for step_data in steps:
                step_images = step_data.pop('images', [])
                step_videos = step_data.pop('videos', [])
                s = Step.objects.create(**step_data,
                                        recipe=instance)
                s.images.add(*step_images)
                s.videos.add(*step_videos)

        # add the images
        if 'images' in validated_data:
            instance.images.clear()
            if images:
                instance.images.add(*images)

        if 'videos' in validated_data:
            instance.videos.clear()
            if videos:
                instance.videos.add(*videos)

        # Return the updated instance
        instance.save()
        return instance

    def get_avg_rating(self, obj):
        return obj.get_average_rating()

    def get_num_favourites(self, obj):
        return obj.get_num_favourites()

    def get_ingredients_list(self, obj):
        """
        Returns a list of dictionaries containing the name, quantity, and unit of each ingredient
        associated with the recipe.
        """
        serving_size = self.context.get('serving_size')
        ingredients = obj.get_ingredients_list()
        if serving_size:
            ingredients = obj.get_ingredients_list(serving_size=serving_size)

        return ingredients

    def get_active_serving_size(self, obj):
        """
        Returns the serving size specified in the URL, if applicable.
        """
        serving_size = self.context.get('serving_size')
        if serving_size:
            updated_serving_size = serving_size
            return updated_serving_size
        return obj.serving_size

    def get_base_recipe_name(self, obj):
        """
        Returns the name of the base recipe, if it exists, otherwise null.
        """
        if obj.base_recipe:
            return obj.base_recipe.name
        return None
