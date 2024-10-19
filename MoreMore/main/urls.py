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
    path('privacy', privacy, name='privacy'),
    path('items/<str:category>/<slug:name>', detail_page),
    path('items/<slug:category>', category_page),
    path('api/items/<slug:name>/<str:size>', get_price_weight),
    path('api/items/<str:name>', get_item)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)