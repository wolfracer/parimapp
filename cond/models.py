from django.contrib.auth.models import AbstractUser
from django.db import models
# from django.contrib.auth import get_user_model donde se use user, se obtiene con get_user_model



# Create your models here.
# Se crea el modelo, despues se corre el comando python manage.py makemigrations "nombre del app"
# por ultimo, python manage.py migrate
# Registrar en admin.py cada modelo


class Apartment(models.Model):
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


class User(AbstractUser):
	"""username = models.CharField(max_length=12, unique=True)
    password = models.CharField()
    nombres = models.CharField(max_length=30)
    apellidos = models.CharField(max_length=30)
    email = models.EmailField()"""
	cedula = models.IntegerField(null=True)
	telefono = models.CharField(max_length=20, null=True, blank=True)
	# user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
	# modelo base user de django, tiene nombres correo etc
	apartament = models.ForeignKey(Apartment, on_delete=models.CASCADE, null=True)
	fecha_nacimiento = models.DateField(blank=True, null=True)


class Recibo(models.Model):
	recibourl = models.FilePathField(path='cond/static/cond/recibos')
	user = models.ForeignKey(User, on_delete=models.CASCADE)

	def __str__(self):
		return self.recibourl


class Luces(models.Model):
	parque = models.BooleanField()
	mesas = models.BooleanField()
	estacionamiento1 = models.BooleanField()
	estacionamiento2 = models.BooleanField()

	# responsable = models.ForeignKey(User, on_delete=models.PROTECT, default=1)
	# date = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return "Parque: {0} Mesas: {1} Parking1: {2} Parking2: {3}".format(str(self.parque), str(self.mesas),
		                                                                   str(self.estacionamiento1),
		                                                                   str(self.estacionamiento2))


class RegUser(models.Model):
	date = models.DateTimeField(auto_now_add=True)
	user = models.ForeignKey(User, on_delete=models.PROTECT)
	luz = models.ForeignKey(Luces, on_delete=models.PROTECT)


class Tanque(models.Model):
	volumen = models.IntegerField()
	time = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		# formatear el objeto datetime con la funcion strftime
		tankname = '[' + str(self.volumen) + ', ' + str(self.time.strftime("%d-%b-%y %H:%M")) + ']'
		return tankname

	def formated_time(self):
		return str(self.time.strftime("%d-%b-%y %H:%M"))


class Arduino(models.Model):
	cadena = models.CharField(max_length=10)

	def __str__(self):
		return self.cadena


class Porton(models.Model):
	date = models.DateTimeField(auto_now_add=True)
	user = models.ForeignKey(User, on_delete=models.PROTECT)


class Riego(models.Model):
	date = models.DateTimeField(auto_now_add=True)
	user = models.ForeignKey(User, on_delete=models.PROTECT)


class RiegoParam(models.Model):
	start_date = models.DateTimeField()
	end_date = models.DateTimeField()
	water_time = models.IntegerField(blank=True)
	is_active = models.BooleanField(blank=True)


CATEGORIA_CHOICES = (
	('a', 'estacionamiento 1'),
	('b', 'estacionamiento 2'),
	('c', 'parque'),
	('d', 'mesas'),

)


class Bombillo(models.Model):
	categoria = models.CharField(max_length=1, choices=CATEGORIA_CHOICES)
	status = models.BooleanField()
