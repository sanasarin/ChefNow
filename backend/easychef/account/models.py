from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures',
                                        null=True, blank=True)
    favourite_recipes = models.ManyToManyField('recipes.Recipe',
                                               related_name='favourited_by')
    email = models.EmailField(unique=True)