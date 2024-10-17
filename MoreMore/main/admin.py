from django.contrib import admin
from .models import *

@admin.register(CategoryModel)
class CategoryModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

    prepopulated_fields = {'slug': ('name',)}

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
@admin.register(UnderCategoryModel)
class UnderCategoryModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    prepopulated_fields = {'slug': ('name',)}

    class Meta:
        verbose_name = 'Податегория'
        verbose_name_plural = 'Подкатегории'

@admin.register(ItemModel)
class ItemModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category_id', 'under_category_id', 'bought')
    prepopulated_fields = {'slug': ('name',)}

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'

@admin.register(ContactsModel)
class RequestsModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'phone', 'message')

    class Meta:
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'

@admin.register(CartPayModel)
class CartPayModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'phone', 'city', 'address', 'payment_type')

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'

@admin.register(WeightItem)
class WeightItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'for_item', 'size')

    class Meta:
        verbose_name = 'Вес'
        verbose_name_plural = 'Веса'
