from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from .searializers import UserSerializer
from .searializers import UserSerializer, CriteriaSerializer, CompanySerializer, AHPInputSerializer, PrometheeInputSerializer, WSMInputSerializer, TopsisInputSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Criteria, Company
from rest_framework.response import Response
from .utils.main import calculate_wsm, calculate_topsis, calculate_ahp, calculate_promethee

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CriteriaListView(generics.ListAPIView):
    serializer_class = CriteriaSerializer
    permission_classes = [IsAuthenticated] # Remove if you want to make it public

    def get_queryset(self):
        return Criteria.objects.all()

class CompanyListView(generics.ListCreateAPIView):
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated] # Remove if you want to make it public

    def get_queryset(self):
        return Company.objects.all()
    
class AHPValuesView(generics.GenericAPIView):
    serializer_class = AHPInputSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        results = calculate_ahp(data)
        return Response(results, status=status.HTTP_200_OK)

class PrometheeValuesView(generics.GenericAPIView):
    serializer_class = PrometheeInputSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        results = calculate_promethee(data)
        return Response(results, status=status.HTTP_200_OK)
    
class WSMValuesView(generics.GenericAPIView):
    serializer_class = WSMInputSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        results = calculate_wsm(data)
        return Response(results, status=status.HTTP_200_OK)
    
class TopsisValuesView(generics.GenericAPIView):
    serializer_class = TopsisInputSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        results = calculate_topsis(data)
        return Response(results, status=status.HTTP_200_OK)