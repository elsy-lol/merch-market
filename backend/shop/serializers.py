from rest_framework import serializers
from .models import Creator, Product, ProductVariant, UserProfile, Order, OrderItem, ShopUser

COLOR_MAP = {
    'gonefludd': 'pink',
    'lsp': 'cyan',
    'pharaoh': 'orange',
    'oxxxymiron': 'green',
    'skryptonite': 'yellow',
    'guf': 'orange',
    'miyagi': 'cyan',
    'boulevard-depo': 'pink',
    'atl': 'green',
    'face': 'yellow',
}
FALLBACK_COLORS = ['yellow', 'pink', 'cyan', 'green', 'orange']

STICKER_TYPE_MAP = {
    'Футболки': 'tshirt',
    'Штаны': 'hoodie',
    'Худи': 'hoodie',
    'Кепки': 'cap',
    'Винил': 'vinyl',
    'Кассеты': 'cassette',
    'Аксессуары': 'accessory',
}


def get_sticker_color(creator_slug, idx=0):
    return COLOR_MAP.get(creator_slug, FALLBACK_COLORS[idx % len(FALLBACK_COLORS)])


def get_sticker_type(category):
    if category:
        for key, val in STICKER_TYPE_MAP.items():
            if key.lower() in category.name.lower():
                return val
    return 'accessory'


class CreatorListSerializer(serializers.ModelSerializer):
    avatar_color = serializers.SerializerMethodField()
    is_musician = serializers.SerializerMethodField()

    class Meta:
        model = Creator
        fields = ['id', 'name', 'slug', 'description', 'avatar_color', 'is_musician']

    def get_avatar_color(self, obj):
        return get_sticker_color(obj.slug, 0)

    def get_is_musician(self, obj):
        return True


class ProductItemSerializer(serializers.ModelSerializer):
    artist = serializers.SerializerMethodField()
    condition = serializers.SerializerMethodField()
    condition_display = serializers.SerializerMethodField()
    size = serializers.SerializerMethodField()
    stock = serializers.SerializerMethodField()
    is_original = serializers.SerializerMethodField()
    image_sticker_type = serializers.SerializerMethodField()
    sticker_color = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'artist', 'name', 'price', 'description',
            'condition', 'condition_display', 'size', 'stock',
            'is_original', 'image_sticker_type', 'sticker_color',
        ]

    def get_artist(self, obj):
        if obj.creator:
            return {
                'id': obj.creator.id,
                'name': obj.creator.name,
                'slug': obj.creator.slug,
            }
        return None

    def get_condition(self, obj):
        return 'new' if obj.product_type == 'official' else 'secondhand'

    def get_condition_display(self, obj):
        return 'Новый' if obj.product_type == 'official' else 'Секонд-хенд'

    def get_size(self, obj):
        variant = obj.variants.first()
        return variant.size if variant else 'One Size'

    def get_stock(self, obj):
        variant = obj.variants.first()
        return variant.stock if variant else 0

    def get_is_original(self, obj):
        return True

    def get_image_sticker_type(self, obj):
        return get_sticker_type(obj.category)

    def get_sticker_color(self, obj):
        slug = obj.creator.slug if obj.creator else ''
        return get_sticker_color(slug, obj.id)


class CreatorDetailSerializer(serializers.ModelSerializer):
    avatar_color = serializers.SerializerMethodField()
    is_musician = serializers.SerializerMethodField()
    items = serializers.SerializerMethodField()

    class Meta:
        model = Creator
        fields = ['id', 'name', 'slug', 'description', 'avatar_color', 'is_musician', 'items']

    def get_avatar_color(self, obj):
        return get_sticker_color(obj.slug, 0)

    def get_is_musician(self, obj):
        return True

    def get_items(self, obj):
        products = obj.product_set.select_related('category').all()
        return ProductItemSerializer(products, many=True, context=self.context).data


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField(required=False, allow_blank=True)
    password = serializers.CharField(min_length=6, write_only=True)
    display_name = serializers.CharField(required=False, allow_blank=True)

    def validate_username(self, value):
        if ShopUser.objects.filter(username=value).exists():
            raise serializers.ValidationError('Username already taken')
        return value


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class ProfileUpdateSerializer(serializers.Serializer):
    display_name = serializers.CharField(required=False)
    favorite_artist = serializers.CharField(required=False)


class CheckoutItemSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1, default=1)


class CheckoutSerializer(serializers.Serializer):
    items = CheckoutItemSerializer(many=True)


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product_name', 'price', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'total', 'status', 'created_at', 'items']
