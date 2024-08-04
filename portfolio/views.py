from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from .models import PortfolioItem, ContactMessage
from .forms import ContactForm

def index(request):
    return render(request, 'portfolio/index.html')

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'Your message has been sent successfully!'})
        else:
            return JsonResponse({'message': 'There was an error sending your message.'})
    else:
        form = ContactForm()
    return render(request, 'portfolio/contact.html', {'form': form})

def load_more_portfolio_items(request):
    items = PortfolioItem.objects.all().values()
    return JsonResponse({'items': list(items)})

def view_contact_message(request, pk):
    obj = get_object_or_404(ContactMessage, pk=pk)
    context = {'obj': obj}
    return render(request, 'contact_message_view.html', context)