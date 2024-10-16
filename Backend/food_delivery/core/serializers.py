# core/serializers.py
from rest_framework import serializers
from .models import CustomUser, News, Product, Cart, Order, Category

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'phone_number']

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['id', 'image']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'image'] 

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'ingredients', 'image', 'description', 'category']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'product', 'quantity', 'total_price', 'address']

class CartSerializer(serializers.ModelSerializer):
    favorite_products = ProductSerializer(many=True, read_only=True)
    order_history = OrderSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'favorite_products', 'order_history']