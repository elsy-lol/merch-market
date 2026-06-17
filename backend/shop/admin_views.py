from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib import messages
from django.db.models import Sum, Count, Q, F
from django.utils import timezone
from .models import Creator, Category, Product, ProductVariant, Supply, Order, OrderItem, ShopUser, UserProfile

@staff_member_required
def dashboard(request):
    total_orders = Order.objects.count()
    total_revenue = Order.objects.aggregate(s=Sum('total'))['s'] or 0
    total_products = Product.objects.count()
    total_artists = Creator.objects.count()
    total_users = ShopUser.objects.filter(is_active=True).count()
    recent_orders = Order.objects.select_related().order_by('-created_at')[:10]
    low_stock = ProductVariant.objects.filter(stock__lt=5).select_related('product')[:10]

    ctx = {
        'total_orders': total_orders,
        'total_revenue': total_revenue,
        'total_products': total_products,
        'total_artists': total_artists,
        'total_users': total_users,
        'recent_orders': recent_orders,
        'low_stock': low_stock,
        'section': 'dashboard',
    }
    return render(request, 'admin2/dashboard.html', ctx)

@staff_member_required
def artist_list(request):
    artists = Creator.objects.annotate(
        product_count=Count('product')
    ).order_by('name')
    return render(request, 'admin2/artists.html', {'artists': artists, 'section': 'artists'})

@staff_member_required
def artist_add(request):
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        slug = request.POST.get('slug', '').strip()
        desc = request.POST.get('description', '').strip()
        logo = request.POST.get('logo', '').strip() or 'default.png'
        social = request.POST.get('social_links', '{}')
        import json
        try:
            social_data = json.loads(social)
        except json.JSONDecodeError:
            social_data = {}
        if not name or not slug:
            messages.error(request, 'Name and slug are required')
            return render(request, 'admin2/artist_form.html', {'artist': None, 'section': 'artists'})
        Creator.objects.create(name=name, slug=slug, description=desc, logo=logo, social_links=social_data)
        messages.success(request, f'Artist "{name}" created')
        return redirect('admin-artist-list')
    return render(request, 'admin2/artist_form.html', {'artist': None, 'section': 'artists'})

@staff_member_required
def artist_edit(request, artist_id):
    artist = get_object_or_404(Creator, id=artist_id)
    if request.method == 'POST':
        artist.name = request.POST.get('name', artist.name).strip()
        artist.slug = request.POST.get('slug', artist.slug).strip()
        artist.description = request.POST.get('description', artist.description).strip()
        artist.logo = request.POST.get('logo', artist.logo).strip()
        import json
        social_raw = request.POST.get('social_links', '{}')
        try:
            artist.social_links = json.loads(social_raw)
        except json.JSONDecodeError:
            pass
        artist.save()
        messages.success(request, f'Artist "{artist.name}" updated')
        return redirect('admin-artist-list')
    import json
    social_str = json.dumps(artist.social_links, ensure_ascii=False, indent=2) if artist.social_links else '{}'
    return render(request, 'admin2/artist_form.html', {
        'artist': artist,
        'social_links': social_str,
        'section': 'artists',
    })

@staff_member_required
def artist_delete(request, artist_id):
    artist = get_object_or_404(Creator, id=artist_id)
    if request.method == 'POST':
        name = artist.name
        artist.delete()
        messages.success(request, f'Artist "{name}" deleted')
    return redirect('admin-artist-list')

@staff_member_required
def product_list(request):
    products = Product.objects.select_related('creator', 'category').annotate(
        total_stock=Sum('variants__stock')
    ).order_by('-created_at')
    return render(request, 'admin2/products.html', {'products': products, 'section': 'products'})

@staff_member_required
def product_add(request):
    artists = Creator.objects.all()
    categories = Category.objects.all()
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        creator_id = request.POST.get('creator_id')
        category_id = request.POST.get('category_id')
        price = request.POST.get('price', 0)
        product_type = request.POST.get('product_type', 'tshirt')
        condition = request.POST.get('condition', 'new')
        status = request.POST.get('status', 'active')
        desc = request.POST.get('description', '')
        if not name:
            messages.error(request, 'Product name is required')
            return render(request, 'admin2/product_form.html', {'product': None, 'artists': artists, 'categories': categories, 'section': 'products'})
        product = Product.objects.create(
            name=name,
            creator_id=creator_id or None,
            category_id=category_id or None,
            price=price,
            product_type=product_type,
            condition=condition,
            status=status,
            description=desc,
        )
        size = request.POST.get('size', '').strip()
        stock = request.POST.get('stock', 0)
        if size or int(stock) > 0:
            ProductVariant.objects.create(
                product=product,
                size=size or 'One Size',
                stock=int(stock),
                sku=f"{product.id}-{size or 'os'}-{timezone.now().timestamp():.0f}",
            )
        messages.success(request, f'Product "{name}" created')
        return redirect('admin-product-list')
    return render(request, 'admin2/product_form.html', {
        'product': None, 'artists': artists, 'categories': categories, 'section': 'products',
    })

@staff_member_required
def product_edit(request, product_id):
    product = get_object_or_404(Product.objects.select_related('creator', 'category'), id=product_id)
    artists = Creator.objects.all()
    categories = Category.objects.all()
    if request.method == 'POST':
        product.name = request.POST.get('name', product.name).strip()
        product.creator_id = request.POST.get('creator_id') or product.creator_id
        product.category_id = request.POST.get('category_id') or product.category_id
        product.price = request.POST.get('price', product.price)
        product.product_type = request.POST.get('product_type', product.product_type)
        product.condition = request.POST.get('condition', product.condition)
        product.status = request.POST.get('status', product.status)
        product.description = request.POST.get('description', product.description)
        product.save()
        messages.success(request, f'Product "{product.name}" updated')
        return redirect('admin-product-list')
    return render(request, 'admin2/product_form.html', {
        'product': product, 'artists': artists, 'categories': categories, 'section': 'products',
    })

@staff_member_required
def product_delete(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    if request.method == 'POST':
        name = product.name
        product.delete()
        messages.success(request, f'Product "{name}" deleted')
    return redirect('admin-product-list')

@staff_member_required
def order_list(request):
    status_filter = request.GET.get('status', '')
    orders = Order.objects.annotate(item_count=Count('items')).order_by('-created_at')
    if status_filter:
        orders = orders.filter(status=status_filter)
    statuses = ['processing', 'shipped', 'delivered', 'cancelled']
    return render(request, 'admin2/orders.html', {
        'orders': orders, 'statuses': statuses, 'current_status': status_filter, 'section': 'orders',
    })

@staff_member_required
def order_detail(request, order_id):
    order = get_object_or_404(Order.objects.annotate(item_count=Count('items')), id=order_id)
    items = order.items.all()
    user_profile = UserProfile.objects.filter(user_id=order.user_id).first()
    if request.method == 'POST':
        new_status = request.POST.get('status', '')
        if new_status in ('processing', 'shipped', 'delivered', 'cancelled'):
            order.status = new_status
            order.save()
            messages.success(request, f'Order #{order.id} status changed to "{new_status}"')
        return redirect('admin-order-detail', order_id=order.id)
    return render(request, 'admin2/order_detail.html', {
        'order': order, 'items': items, 'user_profile': user_profile, 'section': 'orders',
    })

@staff_member_required
def supply_list(request):
    supplies = Supply.objects.select_related('variant__product').order_by('-created_at')
    return render(request, 'admin2/supplies.html', {'supplies': supplies, 'section': 'supplies'})

@staff_member_required
def supply_add(request):
    variants = ProductVariant.objects.select_related('product').all()
    if request.method == 'POST':
        variant_id = request.POST.get('variant_id')
        quantity = int(request.POST.get('quantity', 0))
        supplier = request.POST.get('supplier', '').strip()
        price = request.POST.get('purchase_price')
        notes = request.POST.get('notes', '').strip()
        if not variant_id or quantity <= 0:
            messages.error(request, 'Select product variant and quantity > 0')
            return render(request, 'admin2/supplies.html', {'supplies': Supply.objects.all().select_related('variant__product').order_by('-created_at'), 'variants': variants, 'show_form': True, 'section': 'supplies'})
        variant = get_object_or_404(ProductVariant, id=variant_id)
        variant.stock = F('stock') + quantity
        variant.save()
        Supply.objects.create(
            variant=variant,
            quantity=quantity,
            supplier=supplier,
            purchase_price=price or None,
            notes=notes,
            created_by=request.user.username,
        )
        messages.success(request, f'Supply added: +{quantity} of {variant.product.name}')
        return redirect('admin-supply-list')
    supplies = Supply.objects.select_related('variant__product').order_by('-created_at')
    return render(request, 'admin2/supplies.html', {'supplies': supplies, 'variants': variants, 'show_form': True, 'section': 'supplies'})

@staff_member_required
def category_list(request):
    categories = Category.objects.all()
    return render(request, 'admin2/categories.html', {'categories': categories, 'section': 'categories'})

@staff_member_required
def category_add(request):
    parents = Category.objects.all()
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        slug = request.POST.get('slug', '').strip()
        parent_id = request.POST.get('parent_id')
        if not name or not slug:
            messages.error(request, 'Name and slug required')
            return render(request, 'admin2/category_form.html', {'category': None, 'parents': parents, 'section': 'categories'})
        Category.objects.create(name=name, slug=slug, parent_id=parent_id or None)
        messages.success(request, f'Category "{name}" created')
        return redirect('admin-category-list')
    return render(request, 'admin2/category_form.html', {'category': None, 'parents': parents, 'section': 'categories'})

@staff_member_required
def category_edit(request, category_id):
    category = get_object_or_404(Category, id=category_id)
    parents = Category.objects.exclude(id=category_id)
    if request.method == 'POST':
        category.name = request.POST.get('name', category.name).strip()
        category.slug = request.POST.get('slug', category.slug).strip()
        category.parent_id = request.POST.get('parent_id') or None
        category.save()
        messages.success(request, f'Category "{category.name}" updated')
        return redirect('admin-category-list')
    return render(request, 'admin2/category_form.html', {'category': category, 'parents': parents, 'section': 'categories'})

@staff_member_required
def category_delete(request, category_id):
    category = get_object_or_404(Category, id=category_id)
    if request.method == 'POST':
        name = category.name
        category.delete()
        messages.success(request, f'Category "{name}" deleted')
    return redirect('admin-category-list')

@staff_member_required
def user_list(request):
    users = ShopUser.objects.filter(is_active=True).order_by('-date_joined')
    return render(request, 'admin2/users.html', {'users': users, 'section': 'users'})
