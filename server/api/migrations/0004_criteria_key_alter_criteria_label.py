# Generated by Django 5.1.4 on 2024-12-31 03:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_title_criteria_label'),
    ]

    operations = [
        migrations.AddField(
            model_name='criteria',
            name='key',
            field=models.CharField(default='default_value', max_length=100),
        ),
        migrations.AlterField(
            model_name='criteria',
            name='label',
            field=models.CharField(max_length=255),
        ),
    ]