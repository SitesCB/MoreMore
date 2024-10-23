from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import *

urlpatterns = [
    path('', index, name="index"),
    path('about/', about, name='about'),
    path('delivery/', delivery, name='delivery'),
    path('contacts/', contacts, name='contacts'),
    path('cart/', cart, name='cart'),
    path('cart/payment/', payment, name='payment'),
    path('privacy', privacy, name='privacy'),
    path('items/<str:category>/<slug:name>', detail_page),
    path('items/<slug:category>', category_page),
    path('search/', search_page, name='search'),
    path('api/items/<slug:name>/<str:size>', get_price_weight),
    path('api/items/<str:name>', get_item),
    path('api/contacts/', new_contact, name='new_contact'),
    path('api/cart/addnew/<str:cart>', newcart), # собирает корзину
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)