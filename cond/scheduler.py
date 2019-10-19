import random

from apscheduler.schedulers.background import BackgroundScheduler

from cond.models import Tanque


def start():
	scheduler = BackgroundScheduler()
	scheduler.add_job(update_water_level, 'interval', minutes=30)
	scheduler.start()


def update_water_level():
	rand = random.randint(10000, 50000)
	nivel = Tanque(volumen=rand)
	nivel.save()
