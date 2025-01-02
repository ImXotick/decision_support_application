from django.db import models
from django.contrib.auth.models import User

class Criteria(models.Model):
    id = models.AutoField(primary_key=True)
    label = models.CharField(max_length=255)
    key = models.CharField(max_length=100, default='default_value')
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.label

class Company(models.Model):
    id = models.AutoField(primary_key=True)
    label = models.CharField(max_length=100)
    revenue = models.FloatField()
    revenue_percentage_change = models.FloatField()
    profits = models.FloatField()
    profits_percentage_change = models.FloatField()
    assets = models.FloatField()
    employees = models.IntegerField()
    change_in_rank = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    criteria = models.ManyToManyField(Criteria,  related_name="companies")
    
    def __str__(self):
        return self.label