import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  SvgNoPhoto,
  SvgCart,
  SvgWishlist,
  SvgCheck,
  SvgTag,
  SvgMusicNote,
  SvgArrowLeft,
  SvgHourglass,
  SvgPackage,
  SvgCrown,
  SvgStar,
  SvgBag,
} from '../components/CustomSvg';

/* ---------- helpers ---------- */

const TYPE_LABELS = {
  tshirt: 'Футболка',
  hoodie: 'Худи',
  cap: 'Кепка',
  vinyl: 'Винил',
  cassette: 'Кассета',
  accessory: 'Аксессуар',
};

const SIZES = ['S', 'M', 'L', 'XL'];

const TYPE_HAS_SIZE = new Set(['tshirt', 'hoodie', 'cap']);

/* ============================================
   ProductDetail
   ============================================ */

const ProductDetail = ({
  items,
  addToCart,
  addToWishlist,
  wishlist,
  setSelectedArtistSlug,
  loading,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = useMemo(() => items.find((item) => item.id === Number(id)), [items, id]);

  const [selectedSize, setSelectedSize] = useState(product?.size || null);

  const isWishlisted = wishlist.some((w) => w.id === product?.id);

  // Related products — same artist, exclude current, max 4
  const relatedItems = useMemo(() => {
    if (!product) return [];
    return items
      .filter((item) => item.artist.id === product.artist.id && item.id !== product.id)
      .slice(0, 4);
  }, [items, product]);

  // ---------- loading skeleton ----------
  if (loading) {
    return (
      <div className="font-ui text-slate-300 animate-section animate-section-1">
        <div className="mb-4"><div className="skeleton" style={{ width: 80, height: 28, borderRadius: 8 }} /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="skeleton-card" style={{ height: 320 }} />
          <div className="flex flex-col gap-3">
            <div className="skeleton-text" style={{ width: 120, height: 16 }} />
            <div className="skeleton-text" style={{ width: 200, height: 24 }} />
            <div className="skeleton-text" style={{ width: 140, height: 14 }} />
            <div className="skeleton-text" style={{ width: 100, height: 28 }} />
            <div className="skeleton-text" style={{ width: 160, height: 14 }} />
            <div className="skeleton" style={{ width: '100%', height: 80, marginTop: 8 }} />
            <div className="flex gap-2 mt-2">
              <div className="skeleton" style={{ width: 120, height: 36, borderRadius: 8 }} />
              <div className="skeleton" style={{ width: 120, height: 36, borderRadius: 8 }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- guard: no product ----------
  if (!product) {
    return (
      <div className="font-ui text-slate-300 animate-section animate-section-1">
        <div className="empty-state max-w-xl mx-auto mt-16">
          <SvgPackage className="w-14 h-14 mx-auto mb-4" color="#64748b" />
          <h3 className="text-xl text-white font-bold text-center">Товар не найден</h3>
          <p className="text-base text-amber-400/70 font-accent mt-2 text-center mb-6">
            Возможно, он был удалён или ссылка устарела.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="btn-gold inline-flex items-center gap-2 text-sm"
            >
              На главную
            </button>
            <button
              onClick={() => navigate('/catalog')}
              className="btn-glass inline-flex items-center gap-2 text-sm"
            >
              В каталог
            </button>
          </div>
        </div>
      </div>
    );
  }

  const hasSizeSelector = TYPE_HAS_SIZE.has(product.image_sticker_type);

  /* ---------- handlers ---------- */
  const handleArtistClick = () => {
    setSelectedArtistSlug(product.artist.slug);
    navigate('/catalog');
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleToggleWishlist = () => {
    addToWishlist(product);
  };

  const handleViewProduct = (item) => {
    navigate(`/product/${item.id}`);
  };

  /* ---------- render ---------- */
  return (
    <div className="font-ui text-slate-300 animate-section animate-section-1">
      {/* ============ Back navigation ============ */}
      <div className="mb-6 animate-rise">
        <button
          onClick={() => navigate('/catalog')}
          className="btn-glass inline-flex items-center gap-2 text-sm cursor-pointer border-none"
        >
          <SvgArrowLeft className="w-4 h-4" /> Назад
        </button>
      </div>

      {/* ============ Main product area ============ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* ---------- Left: Product image ---------- */}
        <div className="animate-rise animate-rise-1">
          <div
            className={`sticker sticker-${product.sticker_color} aspect-auto h-auto p-8 md:p-12 flex items-center justify-center relative`}
          >
            <div className="w-44 h-44 md:w-56 md:h-56">
              <SvgNoPhoto className="w-full h-full" color="#64748b" />
            </div>

            {/* Corner badge */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
              <span
                className={`product-badge text-xs ${
                  product.condition === 'new'
                    ? 'product-badge-new'
                    : 'product-badge-sale'
                }`}
              >
                {product.condition === 'new' ? 'Новинка' : 'Б/У'}
              </span>
              {product.is_original && (
                <span className="product-badge product-badge-limited text-xs">
                  <SvgCrown className="w-3 h-3 inline-block mr-0.5" /> Оригинал
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ---------- Right: Product info ---------- */}
        <div className="flex flex-col gap-5 animate-rise animate-rise-2">
          {/* Condition + originality badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`product-badge text-xs ${
                product.condition === 'new'
                  ? 'product-badge-new'
                  : 'product-badge-sale'
              }`}
            >
              {product.condition === 'new' ? 'Новинка' : 'Б/У Секонд'}
            </span>
            {product.is_original && (
              <span className="product-badge product-badge-limited text-xs">
                <SvgCrown className="w-3 h-3 inline-block mr-0.5" /> Оригинал
              </span>
            )}
          </div>

          {/* Product name */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight font-display">
            {product.name}
          </h1>

          {/* Artist link */}
          <div className="flex items-center gap-2">
            <SvgMusicNote className="w-4 h-4 flex-shrink-0" color="#f59e0b" />
            <button
              onClick={handleArtistClick}
              className="text-amber-400 hover:text-amber-300 font-accent text-lg underline underline-offset-2 transition-colors border-none bg-transparent cursor-pointer"
            >
              {product.artist.name}
            </button>
          </div>

          {/* Price */}
          <div className="text-3xl md:text-4xl font-bold text-gradient-gold">
            {product.price.toLocaleString('ru-RU')} ₽
          </div>

          {/* Size selector — only for clothing */}
          {hasSizeSelector && (
            <div>
              <label className="block text-sm text-white/50 mb-2 font-accent">
                Размер
              </label>
              <div className="size-pills">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`size-pill text-sm px-3 py-1.5 cursor-pointer border-none ${
                      selectedSize === s ? 'active' : ''
                    }`}
                    type="button"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Static size display for items without size picker */}
          {!hasSizeSelector && product.size && (
            <div>
              <label className="block text-sm text-white/50 mb-2 font-accent">
                Размер
              </label>
              <span className="text-sm border border-white/20 px-3 py-1.5 rounded font-bold text-white/60 inline-block">
                {product.size}
              </span>
            </div>
          )}

          {/* Stock indicator */}
          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <>
                <SvgCheck className="w-4 h-4 flex-shrink-0" color="#10b981" />
                <span
                  className={`text-sm font-bold ${
                    product.stock <= 3 ? 'text-amber-400' : 'text-emerald-400'
                  }`}
                >
                  {product.stock > 5
                    ? `В наличии: ${product.stock} шт.`
                    : `Осталось всего ${product.stock} шт.`}
                </span>
              </>
            ) : (
              <>
                <SvgHourglass className="w-4 h-4 flex-shrink-0" color="#f43f5e" />
                <span className="text-sm text-rose-400 font-bold">
                  Нет в наличии
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <div className="border-t border-white/10 pt-4">
            <h3 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-2 font-display">
              Описание
            </h3>
            <p className="text-sm text-white/60 leading-relaxed font-accent">
              {product.description || 'Описание товара скоро появится.'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mt-2">
            <button
              onClick={handleAddToCart}
              className="btn-gold inline-flex items-center gap-2 text-sm md:text-base py-3 px-6 cursor-pointer border-none"
              disabled={product.stock === 0}
              style={
                product.stock === 0
                  ? { opacity: 0.5, cursor: 'not-allowed' }
                  : {}
              }
              type="button"
            >
              <SvgCart className="w-5 h-5" color="#0f172a" />
              {product.stock > 0 ? 'В корзину' : 'Нет в наличии'}
            </button>

            <button
              onClick={handleToggleWishlist}
              className="btn-glass inline-flex items-center gap-2 text-sm md:text-base py-3 px-4 cursor-pointer border-none"
              type="button"
            >
              <SvgWishlist
                className="w-5 h-5"
                color={isWishlisted ? '#f43f5e' : '#fff'}
                fill={isWishlisted ? '#f43f5e' : 'none'}
              />
              {isWishlisted ? 'В избранном' : 'В избранное'}
            </button>
          </div>

          {/* Meta tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-xs border border-white/10 px-2 py-1 rounded-full text-white/40 inline-flex items-center gap-1">
              <SvgTag className="w-3 h-3" />
              {TYPE_LABELS[product.image_sticker_type] || 'Товар'}
            </span>
            <span className="text-xs border border-white/10 px-2 py-1 rounded-full text-white/40 inline-flex items-center gap-1">
              <SvgPackage className="w-3 h-3" />
              {product.condition === 'new' ? 'Новый' : 'Б/У'}
            </span>
          </div>
        </div>
      </div>

      {/* ============ You might also like ============ */}
      {relatedItems.length > 0 && (
        <div className="animate-section animate-section-2 mb-12">
          <h2 className="section-title text-xl md:text-2xl mb-6 flex items-center gap-2">
            <SvgStar className="w-5 h-5" color="#f59e0b" /> Вам также может
            понравиться
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedItems.map((item, idx) => {
              const isRelatedWishlisted = wishlist.some(
                (w) => w.id === item.id,
              );
              const delay = Math.min(idx + 1, 5);

              return (
                <div
                  key={item.id}
                  className={`sticker sticker-${item.sticker_color} product-card animate-rise animate-rise-${delay}`}
                  onClick={() => handleViewProduct(item)}
                >
                  {/* Badge */}
                  <div className="flex justify-between items-start z-10 mb-1">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        item.condition === 'new'
                          ? 'text-emerald-400 bg-emerald-500/10'
                          : 'text-amber-400 bg-amber-500/10'
                      }`}
                    >
                      {item.condition === 'new' ? 'Новинка' : 'Б/У'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToWishlist(item);
                      }}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border-none cursor-pointer flex-shrink-0 hover:scale-125 transition-transform"
                      aria-label={
                        isRelatedWishlisted
                          ? 'Убрать из избранного'
                          : 'Добавить в избранное'
                      }
                      type="button"
                    >
                      <SvgWishlist
                        className="w-3.5 h-3.5"
                        color={isRelatedWishlisted ? '#f43f5e' : '#fff'}
                        fill={isRelatedWishlisted ? '#f43f5e' : 'none'}
                      />
                    </button>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center my-1 z-10">
                    <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
                      <SvgNoPhoto className="w-full h-full" color="#64748b" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="z-10 flex flex-col flex-1 gap-1">
                    <h3
                      className="text-sm font-bold text-white leading-tight"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.name}
                    </h3>

                    <div className="flex items-center justify-between pt-2 mt-auto border-t border-white/10">
                      <span className="text-sm md:text-base font-bold text-gradient-gold">
                        {item.price.toLocaleString('ru-RU')} ₽
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item);
                        }}
                        className="btn-gold text-xs py-1.5 px-3 cursor-pointer border-none"
                        type="button"
                      >
                        <SvgBag
                          className="w-3 h-3 inline-block align-middle mr-1"
                          color="#0f172a"
                        />{' '}
                        Купить
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
