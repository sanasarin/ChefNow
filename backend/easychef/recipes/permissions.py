from rest_framework import permissions
from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    """
    Custom permission to only allow owners of an object
    Note: this is a general one! Will work on most models
    Except the ones who do not have a user attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Check if the user making the request is the owner of the object
        print("test")
        return obj.user == request.user


class IsRecipeOwner(BasePermission):
    """
    Specifically check if user is recipe owner
    """
    def has_object_permission(self, request, view, obj):
        # Check if the user making the request is the owner of the object
        return obj.creator == request.user


class RecipePermissionMixin:
    permission_classes_by_action = {
        'GET': [permissions.AllowAny],
        'POST': [permissions.IsAuthenticated],
        'PATCH': [permissions.IsAuthenticated, IsRecipeOwner],
        'PUT': [permissions.IsAuthenticated, IsRecipeOwner],
        'DELETE': [permissions.IsAuthenticated, IsRecipeOwner]
    }

    def get_permissions(self):
        permission_classes = []

        method = self.request.method
        if method in self.permission_classes_by_action:
            permission_classes = self.permission_classes_by_action[method]

        return [permission() for permission in permission_classes]

