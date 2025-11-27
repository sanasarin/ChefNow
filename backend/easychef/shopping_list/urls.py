from django.urls import path
# from .views import
from .views import ShoppingListAPIView, ShoppingIngredientsAPIView, ShoppingListRecipeView

app_name = 'shopping_list'

urlpatterns = [
    path('recipes/', ShoppingListAPIView.as_view(),
         name='add-recipe-shopping'),

    path('recipes/<int:rid>/', ShoppingListRecipeView.as_view(),
        name='get-recipe-shopping'),

    path('', ShoppingIngredientsAPIView.as_view())

]

