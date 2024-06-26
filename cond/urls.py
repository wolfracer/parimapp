# cond/urls.py
from django.urls import path

from . import views

urlpatterns = [
	path('ajax/<str:id>/', views.control_luces, name='lucesajax'),
	path('signup/', views.SignUp.as_view(), name='signup'),
	path('edit/', views.edit_profile, name='edit'),
	path('profile/', views.view_profile, name='profile'),
	path('prueba/', views.prueba, name='prueba'),
	path('data/', views.data, name='data'),
	path('loop/', views.arduino_test, name='loop'),
	path('recibo/pdf/', views.pdf_view, name='pdf'),
	path('recibo/', views.recibo, name='recibo'),
	path('log/', views.log, name='log'),
	path('light/', views.luces, name='luces'),
	path('histotank/', views.cuadro, name='historico_tanque'),  # TODO: agregar al menu base
	path('tankchart/', views.ChartData.as_view(), name='chart_data'),
	path('test/', views.test, name='test'),
	path('portonview/', views.portonview, name='porton_view'),
	path('portonview/open/', views.porton, name='porton'),
	path('vigilancia/', views.vigilancia, name='vigilancia'),
	path('riego/', views.riego, name='riego'),
	path('riego/param/', views.riegoparam, name='riego_param'),
	path('bombillo/data/', views.BombillosView.as_view(), name='bombillo-data'),
	path('bombillo/', views.bombillo, name='bombillo')

]
