from django.contrib import admin
from .models import Fort, Event, Article, Volunteer

@admin.register(Fort)
class FortAdmin(admin.ModelAdmin):
    list_display = ("name", "district", "status")
    search_fields = ("name", "district")

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "fort", "date", "status")
    list_filter = ("status", "fort")

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at", "author")
    search_fields = ("title", "author")

@admin.register(Volunteer)
class VolunteerAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "created_at")
    search_fields = ("name", "email")
