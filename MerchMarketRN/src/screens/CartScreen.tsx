import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, SPACING, RADIUS, commonStyles } from '../styles/theme';
import { SvgTrash, SvgPackage, SvgCheck, SvgBag } from '../components/CustomSvg';
import { api } from '../api/client';

interface CartScreenProps {
  cart: any[];
  updateCartQuantity: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  navigation?: any;
}

const CartScreen: React.FC<CartScreenProps> = ({ cart, updateCartQuantity, removeFromCart, clearCart }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setOrderError(null);
    try {
      const res = await api.post('/checkout/', { items: cart.map(i => ({ id: i.id, quantity: i.quantity || 1 })) });
      const data = await res.json();
      if (data.success) {
        setOrderSuccess(data.message || 'Заказ оформлен!');
        clearCart();
      } else {
        setOrderError(data.error || 'Ошибка оформления');
      }
    } catch {
      setOrderError('Сервер недоступен');
    }
    setIsCheckingOut(false);
  };

  if (orderSuccess) {
    return (
      <View style={[commonStyles.screen, commonStyles.center]}>
        <SvgCheck size={64} color="#10b981" />
        <Text style={styles.emptyTitle}>{orderSuccess}</Text>
      </View>
    );
  }

  if (cart.length === 0) {
    return (
      <View style={[commonStyles.screen, commonStyles.center]}>
        <SvgPackage size={64} color="#64748b" />
        <Text style={styles.emptyTitle}>Корзина пуста</Text>
        <Text style={styles.emptyDesc}>Добавьте товары из каталога</Text>
      </View>
    );
  }

  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={{ paddingBottom: 40 }}>
      {cart.map((item) => (
        <View key={item.id} style={[commonStyles.card, styles.cartItem]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price.toLocaleString('ru-RU')} ₽</Text>
          </View>
          <View style={styles.qtyRow}>
            <TouchableOpacity onPress={() => updateCartQuantity(item.id, -1)} style={styles.qtyBtn}>
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{item.quantity || 1}</Text>
            <TouchableOpacity onPress={() => updateCartQuantity(item.id, 1)} style={styles.qtyBtn}>
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.lineTotal}>{((item.quantity || 1) * item.price).toLocaleString('ru-RU')} ₽</Text>
          <TouchableOpacity onPress={() => removeFromCart(item.id)}>
            <SvgTrash size={20} color="#f43f5e" />
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.divider} />
      <View style={styles.subtotalRow}>
        <Text style={styles.subtotalLabel}>Итого</Text>
        <Text style={styles.subtotalValue}>{subtotal.toLocaleString('ru-RU')} ₽</Text>
      </View>

      {orderError && <Text style={styles.error}>{orderError}</Text>}

      <View style={styles.actionRow}>
        <TouchableOpacity onPress={clearCart} style={[commonStyles.buttonGlass]}>
          <Text style={commonStyles.buttonGlassText}>Очистить</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCheckout} disabled={isCheckingOut} style={[commonStyles.buttonGold, isCheckingOut && { opacity: 0.5 }]}>
          <SvgBag size={16} color="#0f172a" />
          <Text style={commonStyles.buttonGoldText}>{isCheckingOut ? 'Оформляем...' : 'Оформить заказ'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cartItem: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  itemName: { fontSize: 14, fontWeight: '600', color: COLORS.text, flex: 1 },
  itemPrice: { fontSize: 13, color: COLORS.accent, fontWeight: '700', marginTop: 2 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  qtyBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { color: COLORS.text, fontSize: 16, fontWeight: '700' },
  qtyValue: { color: COLORS.text, fontSize: 15, fontWeight: '700', minWidth: 20, textAlign: 'center' },
  lineTotal: { color: COLORS.text, fontSize: 14, fontWeight: '700', minWidth: 70, textAlign: 'right' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.08)', marginVertical: 12 },
  subtotalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  subtotalLabel: { fontSize: 16, color: COLORS.textSecondary },
  subtotalValue: { fontSize: 20, fontWeight: '700', color: COLORS.accent },
  error: { color: COLORS.red, fontSize: 13, marginBottom: 12, textAlign: 'center' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginTop: 16 },
  emptyDesc: { fontSize: 13, color: COLORS.textMuted, marginTop: 6 },
});

export default CartScreen;
