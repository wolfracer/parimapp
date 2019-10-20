# from django.shortcuts import render

import json
import time

import serial
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse, JsonResponse
# from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.urls import reverse_lazy, reverse
from django.views import generic
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework import serializers

# Create your views here.
# accounts/views.py
from cond.forms import CustomUserCreationForm, CustomUserChangeForm
# from .tasks import leer_arduino
from cond.fusioncharts import FusionCharts
from cond.models import User, Arduino, Recibo, Luces, Tanque


def data(request):
	arduino = serial.Serial('COM6', 9600)
	time.sleep(2)

	lectura_arduino = float(arduino.readline().strip()) * 1000
	value = Arduino.objects.get(pk=1)

	value.cadena = lectura_arduino
	value.save()
	arduino.close()
	response = "&value=" + str(value.cadena)
	return HttpResponse(response)

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
	return (render(request, 'historial.html'))


def control_luces(request, id):
	resp = Luces.objects.get(pk=1)
	switch = get_switch(id)
	light = getattr(resp, switch)

	if light:
		setattr(resp, switch, False)
		flag = False
	else:
		setattr(resp, switch, True)
		flag = True
	resp.save()

	return HttpResponse(flag)


switch_dict = {
	1: 'parque',
	2: 'mesas',
	3: 'estacionaminto1',
	4: 'estacionamiento2',

}


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
				"dataStreamUrl": "http://localhost:8000/accounts/data/",
				"refreshInterval": "5",
				"refreshInstantly": "2",
				"cylFillColor": "#5188df"
			},
			"value": "23"
		},
	)

	return render(request, 'arduino.html',
	              {'output': column2d.render()})


class TanqueSerializer(serializers.ModelSerializer):
	class Meta:
		model = Tanque
		fields = ['time', 'volumen']



class ChartData(generics.ListAPIView):
	authentication_classes = ()
	permission_classes = ()
	queryset = Tanque.objects.order_by('-time')[:8]
	serializer_class = TanqueSerializer


@csrf_exempt  # para evitar el eror 403 forbiden que pide token csrf en POST request.
def test(request):
	b = json.loads(request.body)
	a = request.body.decode('utf8')

	return JsonResponse(b)
# tank = Tanque.objects.all()

# return HttpResponse(json.dumps([[str(i.time.strftime("%d-%b-%y %H:%M")), i.volumen] for i in tank]))
