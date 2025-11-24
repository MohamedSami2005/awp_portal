from django.contrib import admin
from .models import Alumni, Achievement, Event

# This makes the tables visible in the Admin Panel
admin.site.register(Alumni)
admin.site.register(Achievement)
admin.site.register(Event)