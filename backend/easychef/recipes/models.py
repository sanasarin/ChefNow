from django.db import models
from account.models import CustomUser


class RecipeImage(models.Model):
    image = models.ImageField(upload_to='images_recipes/')


class RecipeVideo(models.Model):
    video = models.FileField(upload_to='videos_recipes/')

class StepImage(models.Model):
    image = models.ImageField(upload_to='images_recipe_steps/')


class StepVideo(models.Model):
    video = models.FileField(upload_to='videos_recipe_steps/')


class CommentImage(models.Model):
    image = models.ImageField(upload_to='images_recipe_comments/')


class CommentVideo(models.Model):
    video = models.FileField(upload_to='videos_recipe_comments/')


class Diet(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Cuisine(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Recipe(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    serving_size = models.PositiveIntegerField()
    prep_time = models.PositiveIntegerField()
    cook_time = models.PositiveIntegerField()

    # image = models.ForeignKey(RecipeImage, on_delete=models.SET_NULL,
    #                           related_name='recipe', null=True)

    images = models.ManyToManyField(RecipeImage, related_name='recipes')

    videos = models.ManyToManyField(RecipeVideo, related_name='recipes')

    # Relations
    diets = models.ManyToManyField(Diet)

    cuisines = models.ManyToManyField(Cuisine)

    ingredients = models.ManyToManyField(Ingredient,
                                         through='RecipeIngredient',
                                         related_name='recipes')

    # Recipe can have an optional base recipe
    base_recipe = models.ForeignKey('self', on_delete=models.SET_NULL,
                                    null=True)

    # Each recipe has a Creator (a user)
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                                related_name='recipes')

    def get_ingredients_list(self, serving_size=-1):
        """
        Returns a list of dictionaries containing the name, quantity, and unit
        of each ingredient associated with the recipe.
        """
        ratio = 1
        if serving_size > -1:
            original_serving_size = self.serving_size
            ratio = serving_size / original_serving_size

        if serving_size == 0:
            ratio = 0

        recipe_ingredients = RecipeIngredient.objects.filter(recipe=self)
        ingredients_list = []
        for ri in recipe_ingredients:
            ingredient_dict = {
                'name': ri.ingredient.name,
                'quantity': float(ri.quantity) * ratio,
            }
            ingredients_list.append(ingredient_dict)
        return ingredients_list

    def get_average_rating(self):
        ratings = self.ratings.all()

        if len(ratings) == 0:
            return 0

        average_rating = 0

        for rating in ratings:
            average_rating += rating.rating

        average_rating /= len(ratings)

        return average_rating

    def get_num_favourites(self):
        return len(self.favourited_by.all())


# We will assume one unit only for now -- grams
class RecipeIngredient(models.Model):
    quantity = models.DecimalField(max_digits=10, decimal_places=2)

    unit = models.CharField(max_length=20, default='g')

    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE,
                               related_name='recipe_ingredients')

    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)


# needs to be many to many to support base recipe duplication
class Step(models.Model):
    description = models.TextField()

    prep_time = models.PositiveIntegerField(null=True)

    cook_time = models.PositiveIntegerField(null=True)

    images = models.ManyToManyField(StepImage, related_name='steps')

    videos = models.ManyToManyField(StepVideo, related_name='steps')

    # Many to one relationship. Many steps belong to one recipe.
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE,
                               related_name='steps')


class Comment(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE,
                               related_name='comments')

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                             related_name='comments')

    description = models.TextField()

    date_created = models.DateTimeField(auto_now_add=True)

    date_modified = models.DateTimeField(auto_now=True)

    images = models.ManyToManyField(CommentImage, related_name='comments')

    videos = models.ManyToManyField(CommentVideo, related_name='comments')


class Rate(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE,
                               related_name='ratings')

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                             related_name="rated_recipes")

    rating = models.PositiveIntegerField(choices=[(1, 1), (2, 2), (3, 3),
                                                  (4, 4), (5, 5)])
