from django.db import models

class CategoryModel(models.Model):
    name = models.CharField(verbose_name="Название", max_length=40, blank=False)
    image = models.ImageField(upload_to="images/icons/", verbose_name="Название категории")

    slug = models.SlugField(unique=True, max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

class UnderCategoryModel(models.Model):
    name = models.CharField(max_length=30, blank=False, verbose_name='Название подкатегории', db_index=True)

    slug = models.SlugField(unique=True, max_length=100)
    cat = models.ForeignKey(CategoryModel, on_delete=models.PROTECT)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Подкатегория'
        verbose_name_plural = 'Подкатегории'

class ItemModel(models.Model):
    name = models.CharField(verbose_name="Название", max_length=40, blank=False)
    description = models.TextField(verbose_name='Описание', blank=True)

    slug = models.SlugField(unique=True, max_length=100)
    is_action = models.BooleanField(verbose_name="Есть скидка?", default=False) # Для блока "Акции"

    percent_action = models.IntegerField(verbose_name="Процент скидки", default=0) # Процент скидки
    image = models.ImageField(upload_to='images/items/', verbose_name='Изображение')

    category = models.ForeignKey(CategoryModel, on_delete=models.PROTECT)
    under_category = models.ForeignKey(UnderCategoryModel, on_delete=models.PROTECT, blank=True, null=True)

    bought = models.IntegerField(verbose_name="Количество покупок", default=0, blank=True) # для блока "Хиты"
    date = models.DateField(verbose_name="Дата создания") # для блока "Новинки"

    def get_absolute_url(self):
        return f'items/{self.category.slug}/{self.slug}'

    def get_all_weights(self):
        self.weight = WeightItem.objects.filter(for_item=self)
        return self.weight

    def get_minimal_weight(self):
        self.weight = self.get_all_weights()
        self.current_weight = self.weight[0]
        for weight in self.weight:
            if self.current_weight.price > weight.price:
                self.current_weight = weight
        return self.current_weight

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'

class WeightItem(models.Model):
    size = models.CharField(verbose_name="Размер", max_length=8, default="1кг")
    for_item = models.ForeignKey(ItemModel, on_delete=models.PROTECT, blank=False, verbose_name='Товар')

    price = models.IntegerField(verbose_name='Цена за единицу товара')

    def __str__(self):
        return f'{self.for_item.name} - {self.price} - {self.size}'

    class Meta:
        verbose_name = 'Размер'
        verbose_name_plural = 'Размеры'

class ContactsModel(models.Model):
    name = models.CharField(verbose_name="Имя клиента", max_length=30)
    phone = models.CharField(verbose_name="Номер телефона", max_length=15)

    message = models.TextField(verbose_name="Сообщение")

    def __str__(self):
        return f'{self.name} - {self.phone}'

    class Meta:
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'

class CartPayModel(models.Model):
    phone = models.CharField(verbose_name="Номер телефона", max_length=15)
    name = models.CharField(verbose_name="Имя клиента", max_length=30)
    city = models.CharField(verbose_name="Город", max_length=20)
    address = models.CharField(verbose_name="Адрес", max_length=50)

    payment_type = models.CharField(verbose_name="Способ оплаты", max_length=20)

    cart = models.JSONField(verbose_name="Корзина клиента")

    def __str__(self):
        return f'{self.name} - {self.phone}'

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
