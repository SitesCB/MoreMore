from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import *

def index(request):

    categories = CategoryModel.objects.all()
    items = ItemModel.objects.all()
    context = {
        'categories': categories,
        'items': items
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

def detail_page(request, category, name):
    item = ItemModel.objects.filter(slug=name)[0]
    weights = item.get_all_weights()
    context = {
        'item': item,
        'weights': weights
    }
    return render(request, 'main/item.html', context=context)

def get_price_weight(request, name, size):
    ''' Получение цены за вес определенного товара '''
    item = ItemModel.objects.get(slug=name)

    price = WeightItem.objects.filter(for_item=item.id, size=size)[0].price
    print(price)
    result = {
        'price': price
    }
    return JsonResponse(result)