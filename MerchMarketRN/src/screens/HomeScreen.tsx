import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, commonStyles } from '../styles/theme';
import { SvgNoPhoto, SvgWishlist, SvgDisc, SvgBag, SvgCrown, SvgRocket } from '../components/CustomSvg';
import artistIcons from '../components/ArtistIcons';

interface HomeScreenProps {
  artists: any[];
  items: any[];
  addToCart: (item: any) => void;
  addToWishlist: (item: any) => void;
  wishlist: any[];
  navigation?: any;
  onViewProduct: (item: any) => void;
  setSelectedArtistSlug?: (slug: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ artists, items, addToCart, addToWishlist, wishlist, navigation, onViewProduct, setSelectedArtistSlug }) => {
  const featuredItems = items.slice(0, 6);

  const handleArtistClick = (slug: string) => {
    setSelectedArtistSlug?.(slug);
    navigation?.navigate('Catalog');
  };

  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Hero Banners */}
      <View style={styles.bannerRow}>
        <TouchableOpacity style={[styles.banner, { backgroundColor: 'rgba(245,158,11,0.1)' }]} onPress={() => { setSelectedArtistSlug?.('gonefludd'); navigation?.navigate('Catalog'); }} activeOpacity={0.8}>
          <Text style={[styles.bannerAccent, { color: '#f59e0b' }]}>Неоновая эстетика</Text>
          <Text style={styles.bannerTitle}>GONE.Fludd</Text>
          <Text style={styles.bannerDesc}>Психоделический мерч из новой коллекции</Text>
          <TouchableOpacity style={[styles.bannerBtn, { backgroundColor: '#f59e0b' }]}>
            <Text style={styles.bannerBtnText}>Смотреть</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.banner, { backgroundColor: 'rgba(244,63,94,0.1)' }]} onPress={() => { setSelectedArtistSlug?.('lsp'); navigation?.navigate('Catalog'); }} activeOpacity={0.8}>
          <Text style={[styles.bannerAccent, { color: '#f43f5e' }]}>Меланхолия</Text>
          <Text style={styles.bannerTitle}>ЛСП</Text>
          <Text style={styles.bannerDesc}>Для тех, кто чувствует глубже</Text>
          <TouchableOpacity style={[styles.bannerBtn, { backgroundColor: '#f43f5e' }]}>
            <Text style={styles.bannerBtnText}>Смотреть</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.banner, { backgroundColor: 'rgba(124,58,237,0.1)' }]} onPress={() => navigation?.navigate('Catalog')} activeOpacity={0.8}>
          <Text style={[styles.bannerAccent, { color: '#7c3aed' }]}>Последний шанс</Text>
          <Text style={styles.bannerTitle}>Успей до солдаута</Text>
          <Text style={styles.bannerDesc}>Скидки до 38% на избранные товары</Text>
          <TouchableOpacity style={[styles.bannerBtn, { backgroundColor: '#7c3aed' }]}>
            <Text style={styles.bannerBtnText}>Смотреть</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      {/* New Arrivals */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={commonStyles.sectionTitle}>НОВИНКИ</Text>
          <TouchableOpacity onPress={() => navigation?.navigate('Catalog')}>
            <Text style={styles.viewAll}>Смотреть все →</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.productGrid}>
          {featuredItems.map((item, idx) => {
            const isWishlisted = wishlist.some(w => w.id === item.id);
            return (
              <TouchableOpacity key={item.id} onPress={() => onViewProduct(item)} activeOpacity={0.9} style={styles.productCard}>
                <View style={styles.productImage}>
                  <SvgNoPhoto size={80} color="#64748b" />
                  <View style={styles.productBadges}>
                    <Text style={[commonStyles.badge, commonStyles.badgeNew]}>Новинка</Text>
                    {item.condition === 'secondhand' && <Text style={[commonStyles.badge, commonStyles.badgeSale]}>Sale</Text>}
                  </View>
                  <TouchableOpacity onPress={() => addToWishlist(item)} style={styles.wishlistBtn}>
                    <SvgWishlist size={16} color={isWishlisted ? '#f43f5e' : '#fff'} fill={isWishlisted ? '#f43f5e' : 'none'} />
                  </TouchableOpacity>
                </View>
                <View style={styles.productInfo}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <SvgDisc size={12} color="#64748b" />
                    <Text style={styles.artistName}>{item.artist.name}</Text>
                  </View>
                  <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.sizeRow}>
                    {['S', 'M', 'L', 'XL'].map(s => (
                      <View key={s} style={styles.sizePill}><Text style={styles.sizePillText}>{s}</Text></View>
                    ))}
                  </View>
                  <View style={styles.productFooter}>
                    <Text style={styles.productPrice}>{item.price.toLocaleString('ru-RU')} ₽</Text>
                    <TouchableOpacity onPress={() => addToCart(item)} style={styles.buyBtn}>
                      <SvgBag size={14} color="#0f172a" />
                      <Text style={styles.buyBtnText}>Купить</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Brand Collaborations */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={commonStyles.sectionTitle}>КОЛЛАБОРАЦИИ</Text>
          <TouchableOpacity onPress={() => navigation?.navigate('Catalog')}>
            <Text style={styles.viewAll}>Все бренды →</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.brandGrid}>
          {artists.map((artist) => {
            const IconComp = artistIcons[artist.slug];
            const itemCount = items.filter(i => i.artist.slug === artist.slug).length;
            return (
              <TouchableOpacity key={artist.id} style={styles.brandCard} onPress={() => handleArtistClick(artist.slug)} activeOpacity={0.7}>
                {IconComp && <IconComp size={32} />}
                <Text style={styles.brandName}>{artist.name}</Text>
                <Text style={styles.brandItems}>{itemCount} товаров</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Info stickers */}
      <View style={styles.infoRow}>
        {[
          { icon: <SvgRocket size={20} color="#f59e0b" />, title: 'Собственная коллекция', desc: 'Создаём мерч в коллаборации с артистами', color: '#f59e0b' },
          { icon: <SvgRocket size={20} color="#10b981" />, title: 'Доставка по РФ и миру', desc: 'Оперативно отправляем в любой регион', color: '#10b981' },
          { icon: <SvgCrown size={20} color="#f43f5e" />, title: '100% оригиналы', desc: 'Каждая вещь проверена на подлинность', color: '#f43f5e' },
        ].map((s, i) => (
          <View key={i} style={[styles.infoCard, { borderTopColor: s.color }]}>
            {s.icon}
            <Text style={styles.infoTitle}>{s.title}</Text>
            <Text style={styles.infoDesc}>{s.desc}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bannerRow: { gap: 10, marginBottom: 24 },
  banner: { padding: 16, borderRadius: RADIUS.lg, gap: 6 },
  bannerAccent: { fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  bannerTitle: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  bannerDesc: { fontSize: 12, color: COLORS.textMuted },
  bannerBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: RADIUS.md, alignSelf: 'flex-start', marginTop: 4 },
  bannerBtnText: { fontSize: 12, fontWeight: '700', color: '#0f172a' },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  viewAll: { fontSize: 12, color: COLORS.accent, fontWeight: '600' },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  productCard: { width: '47%', backgroundColor: COLORS.glass, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: COLORS.glassBorder, overflow: 'hidden' },
  productImage: { aspectRatio: 1, backgroundColor: 'rgba(255,255,255,0.03)', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  productBadges: { position: 'absolute', top: 8, left: 8, gap: 4 },
  wishlistBtn: { position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  productInfo: { padding: 10, gap: 6 },
  artistName: { fontSize: 11, color: COLORS.textMuted, fontWeight: '600' },
  productName: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  sizeRow: { flexDirection: 'row', gap: 4 },
  sizePill: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  sizePillText: { fontSize: 10, color: COLORS.textMuted, fontWeight: '600' },
  productFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)', paddingTop: 8 },
  productPrice: { fontSize: 15, fontWeight: '700', color: COLORS.accent },
  buyBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: COLORS.accent, paddingHorizontal: 10, paddingVertical: 6, borderRadius: RADIUS.sm },
  buyBtnText: { fontSize: 11, fontWeight: '700', color: '#0f172a' },
  brandGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  brandCard: { width: '30%', backgroundColor: COLORS.glass, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: COLORS.glassBorder, padding: 12, alignItems: 'center', gap: 6 },
  brandName: { fontSize: 11, fontWeight: '700', color: COLORS.text, textAlign: 'center' },
  brandItems: { fontSize: 10, color: COLORS.textMuted },
  infoRow: { gap: 10 },
  infoCard: { backgroundColor: COLORS.glass, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: COLORS.glassBorder, borderTopWidth: 2, padding: 16, gap: 6 },
  infoTitle: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  infoDesc: { fontSize: 11, color: COLORS.textMuted },
});

export default HomeScreen;
