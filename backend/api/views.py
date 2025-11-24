from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Alumni, Achievement, Event
from .serializers import AlumniSerializer, AchievementSerializer, EventSerializer

# === AUTHENTICATION ===
@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    
    if user is not None and user.is_superuser:
        refresh = RefreshToken.for_user(user)
        return Response({
            'success': True,
            'token': str(refresh.access_token)
        })
    return Response({'success': False, 'message': 'Invalid credentials'})

# === PUBLIC ENDPOINTS ===
@api_view(['POST'])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser])
def register_alumni(request):
    serializer = AlumniSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(is_approved=False)
        return Response({"message": "Registration successful!"})
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_alumni_list(request):
    alumni = Alumni.objects.filter(is_approved=True)
    if 'department' in request.GET:
        alumni = alumni.filter(department__icontains=request.GET['department'])
    if 'year_of_passing' in request.GET:
        alumni = alumni.filter(year_of_passing=request.GET['year_of_passing'])
    if 'location' in request.GET:
        alumni = alumni.filter(location__icontains=request.GET['location'])
    if 'search' in request.GET:
        alumni = alumni.filter(name__icontains=request.GET['search'])
    serializer = AlumniSerializer(alumni, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_achievements(request):
    achievements = Achievement.objects.all().order_by('-date_posted')
    serializer = AchievementSerializer(achievements, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_events(request):
    events = Event.objects.all().order_by('date')
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)

# === ADMIN ENDPOINTS ===
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_pending_alumni(request):
    pending = Alumni.objects.filter(is_approved=False)
    serializer = AlumniSerializer(pending, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def approve_alumni(request, id):
    try:
        alum = Alumni.objects.get(id=id)
        alum.is_approved = True
        alum.save()
        return Response({'success': True})
    except Alumni.DoesNotExist:
        return Response({'success': False}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reject_alumni(request, id):
    try:
        alum = Alumni.objects.get(id=id)
        alum.delete()
        return Response({'success': True})
    except Alumni.DoesNotExist:
        return Response({'success': False}, status=404)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_achievement(request, id):
    try:
        ach = Achievement.objects.get(id=id)
        ach.delete()
        return Response({'success': True})
    except Achievement.DoesNotExist:
        return Response({'success': False}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_admin_stats(request):
    return Response({
        'totalAlumni': Alumni.objects.filter(is_approved=True).count(),
        'pendingApprovals': Alumni.objects.filter(is_approved=False).count(),
        'totalAchievements': Achievement.objects.count(),
        'totalEvents': Event.objects.count(),
    })
#

@api_view(['POST'])
@permission_classes([IsAuthenticated]) # Only admins can add events
@parser_classes([MultiPartParser, FormParser]) # Required for Image Uploads
def create_event(request):
    serializer = EventSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_event(request, id):
    try:
        event = Event.objects.get(id=id)
        event.delete()
        return Response({'success': True})
    except Event.DoesNotExist:
        return Response({'success': False}, status=404)
   
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_achievement(request):
    serializer = AchievementSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
# ... inside backend/api/views.py

@api_view(['GET'])
@permission_classes([AllowAny])
def get_alumni_detail(request, id):
    try:
        alum = Alumni.objects.get(id=id, is_approved=True)
        serializer = AlumniSerializer(alum)
        return Response(serializer.data)
    except Alumni.DoesNotExist:
        return Response({'error': 'Alumni not found'}, status=404)