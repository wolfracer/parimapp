from django.contrib import admin

from .models import Apartment, User, Recibo, Arduino, Luces, Tanque, Riego, RiegoParam

admin.site.register(Apartment)
admin.site.register(User)
admin.site.register(Recibo)
admin.site.register(Arduino)
admin.site.register(Luces)
admin.site.register(Tanque)
admin.site.register(RiegoParam)
admin.site.register(Riego)


# Register your models here.
