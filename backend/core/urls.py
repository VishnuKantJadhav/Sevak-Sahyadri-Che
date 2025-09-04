# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import FortViewSet, EventViewSet, ArticleViewSet, VolunteerViewSet
# from django.conf import settings
# from django.conf.urls.static import static

# router = DefaultRouter()
# router.register(r"forts", FortViewSet)
# router.register(r"events", EventViewSet)
# router.register(r"articles", ArticleViewSet)
# router.register(r"volunteers", VolunteerViewSet)

# urlpatterns = [
#     path("", include(router.urls)),
# ]
# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FortViewSet, EventViewSet, ArticleViewSet, VolunteerViewSet
from django.conf import settings
from django.conf.urls.static import static

# Router for API ViewSets
router = DefaultRouter()
router.register(r"forts", FortViewSet, basename="fort")
router.register(r"events", EventViewSet, basename="event")
router.register(r"articles", ArticleViewSet, basename="article")
router.register(r"volunteers", VolunteerViewSet, basename="volunteer")

urlpatterns = [
    path("", include(router.urls)),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
