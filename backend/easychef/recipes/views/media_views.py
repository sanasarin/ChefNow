from rest_framework.generics import CreateAPIView

from ..serializers import CommentImageSerializer, CommentVideoSerializer, \
    RecipeImageSerializer, \
    StepImageSerializer, \
    StepVideoSerializer, RecipeVideoSerializer


class UploadRecipeImageAPIView(CreateAPIView):
    """
    Create a recipe photo instance

    URL: /recipes/images
    """
    serializer_class = RecipeImageSerializer

class UploadRecipeVideoAPIView(CreateAPIView):
    """
    Create a recipe video instance

    URL: /recipes/videos
    """
    serializer_class = RecipeVideoSerializer


class UploadStepImageAPIView(CreateAPIView):
    """
    Create a recipe photo instance

    URL: /recipes/steps/images
    """
    serializer_class = StepImageSerializer


class UploadStepVideoAPIView(CreateAPIView):
    """
    Create a recipe photo instance

    URL: /recipes/steps/videos
    """
    serializer_class = StepVideoSerializer


class UploadCommentImageAPIView(CreateAPIView):
    """
    Create a recipe photo instance

    URL: /recipes/comments/images/
    """
    serializer_class = CommentImageSerializer


class UploadCommentVideoAPIView(CreateAPIView):
    """
    Create a recipe photo instance

    URL: /recipes/comments/images/
    """
    serializer_class = CommentVideoSerializer

