import React from 'react';

// Custom hand-drawn SVG icons/emojis for tabs and products

export const SvgHome = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 10L12 3L21 10V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V10Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12H15V22" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="7.5" r="1" fill={color} />
  </svg>
);

export const SvgCatalog = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 2H20V22H6.5C5.837 22 5.201 21.7366 4.732 21.268C4.263 20.799 4 20.163 4 19.5V4.5C4 3.837 4.263 3.201 4.732 2.732C5.201 2.263 5.837 2 6.5 2Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 6H15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M9 10H15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M9 14H13" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const SvgAbout = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5"/>
    <path d="M12 16V12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8H12.01" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SvgCart = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="21" r="1.5" fill={color}/>
    <circle cx="20" cy="21" r="1.5" fill={color}/>
    <path d="M1 1H4.5L7.5 15H21L23 5H6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SvgWishlist = ({ className = "w-6 h-6", color = "currentColor", fill = "none" }) => (
  <svg className={className} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78v0z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SvgProfile = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Sticker Doodles for items
export const SvgTshirtSticker = ({ className = "w-24 h-24", color = "#ff4a7d" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 30 L30 18 L42 24 C45 20, 55 20, 58 24 L70 18 L85 30 L77 45 L73 43 L73 85 L27 85 L27 43 L23 45 Z" fill={color} stroke="#1f2937" strokeWidth="4" strokeLinejoin="round" />
    <path d="M35 15 C35 15, 50 28, 65 15" stroke="#1f2937" strokeWidth="4" strokeLinecap="round" />
    <path d="M35 50 H65" stroke="white" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 6" />
    <circle cx="50" cy="62" r="8" fill="white" stroke="#1f2937" strokeWidth="3" />
    <path d="M47 62 H53 M50 59 V65" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const SvgHoodieSticker = ({ className = "w-24 h-24", color = "#3b82f6" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <path d="M15 32 L28 22 L38 28 C41 23, 59 23, 62 28 L72 22 L85 32 L78 50 L74 48 L74 88 L26 88 L26 48 L22 50 Z" fill={color} stroke="#1f2937" strokeWidth="4" strokeLinejoin="round" />
    {/* Hood */}
    <path d="M30 25 C30 12, 70 12, 70 25 C70 30, 30 30, 30 25 Z" fill="white" stroke="#1f2937" strokeWidth="3.5" />
    {/* Pocket */}
    <path d="M34 68 H66 L62 82 H38 Z" fill={color} stroke="#1f2937" strokeWidth="3" />
    {/* Drawstrings */}
    <path d="M45 28 V42" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
    <path d="M55 28 V45" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
    <circle cx="45" cy="42" r="2.5" fill="#1f2937" />
    <circle cx="55" cy="45" r="2.5" fill="#1f2937" />
  </svg>
);

export const SvgCapSticker = ({ className = "w-24 h-24", color = "#10b981" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Crown */}
    <path d="M18 58 C18 25, 82 25, 82 58 Z" fill={color} stroke="#1f2937" strokeWidth="4" strokeLinejoin="round" />
    {/* Visor / Bill */}
    <path d="M8 58 C12 58, 22 50, 40 50 C58 50, 75 62, 92 62 C75 75, 25 75, 8 58 Z" fill="white" stroke="#1f2937" strokeWidth="4" strokeLinejoin="round" />
    {/* Button on top */}
    <circle cx="50" cy="22" r="5" fill="#1f2937" />
    {/* Ventilation eyelets */}
    <circle cx="35" cy="38" r="2" fill="#1f2937" />
    <circle cx="65" cy="38" r="2" fill="#1f2937" />
    {/* Design details */}
    <path d="M50 25 V45" stroke="#1f2937" strokeWidth="3" strokeDasharray="2 3" />
  </svg>
);

export const SvgVinylSticker = ({ className = "w-24 h-24", color = "#f59e0b" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer black vinyl record */}
    <circle cx="50" cy="50" r="42" fill="#111827" stroke="#374151" strokeWidth="2.5" />
    {/* Sound grooves */}
    <circle cx="50" cy="50" r="32" stroke="#4b5563" strokeWidth="1.5" strokeDasharray="12 4" />
    <circle cx="50" cy="50" r="24" stroke="#4b5563" strokeWidth="1.5" strokeDasharray="8 6" />
    {/* Inner label sticker */}
    <circle cx="50" cy="50" r="16" fill={color} stroke="#111827" strokeWidth="3" />
    {/* Center hole */}
    <circle cx="50" cy="50" r="4" fill="#f3f4f6" stroke="#111827" strokeWidth="2" />
    {/* Retro gloss reflection */}
    <path d="M25 25 A 35 35 0 0 1 75 25" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
  </svg>
);

export const SvgCassetteSticker = ({ className = "w-24 h-24", color = "#ec4899" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer Shell */}
    <rect x="12" y="24" width="76" height="52" rx="6" fill={color} stroke="#1f2937" strokeWidth="4" />
    {/* Trapezoid bottom piece */}
    <path d="M28 76 L34 86 H66 L72 76 Z" fill="#1f2937" />
    {/* Inner label */}
    <rect x="22" y="32" width="56" height="30" rx="3" fill="white" stroke="#1f2937" strokeWidth="3" />
    {/* Two spool holes */}
    <circle cx="38" cy="47" r="7" fill={color} stroke="#1f2937" strokeWidth="3" />
    <circle cx="62" cy="47" r="7" fill={color} stroke="#1f2937" strokeWidth="3" />
    {/* Gear teeth in spools */}
    <path d="M35 47 H41 M38 44 V50" stroke="white" strokeWidth="1.5" />
    <path d="M59 47 H65 M62 44 V50" stroke="white" strokeWidth="1.5" />
    {/* Cassette window/tape line */}
    <rect x="47" y="44" width="6" height="6" fill="#1f2937" />
  </svg>
);

export const SvgAccessorySticker = ({ className = "w-24 h-24", color = "#a855f7" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Sparkle/Star custom doodle */}
    <path d="M50 8 L62 38 L92 50 L62 62 L50 92 L38 62 L8 50 L38 38 Z" fill={color} stroke="#1f2937" strokeWidth="4" strokeLinejoin="round" />
    {/* Inner ring */}
    <circle cx="50" cy="50" r="10" fill="white" stroke="#1f2937" strokeWidth="3" />
    <circle cx="50" cy="50" r="3" fill={color} />
    {/* Dotted lines */}
    <path d="M50 20 V25 M50 75 V80 M20 50 H25 M75 50 H80" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// General SVGs for UI
export const SvgPin = ({ className = "w-6 h-6", color = "#f59e0b" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="6" r="4" fill={color} stroke="#1f2937" strokeWidth="2" />
    <path d="M12 10 V22" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" />
    <path d="M11 22 H13" stroke="#4b5563" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="11.5" cy="5.5" r="1.5" fill="white" opacity="0.6" />
  </svg>
);

export const SvgCrown = ({ className = "w-8 h-8", color = "#fbbf24" }) => (
  <svg className={className} viewBox="0 0 24 24" fill={color} stroke="#1f2937" strokeWidth="2" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4 L5 12 L12 6 L19 12 L22 4 L18 18 H6 Z" />
    <circle cx="2" cy="3" r="1" fill="#1f2937" />
    <circle cx="12" cy="5" r="1" fill="#1f2937" />
    <circle cx="22" cy="3" r="1" fill="#1f2937" />
  </svg>
);

export const SvgCheck = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const SvgTrash = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

// =============================================
// Custom SVG icons replacing all emoji characters
// =============================================

export const SvgMusicNote = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="19" r="3" stroke={color} strokeWidth="2.5" />
    <circle cx="17" cy="17" r="3" stroke={color} strokeWidth="2.5" />
    <path d="M10 19V5L20 3V17" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SvgTag = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9138 12.7709 21.0146C12.5281 21.1154 12.2678 21.1671 12.005 21.1667L4 21.1667V13.1617C4 12.8945 4.10536 12.6378 4.29289 12.4503L11.46 5.28315C11.6457 5.09732 11.8658 4.94975 12.1083 4.84882C12.3507 4.74789 12.6107 4.69594 12.8735 4.69594C13.1362 4.69594 13.3963 4.74789 13.6387 4.84882C13.8812 4.94975 14.1013 5.09732 14.287 5.28315L20.59 11.586C20.7758 11.7717 20.9234 11.9918 21.0243 12.2343C21.1253 12.4767 21.1772 12.7368 21.1772 12.9995C21.1772 13.2622 21.1253 13.5223 21.0243 13.7647C20.9234 14.0072 20.7758 14.2273 20.59 14.413V13.41Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8.5" cy="8.5" r="1.5" fill={color} />
  </svg>
);

export const SvgPackage = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 17L12 22L22 17" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12L12 17L22 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SvgChat = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SvgLightning = ({ className = "w-6 h-6", color = "#f59e0b" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.2" />
  </svg>
);

export const SvgFlame = ({ className = "w-6 h-6", color = "#ef4444" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C16.4183 22 20 18.4183 20 14C20 9.5 15.5 5 12 2C8.5 5 4 9.5 4 14C4 18.4183 7.58172 22 12 22Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.2" />
    <path d="M12 18C14.2091 18 16 16.2091 16 14C16 11.5 14 9.5 12 8C10 9.5 8 11.5 8 14C8 16.2091 9.79086 18 12 18Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.3" />
  </svg>
);

export const SvgBrick = ({ className = "w-6 h-6", color = "#c2410c" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="7" rx="1" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.15" />
    <rect x="2" y="14" width="20" height="7" rx="1" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.15" />
    <line x1="9" y1="3" x2="9" y2="10" stroke={color} strokeWidth="2" />
    <line x1="15" y1="3" x2="15" y2="10" stroke={color} strokeWidth="2" />
    <line x1="6" y1="14" x2="6" y2="21" stroke={color} strokeWidth="2" />
    <line x1="12" y1="14" x2="12" y2="21" stroke={color} strokeWidth="2" />
    <line x1="18" y1="14" x2="18" y2="21" stroke={color} strokeWidth="2" />
  </svg>
);

export const SvgBag = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 6H21" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SvgDisc = ({ className = "w-6 h-6", color = "#3b82f6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.15" />
    <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.3" />
    <circle cx="12" cy="12" r="1.5" fill={color} />
    <path d="M18 6L14 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M20 12H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SvgMemo = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V8L16 3Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 3V8H21" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 13H17" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M7 17H13" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const SvgShield = ({ className = "w-6 h-6", color = "#10b981" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.15" />
    <path d="M9 12L11 14L15 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SvgRecycle = ({ className = "w-6 h-6", color = "#16a34a" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L16 8H8L12 2Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.15" />
    <path d="M16 22L12 16L20 16L16 22Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.15" />
    <path d="M21 8L19 15L14 10L21 8Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.15" />
    <path d="M3 8L8 15H5L3 8Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
  </svg>
);

export const SvgCamera = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="13" r="4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SvgMic = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="9" y="2" width="6" height="12" rx="3" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 11C5 12.8565 5.7375 14.637 7.05025 15.9497C8.36301 17.2625 10.1435 18 12 18C13.8565 18 15.637 17.2625 16.9497 15.9497C18.2625 14.637 19 12.8565 19 11" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 18V22" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 22H16" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SvgParty = ({ className = "w-6 h-6", color = "#f59e0b" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 20L20 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M12 3L13 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M3 12L5 13" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M19 17L21 18" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="19" cy="5" r="2" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.3" />
    <circle cx="5" cy="19" r="2" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.3" />
    <path d="M8 8L9 9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M15 15L16 16" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SvgRocket = ({ className = "w-6 h-6", color = "#ef4444" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15L9 12L12 2L15 12L12 15Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.15" />
    <path d="M9 12C7.5 13.5 7 16 7 16H12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 12C16.5 13.5 17 16 17 16H12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 22C5 22 7.5 21 9 19" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M19 22C19 22 16.5 21 15 19" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M8 17H16" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="12" cy="7" r="1" fill={color} />
  </svg>
);

export const SvgWind = ({ className = "w-6 h-6", color = "#94a3b8" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 4.5C9.5 2.5 11 2 12 2C14 2 14 4 14 4.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 10H15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M4 14H18" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M3 18H17" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M12 22H20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const SvgWarning = ({ className = "w-6 h-6", color = "#dc2626" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L1 21H23L12 2Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.15" />
    <path d="M12 9V14" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="17" r="1" fill={color} />
  </svg>
);

export const SvgBasket = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9H21L19 21H5L3 9Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.1" />
    <path d="M7 9L10 3" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 9L14 3" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 13V17" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M12 13V17" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M15 13V17" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const SvgHourglass = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 2H19" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M5 22H19" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M7 2V7L12 12L17 7V2" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 22V17L12 12L7 17V22" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 12L7 17H17L12 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" fill={color} fillOpacity="0.1" />
  </svg>
);

export const SvgSad = ({ className = "w-6 h-6", color = "#ef4444" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.1" />
    <path d="M8 15C8 15 9.5 17 12 17C14.5 17 16 15 16 15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="8.5" cy="9.5" r="1.5" fill={color} />
    <circle cx="15.5" cy="9.5" r="1.5" fill={color} />
  </svg>
);

export const SvgSearch = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 20L16 16" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SvgFloppy = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 21V13H7V21" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 3V8H15" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SvgTrophy = ({ className = "w-6 h-6", color = "#f59e0b" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9H4C2.89543 9 2 8.10457 2 7V5C2 3.89543 2.89543 3 4 3H6V9Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.15" />
    <path d="M18 9H20C21.1046 9 22 8.10457 22 7V5C22 3.89543 21.1046 3 20 3H18V9Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.15" />
    <path d="M6 3H18V9C18 12 15 15 12 15C9 15 6 12 6 9V3Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.15" />
    <path d="M12 15V19" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M9 21H15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M10 19L9 21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M14 19L15 21" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SvgStar = ({ className = "w-6 h-6", color = "#f59e0b" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.2" />
  </svg>
);

export const SvgLollipop = ({ className = "w-6 h-6", color = "#ec4899" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C7 2 4 5.5 4 9C4 12 6 14 8 14C9 14 10 13 10 12C10 10 8.5 9 7 9C5.5 9 5.5 10.5 6 11" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.15" />
    <circle cx="12" cy="5" r="8" stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.15" />
    <circle cx="12" cy="5" r="3" stroke="white" strokeWidth="1.5" fill={color} fillOpacity="0.3" />
    <path d="M12 13V22" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const SvgBrokenHeart = ({ className = "w-6 h-6", color = "#ec4899" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.84 4.61C19.0884 2.85841 16.4116 2.85841 14.66 4.61L12 7.27L9.34 4.61C7.5884 2.85841 4.9116 2.85841 3.16 4.61C1.4084 6.36159 1.4084 9.03841 3.16 10.79L12 19.62L14 17.62" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.1" />
    <path d="M14 13L11 16L13 15.5L11 19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SvgGuitar = ({ className = "w-6 h-6", color = "#f59e0b" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="19" r="3" stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.15" />
    <path d="M7 17L21 3" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M18 5L22 4L20 6L18 5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 8L16.5 4.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 11L14 9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <rect x="14" y="3" width="3" height="2" rx="0.5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.2" />
  </svg>
);

export const SvgPiano = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.1" />
    <line x1="8" y1="4" x2="8" y2="20" stroke={color} strokeWidth="2" />
    <line x1="14" y1="4" x2="14" y2="20" stroke={color} strokeWidth="2" />
    <line x1="10" y1="10" x2="10" y2="20" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
    <line x1="12" y1="10" x2="12" y2="20" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
    <line x1="16" y1="10" x2="16" y2="20" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
    <line x1="18" y1="10" x2="18" y2="20" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
    <line x1="6" y1="10" x2="6" y2="20" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
    <line x1="4" y1="10" x2="4" y2="20" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
  </svg>
);

// Auth icons
export const SvgUser = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 21C4 18.8783 4.84285 16.8434 6.34315 15.3431C7.84344 13.8429 9.87827 13 12 13C14.1217 13 16.1566 13.8429 17.6569 15.3431C19.1571 16.8434 20 18.8783 20 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SvgLock = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="11" width="16" height="11" rx="2" stroke={color} strokeWidth="2" />
    <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="16" r="1.5" fill={color} />
    <path d="M12 16V18" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SvgMail = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="16" rx="3" stroke={color} strokeWidth="2" />
    <path d="M2 6L12 13L22 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SvgEye = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SvgEyeOff = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="2" y1="2" x2="22" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SvgLogout = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 17L21 12L16 7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 12H9" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H11" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SvgNoPhoto = ({ className = "w-24 h-24", color = "#64748b" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Polaroid frame */}
    <rect x="8" y="6" width="84" height="88" rx="8" fill="none" stroke={color} strokeWidth="3" strokeOpacity="0.3" />
    <rect x="14" y="12" width="72" height="58" rx="4" fill={color} fillOpacity="0.06" stroke={color} strokeWidth="2" strokeOpacity="0.25" />
    {/* Mountain / landscape placeholder silhouette */}
    <path d="M14 70 L30 50 L42 60 L54 40 L68 55 L86 32 V70 Z" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1.5" strokeOpacity="0.2" />
    {/* Camera icon */}
    <circle cx="50" cy="38" r="12" stroke={color} strokeWidth="3" strokeOpacity="0.5" />
    <circle cx="50" cy="38" r="5" stroke={color} strokeWidth="2.5" strokeOpacity="0.35" />
    <rect x="44" y="28" width="12" height="4" rx="1.5" stroke={color} strokeWidth="1.5" strokeOpacity="0.3" />
    {/* Slash through camera */}
    <line x1="36" y1="26" x2="64" y2="50" stroke={color} strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6" />
    {/* Question mark */}
    <circle cx="50" cy="60" r="1.5" fill={color} fillOpacity="0.5" />
    <path d="M50 64 V64 C48 64 47 62 47 60 C47 56 54 56 54 53 C54 50 52 48 50 48" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5" />
    {/* Bottom text area */}
    <text x="50" y="86" textAnchor="middle" fill={color} fillOpacity="0.3" fontSize="8" fontWeight="bold" letterSpacing="1">ФОТО</text>
  </svg>
);

export const SvgArrowLeft = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 19L5 12L12 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
