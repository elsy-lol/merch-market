import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, commonStyles } from '../styles/theme';
import { SvgCrown, SvgStar, SvgCheck, SvgRocket, SvgMusicNote, SvgTag, SvgPackage } from '../components/CustomSvg';

const STATS = [
  { icon: <SvgCrown size={24} color="#f59e0b" />, value: '10+', label: 'Артистов' },
  { icon: <SvgTag size={24} color="#f59e0b" />, value: '60+', label: 'Товаров' },
  { icon: <SvgCheck size={24} color="#10b981" />, value: '100%', label: 'Оригиналы' },
];

const VALUES = [
  { icon: <SvgMusicNote size={24} color="#f59e0b" />, title: 'Аутентичность', desc: 'Каждая вещь проверена на подлинность' },
  { icon: <SvgStar size={24} color="#f59e0b" />, title: 'Коллаборации', desc: 'Создаём мерч вместе с артистами' },
  { icon: <SvgRocket size={24} color="#f59e0b" />, title: 'Доставка по РФ', desc: 'Оперативно отправляем в любой регион' },
  { icon: <SvgCrown size={24} color="#f59e0b" />, title: 'Лимитированные тиражи', desc: 'Каждый мерч — эксклюзив' },
  { icon: <SvgCheck size={24} color="#10b981" />, title: 'Качество', desc: 'Только премиальные материалы' },
  { icon: <SvgPackage size={24} color="#f59e0b" />, title: 'Возврат 14 дней', desc: 'Без лишних вопросов' },
];

const AboutScreen: React.FC = () => (
  <ScrollView style={commonStyles.screen} contentContainerStyle={{ paddingBottom: 40 }}>
    {/* Hero */}
    <View style={styles.hero}>
      <SvgMusicNote size={48} color="#f59e0b" />
      <Text style={styles.heroTitle}>STICKER // MERCH</Text>
      <Text style={styles.heroDesc}>Мерч — это не просто одежда. Это часть культуры.</Text>
    </View>

    {/* Stats */}
    <View style={styles.statsRow}>
      {STATS.map((s, i) => (
        <View key={i} style={styles.statCard}>
          {s.icon}
          <Text style={styles.statValue}>{s.value}</Text>
          <Text style={styles.statLabel}>{s.label}</Text>
        </View>
      ))}
    </View>

    {/* Manifesto */}
    <View style={[commonStyles.card, { marginBottom: SPACING.xl }]}>
      <Text style={styles.manifestoTitle}>МАНИФЕСТ</Text>
      <Text style={styles.manifestoText}>
        Мы объединяем артистов и их аудиторию через мерч. Каждая вещь в нашем каталоге — 
        это не просто предмет гардероба, а часть культуры.{'\n\n'}
        Мы работаем напрямую с музыкантами и их лейблами, чтобы вы получали 
        только оригинальный мерч с историей.
      </Text>
    </View>

    {/* Values */}
    <View style={styles.valuesGrid}>
      {VALUES.map((v, i) => (
        <View key={i} style={[commonStyles.cardSticker, styles.valueCard]}>
          <View style={styles.valueIcon}>{v.icon}</View>
          <Text style={styles.valueTitle}>{v.title}</Text>
          <Text style={styles.valueDesc}>{v.desc}</Text>
        </View>
      ))}
    </View>

    {/* CTA */}
    <View style={[commonStyles.card, styles.ctaCard]}>
      <Text style={styles.ctaTitle}>Готов найти свой мерч?</Text>
      <Text style={styles.ctaText}>Ты знаешь, где нас найти.</Text>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  hero: { alignItems: 'center', paddingVertical: 40, gap: 12 },
  heroTitle: { fontSize: 28, fontWeight: '700', color: COLORS.text, letterSpacing: 3 },
  heroDesc: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center', fontStyle: 'italic' },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: COLORS.glass, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: COLORS.glassBorder, padding: 16, alignItems: 'center', gap: 6 },
  statValue: { fontSize: 22, fontWeight: '700', color: COLORS.accent },
  statLabel: { fontSize: 12, color: COLORS.textMuted },
  manifestoTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, letterSpacing: 2, marginBottom: 12 },
  manifestoText: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 20 },
  valuesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  valueCard: { width: '47%', gap: 6 },
  valueIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(245,158,11,0.1)', alignItems: 'center', justifyContent: 'center' },
  valueTitle: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  valueDesc: { fontSize: 11, color: COLORS.textMuted, lineHeight: 15 },
  ctaCard: { alignItems: 'center', padding: 24, gap: 8 },
  ctaTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  ctaText: { fontSize: 13, color: COLORS.accent },
});

export default AboutScreen;
