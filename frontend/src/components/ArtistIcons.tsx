import React from 'react';

/**
 * GONE.Fludd — Психоделический чупа-чупс
 * Круглый леденец на палочке со спиралью внутри и декоративными точками.
 */
export const ArtistGonefludd = ({ className = "w-12 h-12", color = "#ec4899" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="18.5" y="26" width="3" height="12" rx="1.5" fill={color} fillOpacity="0.35" />
    <circle cx="20" cy="15" r="12" stroke={color} strokeWidth="2.5" />
    <path d="M20 15 Q20 9 26 9 Q32 9 32 15 Q32 21 26 21 Q20 21 20 15" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
    <circle cx="14" cy="10" r="1.5" fill={color} fillOpacity="0.6" />
    <circle cx="27" cy="9" r="1" fill={color} fillOpacity="0.5" />
    <circle cx="13" cy="20" r="1.2" fill={color} fillOpacity="0.5" />
    <circle cx="28" cy="21" r="1.5" fill={color} fillOpacity="0.6" />
  </svg>
);

/**
 * ЛСП — Кассета с разбитым сердцем
 * Аудиокассета с разбитым сердцем на лейбле.
 */
export const ArtistLsp = ({ className = "w-12 h-12", color = "#f43f5e" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="10" width="28" height="20" rx="4" stroke={color} strokeWidth="2.5" />
    <path d="M14 30 L16 34 H24 L26 30" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <circle cx="15" cy="20" r="5.5" stroke={color} strokeWidth="2" />
    <circle cx="25" cy="20" r="5.5" stroke={color} strokeWidth="2" />
    <circle cx="15" cy="20" r="2" fill={color} fillOpacity="0.3" />
    <circle cx="25" cy="20" r="2" fill={color} fillOpacity="0.3" />
    <path d="M17 12 L18.5 14 L20 12 Q21.5 10.5 23 12 Q24.5 13.5 23 15 L18.5 20 L14 15 Q12.5 13.5 14 12 Q15.5 10.5 17 12Z" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15" />
    <line x1="18.5" y1="14" x2="17" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Pharaoh — Череп с короной и молнией
 * Символизирует фараона, власть, рок-звезду.
 */
export const ArtistPharaoh = ({ className = "w-12 h-12", color = "#f59e0b" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 18 Q14 10 20 10 Q26 10 26 18 L26 26 Q26 28 24 28 L16 28 Q14 28 14 26 L14 18Z" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1" />
    <circle cx="17" cy="19" r="1.5" fill={color} />
    <circle cx="23" cy="19" r="1.5" fill={color} />
    <path d="M18 23 Q20 25 22 23" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M13 11 L17 8 L20 11 L23 8 L27 11" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    <path d="M31 6 L28 12 L32 12 L30 18" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="34" y1="8" x2="30" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

/**
 * Oxxxymiron — Корона с X.X.X.
 * Символизирует рэп-империю, баттлы, мироновский вайб.
 */
export const ArtistOxxxymiron = ({ className = "w-12 h-12", color = "#f97316" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22 L8 10 L14 14 L20 6 L26 14 L32 10 L28 22" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1" strokeLinejoin="round" />
    <text x="20" y="32" textAnchor="middle" fontSize="8" fontWeight="bold" fill={color} stroke="none" fontFamily="monospace">X.X.X.</text>
    <line x1="12" y1="35" x2="28" y2="35" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <circle cx="20" cy="16" r="1" fill={color} opacity="0.6" />
  </svg>
);

/**
 * Скриптонит — Дом с числом 36 и нотой
 * Атмосфера бит-музыки, 36 Chambers, домашний уют.
 */
export const ArtistSkryptonite = ({ className = "w-12 h-12", color = "#10b981" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="16" width="24" height="18" rx="2" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1" />
    <path d="M6 18 L20 6 L34 18" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    <rect x="16" y="24" width="8" height="10" rx="1" fill={color} fillOpacity="0.2" />
    <text x="20" y="23" textAnchor="middle" fontSize="7" fontWeight="bold" fill={color} stroke="none" fontFamily="monospace">36</text>
    <circle cx="28" cy="10" r="5" stroke={color} strokeWidth="1.5" />
    <line x1="28" y1="6" x2="28" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="28" y1="10" x2="31" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="30" y1="7" x2="28" y2="10" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
  </svg>
);

/**
 * Гуф — Весы качелей (swing balance)
 * Символизирует «баланс», старый бит, улицы, 825.
 */
export const ArtistGuf = ({ className = "w-12 h-12", color = "#f59e0b" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="6" x2="20" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="20" cy="20" r="2" fill={color} />
    <path d="M8 28 L20 20 L32 28" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    <circle cx="8" cy="30" r="4" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15" />
    <circle cx="32" cy="30" r="4" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15" />
    <text x="20" y="38" textAnchor="middle" fontSize="5" fontWeight="bold" fill={color} stroke="none" fontFamily="monospace">825</text>
    <line x1="10" y1="30" x2="30" y2="30" stroke={color} strokeWidth="0.5" opacity="0.2" />
  </svg>
);

/**
 * Miyagi — Горы с солнцем
 * Символизирует кавказские мотивы, природу, Hajime.
 */
export const ArtistMiyagi = ({ className = "w-12 h-12", color = "#10b981" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 30 L14 14 L20 22 L26 10 L36 30" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
    <circle cx="26" cy="16" r="5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1" />
    <circle cx="26" cy="16" r="2" fill={color} fillOpacity="0.3" />
    <path d="M22 16 Q26 12 30 16" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
    <line x1="4" y1="32" x2="36" y2="32" stroke={color} strokeWidth="1" opacity="0.2" />
  </svg>
);

export const ArtistBoulevardDepo = ({ className = "w-12 h-12", color = "#f43f5e" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="14" stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.08" />
    <circle cx="14" cy="18" r="2.5" fill={color} opacity="0.8" />
    <circle cx="26" cy="18" r="2.5" fill={color} opacity="0.8" />
    <path d="M15 25 Q20 28 25 25" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <line x1="14" y1="18" x2="11" y2="15" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="26" y1="18" x2="29" y2="15" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <circle cx="10" cy="14" r="1" fill={color} opacity="0.4" />
    <circle cx="30" cy="14" r="1" fill={color} opacity="0.4" />
  </svg>
);

/**
 * ATL — Лес, луна, волк
 * Символизирует андеграунд, мистику, «Лес» ATL.
 */
export const ArtistAtl = ({ className = "w-12 h-12", color = "#06b6d4" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 34 L10 22 L14 28 L18 18 L22 26 L26 14 L30 22 L36 10" stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round" strokeLinecap="round" opacity="0.6" />
    <line x1="4" y1="34" x2="36" y2="34" stroke={color} strokeWidth="1.5" opacity="0.3" />
    <circle cx="28" cy="8" r="5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1" />
    <circle cx="28" cy="8" r="2" fill={color} fillOpacity="0.2" />
    <path d="M24 10 Q26 14 30 12 Q32 10 34 12" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.3" />
    <circle cx="22" cy="30" r="1.5" fill={color} fillOpacity="0.15" />
    <circle cx="15" cy="26" r="1" fill={color} fillOpacity="0.15" />
  </svg>
);

/**
 * FACE — Телевизор с лицом и V-знак
 * Символизирует медийность, «лицо» рэпа, молодость.
 */
export const ArtistFace = ({ className = "w-12 h-12", color = "#f97316" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="10" width="26" height="20" rx="3" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.08" />
    <rect x="16" y="30" width="8" height="4" rx="1" fill={color} fillOpacity="0.2" />
    <line x1="14" y1="34" x2="12" y2="37" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <line x1="26" y1="34" x2="28" y2="37" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <circle cx="16" cy="19" r="1.5" fill={color} />
    <circle cx="24" cy="19" r="1.5" fill={color} />
    <path d="M17 24 Q20 26 23 24" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M8 13 L12 17 L8 21" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    <path d="M32 13 L28 17 L32 21" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
  </svg>
);

/**
 * Маппинг slug → компонент иконки
 */
const artistIcons: Record<string, React.ComponentType<{ className?: string; color?: string }>> = {
  'gonefludd': ArtistGonefludd,
  'lsp': ArtistLsp,
  'pharaoh': ArtistPharaoh,
  'oxxxymiron': ArtistOxxxymiron,
  'skryptonite': ArtistSkryptonite,
  'guf': ArtistGuf,
  'miyagi': ArtistMiyagi,
  'boulevard-depo': ArtistBoulevardDepo,
  'atl': ArtistAtl,
  'face': ArtistFace,
};

export default artistIcons;
