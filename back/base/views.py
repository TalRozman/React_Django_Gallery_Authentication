import os
from .serializers import MyTokenObtainPairSerializer,GallerySerializer,UserSerializer
from .models import Gallery
from django.contrib.auth.models import User

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login ,logout
from django.contrib.auth.hashers import make_password

from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated

# Create your views here.
@api_view(["GET"])
def index(req):
    return Response("INDX")

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@permission_classes([IsAuthenticated])
class MygalleryView(APIView):
    def get(self,request):
        usr = request.user
        my_model = usr.gallery_set.all()
        serializer = GallerySerializer(my_model,many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = GallerySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def put(self, request, id):
        my_model = Gallery.objects.get(id=int(id))
        serializer = GallerySerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def delete(self, request, id):
        try:
            my_model = Gallery.objects.get(id=int(id))
        except Gallery.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if my_model.image:
            if os.path.isfile(my_model.image.path):
                os.remove(my_model.image.path)
                my_model.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                my_model.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            
@api_view(["POST"])
def register(request):
    form = UserCreationForm(request.data)
    if form.is_valid():
        form.save()
        username = form.cleaned_data['username']
        password = form.cleaned_data['password1']
        user = authenticate(username=username, password=password)
        login(request, user)
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(form.errors,status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
class MyUsersView(APIView):
    def get(self, request,pk):
        try:
            my_model = User.objects.get(pk=pk)
            serializer = UserSerializer(my_model, many=False)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
   
    def put(self, request, pk):
        my_model = User.objects.get(pk=pk)
        serializer = UserSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def delete(self, request, pk):
        usr = request.user
        my_model = usr.User_set.get(pk=pk)
        my_model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)