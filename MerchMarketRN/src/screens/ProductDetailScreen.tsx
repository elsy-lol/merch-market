import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, commonStyles } from '../styles/theme';
import { SvgNoPhoto, SvgWishlist, SvgCart, SvgCheck, SvgTag, SvgMusicNote, SvgArrowLeft, SvgHourglass, SvgPackage, SvgCrown, SvgStar, SvgBag } from '../components/CustomSvg';
import { getStickerIcon } from '../components/CustomSvg';

const TYPE_LABELS: Record<string, string> = {
  tshirt: 'Футболка', hoodie: 'Худи', cap: 'Кепка', vinyl: 'Винил', cassette: 'Кассета', accessory: 'Аксессуар',
};

const SIZES = ['S', 'M', 'L', 'XL'];
const TYPE_HAS_SIZE = new Set(['tshirt', 'hoodie', 'cap']);

interface ProductDetailScreenProps {
  items: any[];
  addToCart: (item: any) => void;
  addToWishlist: (item: any) => void;
  wishlist: any[];
  navigation?: any;
  route?: any;
  setSelectedArtistSlug?: (slug: string) => void;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ items, addToCart, addToWishlist, wishlist, navigation, route, setSelectedArtistSlug }) => {
  const id = route?.params?.id;
  const product = useMemo(() => items.find(item => item.id === Number(id)), [items, id]);
  const [selectedSize, setSelectedSize] = useState(product?.size || '');

  const isWishlisted = wishlist.some(w => w.id === product?.id);

  const relatedItems = useMemo(() => {
    if (!product) return [];
    return items.filter(item => item.artist.id === product.artist.id && item.id !== product.id).slice(0, 4);
  }, [items, product]);

  if (!product) {
    return (
      <View style={[commonStyles.screen, commonStyles.center]}>
        <SvgPackage size={64} color="#64748b" />
        <Text style={styles.notFoundTitle}>Товар не найден</Text>
        <TouchableOpacity onPress={() => navigation?.navigate('Catalog')} style={[commonStyles.buttonGold, { marginTop: 16 }]}>
          <Text style={commonStyles.buttonGoldText}>В каталог</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const hasSizeSelector = TYPE_HAS_SIZE.has(product.image_sticker_type);

  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Back */}
      <TouchableOpacity onPress={() => navigation?.goBack()} style={[commonStyles.buttonGlass, { alignSelf: 'flex-start', marginBottom: 16 }]}>
        <SvgArrowLeft size={16} color="#f1f5f9" />
        <Text style={commonStyles.buttonGlassText}>Назад</Text>
      </TouchableOpacity>

      {/* Image */}
      <View style={[commonStyles.cardSticker, { alignItems: 'center', padding: 32, marginBottom: 20 }]}>
        <View style={{ width: 160, height: 160 }}>
          <SvgNoPhoto size={160} color="#64748b" />
        </View>
        <View style={styles.badgeCorner}>
          <Text style={[commonStyles.badge, product.condition === 'new' ? commonStyles.badgeNew : commonStyles.badgeSale]}>
            {product.condition === 'new' ? 'Новинка' : 'Б/У'}
          </Text>
          {product.is_original && (
            <View style={[commonStyles.badge, { backgroundColor: 'rgba(245,158,11,0.15)', color: COLORS.accent, flexDirection: 'row', alignItems: 'center', gap: 4 }]}>
              <SvgCrown size={12} color="#f59e0b" />
              <Text style={{ color: COLORS.accent, fontSize: 10, fontWeight: '700' }}>Оригинал</Text>
            </View>
          )}
        </View>
      </View>

      {/* Info */}
      <View style={{ gap: 14, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <Text style={[commonStyles.badge, product.condition === 'new' ? commonStyles.badgeNew : commonStyles.badgeSale]}>
            {product.condition === 'new' ? 'Новинка' : 'Б/У Секонд'}
          </Text>
          {product.is_original && (
            <View style={[commonStyles.badge, { backgroundColor: 'rgba(245,158,11,0.15)', flexDirection: 'row', alignItems: 'center', gap: 4 }]}>
              <SvgCrown size={12} color="#f59e0b" />
              <Text style={{ color: COLORS.accent, fontSize: 10, fontWeight: '700' }}>Оригинал</Text>
            </View>
          )}
        </View>

        <Text style={styles.productTitle}>{product.name}</Text>

        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }} onPress={() => { setSelectedArtistSlug?.(product.artist.slug); navigation?.navigate('Catalog'); }}>
          <SvgMusicNote size={16} color="#f59e0b" />
          <Text style={styles.artistLink}>{product.artist.name}</Text>
        </TouchableOpacity>

        <Text style={styles.price}>{product.price.toLocaleString('ru-RU')} ₽</Text>

        {hasSizeSelector && (
          <View>
            <Text style={styles.label}>Размер</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {SIZES.map(s => (
                <TouchableOpacity key={s} onPress={() => setSelectedSize(s)} style={[styles.sizePillFull, selectedSize === s && styles.sizePillFullActive]}>
                  <Text style={[styles.sizePillFullText, selectedSize === s && styles.sizePillFullTextActive]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {!hasSizeSelector && product.size && (
          <View>
            <Text style={styles.label}>Размер</Text>
            <View style={styles.sizeDisplay}><Text style={styles.sizeDisplayText}>{product.size}</Text></View>
          </View>
        )}

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          {product.stock > 0 ? (
            <>
              <SvgCheck size={16} color="#10b981" />
              <Text style={{ fontSize: 13, fontWeight: '700', color: product.stock <= 3 ? COLORS.accent : COLORS.emerald }}>
                {product.stock > 5 ? `В наличии: ${product.stock} шт.` : `Осталось всего ${product.stock} шт.`}
              </Text>
            </>
          ) : (
            <>
              <SvgHourglass size={16} color="#f43f5e" />
              <Text style={{ fontSize: 13, color: COLORS.rose, fontWeight: '700' }}>Нет в наличии</Text>
            </>
          )}
        </View>

        <View style={commonStyles.separator} />
        <Text style={styles.descTitle}>Описание</Text>
        <Text style={styles.descText}>{product.description || 'Описание товара скоро появится.'}</Text>

        {/* Actions */}
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity onPress={() => addToCart(product)} disabled={product.stock === 0} style={[commonStyles.buttonGold, { flex: 1, justifyContent: 'center' }, product.stock === 0 && { opacity: 0.5 }]}>
            <SvgCart size={20} color="#0f172a" />
            <Text style={commonStyles.buttonGoldText}>{product.stock > 0 ? 'В корзину' : 'Нет в наличии'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => addToWishlist(product)} style={[commonStyles.buttonGlass]}>
            <SvgWishlist size={20} color={isWishlisted ? '#f43f5e' : '#fff'} fill={isWishlisted ? '#f43f5e' : 'none'} />
          </TouchableOpacity>
        </View>

        {/* Meta */}
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={styles.metaTag}>
            <SvgTag size={12} color="#64748b" />
            <Text style={styles.metaText}>{TYPE_LABELS[product.image_sticker_type] || 'Товар'}</Text>
          </View>
          <View style={styles.metaTag}>
            <SvgPackage size={12} color="#64748b" />
            <Text style={styles.metaText}>{product.condition === 'new' ? 'Новый' : 'Б/У'}</Text>
          </View>
        </View>
      </View>

      {/* Related items */}
      {relatedItems.length > 0 && (
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <SvgStar size={18} color="#f59e0b" />
            <Text style={commonStyles.sectionTitle}>Вам также понравится</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {relatedItems.map((item) => {
              const relWishlisted = wishlist.some(w => w.id === item.id);
              return (
                <TouchableOpacity key={item.id} style={{ width: '47%', backgroundColor: COLORS.glass, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: COLORS.glassBorder, overflow: 'hidden' }} onPress={() => navigation?.push('ProductDetail', { id: item.id })} activeOpacity={0.9}>
                  <View style={{ aspectRatio: 1, backgroundColor: 'rgba(255,255,255,0.03)', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <SvgNoPhoto size={48} color="#64748b" />
                    <TouchableOpacity onPress={() => addToWishlist(item)} style={{ position: 'absolute', top: 4, right: 4, width: 22, height: 22, borderRadius: 11, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' }}>
                      <SvgWishlist size={12} color={relWishlisted ? '#f43f5e' : '#fff'} fill={relWishlisted ? '#f43f5e' : 'none'} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ padding: 8, gap: 4 }}>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: COLORS.text }} numberOfLines={2}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)', paddingTop: 6 }}>
                      <Text style={{ fontSize: 13, fontWeight: '700', color: COLORS.accent }}>{item.price.toLocaleString('ru-RU')} ₽</Text>
                      <TouchableOpacity onPress={() => addToCart(item)} style={{ backgroundColor: COLORS.accent, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                        <SvgBag size={10} color="#0f172a" />
                        <Text style={{ fontSize: 9, fontWeight: '700', color: '#0f172a' }}>Купить</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  notFoundTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginTop: 16 },
  badgeCorner: { position: 'absolute', top: 12, left: 12, gap: 4 },
  productTitle: { fontSize: 24, fontWeight: '700', color: COLORS.text },
  artistLink: { fontSize: 16, color: COLORS.accent, textDecorationLine: 'underline' },
  price: { fontSize: 28, fontWeight: '700', color: COLORS.accent },
  label: { fontSize: 13, color: COLORS.textMuted, marginBottom: 6 },
  sizePillFull: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: RADIUS.sm, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  sizePillFullActive: { backgroundColor: 'rgba(245,158,11,0.15)', borderColor: 'rgba(245,158,11,0.3)' },
  sizePillFullText: { fontSize: 14, color: COLORS.textMuted, fontWeight: '600' },
  sizePillFullTextActive: { color: COLORS.accent },
  sizeDisplay: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: RADIUS.sm, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignSelf: 'flex-start' },
  sizeDisplayText: { fontSize: 13, color: COLORS.textMuted, fontWeight: '600' },
  descTitle: { fontSize: 13, fontWeight: '700', color: COLORS.text, letterSpacing: 1 },
  descText: { fontSize: 13, color: COLORS.textMuted, lineHeight: 18 },
  metaTag: { flexDirection: 'row', alignItems: 'center', gap: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: RADIUS.full },
  metaText: { fontSize: 10, color: COLORS.textMuted },
});

export default ProductDetailScreen;
