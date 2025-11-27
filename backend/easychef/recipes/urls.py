from django.urls import path

from .views.views import RecipeRetrieveUpdateDestroyAPIView, RecipeCreateAPIView, FavouriteRecipeAPIView, IngredientsAPIView, PopularRecipesAPIView, RatingsAPIView, AvgRatingsAPIView

from .views.media_views import UploadCommentImageAPIView, \
    UploadCommentVideoAPIView, UploadRecipeImageAPIView,\
    UploadStepImageAPIView, UploadStepVideoAPIView, UploadRecipeVideoAPIView

from .views.recipe_comment_views import RecipeCommentsListCreateAPIView, ModifyCommentAPIView


app_name = 'recipes'

urlpatterns = [

    # crud
    path('', RecipeCreateAPIView.as_view(), name='create-recipe'),
    path('<int:pk>/', RecipeRetrieveUpdateDestroyAPIView.as_view(), name="view-edit-delete-recipe"),


    # social media
    path('<int:pk>/favourite/', FavouriteRecipeAPIView.as_view(), name = 'favourite-recipes'),
    path('<int:pk>/ratings/', RatingsAPIView.as_view(), name="ratings"),
    path('<int:pk>/ratings/average/', AvgRatingsAPIView.as_view(), name="ratings"),
    path('popular/', PopularRecipesAPIView().as_view()),

    # ingredients (autofill)
    path('ingredients/', IngredientsAPIView.as_view()),

    # comments CRUD
    path('<int:pk>/comments/', RecipeCommentsListCreateAPIView.as_view(), name = "recipe-comments"),
    path('comments/<int:cid>/', ModifyCommentAPIView.as_view(), name="edit-destroy-comment"),


    # Media (pre-upload)
    path('images/', UploadRecipeImageAPIView().as_view()),
    path('videos/', UploadRecipeVideoAPIView().as_view()),
    path('steps/images/', UploadStepImageAPIView().as_view()),
    path('steps/videos/', UploadStepVideoAPIView().as_view()),
    path('comments/images/', UploadCommentImageAPIView().as_view()),
    path('comments/videos/', UploadCommentVideoAPIView().as_view()),


]
