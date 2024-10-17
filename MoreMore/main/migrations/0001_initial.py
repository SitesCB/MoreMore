# Generated by Django 5.1.2 on 2024-10-17 13:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CartPayModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.CharField(max_length=15, verbose_name='Номер телефона')),
                ('name', models.CharField(max_length=30, verbose_name='Имя клиента')),
                ('city', models.CharField(max_length=20, verbose_name='Город')),
                ('address', models.CharField(max_length=50, verbose_name='Адрес')),
                ('payment_type', models.CharField(max_length=20, verbose_name='Способ оплаты')),
                ('cart', models.JSONField(verbose_name='Корзина клиента')),
            ],
            options={
                'verbose_name': 'Заказ',
                'verbose_name_plural': 'Заказы',
            },
        ),
        migrations.CreateModel(
            name='CategoryModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40, verbose_name='Название')),
                ('image', models.ImageField(upload_to='images/icons/', verbose_name='Название категории')),
                ('slug', models.SlugField(max_length=100, unique=True)),
            ],
            options={
                'verbose_name': 'Категория',
                'verbose_name_plural': 'Категории',
            },
        ),
        migrations.CreateModel(
            name='ContactsModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, verbose_name='Имя клиента')),
                ('phone', models.CharField(max_length=15, verbose_name='Номер телефона')),
                ('message', models.TextField(verbose_name='Сообщение')),
            ],
            options={
                'verbose_name': 'Заявка',
                'verbose_name_plural': 'Заявки',
            },
        ),
        migrations.CreateModel(
            name='UnderCategoryModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=30, verbose_name='Название подкатегории')),
                ('slug', models.SlugField(max_length=100, unique=True)),
                ('cat', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='main.categorymodel')),
            ],
            options={
                'verbose_name': 'Подкатегория',
                'verbose_name_plural': 'Подкатегории',
            },
        ),
        migrations.CreateModel(
            name='ItemModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40, verbose_name='Название')),
                ('description', models.TextField(blank=True, verbose_name='Описание')),
                ('slug', models.SlugField(max_length=100, unique=True)),
                ('is_action', models.BooleanField(default=False, verbose_name='Есть скидка?')),
                ('percent_action', models.IntegerField(default=0, verbose_name='Процент скидки')),
                ('image', models.ImageField(upload_to='images/items/', verbose_name='Изображение')),
                ('bought', models.IntegerField(blank=True, default=0, verbose_name='Количество покупок')),
                ('date', models.DateField(verbose_name='Дата создания')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='main.categorymodel')),
                ('under_category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='main.undercategorymodel')),
            ],
            options={
                'verbose_name': 'Товар',
                'verbose_name_plural': 'Товары',
            },
        ),
        migrations.CreateModel(
            name='WeightItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('size', models.CharField(default='1кг', max_length=8, verbose_name='Размер')),
                ('price', models.IntegerField(verbose_name='Цена за единицу товара')),
                ('for_item', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='main.itemmodel', verbose_name='Товар')),
            ],
            options={
                'verbose_name': 'Размер',
                'verbose_name_plural': 'Размеры',
            },
        ),
    ]