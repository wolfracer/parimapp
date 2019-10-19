from django.apps import AppConfig


class CondConfig(AppConfig):
    name = 'cond'

    # funcion que ejecuta lo declarado justo al inicio de la aplicacion.

    def ready(self):
	    from cond import scheduler
	    scheduler.start()
