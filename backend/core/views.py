# from rest_framework import viewsets, permissions
# from .models import Fort, Event, Article, Volunteer
# from .serializers import FortSerializer, EventSerializer, ArticleSerializer, VolunteerSerializer

# class FortViewSet(viewsets.ModelViewSet):
#     queryset = Fort.objects.all().order_by('name')
#     serializer_class = FortSerializer
#     permission_classes = [permissions.AllowAny]

# class EventViewSet(viewsets.ModelViewSet):
#     queryset = Event.objects.select_related('fort').all().order_by('-date')
#     serializer_class = EventSerializer
#     permission_classes = [permissions.AllowAny]

# class ArticleViewSet(viewsets.ModelViewSet):
#     queryset = Article.objects.all().order_by('-created_at')
#     serializer_class = ArticleSerializer
#     permission_classes = [permissions.AllowAny]

# class VolunteerViewSet(viewsets.ModelViewSet):
#     queryset = Volunteer.objects.all().order_by('-created_at')
#     serializer_class = VolunteerSerializer
#     permission_classes = [permissions.AllowAny]

from rest_framework import viewsets, permissions
from .models import Fort, Event, Article, Volunteer
from .serializers import (
    FortSerializer,
    EventSerializer,
    ArticleSerializer,
    VolunteerSerializer,
    PublicVolunteerSerializer,
)


class FortViewSet(viewsets.ModelViewSet):
    queryset = Fort.objects.prefetch_related("images").all().order_by("name")
    serializer_class = FortSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.select_related("fort").all().order_by("-date")
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by("-created_at")
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# Volunteer View – public listing vs admin
class VolunteerViewSet(viewsets.ModelViewSet):
    queryset = Volunteer.objects.all().order_by("-created_at")
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        # Show full details to admins, limited to public
        if self.request and self.request.user.is_staff:
            return VolunteerSerializer
        return PublicVolunteerSerializer
