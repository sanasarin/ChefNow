from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import RegisterView, LogoutView,\
    AccountRetrieveUpdateAPIView,\
    AllFavouriteRecipesAPIView, UserInteractionsAPIView, MyRecipesAPIView

urlpatterns = [

    # auth
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', obtain_auth_token, name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),

    # view edit profile
    path('', AccountRetrieveUpdateAPIView.as_view(), name='profile'),

    # social media
    path('favourites/', AllFavouriteRecipesAPIView.as_view(),
         name='favorite_recipes'),
    path('interactions/', UserInteractionsAPIView.as_view()),
    path('recipes/', MyRecipesAPIView.as_view()),
]
