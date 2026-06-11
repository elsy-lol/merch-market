import React from 'react';
import Marquee from '../components/Marquee';
import {
  SvgNoPhoto,
  SvgWishlist,
  SvgCrown,
  SvgBag,
  SvgFlame,
  SvgDisc,
  SvgRocket,
  SvgStar,
} from '../components/CustomSvg';
import artistIcons from '../components/ArtistIcons';

const Home = ({ artists, items, addToCart, addToWishlist, wishlist, setActiveTab, setSelectedArtistSlug, onViewProduct, loading }) => {

  const featuredItems = items.slice(0, 6);

  if (loading) {
    return (
      <div className="font-ui text-slate-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {[1,2,3].map(i => <div key={i} className="skeleton-banner" style={{ height: '160px' }} />)}
        </div>
        <div className="flex items-center gap-2 mb-5"><div className="skeleton-text" style={{ width: 80, height: 12 }} /></div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="skeleton-text" style={{ width: 120, height: 16 }} />
            <div className="skeleton-text" style={{ width: 80, height: 12 }} />
          </div>
          <div className="product-grid">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="skeleton-card" style={{ height: 280 }} />
            ))}
          </div>
        </div>
        <div className="mb-8">
          <div className="skeleton-text" style={{ width: 140, height: 16, marginBottom: 16 }} />
          <div className="brand-grid">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="skeleton-card" style={{ height: 100 }} />
            ))}
          </div>
        </div>
      </div>
    );
  }


  const banners = [
    {
      subtitle: 'Неоновая эстетика',
      title: 'GONE.Fludd',
      desc: 'Психоделический мерч из новой коллекции',
      gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(217,119,6,0.05))',
      accent: '#f59e0b',
      onClick: () => { setSelectedArtistSlug('gonefludd'); setActiveTab('catalog'); }
    },
    {
      subtitle: 'Меланхолия',
      title: 'ЛСП',
      desc: 'Для тех, кто чувствует глубже',
      gradient: 'linear-gradient(135deg, rgba(244,63,94,0.15), rgba(225,29,72,0.05))',
      accent: '#f43f5e',
      onClick: () => { setSelectedArtistSlug('lsp'); setActiveTab('catalog'); }
    },
    {
      subtitle: 'Последний шанс',
      title: 'Успей до солдаута',
      desc: 'Скидки до 38% на избранные товары',
      gradient: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(109,40,217,0.05))',
      accent: '#7c3aed',
      onClick: () => setActiveTab('catalog')
    }
  ];

  const handleArtistClick = (slug) => {
    setSelectedArtistSlug(slug);
    setActiveTab('catalog');
  };

  return (
    <div className="font-ui text-slate-300">
      {/* Hero Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {banners.map((banner, idx) => (
          <div
            key={idx}
            className={`hero-banner animate-rise animate-rise-${idx + 1}`}
            style={{ background: banner.gradient }}
            onClick={banner.onClick}
          >
            <div className="hero-banner-content">
              <span className="hero-banner-subtitle" style={{ color: banner.accent }}>
                {banner.subtitle}
              </span>
              <h2 className="hero-banner-title">{banner.title}</h2>
              <p className="hero-banner-desc">{banner.desc}</p>
              <button 
                className="hero-banner-cta btn-sheen"
                style={{ background: banner.accent, color: '#0f172a' }}
                onClick={(e) => { e.stopPropagation(); banner.onClick(); }}
              >
                Смотреть <SvgRocket className="w-3.5 h-3.5" color="#0f172a" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Breadcrumb / Section Intro */}
      <div className="flex items-center gap-2 text-sm text-white/30 mb-8 animate-rise">
        <span className="text-white/50">Главная</span>
        <span>/</span>
        <span className="text-gradient-gold animate-ember">Новинки</span>
      </div>

      {/* New Arrivals */}
      <div className="mb-12 animate-section animate-section-1">
        <div className="section-header">
          <h2 className="section-header-title flex items-center gap-2">
            <SvgFlame className="w-5 h-5" color="#f43f5e" /> Новинки
          </h2>
          <button onClick={() => setActiveTab('catalog')} className="section-header-link">
            Смотреть все →
          </button>
        </div>

        <div className="product-grid">
          {featuredItems.map((item, idx) => {
            const isWishlisted = wishlist.some(w => w.id === item.id);
            return (
              <div key={item.id} className="product-card-vsrap product-card-hover-float" onClick={() => onViewProduct?.(item)}>
                <div className="product-card-image">
                  <div className="product-card-svg">
                    <SvgNoPhoto className="w-24 h-24" color="#64748b" />
                  </div>
                  <div className="product-card-badges">
                    <span className="product-badge product-badge-new">Новинка</span>
                    {item.condition === 'secondhand' && <span className="product-badge product-badge-sale">Sale</span>}
                  </div>
                  <button
                    className="product-card-wishlist"
                    onClick={(e) => { e.stopPropagation(); addToWishlist(item); }}
                    type="button"
                    aria-label={isWishlisted ? 'Убрать из избранного' : 'Добавить в избранное'}
                  >
                    <SvgWishlist className="w-4 h-4" color={isWishlisted ? "#f43f5e" : "#fff"} fill={isWishlisted ? "#f43f5e" : "none"} />
                  </button>
                </div>
                <div className="product-card-info">
                  <div className="product-card-artist">
                    <SvgDisc className="w-3 h-3 inline-block mr-1" color="#64748b" />
                    {item.artist.name}
                  </div>
                  <h3 className="product-card-name">{item.name}</h3>
                  <div className="product-card-sizes">
                    {['S', 'M', 'L', 'XL'].map(s => (
                      <button key={s} className="size-pill">{s}</button>
                    ))}
                  </div>
                  <div className="product-card-footer">
                    <span className="product-card-price">{item.price.toLocaleString('ru-RU')} ₽</span>
                    <button 
                      className="product-card-buy"
                      onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                    >
                      <SvgBag className="w-3.5 h-3.5" color="#0f172a" /> Купить
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Brand Collaborations */}
      <div className="mb-12 animate-section animate-section-2">
        <div className="section-header">
          <h2 className="section-header-title flex items-center gap-2">
            <SvgStar className="w-5 h-5" color="#f59e0b" /> Коллаборации
          </h2>
          <button onClick={() => setActiveTab('catalog')} className="section-header-link">
            Все бренды →
          </button>
        </div>
        <div className="brand-grid">
          {artists.map((artist, idx) => {
            const IconComp = artistIcons[artist.slug];
            const itemCount = items.filter(i => i.artist.slug === artist.slug).length;
            return (
              <div
                key={artist.id}
                className={`brand-card animate-rise animate-rise-${Math.min(idx + 1, 5)}`}
                onClick={() => handleArtistClick(artist.slug)}
              >
                {IconComp && (
                  <div className="brand-card-icon">
                    <IconComp className="w-10 h-10" />
                  </div>
                )}
                <div className="brand-card-name">{artist.name}</div>
                <div className="brand-card-items">{itemCount} товаров</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 animate-section animate-section-3">
        <div className="sticker sticker-yellow aspect-auto h-auto p-5 wiggle-1 animate-float" style={{ minHeight: 'auto', animationDelay: '0s' }}>
          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <SvgRocket className="w-4 h-4" color="#f59e0b" /> Собственная коллекция
          </h4>
          <p className="text-xs text-white/50 font-accent">Создаём мерч в коллаборации с артистами</p>
        </div>
        <div className="sticker sticker-green aspect-auto h-auto p-5 animate-float" style={{ minHeight: 'auto', animationDelay: '0.3s' }}>
          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <SvgRocket className="w-4 h-4" color="#10b981" /> Доставка по РФ и миру
          </h4>
          <p className="text-xs text-white/50 font-accent">Оперативно отправляем в любой регион</p>
        </div>
        <div className="sticker sticker-pink aspect-auto h-auto p-5 animate-float" style={{ minHeight: 'auto', animationDelay: '0.6s' }}>
          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <SvgCrown className="w-4 h-4" color="#f43f5e" /> 100% оригиналы
          </h4>
          <p className="text-xs text-white/50 font-accent">Каждая вещь проверена на подлинность</p>
        </div>
      </div>

      <div className="animate-section"><Marquee artists={artists} /></div>
    </div>
  );
};

export default Home;
