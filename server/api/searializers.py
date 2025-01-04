from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Criteria, Company

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CriteriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Criteria
        fields = ["id", "label", "key", "description", "created_at", "updated_at"]

class CompanySerializer(serializers.ModelSerializer):
    criteria = CriteriaSerializer(many=True)
    class Meta:
        model = Company
        fields = ["id", "label", "revenue", "revenue_percentage_change", "profits", "profits_percentage_change", "assets", "employees", "change_in_rank", "created_at", "updated_at", "criteria"]

class AHPInputSerializer(serializers.Serializer):
    criteria = serializers.ListField(
        child=serializers.DictField(),
        required=True
    )
    companies = serializers.ListField(
        child=serializers.DictField(),
        required=True
    )
    tables = serializers.ListField(
        child=serializers.ListField(
            child=serializers.ListField(
                child=serializers.CharField()
            )
        ),
        required=True
    )

class PrometheeInputSerializer(serializers.Serializer):
    weights = serializers.ListField(
        child=serializers.FloatField(),
        required=True
    )
    switches = serializers.ListField(
        child=serializers.BooleanField(),
        required=True
    )
    companies = serializers.ListField(
        child=serializers.DictField(),
        required=True
    )
    criteria = serializers.ListField(
        child=serializers.DictField(),
        required=True
    )
    prefParams = serializers.ListField(
        child=serializers.ListField(
            child=serializers.FloatField()
        ),
        required=True
    )
    prefFunc = serializers.ListField(
        child=serializers.CharField(),
        required=True
    )

class WSMInputSerializer(serializers.Serializer):
    weights = serializers.ListField(
        child=serializers.FloatField(),
        required=True
    )
    companies = serializers.ListField(
        child=serializers.DictField(),
        required=True
    )
    tables = serializers.ListField(
        child=serializers.ListField(
            child=serializers.FloatField()
        ),
        required=False
    )

class TopsisInputSerializer(serializers.Serializer):
    weights = serializers.ListField(
        child=serializers.FloatField(),
        required=True
    )
    switches = serializers.ListField(
        child=serializers.BooleanField(),
        required=False
    )
    tables = serializers.ListField(
        child=serializers.ListField(
            child=serializers.FloatField()
        ),
        required=False
    )
    companies = serializers.ListField(
        child=serializers.DictField(),
        required=True
    )
