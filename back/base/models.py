from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Gallery(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=100)
    image = models.ImageField(null=True, blank=True, default="holder.jpeg")
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.title
