# core/admin.py
from django.contrib import admin
from .models import CustomUser, News, Product, Cart, Order

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'phone_number', 'email', 'is_staff')
    search_fields = ('username', 'phone_number', 'email')

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('id', 'image')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'ingredients', 'image', 'description')
    search_fields = ('name', 'ingredients')

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user',)
    filter_horizontal = ('favorite_products',)  # Удаляем order_history из filter_horizontal

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('cart', 'product', 'quantity', 'total_price', 'address')
    search_fields = ('address',)