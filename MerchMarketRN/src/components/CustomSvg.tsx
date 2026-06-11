import React from 'react';
import Svg, { Path, Circle, Rect, Line, Polyline, G, Text as SvgText } from 'react-native-svg';

export type IconProps = { size?: number; color?: string; fill?: string };

const s = (size = 24) => ({ width: size, height: size });

export const SvgHome = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Path d="M3 10L12 3L21 10V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V10Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M9 22V12H15V22" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <Circle cx="12" cy="7.5" r="1" fill={color} />
  </Svg>
);

export const SvgCatalog = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M6.5 2H20V22H6.5C5.837 22 5.201 21.7366 4.732 21.268C4.263 20.799 4 20.163 4 19.5V4.5C4 3.837 4.263 3.201 4.732 2.732C5.201 2.263 5.837 2 6.5 2Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M9 6H15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <Path d="M9 10H15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <Path d="M9 14H13" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </Svg>
);

export const SvgAbout = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5"/>
    <Path d="M12 16V12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M12 8H12.01" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const SvgCart = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Circle cx="9" cy="21" r="1.5" fill={color}/>
    <Circle cx="20" cy="21" r="1.5" fill={color}/>
    <Path d="M1 1H4.5L7.5 15H21L23 5H6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const SvgWishlist = ({ size = 24, color = '#f1f5f9', fill = 'none' }: IconProps & { fill?: string }) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill={fill}>
    <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78v0z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const SvgProfile = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const SvgSearch = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M20 20L16 16" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const SvgArrowLeft = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 19L5 12L12 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const SvgCheck = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <Polyline points="20 6 9 17 4 12" />
  </Svg>
);

export const SvgTrash = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <Polyline points="3 6 5 6 21 6" />
    <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <Line x1="10" y1="11" x2="10" y2="17" />
    <Line x1="14" y1="11" x2="14" y2="17" />
  </Svg>
);

export const SvgBag = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M3 6H21" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const SvgDisc = ({ size = 24, color = '#3b82f6' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5" />
    <Circle cx="12" cy="12" r="4" stroke={color} strokeWidth="2.5" />
    <Circle cx="12" cy="12" r="1.5" fill={color} />
    <Path d="M18 6L14 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M20 12H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const SvgMusicNote = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Circle cx="7" cy="19" r="3" stroke={color} strokeWidth="2.5" />
    <Circle cx="17" cy="17" r="3" stroke={color} strokeWidth="2.5" />
    <Path d="M10 19V5L20 3V17" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const SvgCrown = ({ size = 24, color = '#fbbf24' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill={color} stroke="#1f2937" strokeWidth="2" strokeLinejoin="round">
    <Path d="M2 4 L5 12 L12 6 L19 12 L22 4 L18 18 H6 Z" />
    <Circle cx="2" cy="3" r="1" fill="#1f2937" />
    <Circle cx="12" cy="5" r="1" fill="#1f2937" />
    <Circle cx="22" cy="3" r="1" fill="#1f2937" />
  </Svg>
);

export const SvgTag = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Path d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9138 12.7709 21.0146C12.5281 21.1154 12.2678 21.1671 12.005 21.1667L4 21.1667V13.1617C4 12.8945 4.10536 12.6378 4.29289 12.4503L11.46 5.28315C11.6457 5.09732 11.8658 4.94975 12.1083 4.84882C12.3507 4.74789 12.6107 4.69594 12.8735 4.69594C13.1362 4.69594 13.3963 4.74789 13.6387 4.84882C13.8812 4.94975 14.1013 5.09732 14.287 5.28315L20.59 11.586C20.7758 11.7717 20.9234 11.9918 21.0243 12.2343C21.1253 12.4767 21.1772 12.7368 21.1772 12.9995C21.1772 13.2622 21.1253 13.5223 21.0243 13.7647C20.9234 14.0072 20.7758 14.2273 20.59 14.413V13.41Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="8.5" cy="8.5" r="1.5" fill={color} />
  </Svg>
);

export const SvgStar = ({ size = 24, color = '#f59e0b' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const SvgLightning = ({ size = 24, color = '#f59e0b' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const SvgFlame = ({ size = 24, color = '#ef4444' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Path d="M12 22C16.4183 22 20 18.4183 20 14C20 9.5 15.5 5 12 2C8.5 5 4 9.5 4 14C4 18.4183 7.58172 22 12 22Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 18C14.2091 18 16 16.2091 16 14C16 11.5 14 9.5 12 8C10 9.5 8 11.5 8 14C8 16.2091 9.79086 18 12 18Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const SvgRocket = ({ size = 24, color = '#ef4444' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Path d="M12 15L9 12L12 2L15 12L12 15Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M9 12C7.5 13.5 7 16 7 16H12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15 12C16.5 13.5 17 16 17 16H12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M5 22C5 22 7.5 21 9 19" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M19 22C19 22 16.5 21 15 19" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M8 17H16" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <Circle cx="12" cy="7" r="1" fill={color} />
  </Svg>
);

export const SvgLogout = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Path d="M16 17L21 12L16 7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M21 12H9" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M11 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H11" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const SvgEye = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const SvgEyeOff = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Line x1="2" y1="2" x2="22" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const SvgUser = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M4 21C4 18.8783 4.84285 16.8434 6.34315 15.3431C7.84344 13.8429 9.87827 13 12 13C14.1217 13 16.1566 13.8429 17.6569 15.3431C19.1571 16.8434 20 18.8783 20 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const SvgLock = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Rect x="4" y="11" width="16" height="11" rx="2" stroke={color} strokeWidth="2" />
    <Path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="16" r="1.5" fill={color} />
    <Path d="M12 16V18" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const SvgMail = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Rect x="2" y="4" width="20" height="16" rx="3" stroke={color} strokeWidth="2" />
    <Path d="M2 6L12 13L22 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const SvgPackage = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M2 17L12 22L22 17" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M2 12L12 17L22 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const SvgHourglass = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Path d="M5 2H19" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <Path d="M5 22H19" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <Path d="M7 2V7L12 12L17 7V2" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M17 22V17L12 12L7 17V22" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const SvgMenu = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <Line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <Line x1="3" y1="18" x2="21" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </Svg>
);

export const SvgClose = ({ size = 24, color = '#f1f5f9' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <Line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </Svg>
);

export const SvgWarning = ({ size = 24, color = '#dc2626' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2L1 21H23L12 2Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 9V14" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="17" r="1" fill={color} />
  </Svg>
);

// ===== Sticker SVGs (96x96 default) =====

const stickerProps = (size = 96) => ({ width: size, height: size });

export const SvgTshirtSticker = ({ size = 96, color = '#ff4a7d' }: IconProps) => (
  <Svg {...stickerProps(size)} viewBox="0 0 100 100" fill="none">
    <Path d="M15 30 L30 18 L42 24 C45 20, 55 20, 58 24 L70 18 L85 30 L77 45 L73 43 L73 85 L27 85 L27 43 L23 45 Z" fill={color} stroke="#1f2937" strokeWidth="4" strokeLinejoin="round" />
    <Path d="M35 15 C35 15, 50 28, 65 15" stroke="#1f2937" strokeWidth="4" strokeLinecap="round" />
    <Path d="M35 50 H65" stroke="white" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 6" />
    <Circle cx="50" cy="62" r="8" fill="white" stroke="#1f2937" strokeWidth="3" />
    <Path d="M47 62 H53 M50 59 V65" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
  </Svg>
);

export const SvgHoodieSticker = ({ size = 96, color = '#3b82f6' }: IconProps) => (
  <Svg {...stickerProps(size)} viewBox="0 0 100 100" fill="none">
    <Path d="M15 32 L28 22 L38 28 C41 23, 59 23, 62 28 L72 22 L85 32 L78 50 L74 48 L74 88 L26 88 L26 48 L22 50 Z" fill={color} stroke="#1f2937" strokeWidth="4" strokeLinejoin="round" />
    <Path d="M30 25 C30 12, 70 12, 70 25 C70 30, 30 30, 30 25 Z" fill="white" stroke="#1f2937" strokeWidth="3.5" />
    <Path d="M34 68 H66 L62 82 H38 Z" fill={color} stroke="#1f2937" strokeWidth="3" />
    <Path d="M45 28 V42" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
    <Path d="M55 28 V45" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
    <Circle cx="45" cy="42" r="2.5" fill="#1f2937" />
    <Circle cx="55" cy="45" r="2.5" fill="#1f2937" />
  </Svg>
);

export const SvgCapSticker = ({ size = 96, color = '#10b981' }: IconProps) => (
  <Svg {...stickerProps(size)} viewBox="0 0 100 100" fill="none">
    <Path d="M18 58 C18 25, 82 25, 82 58 Z" fill={color} stroke="#1f2937" strokeWidth="4" strokeLinejoin="round" />
    <Path d="M8 58 C12 58, 22 50, 40 50 C58 50, 75 62, 92 62 C75 75, 25 75, 8 58 Z" fill="white" stroke="#1f2937" strokeWidth="4" strokeLinejoin="round" />
    <Circle cx="50" cy="22" r="5" fill="#1f2937" />
    <Circle cx="35" cy="38" r="2" fill="#1f2937" />
    <Circle cx="65" cy="38" r="2" fill="#1f2937" />
    <Path d="M50 25 V45" stroke="#1f2937" strokeWidth="3" strokeDasharray="2 3" />
  </Svg>
);

export const SvgVinylSticker = ({ size = 96, color = '#f59e0b' }: IconProps) => (
  <Svg {...stickerProps(size)} viewBox="0 0 100 100" fill="none">
    <Circle cx="50" cy="50" r="42" fill="#111827" stroke="#374151" strokeWidth="2.5" />
    <Circle cx="50" cy="50" r="32" stroke="#4b5563" strokeWidth="1.5" strokeDasharray="12 4" />
    <Circle cx="50" cy="50" r="24" stroke="#4b5563" strokeWidth="1.5" strokeDasharray="8 6" />
    <Circle cx="50" cy="50" r="16" fill={color} stroke="#111827" strokeWidth="3" />
    <Circle cx="50" cy="50" r="4" fill="#f3f4f6" stroke="#111827" strokeWidth="2" />
    <Path d="M25 25 A 35 35 0 0 1 75 25" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
  </Svg>
);

export const SvgCassetteSticker = ({ size = 96, color = '#ec4899' }: IconProps) => (
  <Svg {...stickerProps(size)} viewBox="0 0 100 100" fill="none">
    <Rect x="12" y="24" width="76" height="52" rx="6" fill={color} stroke="#1f2937" strokeWidth="4" />
    <Path d="M28 76 L34 86 H66 L72 76 Z" fill="#1f2937" />
    <Rect x="22" y="32" width="56" height="30" rx="3" fill="white" stroke="#1f2937" strokeWidth="3" />
    <Circle cx="38" cy="47" r="7" fill={color} stroke="#1f2937" strokeWidth="3" />
    <Circle cx="62" cy="47" r="7" fill={color} stroke="#1f2937" strokeWidth="3" />
    <Path d="M35 47 H41 M38 44 V50" stroke="white" strokeWidth="1.5" />
    <Path d="M59 47 H65 M62 44 V50" stroke="white" strokeWidth="1.5" />
    <Rect x="47" y="44" width="6" height="6" fill="#1f2937" />
  </Svg>
);

export const SvgAccessorySticker = ({ size = 96, color = '#a855f7' }: IconProps) => (
  <Svg {...stickerProps(size)} viewBox="0 0 100 100" fill="none">
    <Path d="M50 8 L62 38 L92 50 L62 62 L50 92 L38 62 L8 50 L38 38 Z" fill={color} stroke="#1f2937" strokeWidth="4" strokeLinejoin="round" />
    <Circle cx="50" cy="50" r="10" fill="white" stroke="#1f2937" strokeWidth="3" />
    <Circle cx="50" cy="50" r="3" fill={color} />
    <Path d="M50 20 V25 M50 75 V80 M20 50 H25 M75 50 H80" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </Svg>
);

export const SvgNoPhoto = ({ size = 96, color = '#64748b' }: IconProps) => (
  <Svg {...stickerProps(size)} viewBox="0 0 100 100" fill="none">
    <Rect x="8" y="6" width="84" height="88" rx="8" stroke={color} strokeWidth="3" strokeOpacity="0.3" />
    <Rect x="14" y="12" width="72" height="58" rx="4" fill={color} fillOpacity="0.06" stroke={color} strokeWidth="2" strokeOpacity="0.25" />
    <Path d="M14 70 L30 50 L42 60 L54 40 L68 55 L86 32 V70 Z" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1.5" strokeOpacity="0.2" />
    <Circle cx="50" cy="38" r="12" stroke={color} strokeWidth="3" strokeOpacity="0.5" />
    <Circle cx="50" cy="38" r="5" stroke={color} strokeWidth="2.5" strokeOpacity="0.35" />
    <Rect x="44" y="28" width="12" height="4" rx="1.5" stroke={color} strokeWidth="1.5" strokeOpacity="0.3" />
    <Line x1="36" y1="26" x2="64" y2="50" stroke={color} strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6" />
    <Circle cx="50" cy="60" r="1.5" fill={color} fillOpacity="0.5" />
    <Path d="M50 64 V64 C48 64 47 62 47 60 C47 56 54 56 54 53 C54 50 52 48 50 48" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5" />
    <SvgText x="50" y="86" textAnchor="middle" fill={color} fillOpacity="0.3" fontSize="8" fontWeight="bold" letterSpacing="1">ФОТО</SvgText>
  </Svg>
);

// ===== Sticker icon resolver =====
export const STICKER_ICONS: Record<string, React.FC<IconProps>> = {
  tshirt: SvgTshirtSticker,
  hoodie: SvgHoodieSticker,
  cap: SvgCapSticker,
  vinyl: SvgVinylSticker,
  cassette: SvgCassetteSticker,
  accessory: SvgAccessorySticker,
};

export const getStickerIcon = (type?: string, color?: string, size?: number) => {
  if (!type) return <SvgNoPhoto size={size} color={color || '#64748b'} />;
  const Icon = STICKER_ICONS[type] || SvgAccessorySticker;
  return <Icon size={size} color={color} />;
};
