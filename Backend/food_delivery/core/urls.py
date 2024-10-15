# core/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, NewsViewSet, ProductViewSet, CartViewSet

router = DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'news', NewsViewSet)
router.register(r'products', ProductViewSet)
router.register(r'carts', CartViewSet)

urlpatterns = [
    path('', include(router.urls)),
]