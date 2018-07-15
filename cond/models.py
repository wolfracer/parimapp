from django.db import models
from django.contrib.auth.models import AbstractUser
# from django.contrib.auth import get_user_model donde se use user, se obtiene con get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
# Se crea el modelo, despues se corre el comando python manage.py makemigratios "nombre del app"
# por ultimo, python manage.py migrate


class Apartment (models.Model):
    TORRES_CHOICES = (
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
        (6, '6'),
    )
    PISO_CHOICES = (
        (0, 'PB'),
        (1, '1'),
        (2, '2'),
        (3, '3'),
    )
    APTO_CHOICES = (
        ('a', 'A'),
        ('b', 'B'),
        ('c', 'C'),
        ('d', 'D'),

    )
    apto = models.CharField(max_length=1, choices=APTO_CHOICES, default='a')
    torres = models.CharField(max_length=1, choices=TORRES_CHOICES, default=1)
    piso = models.CharField(max_length=1, choices=PISO_CHOICES, default=0)
    deuda = models.BigIntegerField(default=0)

    def __str__(self):
        full_apto = self.torres + '-' + self.piso + '-' + self.apto
        return full_apto

class User  (AbstractUser):
    """username = models.CharField(max_length=12, unique=True)
    password = models.CharField()
    nombres = models.CharField(max_length=30)
    apellidos = models.CharField(max_length=30)
    email = models.EmailField()"""
    cedula = models.IntegerField()
    telefono = models.CharField(max_length=20)
    # user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    # modelo base user de django, tiene nombres correo etc
    apartament = models.ForeignKey(Apartment, on_delete=models.CASCADE)
    fecha_nacimiento = models.DateField(blank=True, null=True)


"""@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        User.apartament.save()"""


"""@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.user.save()"""
