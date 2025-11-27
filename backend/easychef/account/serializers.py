import re
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'first_name', 'last_name', 'username', 'email',
                  'password', 'phone_number', 'profile_picture')
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }

    def validate_password(self, value):
        try:
            validate_password(value)
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return value

    # TODO: Look into this later. It's been crashing if
    # requests are sent from frontend.

    # +1 416-555-9876, +1 647 555 6789
    def validate_phone_number(self, value):
        # pattern = re.compile(r'^\+1\s*\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$')
        # if not pattern.match(value):
        #     raise serializers.ValidationError("Invalid phone number")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data['password'] = make_password(password)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            validated_data['password'] = make_password(password)
        return super().update(instance, validated_data)
