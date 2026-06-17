import React, { useState, useMemo } from 'react';
import { 
  SvgNoPhoto,
  SvgWishlist,
  SvgSearch,
  SvgCheck,
  SvgBag,
  SvgDisc
} from '../components/CustomSvg';
import artistIcons from '../components/ArtistIcons';
import type { Artist, ProductItem } from '../types';

interface Option { value: string; label: string; color?: string; }

const SORT_OPTIONS: Option[] = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'price-asc', label: 'Цена: по возрастанию' },
  { value: 'price-desc', label: 'Цена: по убыванию' },
  { value: 'name-asc', label: 'Название: А-Я' },
  { value: 'name-desc', label: 'Название: Я-А' },
];

const CONDITION_OPTIONS: Option[] = [
  { value: 'all', label: 'Все', color: 'cyan' },
  { value: 'new', label: 'Новое', color: 'green' },
  { value: 'secondhand', label: 'Б/У', color: 'pink' },
];

interface CatalogProps {
  artists: Artist[];
  items: ProductItem[];
  addToCart: (product: ProductItem) => void;
  addToWishlist: (product: ProductItem) => void;
  wishlist: ProductItem[];
  selectedArtistSlug: string;
  setSelectedArtistSlug: (slug: string) => void;
  onViewProduct: (product: ProductItem) => void;
  loading: boolean;
}

const Catalog = ({ 
  artists, 
  items, 
  addToCart, 
  addToWishlist, 
  wishlist,
  selectedArtistSlug,
  setSelectedArtistSlug,
  onViewProduct,
  loading
}: CatalogProps) => {
  const [filterCondition, setFilterCondition] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [searchArtist, setSearchArtist] = useState('');
  const [searchMerch, setSearchMerch] = useState('');

  const selectedArtist = artists.find(a => a.slug === selectedArtistSlug);

  const artistItems = useMemo(() => {
    if (!selectedArtistSlug) return [];
    return items.filter(item => item.artist.slug === selectedArtistSlug);
  }, [items, selectedArtistSlug]);

  const processedItems = useMemo(() => {
    const search = searchMerch.toLowerCase().trim();

    let result = artistItems.filter(item => {
      // Filter by search query (name + description)
      if (search) {
        const matchesSearch =
          item.name.toLowerCase().includes(search) ||
          (item.description && item.description.toLowerCase().includes(search));
        if (!matchesSearch) return false;
      }

      // Filter by condition
      if (filterCondition === 'all') return true;
      return item.condition === filterCondition;
    });

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name, 'ru'));
        break;
    }

    return result;
  }, [artistItems, filterCondition, sortBy, searchMerch]);

  const getArtistIcon = (slug: string | undefined, size = "w-12 h-12") => {
    const Icon = slug ? artistIcons[slug] : null;
    if (!Icon) return null;
    const colors: Record<string, string> = {
      'gonefludd': '#ec4899', 'lsp': '#f43f5e', 'pharaoh': '#f59e0b',
      'oxxxymiron': '#f97316', 'skryptonite': '#10b981', 'guf': '#f59e0b',
      'miyagi': '#10b981', 'boulevard-depo': '#f43f5e', 'atl': '#06b6d4', 'face': '#f97316',
    };
    return <Icon className={size} color={slug ? (colors[slug] || '#f59e0b') : '#f59e0b'} />;
  };

  return (
    <div className="font-ui text-slate-300 animate-section animate-section-1">
      {!selectedArtistSlug ? (loading ? (
        <div>
          <div className="flex flex-col items-center mb-4 text-center">
            <div className="skeleton-text" style={{ width: 100, height: 20, margin: '0 auto 4px' }} />
            <div className="skeleton-text" style={{ width: 200, height: 12, margin: '0 auto' }} />
          </div>
          <div className="max-w-md mx-auto mb-4 px-4">
            <div className="skeleton" style={{ height: 32, width: '100%', borderRadius: 8 }} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-5xl mx-auto px-4">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="skeleton-card" style={{ height: 140 }} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center mb-4 text-center">
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider section-title mb-0.5 animate-rise">
              Артисты
            </h2>
            <p className="text-xs text-amber-400/70 font-accent max-w-xl">
              Нажми на карточку, чтобы открыть коллекцию мерча
            </p>
          </div>

          {/* Поле поиска артистов */}
          <div className="max-w-lg mx-auto mb-10 px-4">
            <div className="sticker sticker-cyan aspect-auto h-auto p-1.5">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <SvgSearch className="w-5 h-5 text-white/30" />
                </span>
                <input
                  type="text"
                  value={searchArtist}
                  onChange={(e) => setSearchArtist(e.target.value)}
                  placeholder="Поиск артиста..."
                  className="w-full bg-transparent border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white text-sm placeholder-white/20 outline-none transition-all duration-200 focus:border-amber-500/40 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>

          {artists.filter(a => a.name.toLowerCase().includes(searchArtist.toLowerCase())).length === 0 ? (
            <div className="empty-state max-w-xl mx-auto px-4">
              <SvgSearch className="w-14 h-14 mx-auto mb-4" color="#64748b" />
              <h3 className="text-xl text-white font-bold text-center">Ничего не найдено</h3>
              <p className="text-base text-amber-400/70 font-accent mt-2 text-center">
                Попробуй изменить запрос или выбери другого артиста
              </p>
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
            {artists.filter(a => a.name.toLowerCase().includes(searchArtist.toLowerCase())).map((artist, idx) => {
              const colors = ['yellow', 'pink', 'cyan', 'green', 'orange'];
              const noteColor = colors[idx % colors.length];
              const wiggleClass = `wiggle-${(idx % 5) + 1}`;
              const emoji = getArtistIcon(artist.slug, "w-10 h-10");
              const itemCount = items.filter(i => i.artist.slug === artist.slug).length;
              const newCount = items.filter(i => i.artist.slug === artist.slug && i.condition === 'new').length;
              const artistTags: Record<string, string> = {
                'gonefludd': 'психоделика',
                'lsp': 'инди-рэп',
                'pharaoh': 'клауд-рэп',
                'oxxxymiron': 'интеллект',
                'skryptonite': 'бит-музыка',
                'guf': 'олдскул',
                'miyagi': 'рэп-регги',
                'boulevard-depo': 'неон-трэп',
                'atl': 'андеграунд',
                'face': 'поп-рэп',
              };
              const tag = artistTags[artist.slug] || 'рэп';

              return (
                <div 
                  key={artist.id}
                  onClick={() => {
                    setSelectedArtistSlug(artist.slug);
                    setSearchMerch('');
                    setSearchArtist('');
                  }}
                  className={`sticker sticker-${noteColor} ${wiggleClass} flex flex-col items-center p-5 cursor-pointer relative text-center`}
                >
                  <div className="mb-2 flex justify-center">
                    {emoji}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white leading-tight mb-0.5">
                    {artist.name}
                  </h3>
                  <span className="text-[10px] text-amber-400/50 font-accent tracking-widest uppercase mb-3 px-2 py-0.5 rounded-full border border-white/5 bg-white/[0.03]">
                    {tag}
                  </span>
                  <div className="flex items-center justify-center gap-2 mt-auto pt-2 border-t border-white/10 w-full">
                    <span className="text-[11px] font-bold text-white/40">
                      {itemCount} товаров
                    </span>
                    {newCount > 0 && (
                      <span className="text-[11px] font-bold text-emerald-400/60">
                        · {newCount} новых
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      )) : (
        <div>
          <div className="sticker sticker-cyan aspect-auto h-auto p-4 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={() => {
                  setSelectedArtistSlug('');
                  setSortBy('default');
                  setFilterCondition('all');
                  setSearchMerch('');
                  setSearchArtist('');
                }}
                className="btn-glass flex items-center gap-2 text-sm"
              >
                ← Назад
              </button>

              <div className="flex-1 min-w-[140px]">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SvgSearch className="w-4 h-4 text-white/30" />
                  </span>
                  <input
                    type="text"
                    value={searchMerch}
                    onChange={(e) => setSearchMerch(e.target.value)}
                    placeholder="Поиск мерча..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-3 text-white text-sm placeholder-white/20 outline-none transition-all duration-200 focus:border-amber-500/40 backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {CONDITION_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setFilterCondition(opt.value)}
                    className={`px-3 py-1.5 text-sm font-bold rounded-md transition-all cursor-pointer border-none ${
                      filterCondition === opt.value
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {opt.label}
                    {filterCondition === opt.value && <SvgCheck className="w-3.5 h-3.5 inline-block ml-1" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="sticker sticker-orange aspect-auto w-full h-auto p-5 md:p-7 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
              <span className="flex-shrink-0 opacity-80">
                {getArtistIcon(selectedArtist?.slug, "w-14 h-14 md:w-16 md:h-16")}
              </span>
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-white mb-1 leading-none">
                  {selectedArtist?.name}
                </h2>
                <p className="text-sm md:text-base text-white/60 leading-relaxed font-accent max-w-2xl">
                  {selectedArtist?.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-white/10">
              <div className="text-sm font-bold text-white/60">
                {processedItems.length} товаров
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs text-white/40 font-accent">Сортировка:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm font-bold bg-white/5 border border-white/10 rounded px-3 py-1.5 text-white/80 cursor-pointer outline-none focus:border-amber-500/30 transition-colors"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {processedItems.length === 0 ? (
            <div className="empty-state max-w-xl mx-auto">
              <SvgSearch className="w-12 h-12 mx-auto mb-4" color="#64748b" />
              <h3 className="text-xl text-white font-bold">Ничего не найдено</h3>
              <p className="text-base text-amber-400/70 font-accent mt-2">
                Попробуй изменить фильтры или выбери другого артиста
              </p>
            </div>
          ) : (
            <div className="product-grid">
              {processedItems.map((item, idx) => {
                const isWishlisted = wishlist.some(w => w.id === item.id);

                return (
                  <div
                    key={item.id}
                    className="product-card-vsrap product-card-hover-float"
                    onClick={() => onViewProduct?.(item)}
                  >
                    <div className="product-card-image">
                      <div className="product-card-svg">
                        <SvgNoPhoto className="w-24 h-24" color="#64748b" />
                      </div>
                      <div className="product-card-badges">
                        <span className="product-badge product-badge-new">Новинка</span>
                        {item.condition === 'secondhand' && (
                          <span className="product-badge product-badge-sale">Sale</span>
                        )}
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
          )}
        </div>
      )}
    </div>
  );
};

export default Catalog;
