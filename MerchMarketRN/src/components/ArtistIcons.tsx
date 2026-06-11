import React from 'react';
import Svg, { Path, Circle, Rect, Line, G, Text as SvgText } from 'react-native-svg';
import { IconProps } from './CustomSvg';

const s = (size = 48) => ({ width: size, height: size });

export const ArtistGonefludd = ({ size = 48, color = '#ec4899' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 40 40" fill="none">
    <Rect x="18.5" y="26" width="3" height="12" rx="1.5" fill={color} fillOpacity="0.35" />
    <Circle cx="20" cy="15" r="12" stroke={color} strokeWidth="2.5" />
    <Path d="M20 15 Q20 9 26 9 Q32 9 32 15 Q32 21 26 21 Q20 21 20 15" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
    <Circle cx="14" cy="10" r="1.5" fill={color} fillOpacity="0.6" />
    <Circle cx="27" cy="9" r="1" fill={color} fillOpacity="0.5" />
    <Circle cx="13" cy="20" r="1.2" fill={color} fillOpacity="0.5" />
    <Circle cx="28" cy="21" r="1.5" fill={color} fillOpacity="0.6" />
  </Svg>
);

export const ArtistLsp = ({ size = 48, color = '#f43f5e' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 40 40" fill="none">
    <Rect x="6" y="10" width="28" height="20" rx="4" stroke={color} strokeWidth="2.5" />
    <Path d="M14 30 L16 34 H24 L26 30" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <Circle cx="15" cy="20" r="5.5" stroke={color} strokeWidth="2" />
    <Circle cx="25" cy="20" r="5.5" stroke={color} strokeWidth="2" />
    <Circle cx="15" cy="20" r="2" fill={color} fillOpacity="0.3" />
    <Circle cx="25" cy="20" r="2" fill={color} fillOpacity="0.3" />
    <Path d="M17 12 L18.5 14 L20 12 Q21.5 10.5 23 12 Q24.5 13.5 23 15 L18.5 20 L14 15 Q12.5 13.5 14 12 Q15.5 10.5 17 12Z" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15" />
    <Line x1="18.5" y1="14" x2="17" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

export const ArtistPharaoh = ({ size = 48, color = '#f59e0b' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 40 40" fill="none">
    <Path d="M14 18 Q14 10 20 10 Q26 10 26 18 L26 26 Q26 28 24 28 L16 28 Q14 28 14 26 L14 18Z" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1" />
    <Circle cx="17" cy="19" r="1.5" fill={color} />
    <Circle cx="23" cy="19" r="1.5" fill={color} />
    <Path d="M18 23 Q20 25 22 23" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <Path d="M13 11 L17 8 L20 11 L23 8 L27 11" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    <Path d="M31 6 L28 12 L32 12 L30 18" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Line x1="34" y1="8" x2="30" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </Svg>
);

export const ArtistOxxxymiron = ({ size = 48, color = '#f97316' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 40 40" fill="none">
    <Path d="M12 22 L8 10 L14 14 L20 6 L26 14 L32 10 L28 22" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1" strokeLinejoin="round" />
    <SvgText x="20" y="32" textAnchor="middle" fontSize="8" fontWeight="bold" fill={color} stroke="none">X.X.X.</SvgText>
    <Line x1="12" y1="35" x2="28" y2="35" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <Circle cx="20" cy="16" r="1" fill={color} opacity="0.6" />
  </Svg>
);

export const ArtistSkryptonite = ({ size = 48, color = '#10b981' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 40 40" fill="none">
    <Rect x="8" y="16" width="24" height="18" rx="2" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1" />
    <Path d="M6 18 L20 6 L34 18" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    <Rect x="16" y="24" width="8" height="10" rx="1" fill={color} fillOpacity="0.2" />
    <SvgText x="20" y="23" textAnchor="middle" fontSize="7" fontWeight="bold" fill={color} stroke="none">36</SvgText>
    <Circle cx="28" cy="10" r="5" stroke={color} strokeWidth="1.5" />
    <Line x1="28" y1="6" x2="28" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <Line x1="28" y1="10" x2="31" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <Line x1="30" y1="7" x2="28" y2="10" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
  </Svg>
);

export const ArtistGuf = ({ size = 48, color = '#f59e0b' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 40 40" fill="none">
    <Line x1="20" y1="6" x2="20" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Circle cx="20" cy="20" r="2" fill={color} />
    <Path d="M8 28 L20 20 L32 28" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    <Circle cx="8" cy="30" r="4" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15" />
    <Circle cx="32" cy="30" r="4" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15" />
    <SvgText x="20" y="38" textAnchor="middle" fontSize="5" fontWeight="bold" fill={color} stroke="none">825</SvgText>
    <Line x1="10" y1="30" x2="30" y2="30" stroke={color} strokeWidth="0.5" opacity="0.2" />
  </Svg>
);

export const ArtistMiyagi = ({ size = 48, color = '#10b981' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 40 40" fill="none">
    <Path d="M4 30 L14 14 L20 22 L26 10 L36 30" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
    <Circle cx="26" cy="16" r="5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1" />
    <Circle cx="26" cy="16" r="2" fill={color} fillOpacity="0.3" />
    <Path d="M22 16 Q26 12 30 16" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
    <Line x1="4" y1="32" x2="36" y2="32" stroke={color} strokeWidth="1" opacity="0.2" />
  </Svg>
);

export const ArtistBoulevardDepo = ({ size = 48, color = '#f43f5e' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 40 40" fill="none">
    <Circle cx="20" cy="20" r="14" stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.08" />
    <Circle cx="14" cy="18" r="2.5" fill={color} opacity="0.8" />
    <Circle cx="26" cy="18" r="2.5" fill={color} opacity="0.8" />
    <Path d="M15 25 Q20 28 25 25" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <Line x1="14" y1="18" x2="11" y2="15" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <Line x1="26" y1="18" x2="29" y2="15" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <Circle cx="10" cy="14" r="1" fill={color} opacity="0.4" />
    <Circle cx="30" cy="14" r="1" fill={color} opacity="0.4" />
  </Svg>
);

export const ArtistAtl = ({ size = 48, color = '#06b6d4' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 40 40" fill="none">
    <Path d="M4 34 L10 22 L14 28 L18 18 L22 26 L26 14 L30 22 L36 10" stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round" strokeLinecap="round" opacity="0.6" />
    <Line x1="4" y1="34" x2="36" y2="34" stroke={color} strokeWidth="1.5" opacity="0.3" />
    <Circle cx="28" cy="8" r="5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1" />
    <Circle cx="28" cy="8" r="2" fill={color} fillOpacity="0.2" />
    <Path d="M24 10 Q26 14 30 12 Q32 10 34 12" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.3" />
    <Circle cx="22" cy="30" r="1.5" fill={color} fillOpacity="0.15" />
    <Circle cx="15" cy="26" r="1" fill={color} fillOpacity="0.15" />
  </Svg>
);

export const ArtistFace = ({ size = 48, color = '#f97316' }: IconProps) => (
  <Svg {...s(size)} viewBox="0 0 40 40" fill="none">
    <Rect x="7" y="10" width="26" height="20" rx="3" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.08" />
    <Rect x="16" y="30" width="8" height="4" rx="1" fill={color} fillOpacity="0.2" />
    <Line x1="14" y1="34" x2="12" y2="37" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <Line x1="26" y1="34" x2="28" y2="37" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <Circle cx="16" cy="19" r="1.5" fill={color} />
    <Circle cx="24" cy="19" r="1.5" fill={color} />
    <Path d="M17 24 Q20 26 23 24" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <Path d="M8 13 L12 17 L8 21" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    <Path d="M32 13 L28 17 L32 21" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
  </Svg>
);

const artistIcons: Record<string, React.FC<IconProps>> = {
  gonefludd: ArtistGonefludd,
  lsp: ArtistLsp,
  pharaoh: ArtistPharaoh,
  oxxxymiron: ArtistOxxxymiron,
  skryptonite: ArtistSkryptonite,
  guf: ArtistGuf,
  miyagi: ArtistMiyagi,
  'boulevard-depo': ArtistBoulevardDepo,
  atl: ArtistAtl,
  face: ArtistFace,
};

export default artistIcons;
