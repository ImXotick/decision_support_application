# Generated by Django 5.1.4 on 2025-01-01 20:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_rename_name_result_method'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Result',
        ),
    ]