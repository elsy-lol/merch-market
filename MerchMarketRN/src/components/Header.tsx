import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Animated, Dimensions, ScrollView } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../styles/theme';
import { SvgHome, SvgCatalog, SvgAbout, SvgCart, SvgWishlist, SvgProfile, SvgMusicNote, SvgLogout, SvgMenu, SvgClose } from '../components/CustomSvg';
import { useAuth } from '../context/AuthContext';

type TabKey = 'home' | 'catalog' | 'about' | 'cart' | 'wishlist' | 'profile' | 'login' | 'register';

interface MenuOverlayProps {
  activeTab: TabKey;
  setTab: (tab: TabKey) => void;
  cartCount: number;
  wishlistCount: number;
}

const DRAWER_WIDTH = 280;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const NAV_ITEMS: { key: TabKey; label: string; icon: React.FC<{ size?: number; color?: string }> }[] = [
  { key: 'home', label: 'Главная', icon: SvgHome },
  { key: 'catalog', label: 'Каталог', icon: SvgCatalog },
  { key: 'about', label: 'О нас', icon: SvgAbout },
];

const MenuOverlay: React.FC<MenuOverlayProps> = ({ activeTab, setTab, cartCount, wishlistCount }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = React.useState(false);
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: open ? 0 : -DRAWER_WIDTH,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: open ? 1 : 0,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start();
  }, [open]);

  const handleNav = (key: TabKey) => {
    setTab(key);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    setTab('home');
  };

  const isActive = (key: TabKey) => activeTab === key;

  return (
    <>
      {/* Hamburger button */}
      <TouchableOpacity onPress={() => setOpen(true)} style={styles.hamburger} activeOpacity={0.8}>
        <SvgMenu size={20} color="#f1f5f9" />
      </TouchableOpacity>

      {/* Overlay backdrop */}
      {open && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setOpen(false)}
          style={styles.backdrop}
        >
          <Animated.View style={[styles.backdropInner, { opacity: fadeAnim }]} />
        </TouchableOpacity>
      )}

      {/* Drawer */}
      <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.drawerInner}>
          {/* Header */}
          <View style={styles.drawerHeader}>
            <View style={styles.drawerLogo}>
              <SvgMusicNote size={22} color="#f59e0b" />
              <Text style={styles.drawerLogoText}>STICKER // MERCH</Text>
            </View>
            <TouchableOpacity onPress={() => setOpen(false)} style={styles.closeBtn}>
              <SvgClose size={18} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Nav links */}
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.navSection}>
              <Text style={styles.navSectionLabel}>НАВИГАЦИЯ</Text>
              {NAV_ITEMS.map(item => (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => handleNav(item.key)}
                  style={[styles.navItem, isActive(item.key) && styles.navItemActive]}
                >
                  <item.icon size={18} color={isActive(item.key) ? '#f59e0b' : '#94a3b8'} />
                  <Text style={[styles.navItemText, isActive(item.key) && styles.navItemTextActive]}>
                    {item.label}
                  </Text>
                  {isActive(item.key) && <View style={styles.navActiveDot} />}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.divider} />

            {/* Actions */}
            <View style={styles.navSection}>
              <Text style={styles.navSectionLabel}>ДЕЙСТВИЯ</Text>

              <TouchableOpacity onPress={() => handleNav('wishlist')} style={[styles.navItem, isActive('wishlist') && styles.navItemActive]}>
                <SvgWishlist size={18} color={isActive('wishlist') ? '#f59e0b' : '#94a3b8'} fill={isActive('wishlist') ? '#f59e0b' : 'none'} />
                <Text style={[styles.navItemText, isActive('wishlist') && styles.navItemTextActive]}>Избранное</Text>
                {wishlistCount > 0 && (
                  <View style={styles.navBadge}><Text style={styles.navBadgeText}>{wishlistCount}</Text></View>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleNav('cart')} style={[styles.navItem, isActive('cart') && styles.navItemActive]}>
                <SvgCart size={18} color={isActive('cart') ? '#f59e0b' : '#94a3b8'} />
                <Text style={[styles.navItemText, isActive('cart') && styles.navItemTextActive]}>Корзина</Text>
                {cartCount > 0 && (
                  <View style={styles.navBadge}><Text style={styles.navBadgeText}>{cartCount}</Text></View>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* Profile */}
            <View style={styles.navSection}>
              <Text style={styles.navSectionLabel}>АККАУНТ</Text>
              {isAuthenticated ? (
                <>
                  <TouchableOpacity onPress={() => handleNav('profile')} style={[styles.navItem, isActive('profile') && styles.navItemActive]}>
                    <SvgProfile size={18} color={isActive('profile') ? '#f59e0b' : '#94a3b8'} />
                    <Text style={[styles.navItemText, isActive('profile') && styles.navItemTextActive]}>Профиль</Text>
                    {isActive('profile') && <View style={styles.navActiveDot} />}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleLogout} style={styles.navItem}>
                    <SvgLogout size={18} color="#64748b" />
                    <Text style={[styles.navItemText, { color: '#64748b' }]}>Выйти</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity onPress={() => handleNav('login')} style={[styles.navItem, isActive('login') && styles.navItemActive]}>
                  <SvgProfile size={18} color={isActive('login') ? '#f59e0b' : '#94a3b8'} />
                  <Text style={[styles.navItemText, isActive('login') && styles.navItemTextActive]}>Войти</Text>
                  {isActive('login') && <View style={styles.navActiveDot} />}
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>

          {/* Footer */}
          {isAuthenticated && user && (
            <View style={styles.drawerFooter}>
              <View style={styles.footerAvatar}>
                <SvgProfile size={16} color="#f59e0b" />
              </View>
              <Text style={styles.footerName}>{user.display_name || user.username}</Text>
            </View>
          )}
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  hamburger: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 12 : 48,
    left: 14,
    zIndex: 100,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { backdropFilter: 'blur(12px)' },
    }),
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 200,
  },
  backdropInner: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    zIndex: 300,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  drawerInner: {
    flex: 1,
    backgroundColor: 'rgba(12,12,20,0.97)',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.06)',
    ...Platform.select({
      web: { backdropFilter: 'blur(24px)' },
    }),
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: Platform.OS === 'web' ? 14 : 50,
  },
  drawerLogo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  drawerLogoText: { fontSize: 14, fontWeight: '700', color: COLORS.text, letterSpacing: 2 },
  closeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginHorizontal: 16, marginVertical: 8 },
  navSection: { paddingHorizontal: 12, marginBottom: 4 },
  navSectionLabel: { fontSize: 10, color: '#64748b', fontWeight: '700', letterSpacing: 1.5, marginBottom: 6, marginLeft: 8, marginTop: 4 },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: RADIUS.md,
    position: 'relative',
  },
  navItemActive: { backgroundColor: 'rgba(245,158,11,0.08)' },
  navItemText: { fontSize: 14, color: '#94a3b8', fontWeight: '600', flex: 1 },
  navItemTextActive: { color: '#f59e0b' },
  navActiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#f59e0b',
    position: 'absolute',
    right: 12,
  },
  navBadge: {
    backgroundColor: '#f43f5e',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  navBadgeText: { fontSize: 10, fontWeight: '700', color: '#fff' },
  drawerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  footerAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(245,158,11,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerName: { fontSize: 13, color: COLORS.textMuted, fontWeight: '600' },
});

export default MenuOverlay;
