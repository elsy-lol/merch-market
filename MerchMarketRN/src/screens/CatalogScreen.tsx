import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, commonStyles } from '../styles/theme';
import { SvgNoPhoto, SvgWishlist, SvgSearch, SvgCheck, SvgBag, SvgDisc, SvgArrowLeft } from '../components/CustomSvg';
import artistIcons from '../components/ArtistIcons';

const SORT_OPTIONS = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'price-asc', label: 'Цена: по возрастанию' },
  { value: 'price-desc', label: 'Цена: по убыванию' },
  { value: 'name-asc', label: 'Название: А-Я' },
  { value: 'name-desc', label: 'Название: Я-А' },
];

const CONDITION_OPTIONS = [
  { value: 'all', label: 'Все' },
  { value: 'new', label: 'Новое' },
  { value: 'secondhand', label: 'Б/У' },
];

const ARTIST_TAGS: Record<string, string> = {
  gonefludd: 'психоделика', lsp: 'синти-поп', pharaoh: 'клауд-рэп',
  oxxxymiron: 'грайм', skryptonite: 'бит-музыка', guf: 'олдскул',
  miyagi: 'рэп-регги', 'boulevard-depo': 'неон-трэп', atl: 'андеграунд', face: 'поп-рэп',
};

interface CatalogScreenProps {
  artists: any[];
  items: any[];
  addToCart: (item: any) => void;
  addToWishlist: (item: any) => void;
  wishlist: any[];
  selectedArtistSlug?: string;
  setSelectedArtistSlug?: (slug: string) => void;
  navigation?: any;
  onViewProduct: (item: any) => void;
}

const CatalogScreen: React.FC<CatalogScreenProps> = ({ artists, items, addToCart, addToWishlist, wishlist, selectedArtistSlug, setSelectedArtistSlug, navigation, onViewProduct }) => {
  const [filterCondition, setFilterCondition] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [searchArtist, setSearchArtist] = useState('');
  const [searchMerch, setSearchMerch] = useState('');

  const selectedArtist = artists.find(a => a.slug === selectedArtistSlug);

  const processedItems = useMemo(() => {
    if (!selectedArtistSlug) return [];
    let result = items.filter(item => item.artist.slug === selectedArtistSlug);

    if (searchMerch.trim()) {
      const q = searchMerch.toLowerCase();
      result = result.filter(i => i.name.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q));
    }
    if (filterCondition !== 'all') result = result.filter(i => i.condition === filterCondition);

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'name-asc': result.sort((a, b) => a.name.localeCompare(b.name, 'ru')); break;
      case 'name-desc': result.sort((a, b) => b.name.localeCompare(a.name, 'ru')); break;
    }
    return result;
  }, [items, selectedArtistSlug, filterCondition, sortBy, searchMerch]);

  // Artist selection view
  if (!selectedArtistSlug) {
    const filtered = artists.filter(a => a.name.toLowerCase().includes(searchArtist.toLowerCase()));
    return (
      <ScrollView style={commonStyles.screen} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={[commonStyles.sectionTitle, { textAlign: 'center', marginBottom: 8 }]}>ВЫБЕРИ АРТИСТА</Text>
        <Text style={{ textAlign: 'center', color: COLORS.accent, fontSize: 13, marginBottom: 20, opacity: 0.7 }}>Нажми на карточку, чтобы открыть коллекцию</Text>

        <View style={[commonStyles.cardSticker, { marginBottom: 20 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <SvgSearch size={18} color="#64748b" />
            <TextInput style={{ flex: 1, paddingVertical: 10, color: COLORS.text, fontSize: 14 }} placeholder="Поиск артиста..." placeholderTextColor="rgba(255,255,255,0.2)" value={searchArtist} onChangeText={setSearchArtist} />
          </View>
        </View>

        {filtered.length === 0 ? (
          <View style={{ alignItems: 'center', paddingTop: 40 }}>
            <SvgSearch size={48} color="#64748b" />
            <Text style={{ color: COLORS.text, fontSize: 16, fontWeight: '700', marginTop: 12 }}>Ничего не найдено</Text>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {filtered.map((artist) => {
              const IconComp = artistIcons[artist.slug];
              const itemCount = items.filter(i => i.artist.slug === artist.slug).length;
              return (
                <TouchableOpacity key={artist.id} style={styles.artistCard} onPress={() => { setSelectedArtistSlug?.(artist.slug); setSearchMerch(''); }} activeOpacity={0.7}>
                  {IconComp && <IconComp size={36} />}
                  <Text style={styles.artistCardName}>{artist.name}</Text>
                  <Text style={styles.artistCardTag}>{ARTIST_TAGS[artist.slug] || 'рэп'}</Text>
                  <View style={styles.artistCardFooter}>
                    <Text style={styles.artistCardItems}>{itemCount} товаров</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    );
  }

  // Artist's merch view
  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Back + search + filters */}
      <View style={[commonStyles.cardSticker, { marginBottom: 16 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <TouchableOpacity onPress={() => { setSelectedArtistSlug?.(''); setSortBy('default'); setFilterCondition('all'); setSearchMerch(''); }}>
            <SvgArrowLeft size={20} color="#f1f5f9" />
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: RADIUS.sm, paddingHorizontal: 10, gap: 6 }}>
            <SvgSearch size={14} color="#64748b" />
            <TextInput style={{ flex: 1, paddingVertical: 8, color: COLORS.text, fontSize: 13 }} placeholder="Поиск мерча..." placeholderTextColor="rgba(255,255,255,0.2)" value={searchMerch} onChangeText={setSearchMerch} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {CONDITION_OPTIONS.map(opt => (
            <TouchableOpacity key={opt.value} onPress={() => setFilterCondition(opt.value)} style={[styles.filterChip, filterCondition === opt.value && styles.filterChipActive]}>
              <Text style={[styles.filterChipText, filterCondition === opt.value && styles.filterChipTextActive]}>{opt.label}</Text>
              {filterCondition === opt.value && <SvgCheck size={12} color="#f59e0b" />}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Artist header */}
      <View style={[commonStyles.cardSticker, { borderTopColor: COLORS.accent, borderTopWidth: 2, marginBottom: 16 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          {selectedArtist && React.createElement(artistIcons[selectedArtist.slug] || (() => null), { size: 40 })}
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.text }}>{selectedArtist?.name}</Text>
            <Text style={{ fontSize: 12, color: COLORS.textMuted }}>{selectedArtist?.description}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' }}>
          <Text style={{ fontSize: 13, color: COLORS.textMuted }}>{processedItems.length} товаров</Text>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            {SORT_OPTIONS.map(opt => (
              <TouchableOpacity key={opt.value} onPress={() => setSortBy(opt.value)} style={[styles.sortChip, sortBy === opt.value && styles.sortChipActive]}>
                <Text style={[styles.sortChipText, sortBy === opt.value && styles.sortChipTextActive]}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Products */}
      {processedItems.length === 0 ? (
        <View style={{ alignItems: 'center', paddingTop: 40 }}>
          <SvgSearch size={48} color="#64748b" />
          <Text style={{ color: COLORS.text, fontSize: 16, fontWeight: '700', marginTop: 12 }}>Ничего не найдено</Text>
        </View>
      ) : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {processedItems.map((item, idx) => {
            const isWishlisted = wishlist.some(w => w.id === item.id);
            return (
              <TouchableOpacity key={item.id} style={styles.productCard} onPress={() => onViewProduct(item)} activeOpacity={0.9}>
                <View style={styles.productImage}>
                  <SvgNoPhoto size={60} color="#64748b" />
                  <View style={styles.productBadges}>
                    <Text style={[commonStyles.badge, commonStyles.badgeNew]}>Новинка</Text>
                    {item.condition === 'secondhand' && <Text style={[commonStyles.badge, commonStyles.badgeSale]}>Sale</Text>}
                  </View>
                  <TouchableOpacity onPress={() => addToWishlist(item)} style={styles.wishlistBtn}>
                    <SvgWishlist size={14} color={isWishlisted ? '#f43f5e' : '#fff'} fill={isWishlisted ? '#f43f5e' : 'none'} />
                  </TouchableOpacity>
                </View>
                <View style={styles.productInfo}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <SvgDisc size={10} color="#64748b" />
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
                      <SvgBag size={12} color="#0f172a" />
                      <Text style={styles.buyBtnText}>Купить</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  artistCard: { width: '46%', backgroundColor: COLORS.glass, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: COLORS.glassBorder, padding: 16, alignItems: 'center', gap: 6 },
  artistCardName: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  artistCardTag: { fontSize: 9, color: COLORS.accent, opacity: 0.5, letterSpacing: 1, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', overflow: 'hidden' },
  artistCardFooter: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)', paddingTop: 8, width: '100%', alignItems: 'center' },
  artistCardItems: { fontSize: 10, color: COLORS.textMuted, fontWeight: '700' },
  filterChip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: RADIUS.sm, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  filterChipActive: { backgroundColor: 'rgba(245,158,11,0.15)', borderColor: 'rgba(245,158,11,0.3)' },
  filterChipText: { fontSize: 12, color: COLORS.textMuted, fontWeight: '600' },
  filterChipTextActive: { color: COLORS.accent },
  sortChip: { paddingHorizontal: 6, paddingVertical: 4, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.05)' },
  sortChipActive: { backgroundColor: 'rgba(245,158,11,0.15)' },
  sortChipText: { fontSize: 10, color: COLORS.textMuted },
  sortChipTextActive: { color: COLORS.accent },
  productCard: { width: '47%', backgroundColor: COLORS.glass, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: COLORS.glassBorder, overflow: 'hidden' },
  productImage: { aspectRatio: 1, backgroundColor: 'rgba(255,255,255,0.03)', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  productBadges: { position: 'absolute', top: 6, left: 6, gap: 3 },
  wishlistBtn: { position: 'absolute', top: 6, right: 6, width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  productInfo: { padding: 8, gap: 4 },
  artistName: { fontSize: 10, color: COLORS.textMuted, fontWeight: '600' },
  productName: { fontSize: 12, fontWeight: '700', color: COLORS.text },
  sizeRow: { flexDirection: 'row', gap: 3 },
  sizePill: { paddingHorizontal: 5, paddingVertical: 1, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  sizePillText: { fontSize: 9, color: COLORS.textMuted, fontWeight: '600' },
  productFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)', paddingTop: 6 },
  productPrice: { fontSize: 13, fontWeight: '700', color: COLORS.accent },
  buyBtn: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: COLORS.accent, paddingHorizontal: 8, paddingVertical: 5, borderRadius: RADIUS.sm },
  buyBtnText: { fontSize: 10, fontWeight: '700', color: '#0f172a' },
});

export default CatalogScreen;
