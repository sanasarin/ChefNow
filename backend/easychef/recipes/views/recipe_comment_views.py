from django.http import Http404
from rest_framework import permissions, status
from rest_framework.generics import ListCreateAPIView, DestroyAPIView, \
    UpdateAPIView, get_object_or_404
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from ..models import Recipe, Comment
from ..permissions import IsOwner, RecipePermissionMixin
from ..serializers import CommentSerializer, UpdateCommentSerializer
from django.utils.dateparse import parse_datetime


class RecipeCommentsListCreateAPIView(RecipePermissionMixin, ListCreateAPIView):
    """
    List or create a comment for a Recipe

    Anyone can see the comments, but only a user can post.

    URL: /recipe/{pk}/comments/
    """
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    # note created_after means created_before, but im too lazy to change it
    def get_queryset(self):
        recipe_id = self.kwargs['pk']
        queryset = Comment.objects.filter(recipe_id=recipe_id).order_by('-date_created')

        created_after = self.request.query_params.get('created_after', None)
        if created_after:
            created_after_dt = parse_datetime(created_after)
            queryset = queryset.filter(date_created__lte=created_after_dt)

        return queryset

    def post(self, request, *args, **kwargs):
        try:
            recipe_id = self.kwargs['pk']
            Recipe.objects.get(pk=recipe_id)
        except Recipe.DoesNotExist:
            return Response({"detail": "Recipe not found with the given pk."},
                            status=status.HTTP_404_NOT_FOUND)

        return super().post(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        try:
            recipe_id = self.kwargs['pk']
            Recipe.objects.get(pk=recipe_id)
        except Recipe.DoesNotExist:
            return Response({"detail": "Recipe not found with the given pk."},
                            status=status.HTTP_404_NOT_FOUND)

        return super().get(request, *args, **kwargs)

    def perform_create(self, serializer):
        recipe_id = self.kwargs['pk']
        user = self.request.user

        try:
            recipe = Recipe.objects.get(pk=recipe_id)
        except Recipe.DoesNotExist:
            return Response({"detail": "Recipe not found with the given pk."},
                            status=status.HTTP_404_NOT_FOUND)

        serializer.save(recipe=recipe, user=user)


class ModifyCommentAPIView(DestroyAPIView, UpdateAPIView):
    """
    Delete a comment
    or Edit a comment (description only!)

    URL: /recipes/comments/{cid}
    """
    serializer_class = UpdateCommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    lookup_url_kwarg = 'cid'

    def patch(self, request, *args, **kwargs):
        if not set(request.data.keys()):
            return Response({"detail": "Empty request."},
                            status=status.HTTP_400_BAD_REQUEST)

        return self.partial_update(request, *args, **kwargs)

    # Put does not make sense here.
    def put(self, request, *args, **kwargs):
        return Response({"detail": "Method \"PUT\" not allowed."},
                        status=status.HTTP_405_METHOD_NOT_ALLOWED)

