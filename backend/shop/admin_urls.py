from django.urls import path
from . import admin_views

urlpatterns = [
    path('', admin_views.dashboard, name='admin-dashboard'),
    path('artists/', admin_views.artist_list, name='admin-artist-list'),
    path('artists/add/', admin_views.artist_add, name='admin-artist-add'),
    path('artists/<int:artist_id>/edit/', admin_views.artist_edit, name='admin-artist-edit'),
    path('artists/<int:artist_id>/delete/', admin_views.artist_delete, name='admin-artist-delete'),
    path('products/', admin_views.product_list, name='admin-product-list'),
    path('products/add/', admin_views.product_add, name='admin-product-add'),
    path('products/<int:product_id>/edit/', admin_views.product_edit, name='admin-product-edit'),
    path('products/<int:product_id>/delete/', admin_views.product_delete, name='admin-product-delete'),
    path('orders/', admin_views.order_list, name='admin-order-list'),
    path('orders/<int:order_id>/', admin_views.order_detail, name='admin-order-detail'),
    path('supplies/', admin_views.supply_list, name='admin-supply-list'),
    path('supplies/add/', admin_views.supply_add, name='admin-supply-add'),
    path('categories/', admin_views.category_list, name='admin-category-list'),
    path('categories/add/', admin_views.category_add, name='admin-category-add'),
    path('categories/<int:category_id>/edit/', admin_views.category_edit, name='admin-category-edit'),
    path('categories/<int:category_id>/delete/', admin_views.category_delete, name='admin-category-delete'),
    path('users/', admin_views.user_list, name='admin-user-list'),
]
