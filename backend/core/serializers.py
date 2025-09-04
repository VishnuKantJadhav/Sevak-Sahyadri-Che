# from rest_framework import serializers
# from .models import Fort, Event, Article, Volunteer

# class FortSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Fort
#         fields = '__all__'

# class EventSerializer(serializers.ModelSerializer):
#     fort_name = serializers.ReadOnlyField(source='fort.name')
#     class Meta:
#         model = Event
#         fields = '__all__'

# class ArticleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Article
#         fields = '__all__'

# class VolunteerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Volunteer
#         fields = '__all__'

from rest_framework import serializers
from .models import Fort, FortImage, Event, Article, Volunteer


# Fort Image Serializer
class FortImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FortImage
        fields = ["id", "image", "caption"]


# Fort Serializer with nested images
class FortSerializer(serializers.ModelSerializer):
    images = FortImageSerializer(many=True, read_only=True)

    class Meta:
        model = Fort
        fields = "__all__"


# Event Serializer with fort name + slug
class EventSerializer(serializers.ModelSerializer):
    fort_name = serializers.ReadOnlyField(source="fort.name")
    fort_slug = serializers.ReadOnlyField(source="fort.slug")

    class Meta:
        model = Event
        fields = "__all__"


# Article Serializer
class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = "__all__"


# Volunteer Serializer (Full – for admins or private use)
class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = "__all__"


# Public Volunteer Serializer (without personal info)
class PublicVolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = ["id", "name", "interests", "availability", "created_at"]
