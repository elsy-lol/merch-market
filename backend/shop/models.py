from django.db import models


class ShopUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField(default=False)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    email = models.CharField(max_length=254, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    avatar = models.CharField(max_length=100, blank=True, null=True)
    role = models.CharField(max_length=20, blank=True, null=True)
    is_verified_seller = models.BooleanField(default=False)
    seller_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    bio = models.TextField(blank=True, null=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    is_2fa_enabled = models.BooleanField(default=False)
    two_factor_code = models.CharField(max_length=10, blank=True, null=True)
    two_factor_method = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        db_table = 'users_user'
        managed = False

    def __str__(self):
        return self.username


class Creator(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=50, unique=True)
    description = models.TextField()
    logo = models.CharField(max_length=100)
    social_links = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'shop_creator'
        managed = False

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=50, unique=True)
    parent = models.ForeignKey('self', on_delete=models.DO_NOTHING, null=True, blank=True, db_column='parent_id')

    class Meta:
        db_table = 'shop_category'
        managed = False
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    product_type = models.CharField(max_length=20)
    status = models.CharField(max_length=20)
    condition = models.CharField(max_length=20, null=True, blank=True)
    is_negotiable = models.BooleanField(default=False)
    views = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING, null=True, blank=True, db_column='category_id')
    creator = models.ForeignKey(Creator, on_delete=models.DO_NOTHING, null=True, blank=True, db_column='creator_id')

    class Meta:
        db_table = 'shop_product'
        managed = False

    def __str__(self):
        return f"{self.name} ({self.creator.name if self.creator else '?'})"


class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING, db_column='product_id', related_name='variants')
    size = models.CharField(max_length=10, null=True, blank=True)
    color = models.CharField(max_length=50, null=True, blank=True)
    stock = models.IntegerField()
    sku = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = 'shop_productvariant'
        managed = False

    def __str__(self):
        return f"{self.product.name} - {self.size or 'One Size'}"


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING, db_column='product_id', related_name='images')
    image = models.CharField(max_length=100)
    is_main = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

    class Meta:
        db_table = 'shop_productimage'
        managed = False

    def __str__(self):
        return f"Image for {self.product.name}"


class UserProfile(models.Model):
    user_id = models.IntegerField(unique=True, db_index=True)
    display_name = models.CharField(max_length=100, blank=True)
    favorite_artist = models.CharField(max_length=100, blank=True)
    avatar_color = models.CharField(max_length=20, default='yellow')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'shop_userprofile'

    def __str__(self):
        return self.display_name or self.user.username


class Order(models.Model):
    user_id = models.IntegerField(db_index=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default='processing')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'shop_order'

    def __str__(self):
        return f"Order #{self.id} by {self.user.username}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product_id = models.IntegerField()
    product_name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(default=1)

    class Meta:
        db_table = 'shop_orderitem'

    def __str__(self):
        return f"{self.product_name} x{self.quantity}"
