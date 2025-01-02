# Generated by Django 5.1.4 on 2024-12-29 02:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='criteria',
            name='added_by',
        ),
        migrations.AddField(
            model_name='company',
            name='criteria',
            field=models.ManyToManyField(related_name='companies', to='api.criteria'),
        ),
    ]
