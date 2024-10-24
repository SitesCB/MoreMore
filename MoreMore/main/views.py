from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .models import *
import json

def index(request):

    categories = CategoryModel.objects.all()
    items = ItemModel.objects.filter(is_action=False)
    items_action = ItemModel.objects.filter(is_action=True)
    popular_items = ItemModel.objects.all().order_by('bought')
    context = {
        'categories': categories,
        'items': items[:8],
        'items_act': items_action[:8],
        'popular_items': popular_items[:12]
    }
    return render(request, 'main/index.html', context=context)

def about(request):
    categories = CategoryModel.objects.all()
    context = {
        'categories': categories
    }
    return render(request, 'main/about.html', context=context)

def delivery(request):
    categories = CategoryModel.objects.all()
    context = {
        'categories': categories
    }
    return render(request, 'main/delivery.html', context=context)

def contacts(request):
    categories = CategoryModel.objects.all()
    context = {
        'categories': categories
    }
    return render(request, 'main/contacts.html', context=context)

def cart(request):
    print(request.GET)
    categories = CategoryModel.objects.all()
    context = {
        'categories': categories
    }
    return render(request, 'main/cart.html', context=context)

def privacy(request):
    categories = CategoryModel.objects.all()
    context = {
        'categories': categories
    }
    return render(request, 'main/privacy.html', context=context)

def detail_page(request, category, name):
    items = ItemModel.objects.filter(slug=name)[0]
    categories = CategoryModel.objects.all()

    context = {
        'item': items,
        'categories': categories
    }
    return render(request, 'main/item.html', context=context)

def get_price_weight(request, name, size):
    ''' Получение цены за вес определенного товара '''
    item = ItemModel.objects.get(slug=name)
    price = WeightItem.objects.filter(for_item=item.id, size=size)[0].price

    result = {
        'price': price,
    }
    return JsonResponse(result)

def get_item(request, name):
    current_item = ItemModel.objects.get(name=name)
    category_slug = current_item.category.slug
    item_info = {}
    for key, value in current_item.__dict__.items():
        if '_' not in key:
            item_info[key] = value
    context = {
        'item': item_info,
        'link': f'/items/{category_slug}/{item_info.get("slug")}'
    }
    return JsonResponse(context)

def category_page(request, category):
    categories = CategoryModel.objects.all()
    current_category = CategoryModel.objects.get(slug=category)
    under_categories = UnderCategoryModel.objects.filter(cat=current_category.id)
    items = ItemModel.objects.filter(category=current_category.id)
    context = {
        'items': items,
        'current_category': current_category,
        'categories': categories,
        'undercats': under_categories
    }
    return render(request, 'main/category.html', context=context)

def search_page(request):
    data = request.GET
    query = data['search']

    items = ItemModel.objects.all()
    result_items = []

    for item in items:
        for part in query.split():
            if part.lower() in item.name.lower():
                result_items.append(item)
                break

    context = {
        'query': query,
        'items': result_items
    }

    return render(request, 'main/search.html', context=context)

def new_contact(request, *args):
    name = request.POST.get('name')
    phone = request.POST.get('phone')
    message = request.POST.get('message')

    try:
        contact = ContactsModel(
            name=name,
            phone=phone,
            message=message
        )

        contact.save()

    except Exception as ex:
        return JsonResponse({'status': 404})

    return redirect('/?send=true')

def payment(request):
    data = request.POST
    type_payment = data.get('payment-type')

    if type_payment == 'before-payment':
        url = '../?payment=true&'
        for key, value in data.items():
            print(key, value)
            url += f'{key}={value}&'

        return redirect(url)

    print(data)
    context = {
        'name': data['name'],
        'phone': data['phone'],
        'city': data['city'],
        'location': data['location'],
    }
    return render(request, 'main/payment.html', context=context)

def newcart(request, cart):
    print('cart', cart)
    print('ПОСТ', request.GET)
    data = request.GET

    new_item = CartPayModel(
        name=data.get('name'),
        phone=data.get('phone'),
        city=data.get('city'),
        address=data.get('location'),
        payment_type="После получения",
        cart=cart
    )

    new_item.save()

    return HttpResponse(f'{json.loads(cart)}')
