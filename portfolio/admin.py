from django.urls import path, reverse
from django.utils.html import format_html
from django.shortcuts import get_object_or_404
from django.template.response import TemplateResponse
from django.contrib import admin
from .models import ContactMessage

class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'message', 'view_message_link')

    def view_message_link(self, obj):
        return format_html('<a href="{}">View</a>', reverse('view_contactmessage', args=[obj.pk]))

    view_message_link.short_description = 'View Message'

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('<int:pk>/view/', self.admin_site.admin_view(self.view_contact_message), name='view_contactmessage'),
        ]
        return custom_urls + urls

    def view_contact_message(self, request, pk):
        obj = get_object_or_404(ContactMessage, pk=pk)
        context = dict(
            self.admin_site.each_context(request),
            obj=obj,
        )
        return TemplateResponse(request, "admin/contact_message_view.html", context)

admin.site.register(ContactMessage, ContactMessageAdmin)
