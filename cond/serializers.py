from rest_framework import serializers

from cond.models import Tanque, Bombillo


class TanqueSerializer(serializers.ModelSerializer):
	class Meta:
		model = Tanque
		fields = ['time', 'volumen']


class BombilloSerializer(serializers.ModelSerializer):
	class Meta:
		model = Bombillo
		fields = ['categoria', 'status']
