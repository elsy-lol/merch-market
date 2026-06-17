from django.contrib import admin
from .models import Creator, Category, Product, ProductVariant, ProductImage, UserProfile, Order, OrderItem, Supply, ShopUser

@admin.register(Creator)
class CreatorAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'parent')
    search_fields = ('name',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'creator', 'price', 'product_type', 'condition', 'status', 'stock_total', 'created_at')
    list_filter = ('product_type', 'condition', 'status', 'creator')
    search_fields = ('name', 'creator__name')
    list_select_related = ('creator',)

    def stock_total(self, obj):
        total = sum(v.stock for v in obj.variants.all())
        return total
    stock_total.short_description = 'Остаток'

@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ('product', 'size', 'color', 'stock', 'sku')
    list_filter = ('size', 'color')
    search_fields = ('product__name', 'sku')

@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product', 'is_main', 'order')

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'display_name', 'favorite_artist')
    search_fields = ('display_name',)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'total', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('user_id',)
    date_hierarchy = 'created_at'

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product_name', 'price', 'quantity')

@admin.register(Supply)
class SupplyAdmin(admin.ModelAdmin):
    list_display = ('variant', 'quantity', 'supplier', 'created_at', 'created_by')
    list_filter = ('supplier',)
    date_hierarchy = 'created_at'

@admin.register(ShopUser)
class ShopUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'is_staff', 'is_active', 'date_joined')
    search_fields = ('username', 'email')
    list_filter = ('is_staff', 'is_active')
