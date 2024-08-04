from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('load-more-portfolio-items/', views.load_more_portfolio_items, name='load_more_portfolio_items'),
    path('contact/', views.contact, name='contact'),
    path('admin/portfolio/contactmessage/<int:pk>/view/', views.view_contact_message, name='view_contactmessage'),
    
]
