# Generated by Django 5.2 on 2025-04-16 07:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0001_initial'),
        ('income', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='income',
            name='category',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='categories.category'),
        ),
    ]
