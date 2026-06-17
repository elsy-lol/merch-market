import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  SvgCrown, SvgCheck, SvgProfile, SvgTag,
  SvgFloppy, SvgDisc,
  SvgCassetteSticker, SvgStar,
  SvgBag, SvgCart, SvgWishlist, SvgCamera, SvgMusicNote,
  SvgParty, SvgHourglass,
} from '../components/CustomSvg';

const API_BASE = 'http://127.0.0.1:8000/api';

const STATUS_LABELS: Record<string, string> = {
  delivered: 'Доставлено',
  shipped: 'В пути',
  processing: 'Обработка',
};

const STATUS_COLORS: Record<string, string> = {
  delivered: 'product-badge-new',
  shipped: 'product-badge-tour',
  processing: 'product-badge-limited',
};

interface Order {
  id: number;
  created_at: string;
  total: number;
  status: string;
  items: { product_name: string }[];
}

interface Stats {
  total_orders: number;
  total_spent: number;
}

const Profile = () => {
  const { user, updateProfile, fetchWithAuth } = useAuth();
  const [displayName, setDisplayName] = useState(user?.display_name || '');
  const [favoriteArtist, setFavoriteArtist] = useState(user?.favorite_artist || '');
  const [showSavedMsg, setShowSavedMsg] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats>({ total_orders: 0, total_spent: 0 });

  useEffect(() => {
    if (user) {
      setDisplayName(user.display_name || '');
      setFavoriteArtist(user.favorite_artist || '');
      fetchWithAuth(`${API_BASE}/auth/profile/`)
        .then(r => r.json())
        .then((data: { orders?: Order[]; stats?: Stats }) => {
          setOrders(data.orders || []);
          setStats(data.stats || { total_orders: 0, total_spent: 0 });
        })
        .catch(() => {});
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ display_name: displayName, favorite_artist: favoriteArtist });
      setShowSavedMsg(true);
      setTimeout(() => setShowSavedMsg(false), 3000);
    } catch {}
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('ru-RU').format(num) + ' ₽';
  };

  return (
    <div className="font-ui text-slate-300 max-w-4xl mx-auto px-2 animate-section animate-section-1">
      {/* ===== Заголовок ===== */}
      <div className="flex flex-col items-center mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider section-title flex items-center gap-3 mb-2 animate-rise">
          <SvgProfile className="w-6 h-6" color="#f59e0b" /> Профиль магазина
        </h2>
        <p className="text-base text-amber-400/70 font-accent">
          {user?.display_name || user?.username}
        </p>
      </div>

      {/* ===== 1. СТАТИСТИКА (4 карточки) ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        <div className="sticker sticker-orange aspect-auto p-4 md:p-5 flex flex-col items-center justify-center gap-2 cursor-pointer">
          <SvgBag className="w-6 h-6 md:w-7 md:h-7" color="#f97316" />
          <span className="text-2xl md:text-3xl font-bold text-white">{stats.total_orders}</span>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/50">Заказов</span>
        </div>
        <div className="sticker sticker-cyan aspect-auto p-4 md:p-5 flex flex-col items-center justify-center gap-2 cursor-pointer">
          <SvgDisc className="w-6 h-6 md:w-7 md:h-7" color="#06b6d4" />
          <span className="text-2xl md:text-3xl font-bold text-white">{orders.length}</span>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/50">Товаров</span>
        </div>
        <div className="sticker sticker-pink aspect-auto p-4 md:p-5 flex flex-col items-center justify-center gap-2 cursor-pointer">
          <SvgWishlist className="w-6 h-6 md:w-7 md:h-7" color="#f43f5e" />
          <span className="text-2xl md:text-3xl font-bold text-white">{(stats.total_spent / 1000).toFixed(0)}k</span>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/50">Потрачено</span>
        </div>
        <div className="sticker sticker-yellow aspect-auto p-4 md:p-5 flex flex-col items-center justify-center gap-2 cursor-pointer">
          <SvgCrown className="w-6 h-6 md:w-7 md:h-7" color="#f59e0b" />
          <span className="text-lg md:text-2xl font-bold text-white text-center leading-tight">
            <span className="text-gradient-gold">
              {stats.total_orders > 10 ? 'Платина' : stats.total_orders > 5 ? 'Золото' : 'Серебро'}
            </span>
          </span>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/50">Ранг</span>
        </div>
      </div>

      {/* ===== 2. РЕДАКТИРОВАНИЕ ПРОФИЛЯ ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-section animate-section-2">
        <div className="sticker sticker-yellow aspect-auto p-6 flex flex-col items-center justify-center gap-4 cursor-pointer">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-white/5 border-2 border-amber-500/20 flex items-center justify-center hover:scale-105 transition-transform">
              <SvgCrown className="w-12 h-12" color="#f59e0b" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-amber-500 border-2 border-[#0a0a0f] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <SvgCamera className="w-4 h-4" color="#0f172a" />
            </div>
          </div>
          <h3 className="text-xl font-bold uppercase text-white">{displayName || user?.username}</h3>
          {favoriteArtist && (
            <span className="badge-marker text-sm gap-1.5">
              <SvgTag className="w-3.5 h-3.5" color="#f59e0b" /> {favoriteArtist}
            </span>
          )}
        </div>

        <div className="md:col-span-2">
          <div className="sticker sticker-green aspect-auto p-6">
            <h3 className="text-lg md:text-xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
              <SvgParty className="w-5 h-5" color="#10b981" /> Редактировать профиль
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-white/70 mb-1">Как тебя зовут?</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-amber-500/30 focus:outline-none rounded-md px-3 py-2.5 text-base font-ui text-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white/70 mb-1">Любимый артист:</label>
                <select
                  value={favoriteArtist}
                  onChange={(e) => setFavoriteArtist(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-amber-500/30 focus:outline-none rounded-md px-3 py-2.5 text-base font-ui text-white transition-colors"
                >
                  <option value="">—</option>
                  <option value="GONE.Fludd">GONE.Fludd</option>
                  <option value="ЛСП">ЛСП</option>
                  <option value="Pharaoh">Pharaoh</option>
                  <option value="Oxxxymiron">Oxxxymiron</option>
                  <option value="Скриптонит">Скриптонит</option>
                  <option value="Гуф">Гуф</option>
                  <option value="Miyagi">Miyagi</option>
                  <option value="Boulevard Depo">Boulevard Depo</option>
                  <option value="ATL">ATL</option>
                  <option value="FACE">FACE</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <button type="submit" className="btn-gold">
                  <SvgFloppy className="w-4 h-4 inline-block align-middle mr-1" color="#0f172a" /> Сохранить
                </button>

                {showSavedMsg && (
                  <span className="text-emerald-400 font-accent text-base flex items-center gap-1 animate-rise">
                    <SvgCheck className="w-4 h-4" /> Сохранено!
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ===== 3. ИСТОРИЯ ЗАКАЗОВ ===== */}
      <div className="mb-12 animate-section animate-section-3">
        <div className="sticker sticker-orange aspect-auto p-6 md:p-8">
          <h3 className="text-lg md:text-xl font-bold uppercase text-white mb-6 flex items-center gap-2">
            <SvgCart className="w-5 h-5" color="#f97316" /> История заказов
          </h3>

          {orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/40 font-accent text-lg">У тебя пока нет заказов</p>
              <p className="text-white/20 text-sm mt-2">Оформи первый заказ в каталоге!</p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:border-amber-500/20"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <SvgDisc className="w-5 h-5 md:w-6 md:h-6" color="#f59e0b" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm md:text-base font-bold text-white truncate">
                        Заказ #{order.id} — {order.items.map(i => i.product_name).join(', ')}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <SvgHourglass className="w-3 h-3" color="#64748b" />
                        <span className="text-xs text-white/40">{formatDate(order.created_at)}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className="text-sm md:text-base font-bold text-amber-400">{formatPrice(order.total)}</span>
                      <span className={`product-badge ${STATUS_COLORS[order.status] || 'product-badge-new'}`}>
                        {STATUS_LABELS[order.status] || order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-white/40 font-accent">
                  Показано {orders.length} заказов
                </span>
                <span className="text-sm font-bold text-white/60">
                  Всего потрачено: <span className="text-amber-400">{formatPrice(stats.total_spent)}</span>
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
