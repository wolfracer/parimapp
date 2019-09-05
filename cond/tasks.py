from background_task import background
from cond.models import Arduino
import serial
import time


@background(schedule=1)
def leer_arduino():

	arduino = serial.Serial('COM6', 9600)
	time.sleep(2)
	lectura_arduino = float(arduino.readline().strip())*1000
	cad = Arduino.objects.get(pk=1)
	cad.cadena = lectura_arduino
	cad.save()
	arduino.close()
	# leer_arduino(repeat=6)

