import React from 'react';
import { 
  SvgTshirtSticker, 
  SvgHoodieSticker, 
  SvgVinylSticker, 
  SvgCassetteSticker, 
  SvgCapSticker, 
  SvgAccessorySticker, 
  SvgTrash,
  SvgPin,
  SvgWishlist,
  SvgBrokenHeart,
  SvgSad,
  SvgBag
} from '../components/CustomSvg';
import type { ProductItem } from '../types';

interface WishlistProps {
  wishlist: ProductItem[];
  removeFromWishlist: (id: number) => void;
  addToCart: (product: ProductItem) => void;
  onViewProduct: (product: ProductItem) => void;
}

const Wishlist = ({ wishlist, removeFromWishlist, addToCart, onViewProduct }: WishlistProps) => {
  const getStickerIcon = (type: string, color: string) => {
    switch (type) {
      case 'tshirt': return <SvgTshirtSticker className="w-20 h-20" color={color} />;
      case 'hoodie': return <SvgHoodieSticker className="w-20 h-20" color={color} />;
      case 'vinyl': return <SvgVinylSticker className="w-20 h-20" color={color} />;
      case 'cassette': return <SvgCassetteSticker className="w-20 h-20" color={color} />;
      case 'cap': return <SvgCapSticker className="w-20 h-20" color={color} />;
      default: return <SvgAccessorySticker className="w-20 h-20" color={color} />;
    }
  };

  const handleMoveToCart = (item: ProductItem) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <div className="font-ui text-slate-300 animate-section animate-section-1">
      <div className="flex flex-col items-center mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider section-title flex items-center gap-3 mb-2 animate-rise">
          <SvgWishlist className="w-6 h-6" color="#f43f5e" fill="#f43f5e" /> Вишлист
        </h2>
        <p className="text-base text-amber-400/70 font-accent">
          Товары, которые ты хочешь заполучить
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="sticker sticker-yellow aspect-auto w-full h-auto p-8 wiggle-2 text-center max-w-xl mx-auto">
          <div className="flex justify-center gap-3 mb-4">
            <SvgBrokenHeart className="w-12 h-12" color="#f43f5e" />
            <SvgSad className="w-12 h-12" color="#f43f5e" />
          </div>
          <h3 className="text-2xl font-bold uppercase text-white mb-2">Вишлист пуст</h3>
          <p className="text-base font-accent text-white/50 mb-6">
            Открой каталог и добавь товары в избранное
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((item, idx) => {
            const rotationClass = idx % 3 === 0 ? 'wiggle-1' : idx % 3 === 1 ? 'wiggle-2' : 'wiggle-3';
            
            return (
              <div 
                key={item.id}
                className={`sticker sticker-${item.sticker_color || 'yellow'} flex flex-col justify-between ${rotationClass} h-[360px] p-6 cursor-pointer`}
                onClick={() => onViewProduct?.(item)}
              >
                <div className="flex justify-between items-start z-10">
                  <span className="badge-marker text-xs">
                    {item.condition === 'new' ? 'Новинка' : 'Винтаж'}
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeFromWishlist(item.id); }}
                    className="text-white/40 hover:text-rose-400 hover:scale-125 transition-transform p-1 border-none bg-transparent"
                  >
                    <SvgTrash className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex justify-center my-2 relative z-10 hover:scale-105 transition-transform duration-300">
                  {getStickerIcon(item.image_sticker_type, '#ffffff')}
                </div>

                <div className="z-10">
                  <div className="text-xs text-white/50 font-accent">
                    {item.artist.name} {item.is_original && '• Оригинал'}
                  </div>
                  <h3 className="text-lg font-bold truncate text-white mt-0.5">{item.name}</h3>
                  
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                    <span className="text-xl font-bold text-gradient-gold">{item.price.toLocaleString('ru-RU')} ₽</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleMoveToCart(item); }}
                      className="btn-gold text-sm py-1.5 px-3"
                    >
                      <SvgBag className="w-3.5 h-3.5 inline-block align-middle mr-1" color="#0f172a" /> Купить
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
