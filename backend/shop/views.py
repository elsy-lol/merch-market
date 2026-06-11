from decimal import Decimal
from django.contrib.auth.hashers import check_password, make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404

from .models import Creator, Product, ProductVariant, ShopUser, Order, OrderItem, UserProfile
from .serializers import (
    CreatorListSerializer,
    CreatorDetailSerializer,
    ProductItemSerializer,
    RegisterSerializer,
    LoginSerializer,
    ProfileUpdateSerializer,
    CheckoutSerializer,
    OrderSerializer,
)


class CreatorsListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        creators = Creator.objects.all()
        serializer = CreatorListSerializer(creators, many=True)
        return Response({'artists': serializer.data})


class CreatorDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, slug):
        creator = get_object_or_404(Creator, slug=slug)
        serializer = CreatorDetailSerializer(creator)
        return Response({'artist': serializer.data})


class ProductsListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        creator_slug = request.GET.get('artist_slug')
        products = Product.objects.select_related('creator', 'category').all()
        if creator_slug:
            products = products.filter(creator__slug=creator_slug)
        serializer = ProductItemSerializer(products, many=True)
        return Response({'items': serializer.data})


class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CheckoutSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        items_data = serializer.validated_data['items']
        if not items_data:
            return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

        order_items = []
        total = Decimal('0.00')

        for item in items_data:
            item_id = item['id']
            quantity = item['quantity']

            variant = ProductVariant.objects.select_related('product').filter(product_id=item_id).first()
            if not variant:
                return Response(
                    {'error': f'Product {item_id} not found'},
                    status=status.HTTP_404_NOT_FOUND,
                )
            if variant.stock < quantity:
                return Response(
                    {'error': f'Not enough stock for {variant.product.name}'},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            variant.stock -= quantity
            variant.save()

            order_items.append({
                'product_id': item_id,
                'product_name': variant.product.name,
                'price': variant.product.price,
                'quantity': quantity,
            })
            total += Decimal(str(variant.product.price)) * quantity

        order = Order.objects.create(
            user_id=request.user.id,
            total=total,
            status='processing',
        )

        for oi in order_items:
            OrderItem.objects.create(order=order, **oi)

        return Response({
            'success': True,
            'message': 'Заказ успешно оформлен! Ваши стикеры отправлены в доставку! 🚀📦',
            'order_id': order.id,
        }, status=status.HTTP_201_CREATED)


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = ShopUser.objects.create(
            username=serializer.validated_data['username'],
            email=serializer.validated_data.get('email', ''),
            password=make_password(serializer.validated_data['password']),
            is_active=True,
            is_staff=False,
            is_superuser=False,
            phone='',
            avatar='',
            role='user',
            bio='',
            two_factor_code='',
            two_factor_method='',
        )
        display_name = (serializer.validated_data.get('display_name', '') or '').strip() or user.username
        UserProfile.objects.create(user_id=user.id, display_name=display_name)

        refresh = RefreshToken.for_user(user)
        return Response({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'display_name': display_name,
                'favorite_artist': '',
            },
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        try:
            user = ShopUser.objects.get(username=username, is_active=True)
        except ShopUser.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        if not check_password(password, user.password):
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        profile, _ = UserProfile.objects.get_or_create(user_id=user.id)
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'display_name': profile.display_name or user.username,
                'favorite_artist': profile.favorite_artist or '',
            },
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        })


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile, _ = UserProfile.objects.get_or_create(user_id=request.user.id)
        orders = Order.objects.filter(user_id=request.user.id).order_by('-created_at')
        orders_serializer = OrderSerializer(orders, many=True)

        return Response({
            'user': {
                'id': request.user.id,
                'username': request.user.username,
                'email': request.user.email,
                'display_name': profile.display_name or request.user.username,
                'favorite_artist': profile.favorite_artist or '',
            },
            'stats': {
                'total_orders': orders.count(),
                'total_spent': float(sum(o.total for o in orders)),
            },
            'orders': orders_serializer.data,
        })

    def put(self, request):
        profile, _ = UserProfile.objects.get_or_create(user_id=request.user.id)
        serializer = ProfileUpdateSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if 'display_name' in serializer.validated_data:
            profile.display_name = serializer.validated_data['display_name']
        if 'favorite_artist' in serializer.validated_data:
            profile.favorite_artist = serializer.validated_data['favorite_artist']
        profile.save()

        return Response({
            'user': {
                'id': request.user.id,
                'username': request.user.username,
                'email': request.user.email,
                'display_name': profile.display_name or request.user.username,
                'favorite_artist': profile.favorite_artist or '',
            }
        })
