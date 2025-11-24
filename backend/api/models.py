from django.db import models

class Alumni(models.Model):
    name = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    year_of_passing = models.IntegerField()
    location = models.CharField(max_length=100)
    profile_pic = models.ImageField(upload_to='alumni_pics/', blank=True, null=True)
    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Achievement(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    alumni = models.ForeignKey(Alumni, on_delete=models.CASCADE, related_name='achievements')
    date_posted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.alumni.name}"

class Event(models.Model):
    title = models.CharField(max_length=200)
    location = models.CharField(max_length=100)
    date = models.DateField()
    banner = models.ImageField(upload_to='event_banners/', blank=True, null=True)

    def __str__(self):
        return self.title