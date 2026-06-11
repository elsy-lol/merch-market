import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, commonStyles } from '../styles/theme';
import { SvgUser, SvgCrown, SvgTag, SvgCheck, SvgPackage } from '../components/CustomSvg';
import { useAuth } from '../context/AuthContext';
import { MOCK_ARTISTS } from '../api/client';

const ProfileScreen: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const [displayName, setDisplayName] = useState(user?.display_name || '');
  const [favoriteArtist, setFavoriteArtist] = useState(user?.favorite_artist || '');
  const [showSavedMsg, setShowSavedMsg] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({ total_orders: 0, total_spent: 0, total_items: 0, rank: 'Коллекционер' });

  useEffect(() => {
    setDisplayName(user?.display_name || '');
    setFavoriteArtist(user?.favorite_artist || '');
  }, [user]);

  const handleSave = async () => {
    await updateProfile({ display_name: displayName, favorite_artist: favoriteArtist });
    setShowSavedMsg(true);
    setTimeout(() => setShowSavedMsg(false), 2000);
  };

  const STATS_DATA = [
    { icon: <SvgPackage size={20} color="#f59e0b" />, label: 'Заказов', value: stats.total_orders },
    { icon: <SvgTag size={20} color="#f59e0b" />, label: 'Товаров', value: stats.total_items },
    { icon: <SvgCrown size={20} color="#f59e0b" />, label: 'Потрачено', value: `${stats.total_spent.toLocaleString()} ₽` },
    { icon: <SvgCheck size={20} color="#10b981" />, label: 'Ранг', value: stats.rank },
  ];

  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Avatar */}
      <View style={styles.avatarWrap}>
        <View style={styles.avatar}>
          <SvgUser size={36} color="#f59e0b" />
        </View>
        <Text style={styles.displayName}>{user?.display_name || user?.username}</Text>
        <Text style={styles.username}>@{user?.username}</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {STATS_DATA.map((s, i) => (
          <View key={i} style={styles.statCard}>
            {s.icon}
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Edit form */}
      <View style={[commonStyles.card, { gap: 14, marginBottom: 20 }]}>
        <Text style={styles.sectionTitle}>РЕДАКТИРОВАТЬ</Text>

        <Text style={styles.label}>Отображаемое имя</Text>
        <TextInput style={commonStyles.input} value={displayName} onChangeText={setDisplayName} placeholderTextColor="rgba(255,255,255,0.2)" />

        <Text style={styles.label}>Любимый артист</Text>
        <View style={styles.artistRow}>
          {MOCK_ARTISTS.slice(0, 5).map((a) => (
            <TouchableOpacity key={a.slug} onPress={() => setFavoriteArtist(a.slug)} style={[styles.artistChip, favoriteArtist === a.slug && styles.artistChipActive]}>
              <Text style={[styles.artistChipText, favoriteArtist === a.slug && styles.artistChipTextActive]}>{a.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {showSavedMsg && <Text style={styles.savedMsg}>Сохранено!</Text>}
        <TouchableOpacity onPress={handleSave} style={[commonStyles.buttonGold, { alignSelf: 'flex-start' }]}>
          <Text style={commonStyles.buttonGoldText}>Сохранить</Text>
        </TouchableOpacity>
      </View>

      {/* Order history */}
      <View style={[commonStyles.card, { gap: 10 }]}>
        <Text style={styles.sectionTitle}>ИСТОРИЯ ЗАКАЗОВ</Text>
        {orders.length === 0 ? (
          <Text style={{ color: COLORS.textMuted, fontSize: 13 }}>У вас пока нет заказов</Text>
        ) : (
          orders.map((o) => (
            <View key={o.id} style={styles.orderRow}>
              <Text style={styles.orderId}>#{o.id}</Text>
              <Text style={styles.orderStatus}>{o.status}</Text>
              <Text style={styles.orderTotal}>{o.total} ₽</Text>
            </View>
          ))
        )}
      </View>

      {/* Logout */}
      <TouchableOpacity onPress={logout} style={[commonStyles.buttonGlass, { marginTop: 20, alignSelf: 'center' }]}>
        <Text style={commonStyles.buttonGlassText}>Выйти</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  avatarWrap: { alignItems: 'center', paddingVertical: 30, gap: 8 },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(245,158,11,0.12)', alignItems: 'center', justifyContent: 'center' },
  displayName: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  username: { fontSize: 13, color: COLORS.textMuted },
  statsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  statCard: { flex: 1, minWidth: '45%', backgroundColor: COLORS.glass, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: COLORS.glassBorder, padding: 14, alignItems: 'center', gap: 6 },
  statValue: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  statLabel: { fontSize: 11, color: COLORS.textMuted },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text, letterSpacing: 1 },
  label: { fontSize: 12, color: COLORS.textMuted, fontWeight: '600' },
  artistRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  artistChip: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: RADIUS.full, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  artistChipActive: { backgroundColor: 'rgba(245,158,11,0.15)', borderColor: 'rgba(245,158,11,0.3)' },
  artistChipText: { fontSize: 11, color: COLORS.textMuted, fontWeight: '600' },
  artistChipTextActive: { color: COLORS.accent },
  savedMsg: { color: COLORS.emerald, fontSize: 13, fontWeight: '600' },
  orderRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  orderId: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  orderStatus: { fontSize: 13, color: COLORS.accent },
  orderTotal: { fontSize: 13, color: COLORS.text },
});

export default ProfileScreen;
