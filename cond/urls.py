# cond/urls.py
from django.urls import path

from . import views

urlpatterns = [
	path('signup/', views.SignUp.as_view(), name='signup'),
	path('edit/', views.edit_profile, name='edit'),
	path('profile/', views.view_profile, name='profile'),
	path('prueba/', views.prueba, name='prueba'),
	path('data/', views.data, name='data'),
	path('loop/', views.arduino_test, name='loop'),
	path('recibo/pdf/', views.pdf_view, name='pdf'),
	path('recibo/', views.recibo, name='recibo'),

]
