import os
from .serializers import MyTokenObtainPairSerializer,GallerySerializer,UserSerializer,ProfileSerializer
from .models import Gallery,Profile
from django.contrib.auth.models import User

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
    user = User.objects.create_user(
                username=request.data['username'],
                email=request.data['email'],
                password=request.data['password'],
                first_name = request.data['first_name'],
                last_name = request.data['last_name']
                )
    user.is_active = True
    user.is_staff = True
    user.save()
    return Response(status=status.HTTP_201_CREATED)


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
    
@permission_classes([IsAuthenticated])
class MyProfileView(APIView):
    def get(self,request,user_id):
        try:
            myModel = Profile.objects.get(user_id=user_id)
        except Profile.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serailizer = ProfileSerializer(myModel,many=False)
        return Response(serailizer.data)
    
    def post(self,request):
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        

    def put(self, request, user_id):
        my_model = Profile.objects.get(user_id=user_id)
        serializer = ProfileSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)