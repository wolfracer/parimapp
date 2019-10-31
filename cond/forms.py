from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.forms import ModelForm

from cond.models import User


class CustomUserCreationForm(UserCreationForm):
	class Meta(UserCreationForm.Meta):
		model = User
		fields = UserCreationForm.Meta.fields + (
			'cedula', 'email', 'first_name', 'last_name', 'apartament')

		"""widgets = {'fecha_nacimiento': DatePicker(options={
			"format": "mm/dd/yyyy",
			"autoclose": True
		}
		)
		}"""

		"""widgets = {
            'apartment': forms.NumberInput
        }"""


class CustomUserChangeForm(UserChangeForm):
	class Meta:
		model = User
		fields = (
			'first_name',
			'last_name',
			'email',
			'apartament',
			'fecha_nacimiento',
			'telefono',
			'cedula',
			'password',

		)
		widgets = {
			'password': forms.HiddenInput,
		}


class EditProfileForm(ModelForm):
	model = User
	fields = [
		'first_name',
		'last_name',
		'email',
		'fecha_nacimiento',
		'telefono',
		'cedula',
	]
