# cond/urls.py
from django.urls import path

from . import views


urlpatterns = [
    path('signup/', views.SignUp.as_view(), name='signup'),
    path('edit/', views.edit_profile, name='edit'),
    path('profile/', views.view_profile, name='profile'),

]
