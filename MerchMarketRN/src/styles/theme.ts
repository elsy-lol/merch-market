import { StyleSheet, Platform } from 'react-native';

export const COLORS = {
  bg: '#0a0a0f',
  bgCard: 'rgba(255,255,255,0.03)',
  bgCardHover: 'rgba(255,255,255,0.06)',
  surface: '#13131a',
  border: 'rgba(255,255,255,0.08)',
  borderHover: 'rgba(255,255,255,0.15)',
  text: '#f1f5f9',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  accent: '#f59e0b',
  accentLight: '#fbbf24',
  accentDark: '#d97706',
  pink: '#f43f5e',
  cyan: '#06b6d4',
  green: '#10b981',
  orange: '#f97316',
  purple: '#a855f7',
  red: '#ef4444',
  emerald: '#10b981',
  rose: '#f43f5e',
  glass: 'rgba(255,255,255,0.05)',
  glassBorder: 'rgba(255,255,255,0.08)',
  white: '#ffffff',
  black: '#000000',
};

export const FONTS = {
  regular: Platform.OS === 'web' ? 'Inter, system-ui' : undefined,
  bold: Platform.OS === 'web' ? 'Inter, system-ui' : undefined,
  accent: Platform.OS === 'web' ? 'Caveat, cursive' : undefined,
  display: Platform.OS === 'web' ? 'Unbounded, sans-serif' : undefined,
  mono: Platform.OS === 'web' ? 'JetBrains Mono, monospace' : undefined,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
};

export const RADIUS = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 999,
};

export const SHADOWS = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  glass: {
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
};

export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.glass,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    padding: SPACING.lg,
    ...SHADOWS.glass,
    overflow: 'hidden',
  },
  cardSticker: {
    backgroundColor: COLORS.glass,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    padding: SPACING.md,
    ...SHADOWS.glass,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  goldText: {
    color: COLORS.accent,
    fontWeight: '700',
  },
  mutedText: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: 1,
    marginBottom: SPACING.lg,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    fontSize: 11,
    fontWeight: '700',
    overflow: 'hidden',
  },
  badgeNew: {
    backgroundColor: 'rgba(16,185,129,0.12)',
    color: COLORS.emerald,
  },
  badgeSale: {
    backgroundColor: 'rgba(244,63,94,0.12)',
    color: COLORS.rose,
  },
  buttonGold: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  buttonGoldText: {
    color: '#0f172a',
    fontWeight: '700',
    fontSize: 13,
  },
  buttonGlass: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  buttonGlassText: {
    color: COLORS.text,
    fontWeight: '600',
    fontSize: 13,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.text,
    fontSize: 15,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: SPACING.md,
  },
});

export const stickerCard = (color: string) => {
  const accentColor = COLORS[color as keyof typeof COLORS] || COLORS.accent;
  return {
    container: {
      backgroundColor: COLORS.glass,
      borderRadius: RADIUS.lg,
      borderWidth: 1,
      borderColor: COLORS.glassBorder,
      borderTopWidth: 2,
      borderTopColor: accentColor,
      padding: SPACING.md,
      ...SHADOWS.glass,
      overflow: 'hidden' as const,
    },
    topBorder: { borderTopColor: accentColor },
  };
};
