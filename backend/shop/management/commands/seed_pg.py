"""
Seed script: adds all 10 artists + 62 merch items into the existing PostgreSQL DB.
Preserves existing data (idempotent via slug/name checks).
"""
from django.core.management.base import BaseCommand
from django.db import connection
from decimal import Decimal
from datetime import datetime, timezone

CREATORS_DATA = [
    {
        "name": "ЛСП",
        "slug": "lsp",
        "description": "Легендарный проект Олега ЛСП. Меланхоличный инди-рэп, синти-поп баллады о любви и экзистенциальном кризисе.",
        "items": [
            {"name": "Штаны ЛСП \"Огни\"", "price": 4490, "type": "official", "cond": None, "cat_slug": "pants", "variants": [("XS",10),("S",10),("M",10),("L",10),("XL",10)]},
            {"name": "Штаны ЛСП \"Дом\"", "price": 3790, "type": "official", "cond": None, "cat_slug": "pants", "variants": [("XS",10),("S",10),("M",10),("L",10),("XL",10)]},
            {"name": "Футболка ЛСП \"Траур\" (Б/У)", "price": 1790, "type": "second_hand", "cond": "good", "cat_slug": "t-shirts", "variants": [("M",1),("L",1),("XL",1)]},
            {"name": "Футболка ЛСП \"Безумие\" (Б/У)", "price": 2190, "type": "second_hand", "cond": "excellent", "cat_slug": "t-shirts", "variants": [("M",1),("L",1),("XL",1)]},
            {"name": "Штаны ЛСП \"Огни\" (Б/У)", "price": 2990, "type": "second_hand", "cond": "good", "cat_slug": "pants", "variants": [("S",1),("M",1),("L",1)]},
            {"name": "Штаны ЛСП \"Дом\" (Б/У)", "price": 2490, "type": "second_hand", "cond": "good", "cat_slug": "pants", "variants": [("S",1),("M",1),("L",1)]},
        ]
    },
    {
        "name": "GONE.Fludd",
        "slug": "gonefludd",
        "description": "Российский рэп-исполнитель, автор ярких, психоделических треков, неповторимого флоу и дикой энергетики.",
        "items": [
            {"name": "Футболка GONE.Fludd \"Neon\"", "price": 2990, "type": "official", "cond": None, "cat_slug": "t-shirts", "variants": [("S",15),("M",15),("L",15),("XL",15),("XXL",15)]},
            {"name": "Футболка GONE.Fludd \"Logo\"", "price": 2490, "type": "official", "cond": None, "cat_slug": "t-shirts", "variants": []},
            {"name": "Штаны GONE.Fludd \"Cargo\"", "price": 4990, "type": "official", "cond": None, "cat_slug": "pants", "variants": [("XS",10),("S",10),("M",10),("L",10),("XL",10)]},
            {"name": "Штаны GONE.Fludd \"Sweat\"", "price": 3990, "type": "official", "cond": None, "cat_slug": "pants", "variants": [("XS",10),("S",10),("M",10),("L",10),("XL",10)]},
            {"name": "Футболка GONE.Fludd \"Neon\" (Б/У)", "price": 1990, "type": "second_hand", "cond": "excellent", "cat_slug": "t-shirts", "variants": [("M",1),("L",1),("XL",1)]},
            {"name": "Футболка GONE.Fludd \"Logo\" (Б/У)", "price": 1490, "type": "second_hand", "cond": "good", "cat_slug": "t-shirts", "variants": [("M",1),("L",1),("XL",1)]},
            {"name": "Штаны GONE.Fludd \"Cargo\" (Б/У)", "price": 3490, "type": "second_hand", "cond": "excellent", "cat_slug": "pants", "variants": [("S",1),("M",1),("L",1)]},
        ]
    },
    {
        "name": "Pharaoh",
        "slug": "pharaoh",
        "description": "Глеб Голубин, лидер объединения Dead Dynasty. Создатель мрачной эстетики, клауд-рэпа и икона стиля.",
        "items": [
            {"name": "Pink Phloyd Футболка", "price": 3200, "type": "second_hand", "cond": "excellent", "cat_slug": "t-shirts", "variants": [("L",1)]},
            {"name": "Cold Siemens Beanie (Шапка)", "price": 2200, "type": "official", "cond": None, "cat_slug": "hats", "variants": [("One Size",20)]},
            {"name": "Phosphor Cassette (Signed)", "price": 4500, "type": "second_hand", "cond": "good", "cat_slug": "cassettes", "variants": [("One Size",1)]},
            {"name": "Dead Dynasty Hoodie", "price": 5800, "type": "official", "cond": None, "cat_slug": "hoodies", "variants": [("XL",7)]},
            {"name": "5 Nights Now Sticker Pack", "price": 700, "type": "official", "cond": None, "cat_slug": "accessories", "variants": [("One Size",50)]},
            {"name": "Дико, Например Vinyl", "price": 4800, "type": "official", "cond": None, "cat_slug": "vinyl", "variants": [("One Size",4)]},
        ]
    },
    {
        "name": "Oxxxymiron",
        "slug": "oxxxymiron",
        "description": "Мирон Фёдоров — легенда русского рэпа, основатель лейбла Booking Machine. Интеллектуальный рэп, грайм и стадионы.",
        "items": [
            {"name": "Горгород Hoodie", "price": 4900, "type": "official", "cond": None, "cat_slug": "hoodies", "variants": [("L",10)]},
            {"name": "Красота и Уродство Vinyl", "price": 6200, "type": "official", "cond": None, "cat_slug": "vinyl", "variants": [("One Size",8)]},
            {"name": "Биполярочка Футболка", "price": 2900, "type": "official", "cond": None, "cat_slug": "t-shirts", "variants": [("XL",14)]},
            {"name": "Империя Добра Cap (Б/У)", "price": 2100, "type": "second_hand", "cond": "good", "cat_slug": "hats", "variants": [("M",2)]},
            {"name": "x.x.x. Нашивка", "price": 500, "type": "official", "cond": None, "cat_slug": "accessories", "variants": [("One Size",40)]},
            {"name": "Лондонград Cassette", "price": 1800, "type": "official", "cond": None, "cat_slug": "cassettes", "variants": [("One Size",12)]},
            {"name": "Смутное Время Hoodie", "price": 5400, "type": "official", "cond": None, "cat_slug": "hoodies", "variants": [("L",5)]},
        ]
    },
    {
        "name": "Скриптонит",
        "slug": "skryptonite",
        "description": "Адиль Жалелов — основатель лейбла Musica36. Уникальный битмейкер и рэп-исполнитель.",
        "items": [
            {"name": "ДСНЯ Hoodie", "price": 4700, "type": "official", "cond": None, "cat_slug": "hoodies", "variants": [("L",9)]},
            {"name": "Праздник на Улице 36 Vinyl", "price": 5800, "type": "official", "cond": None, "cat_slug": "vinyl", "variants": [("One Size",7)]},
            {"name": "Musica36 Футболка", "price": 2600, "type": "official", "cond": None, "cat_slug": "t-shirts", "variants": [("XL",20)]},
            {"name": "7200 Cap (Б/У)", "price": 2000, "type": "second_hand", "cond": "good", "cat_slug": "hats", "variants": [("M",3)]},
            {"name": "3D Pin Set", "price": 650, "type": "official", "cond": None, "cat_slug": "accessories", "variants": [("One Size",35)]},
            {"name": "Улица 36 Cassette", "price": 1400, "type": "official", "cond": None, "cat_slug": "cassettes", "variants": [("One Size",10)]},
        ]
    },
    {
        "name": "Гуф",
        "slug": "guf",
        "description": "Алексей Долматов — легенда Centr, голос поколения нулевых и нуарный эстет московских улиц.",
        "items": [
            {"name": "Centr Hoodie Original (Б/У)", "price": 4200, "type": "second_hand", "cond": "good", "cat_slug": "hoodies", "variants": [("XL",1)]},
            {"name": "Город Дорог Vinyl (Б/У)", "price": 3500, "type": "second_hand", "cond": "good", "cat_slug": "vinyl", "variants": [("One Size",2)]},
            {"name": "Сплетни Футболка", "price": 2300, "type": "official", "cond": None, "cat_slug": "t-shirts", "variants": [("L",6)]},
            {"name": "Guf Beanie", "price": 1800, "type": "official", "cond": None, "cat_slug": "hats", "variants": [("One Size",15)]},
            {"name": "Ключи Sticker Pack", "price": 400, "type": "official", "cond": None, "cat_slug": "accessories", "variants": [("One Size",60)]},
            {"name": "Centr Cassette (Б/У)", "price": 2500, "type": "second_hand", "cond": "good", "cat_slug": "cassettes", "variants": [("One Size",1)]},
        ]
    },
    {
        "name": "Miyagi",
        "slug": "miyagi",
        "description": "Осетинский дуэт Miyagi & Эндшпиль. Мелодичный рэп с регги-вайбом, меланхоличные тексты и философия.",
        "items": [
            {"name": "Hajime Hoodie", "price": 5100, "type": "official", "cond": None, "cat_slug": "hoodies", "variants": [("L",11)]},
            {"name": "UMAMI Vinyl", "price": 4900, "type": "official", "cond": None, "cat_slug": "vinyl", "variants": [("One Size",9)]},
            {"name": "Кислород Футболка", "price": 2700, "type": "official", "cond": None, "cat_slug": "t-shirts", "variants": [("XL",18)]},
            {"name": "Barcode Cap (Б/У)", "price": 1900, "type": "second_hand", "cond": "good", "cat_slug": "hats", "variants": [("M",2)]},
            {"name": "Tattoo Sticker Set", "price": 550, "type": "official", "cond": None, "cat_slug": "accessories", "variants": [("One Size",45)]},
            {"name": "Hajime Cassette Vol.1", "price": 1300, "type": "official", "cond": None, "cat_slug": "cassettes", "variants": [("One Size",8)]},
        ]
    },
    {
        "name": "Boulevard Depo",
        "slug": "boulevard-depo",
        "description": "Артём Шатохин — участник Dead Dynasty. Неоновая эстетика, трэп-металл и кислотные рифмы.",
        "items": [
            {"name": "Rapp 2 Hoodie", "price": 4600, "type": "official", "cond": None, "cat_slug": "hoodies", "variants": [("L",7)]},
            {"name": "Sweet Dreams Vinyl", "price": 4200, "type": "official", "cond": None, "cat_slug": "vinyl", "variants": [("One Size",6)]},
            {"name": "NEON Футболка", "price": 2500, "type": "official", "cond": None, "cat_slug": "t-shirts", "variants": [("XL",13)]},
            {"name": "Depo Cap Purple (Б/У)", "price": 2100, "type": "second_hand", "cond": "excellent", "cat_slug": "hats", "variants": [("M",1)]},
            {"name": "Glow Chain", "price": 1200, "type": "official", "cond": None, "cat_slug": "accessories", "variants": [("One Size",25)]},
            {"name": "Depression Cassette", "price": 1100, "type": "official", "cond": None, "cat_slug": "cassettes", "variants": [("One Size",11)]},
        ]
    },
    {
        "name": "ATL",
        "slug": "atl",
        "description": "Алексей Орлов — лидер объединения YungRussia. Глубокий андеграунд, эмбиент-рэп и мрачная эстетика леса.",
        "items": [
            {"name": "Лес Hoodie", "price": 4300, "type": "official", "cond": None, "cat_slug": "hoodies", "variants": [("L",6)]},
            {"name": "Марабу Vinyl", "price": 5400, "type": "official", "cond": None, "cat_slug": "vinyl", "variants": [("One Size",5)]},
            {"name": "Крим Футболка", "price": 2400, "type": "official", "cond": None, "cat_slug": "t-shirts", "variants": [("XL",14)]},
            {"name": "YungRussia Cap (Б/У)", "price": 2000, "type": "second_hand", "cond": "good", "cat_slug": "hats", "variants": [("M",2)]},
            {"name": "Лимб Patch Pack", "price": 600, "type": "official", "cond": None, "cat_slug": "accessories", "variants": [("One Size",30)]},
            {"name": "Питер, Чапать Cassette", "price": 1000, "type": "official", "cond": None, "cat_slug": "cassettes", "variants": [("One Size",9)]},
        ]
    },
    {
        "name": "FACE",
        "slug": "face",
        "description": "Иван Дрёмин — феномен поп-рэпа, эпатажный артист с острыми текстами и ярким визуалом.",
        "items": [
            {"name": "Пути Исповедины Hoodie", "price": 4400, "type": "official", "cond": None, "cat_slug": "hoodies", "variants": [("XL",10)]},
            {"name": "Статика Vinyl", "price": 4700, "type": "official", "cond": None, "cat_slug": "vinyl", "variants": [("One Size",7)]},
            {"name": "Anti Tragedy Футболка", "price": 2500, "type": "official", "cond": None, "cat_slug": "t-shirts", "variants": [("L",16)]},
            {"name": "FACE Cap Lime", "price": 1900, "type": "official", "cond": None, "cat_slug": "hats", "variants": [("M",12)]},
            {"name": "Sticker Bomb Pack", "price": 450, "type": "official", "cond": None, "cat_slug": "accessories", "variants": [("One Size",55)]},
            {"name": "Vlave Cassette (Б/У)", "price": 1500, "type": "second_hand", "cond": "good", "cat_slug": "cassettes", "variants": [("One Size",2)]},
        ]
    },
]

# Category slugs we need
REQUIRED_CATEGORIES = {
    't-shirts': 'Футболки',
    'pants': 'Штаны',
    'hoodies': 'Худи',
    'hats': 'Кепки',
    'vinyl': 'Винил',
    'cassettes': 'Кассеты',
    'accessories': 'Аксессуары',
}


class Command(BaseCommand):
    help = 'Seeds the PostgreSQL DB with 10 artists and their merch items (existing DB schema).'

    def handle(self, *args, **options):
        with connection.cursor() as cur:
            self.ensure_categories(cur)
            self.seed_creators(cur)
        self.stdout.write(self.style.SUCCESS("Successfully seeded the PostgreSQL database!"))

    def ensure_categories(self, cur):
        """Create missing categories."""
        for slug, name in REQUIRED_CATEGORIES.items():
            cur.execute("SELECT id FROM shop_category WHERE slug = %s", [slug])
            if cur.fetchone() is None:
                cur.execute(
                    "INSERT INTO shop_category (name, slug, parent_id) VALUES (%s, %s, NULL)",
                    [name, slug]
                )
                self.stdout.write(f"  Created category: {name} ({slug})")

    def seed_creators(self, cur):
        """For each creator, insert if not exists, then insert their products & variants."""
        cat_cache = {}  # slug -> id
        cur.execute("SELECT slug, id FROM shop_category")
        for slug, cid in cur.fetchall():
            cat_cache[slug] = cid

        now = datetime.now(timezone.utc)

        for cd in CREATORS_DATA:
            # Check if creator exists
            cur.execute("SELECT id FROM shop_creator WHERE slug = %s", [cd['slug']])
            existing = cur.fetchone()
            if existing:
                self.stdout.write(f"  Creator already exists: {cd['name']} (id={existing[0]})")
                creator_id = existing[0]
            else:
                cur.execute(
                    """INSERT INTO shop_creator (name, slug, description, logo, social_links, created_at)
                       VALUES (%s, %s, %s, %s, %s, %s) RETURNING id""",
                    [cd['name'], cd['slug'], cd['description'],
                     f"/media/logos/{cd['slug']}.png", '{}', now]
                )
                creator_id = cur.fetchone()[0]
                self.stdout.write(f"  Created creator: {cd['name']} (id={creator_id})")

            self.seed_products(cur, creator_id, cd['items'], cat_cache, now)

    def seed_products(self, cur, creator_id, items, cat_cache, now):
        """Insert products and their variants."""
        for item in items:
            cat_id = cat_cache.get(item['cat_slug'])
            product_type = item['type']  # 'official' or 'second_hand'
            cond = item['cond']  # None for official

            # Skip if product already exists (idempotent)
            cur.execute(
                "SELECT id FROM shop_product WHERE name = %s AND creator_id = %s",
                [item['name'], creator_id]
            )
            existing = cur.fetchone()
            if existing:
                self.stdout.write(f"    Product already exists: {item['name']} (id={existing[0]})")
                continue

            cur.execute(
                """INSERT INTO shop_product
                   (name, description, price, product_type, status, condition, is_negotiable, views,
                    created_at, updated_at, category_id, creator_id, owner_id)
                   VALUES (%s, %s, %s, %s, 'published', %s, false, 0, %s, %s, %s, %s, NULL) RETURNING id""",
                [item['name'], item['name'], Decimal(str(item['price'])),
                 product_type, cond, now, now, cat_id, creator_id]
            )
            product_id = cur.fetchone()[0]

            # Create variants
            for size, stock in item['variants']:
                sku = f"{creator_id}-{product_id}-{size.replace(' ', '_')}"
                cur.execute(
                    """INSERT INTO shop_productvariant (size, color, stock, sku, product_id)
                       VALUES (%s, NULL, %s, %s, %s)""",
                    [size, stock, sku, product_id]
                )

            self.stdout.write(f"    Product: {item['name']} ({item['price']} руб) — {len(item['variants'])} variant(s)")
