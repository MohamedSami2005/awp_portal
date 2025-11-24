from rest_framework import serializers
from .models import Alumni, Achievement, Event

class AlumniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumni
        fields = '__all__'

class AchievementSerializer(serializers.ModelSerializer):
    alumni_name = serializers.CharField(source='alumni.name', read_only=True)

    class Meta:
        model = Achievement
        fields = ['id', 'title', 'description', 'alumni', 'alumni_name', 'date_posted']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'