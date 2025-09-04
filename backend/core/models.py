from django.db import models
from django.utils.text import slugify
from multiselectfield import MultiSelectField
from django.utils import timezone


class Fort(models.Model):
    class Status(models.TextChoices):
        CLEAN = "clean", "Clean"
        NEEDS_CLEANING = "needs_cleaning", "Needs Cleaning"
        UNDER_RENOVATION = "under_renovation", "Under Renovation"

    status = MultiSelectField(choices=Status.choices, max_length=200)

    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=160, unique=True, blank=True)
    district = models.CharField(max_length=120, blank=True)
    location = models.CharField(
        max_length=255, blank=True, help_text="Village/area or short location text"
    )
    description = models.TextField(blank=True)
    main_image = models.ImageField(upload_to="forts/main/", blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Fort"
        verbose_name_plural = "Forts"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class FortImage(models.Model):
    fort = models.ForeignKey(Fort, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="forts/gallery/")
    caption = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.fort.name} - {self.caption or 'Image'}"


class Event(models.Model):
    class Status(models.TextChoices):
        UPCOMING = "upcoming", "Upcoming"
        COMPLETED = "completed", "Completed"
        CANCELLED = "cancelled", "Cancelled"

    fort = models.ForeignKey("Fort", on_delete=models.CASCADE, related_name="events")
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    description = models.TextField(blank=True)
    date = models.DateField()
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.UPCOMING
    )
    banner_image = models.ImageField(upload_to="events/banners/", blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)  # instead of auto_now_add
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-date"]
        verbose_name = "Event"
        verbose_name_plural = "Events"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} @ {self.fort.name}"


class Article(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    content = models.TextField()
    author = models.CharField(max_length=120, blank=True, default="Team Fort Seva")
    main_image = models.ImageField(upload_to="articles/", blank=True, null=True)
    is_published = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Article"
        verbose_name_plural = "Articles"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Volunteer(models.Model):
    class InterestChoices(models.TextChoices):
        CLEANING = "cleaning", "Fort Cleaning"
        RENOVATION = "renovation", "Renovation & Maintenance"
        HERITAGE = "heritage", "Heritage Awareness"
        EVENT = "event", "Event Management"
        OTHER = "other", "Other"

    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    message = models.TextField(blank=True)

    interests = models.CharField(
        max_length=50,
        choices=InterestChoices.choices,
        default=InterestChoices.CLEANING,
        help_text="Area volunteer is most interested in",
    )
    availability = models.CharField(
        max_length=120, blank=True, help_text="e.g. Weekends, Weekdays, Evenings"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Volunteer"
        verbose_name_plural = "Volunteers"

    def __str__(self):
        return f"{self.name} ({self.email})"
