from django.contrib import admin
from .models import Apartment, User, Recibo, Arduino, Luces

admin.site.register(Apartment)
admin.site.register(User)
admin.site.register(Recibo)
admin.site.register(Arduino)
admin.site.register(Luces)

# Register your models here.
