import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, commonStyles } from '../styles/theme';
import { SvgWishlist, SvgBag, SvgNoPhoto } from '../components/CustomSvg';

interface WishlistScreenProps {
  wishlist: any[];
  removeFromWishlist: (id: number) => void;
  addToCart: (item: any) => void;
  onViewProduct: (item: any) => void;
}

const WishlistScreen: React.FC<WishlistScreenProps> = ({ wishlist, removeFromWishlist, addToCart, onViewProduct }) => {
  if (wishlist.length === 0) {
    return (
      <View style={[commonStyles.screen, commonStyles.center]}>
        <SvgWishlist size={64} color="#64748b" fill="none" />
        <Text style={styles.emptyTitle}>Список пуст</Text>
        <Text style={styles.emptyDesc}>Добавляйте товары в избранное</Text>
      </View>
    );
  }

  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={commonStyles.sectionTitle}>ИЗБРАННОЕ</Text>
      <View style={styles.grid}>
        {wishlist.map((item) => (
          <TouchableOpacity key={item.id} style={commonStyles.cardSticker} onPress={() => onViewProduct(item)} activeOpacity={0.7}>
            <View style={styles.cardHeader}>
              <Text style={styles.badge}>{item.condition === 'new' ? 'Новинка' : 'Б/У'}</Text>
              <TouchableOpacity onPress={() => removeFromWishlist(item.id)}>
                <SvgWishlist size={18} color="#f43f5e" fill="#f43f5e" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconWrap}>
              <SvgNoPhoto size={48} color="#64748b" />
            </View>
            <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.price}>{item.price.toLocaleString('ru-RU')} ₽</Text>
              <TouchableOpacity onPress={() => { addToCart(item); removeFromWishlist(item.id); }} style={commonStyles.buttonGold}>
                <SvgBag size={14} color="#0f172a" />
                <Text style={commonStyles.buttonGoldText}>Купить</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
  badge: { fontSize: 10, fontWeight: '700', color: COLORS.emerald, backgroundColor: 'rgba(16,185,129,0.12)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, overflow: 'hidden' },
  iconWrap: { alignItems: 'center', marginVertical: 8 },
  itemName: { fontSize: 13, fontWeight: '600', color: COLORS.text, marginBottom: 8 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)', paddingTop: 8 },
  price: { fontSize: 15, fontWeight: '700', color: COLORS.accent },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginTop: 16 },
  emptyDesc: { fontSize: 13, color: COLORS.textMuted, marginTop: 6 },
});

export default WishlistScreen;
