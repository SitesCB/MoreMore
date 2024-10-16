from django.db import models

# class ItemModel(models.Model):
#     name = models.CharField(verbose_name="Название", max_length=40, blank=False)
#     description = models.TextField(verbose_name='Описание', blank=True)
#
#     slug = models.SlugField(unique=True, max_length=100)
#
#     def __str__(self):
#         return self.name
#
#     class Meta:
#         verbose_name = 'Категория'
#         verbose_name_plural = 'Категории'
