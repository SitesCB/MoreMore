from django.shortcuts import render
from django.http import HttpResponse
from .models import *

def index(request):

    categories = CategoryModel.objects.all()
    context = {
        'categories': categories
    }
    return render(request, 'main/index.html', context=context)

def about(request):
    return render(request, 'main/about.html')

def delivery(request):
    return render(request, 'main/delivery.html')

def contacts(request):
    return render(request, 'main/contacts.html')

def cart(request):
    return render(request, 'main/cart.html')

def privacy(request):
    return render(request, 'main/privacy.html')