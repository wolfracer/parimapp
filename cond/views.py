# from django.shortcuts import render

import datetime
import json
import random
import time

import serial
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
# from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.urls import reverse_lazy, reverse
from django.utils.decorators import method_decorator
from django.views import generic
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics

# Create your views here.
# accounts/views.py
from cond.forms import CustomUserCreationForm, CustomUserChangeForm
# from .tasks import leer_arduino
from cond.fusioncharts import FusionCharts
from cond.models import User, Arduino, Recibo, Luces, Tanque, Porton, RiegoParam
from cond.serializers import TanqueSerializer


@csrf_exempt
def data(request):
	value = Arduino.objects.get(pk=1)
	value.cadena = arduinoread()
	value.save()
	arduino.close()
	response = int(value.cadena)
	return HttpResponse(response)


def arduinoread():
	try:
		arduino = serial.Serial('COM6', 9600)
		time.sleep(2)
		lectura_arduino = float(arduino.readline().strip()) * 1000
	except:
		lectura_arduino = random.randint(1, 50000)

	return lectura_arduino


def writearduino(trigger):
	try:
		arduino = serial.Serial('COM6', 9600)
		time.sleep(2)
		arduino.write(str.encode(trigger))
	except:
		return "Error al escribir al arduino"






# arduino.close()

# response = 1

# return HttpResponse(response)



class SignUp(generic.CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'signup.html'


class EditProfile (LoginRequiredMixin, generic.UpdateView):
    login_url = '/login/'
    model = User
    form_class = CustomUserChangeForm
    success_url = reverse_lazy('profile')
    template_name = 'edit.html'


@login_required
def edit_profile(request):
    if request.method == 'POST':
        form = CustomUserChangeForm(request.POST, instance=request.user)

        if form.is_valid():
            form.save()
            return redirect(reverse('home'))
    else:
        form = CustomUserChangeForm(instance=request.user)
        args = {'form': form}
        return render(request, 'edit.html', args)


@login_required
def view_profile(request, pk=None):
    if pk:
        user = User.objects.get(pk=pk)
    else:
        user = request.user
    args = {'user': user}
    return render(request, 'profile.html', args)


def arduino_test(request):
	# leer_arduino(repeat=5)
	cad = Arduino.objects.get(pk=1)

	return HttpResponse(cad.cadena)


@login_required
def recibo(request):
	item = Recibo.objects.get(user=request.user)
	args = {'item': item}
	return (render(request, 'recibo.html', args))


def luces(request):
	return (render(request, 'luces.html'))


def cuadro(request):
	water_flow = water_supply()
	tank = Tanque.objects.all()

	args = {'water': water_flow, 'tank': tank}
	return (render(request, 'historial.html', args))


def control_luces(request, id):
	resp = Luces.objects.get(pk=1)
	switch = get_led(id)
	light = getattr(resp, switch)

	if light:
		setattr(resp, switch, False)
		flag = id + 'OFF'
	else:
		setattr(resp, switch, True)
		flag = id + 'ON'
	resp.save()
	writearduino(flag)

	return HttpResponse(flag)


led_dict = {
	'LED1': 'parque',
	'LED2': 'mesas',
	'LED3': 'estacionamiento1',
	'LED4': 'estacionamiento2',

}
switch_dict = {
	1: 'parque',
	2: 'mesas',
	3: 'estacionaminto1',
	4: 'estacionamiento2',

}


def get_led(id):
	return led_dict[id]


def get_switch(id):
	return switch_dict[id]



def log(request):
	return (render(request, 'login.html'))


# /TODO: Arreglar la vista del PDF.
def pdf_view(request):
	url = Recibo.objects.get(user=request.user)
	with open(url.recibourl, 'rb') as pdf:
		response = HttpResponse(pdf.read(), content_type='application/pdf')
		response['Content-Disposition'] = 'inline;filename=recibo_test.pdf'
		return response
	pdf.closed



@login_required
def prueba(request):
	treshold = Tanque.objects.last()
	if treshold.volumen < 16666:
		warning = True
	else:
		warning = False

	value = "10000"
	column2d = FusionCharts(
		'cylinder',
		'ex1',
		'600',
		'400',
		'chart-1',
		'json',
		{
			"chart": {
				"caption": "Indicador de Nivel de Agua",
				"lowerlimit": "0",
				"upperlimit": "27000",
				"numbersuffix": "Litros",
				"plottooltext": "Litros: <b>$dataValue</b>",
				"theme": "fusion",
				"refreshInterval": "5",
				"refreshInstantly": "2",
				"cylFillColor": "#5188df"
			},
			"value": value
		},
	)
	val = arduinoread()
	response = {
		'output': column2d.render(),
		'warning': warning,
		'val': val

	}


	return render(request, 'arduino.html', response)





@method_decorator(csrf_exempt, name='dispatch')  # los deecorators deben aplicarse asi para las clases
class ChartData(generics.ListAPIView):
	authentication_classes = ()
	permission_classes = ()
	# queryset = Tanque.objects.order_by('-time')[:8]
	serializer_class = TanqueSerializer

	def get_queryset(self):
		yeison = self.request.query_params.dict()
		start_date = datetime.datetime.strptime(yeison['start'], '%m/%d/%Y')
		end_date = datetime.datetime.strptime(yeison['end'], '%m/%d/%Y')

		queryset = Tanque.objects.filter(time__range=(start_date, end_date))  # [::6]
		return queryset


def water_supply():
	tank = Tanque.objects.order_by('-time')[:2]
	a = tank[0].volumen
	b = tank[1].volumen
	if a >= b:
		return True
	else:
		return False


def porton(request):
	puerta = Porton.objects.create(
		user=request.user
	)

	return render(request, 'porton.html')


def portonview(request):
	return render(request, 'porton.html')


def vigilancia(request):
	return render(request, 'vigilancia.html')


def riego(request):
	param = RiegoParam.objects.first()
	response = {
		'param': param
	}
	return render(request, 'riego.html', response)


@csrf_exempt
def riegoparam(request):
	param = RiegoParam.objects.first()
	jsondata = json.loads(request.body)
	param.start_date = datetime.datetime.strptime(jsondata['start_date'], '%m/%d/%Y')
	param.end_date = datetime.datetime.strptime(jsondata['end_date'], '%m/%d/%Y')
	# param.is_active=jsondata['is_active'] TODO: Json no retorna todos los valores que deberia.
	# param.water_time=jsondata['water_time']
	param.save()
	# riego= Riego.objects.create()
	# riego.user=request.user
	# riego.save()
	# TODO: mandar senal al Arduino.
	return render(request, 'riego.html', response)


@csrf_exempt  # para evitar el eror 403 forbiden que pide token csrf en POST request.
def test(request):
	writearduino()

	return HttpResponse("correto")
	"""# response = json.loads(request.body)
	tank = Tanque.objects.values('time', 'volumen')  # regresa un dict de los fields especificados.
	for x in tank:
		x['time'] = str(x['time'].strftime("%d-%b-%y %H:%M"))

	tanks = list(tank)
	tankss = dict(tanks)
	count = len(tank)
	# data = json.dumps(tank)
	yeison = {
		'draw': 1,
		'recordsTotal': count,
		'recordsFiltered': count,
		'data': tanks,

	}

	# a = request.body.decode('utf8') convertido a string porque viaja como bytes.

	return JsonResponse(yeison)"""
# tank = Tanque.objects.all()

# return HttpResponse(json.dumps([[str(i.time.strftime("%d-%b-%y %H:%M")), i.volumen] for i in tank]))
