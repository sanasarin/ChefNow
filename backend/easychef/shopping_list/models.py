from django.db import models
from account.models import CustomUser
from recipes.models import Recipe


class ShoppingItem(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                             related_name='shopping_items')

    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    serving_size = models.PositiveIntegerField()
