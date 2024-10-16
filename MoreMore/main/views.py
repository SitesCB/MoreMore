from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'main/index.html')

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