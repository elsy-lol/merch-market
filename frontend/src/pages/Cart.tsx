import React, { useState } from 'react';
import { SvgTrash, SvgCheck, SvgPin, SvgCart, SvgParty, SvgRocket, SvgPackage, SvgWind, SvgWarning, SvgBasket, SvgHourglass, SvgBag } from '../components/CustomSvg';
import type { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  updateCartQuantity: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const Cart = ({ cart, updateCartQuantity, removeFromCart, clearCart }: CartProps) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccessMsg, setOrderSuccessMsg] = useState('');
  const [orderError, setOrderError] = useState('');

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    setIsCheckingOut(true);
    setOrderError('');
    
    try {
      const response = await fetch('http://127.0.0.1:8001/api/checkout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            id: item.id,
            quantity: item.quantity
          }))
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setOrderSuccessMsg(data.message);
        clearCart();
      } else {
        setOrderError(data.error || 'Произошла ошибка при оформлении заказа.');
      }
    } catch (err) {
      setOrderError('Не удалось связаться с сервером бэкенда.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="font-ui text-slate-300 max-w-3xl mx-auto px-2 animate-section animate-section-1">
      <div className="flex flex-col items-center mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider section-title flex items-center gap-3 mb-2 animate-rise">
          <SvgCart className="w-6 h-6" color="#f59e0b" /> Корзина
        </h2>
        <p className="text-base text-amber-400/70 font-accent">
          Твои будущие покупки
        </p>
      </div>

      {orderSuccessMsg ? (
        <div className="sticker sticker-green aspect-auto w-full h-auto p-8 wiggle-1 text-center">
          <div className="flex justify-center gap-3 mb-4">
            <SvgParty className="w-12 h-12" color="#f59e0b" />
            <SvgRocket className="w-12 h-12" color="#f43f5e" />
          </div>
          <h3 className="text-2xl font-bold text-emerald-400 uppercase mb-3">Заказ принят!</h3>
          <p className="text-lg font-accent text-white/70 leading-relaxed mb-6">
            {orderSuccessMsg}
          </p>
          <span className="inline-block text-xs uppercase bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full font-bold text-emerald-400">
            <SvgPackage className="w-3.5 h-3.5 inline-block align-middle mr-1" /> Статус: В обработке
          </span>
        </div>
      ) : cart.length === 0 ? (
        <div className="sticker sticker-yellow aspect-auto w-full h-auto p-8 wiggle-2 text-center">
          <div className="flex justify-center gap-3 mb-4">
            <SvgWind className="w-12 h-12" color="#64748b" />
            <SvgPackage className="w-12 h-12" color="#64748b" />
          </div>
          <h3 className="text-2xl font-bold uppercase text-white mb-2">В корзине пусто</h3>
          <p className="text-base font-accent text-white/50 mb-6">
            Ты ещё не добавил ни одного товара. Открой каталог и выбери что-то крутое!
          </p>
        </div>
      ) : (
        <div className="notebook-paper mb-12">
          <h3 className="text-xl md:text-2xl font-bold mb-6 uppercase tracking-wider text-white">
            Спецификация заказа
          </h3>

          <div className="space-y-5">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10"
              >
                <div>
                  <div className="text-xs text-white/40 font-accent uppercase">
                    {item.artist.name} {item.is_original && '• Оригинал'}
                  </div>
                  <h4 className="text-lg font-bold text-white leading-tight">
                    {item.name}
                  </h4>
                  <div className="text-sm font-accent text-white/50">
                    {item.size && `Размер: ${item.size} • `}{item.condition === 'new' ? 'Новый' : 'Секонд'}
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-between sm:justify-end">
                  <div className="flex items-center gap-2 border border-white/20 rounded-md px-2 bg-white/5">
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="font-bold text-lg hover:scale-125 transition-transform px-1 border-none bg-transparent text-white/70"
                    >
                      -
                    </button>
                    <span className="font-bold text-base min-w-[20px] text-center text-white">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="font-bold text-lg hover:scale-125 transition-transform px-1 border-none bg-transparent text-white/70"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-lg font-bold text-gradient-gold min-w-[90px] text-right">
                    {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-rose-400 hover:text-rose-300 hover:scale-110 transition-transform p-1 border-none bg-transparent cursor-pointer"
                  >
                    <SvgTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center text-xl md:text-2xl font-bold mb-6">
              <span className="text-white/80">Итого к оплате:</span>
              <span className="text-gradient-gold">{totalPrice.toLocaleString('ru-RU')} ₽</span>
            </div>

            {orderError && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 font-bold px-4 py-2 rounded mb-4 text-sm">
                <SvgWarning className="w-4 h-4 inline-block align-middle mr-1" color="#f43f5e" /> Ошибка: {orderError}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-6">
              <button 
                onClick={clearCart}
                className="text-white/40 hover:text-white/70 underline font-accent text-base border-none bg-transparent cursor-pointer transition-colors"
              >
                <SvgBasket className="w-3.5 h-3.5 inline-block align-middle mr-1" /> Очистить корзину
              </button>

              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:scale-105 transition-all text-base uppercase ${isCheckingOut ? 'opacity-50 cursor-wait' : ''} border-none cursor-pointer`}
              >
                {isCheckingOut ? <span><SvgHourglass className="w-4 h-4 inline-block align-middle mr-1" /> Оформление...</span> : <span><SvgRocket className="w-4 h-4 inline-block align-middle mr-1" /> Оформить заказ</span>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
