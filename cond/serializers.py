from rest_framework import serializers

from cond.models import Tanque


class TanqueSerializer(serializers.ModelSerializer):
	class Meta:
		model = Tanque
		fields = ['time', 'volumen']
