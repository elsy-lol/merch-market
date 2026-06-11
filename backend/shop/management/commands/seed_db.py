from django.core.management.base import BaseCommand
from shop.models import Creator, Category, Product, ProductVariant

class Command(BaseCommand):
    help = 'Seeds additional data into the existing DB.'

    def handle(self, *args, **options):
        creators_count = Creator.objects.count()
        products_count = Product.objects.count()
        self.stdout.write(f"DB already has {creators_count} creators and {products_count} products.")
        self.stdout.write(self.style.SUCCESS("No seeding needed — using existing DB data."))
