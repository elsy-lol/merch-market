import React from 'react';
import { SvgCrown, SvgMemo, SvgGuitar, SvgShield, SvgRecycle, SvgRocket, SvgStar, SvgFlame, SvgDisc, SvgBag, SvgParty } from '../components/CustomSvg';

const About = () => {
  const stats = [
    { value: '10+', label: 'Артистов', icon: SvgCrown, color: '#f59e0b' },
    { value: '60+', label: 'Товаров', icon: SvgBag, color: '#06b6d4' },
    { value: '100%', label: 'Оригиналы', icon: SvgShield, color: '#10b981' },
  ];

  const values = [
    {
      icon: SvgShield,
      color: '#10b981',
      title: 'Проверка каждого лота',
      desc: 'Эксперты сверяют бирки, принты, плотность ткани и швы. Только оригинальные вещи от артистов.',
    },
    {
      icon: SvgStar,
      color: '#f59e0b',
      title: 'Редкие коллекционные позиции',
      desc: 'Винтажные футболки с туров, подписанные кассеты — то, чего нет в масс-маркете.',
    },
    {
      icon: SvgRecycle,
      color: '#22c55e',
      title: 'Вторая жизнь мерчу',
      desc: 'Секонд-хенд — вклад в экологию и шанс забрать раритет с историей.',
    },
    {
      icon: SvgFlame,
      color: '#f43f5e',
      title: 'Свежие дропы',
      desc: 'Первыми узнаём о новых коллаборациях и лимитированных коллекциях.',
    },
    {
      icon: SvgRocket,
      color: '#a855f7',
      title: 'Доставка по всей России',
      desc: 'Отправляем в любой регион. Трекинг — сразу после оформления.',
    },
    {
      icon: SvgParty,
      color: '#f59e0b',
      title: 'Сообщество фанатов',
      desc: 'Мы не магазин, мы тусовка. Общий чат, обмен мерчем и ламповый вайб.',
    },
  ];

  return (
    <div className="font-ui text-slate-300 max-w-4xl mx-auto">
      {/* Hero */}
      <div className="relative text-center mb-14 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 text-xs font-accent mb-5 animate-rise">
          <SvgMemo className="w-3.5 h-3.5" color="#f59e0b" /> Кто мы такие
        </div>
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-white leading-tight mb-4 animate-rise">
          <span className="text-gradient-gold animate-ember">МЕРЧ</span>
          <br />
          <span className="text-white/70">ДЛЯ СВОИХ</span>
        </h1>
        <p className="text-sm md:text-base text-white/40 font-accent max-w-lg mx-auto leading-relaxed animate-rise">
          Sticker Merch — маркетплейс мерча российских артистов. 
          От новых дропов до редкого винтажа из личных коллекций.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-14">
        {stats.map((s, i) => (
          <div key={i} className="sticker sticker-yellow aspect-auto h-auto p-4 md:p-5 text-center animate-section animate-section-1" style={{ animationDelay: `${i * 0.1}s` }}>
            <s.icon className="w-6 h-6 mx-auto mb-2" color={s.color} />
            <div className="text-xl md:text-2xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-white/40 font-accent mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Manifesto */}
      <div className="sticker sticker-orange aspect-auto w-full h-auto p-6 md:p-8 mb-8 animate-section animate-section-2">
        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
          <SvgGuitar className="w-5 h-5" color="#f59e0b" /> Манифест
        </h2>
        <div className="space-y-3 text-sm md:text-base leading-relaxed text-white/70 font-accent">
          <p>
            Мы выросли на GONE.Fludd, ЛСП, Pharaoh, Oxxxymiron, Скриптоните, Гуфе, Miyagi, Boulevard Depo, ATL и FACE. Мы помним, как достать официальный мерч было квестом. 
            Футболки с туров хранили как семейные реликвии, а редкие кассеты передавали из рук в руки.
          </p>
          <p>
            Sticker Merch родился из любви к музыке и желания сделать мерч доступным. 
            Здесь каждый найдёт вещь по душе — будь то свежий дроп или винтаж с историей.
          </p>
          <p className="text-white/40 italic text-sm">
            Никаких реплик. Только оригиналы. Только культура.
          </p>
        </div>
      </div>

      {/* Values Grid */}
      <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white mb-5 flex items-center gap-2 animate-section animate-section-2">
        <SvgFlame className="w-5 h-5" color="#f43f5e" /> Почему мы?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {values.map((v, i) => (
          <div key={i} className="sticker sticker-green aspect-auto h-auto p-5 animate-rise flex flex-col" style={{ animationDelay: `${i * 0.06}s` }}>
            <v.icon className="w-6 h-6 mb-2" color={v.color} />
            <h4 className="text-sm font-bold text-white mb-1">{v.title}</h4>
            <p className="text-xs text-white/50 font-accent leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center py-6 border-t border-white/5 animate-section">
        <p className="text-sm text-white/30 font-accent">
          Присоединяйся к комьюнити —{' '}
          <span className="text-gradient-gold font-bold">STICKER MERCH</span>
        </p>
        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-white/20 font-accent">
          <span className="flex items-center gap-1"><SvgDisc className="w-3 h-3" color="#64748b" /> Discord</span>
          <span className="flex items-center gap-1"><SvgCrown className="w-3 h-3" color="#64748b" /> VK</span>
          <span className="flex items-center gap-1"><SvgStar className="w-3 h-3" color="#64748b" /> Telegram</span>
        </div>
      </div>
    </div>
  );
};

export default About;
