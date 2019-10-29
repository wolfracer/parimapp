# Generated by Django 2.1.2 on 2019-10-25 05:30

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
	dependencies = [
		('cond', '0013_tanque'),
	]

	operations = [
		migrations.CreateModel(
			name='Porton',
			fields=[
				('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
				('date', models.DateTimeField(auto_now_add=True)),
				('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
			],
		),
		migrations.CreateModel(
			name='RegUser',
			fields=[
				('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
				('date', models.DateTimeField(auto_now_add=True)),
				('luz', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='cond.Luces')),
				('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
			],
		),
	]
