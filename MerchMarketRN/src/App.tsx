import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { AuthProvider, useAuth } from './context/AuthContext';
import MenuOverlay from './components/Header';
import HomeScreen from './screens/HomeScreen';
import CatalogScreen from './screens/CatalogScreen';
import AboutScreen from './screens/AboutScreen';
import CartScreen from './screens/CartScreen';
import WishlistScreen from './screens/WishlistScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import { COLORS, SPACING } from './styles/theme';
import { api, loadCart, saveCart, loadWishlist, saveWishlist, MOCK_ARTISTS, MOCK_ITEMS } from './api/client';

type TabKey = 'home' | 'catalog' | 'about' | 'cart' | 'wishlist' | 'profile' | 'login' | 'register';
type ViewStack = { tab: TabKey; productId?: number }[];

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Navigation state
  const [viewStack, setViewStack] = useState<ViewStack>([{ tab: 'home' }]);
  const currentView = viewStack[viewStack.length - 1];

  const navigate = useCallback((tab: TabKey) => {
    setViewStack([{ tab }]);
  }, []);

  const pushView = useCallback((tab: TabKey, productId?: number) => {
    setViewStack(prev => [...prev, { tab, productId }]);
  }, []);

  const goBack = useCallback(() => {
    setViewStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  }, []);

  // Data state
  const [artists, setArtists] = useState<any[]>(MOCK_ARTISTS);
  const [items, setItems] = useState<any[]>(MOCK_ITEMS);
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [selectedArtistSlug, setSelectedArtistSlug] = useState<string>('');

  // Load data
  useEffect(() => {
    (async () => {
      try {
        const [artistsRes, itemsRes] = await Promise.all([
          api.get('/artists/'),
          api.get('/merch/'),
        ]);
        if (artistsRes.ok) {
          const data = await artistsRes.json();
          setArtists(data.artists || MOCK_ARTISTS);
        }
        if (itemsRes.ok) {
          const data = await itemsRes.json();
          setItems(data.items || MOCK_ITEMS);
        }
      } catch {
        // Use mock data as fallback
      }
    })();
  }, []);

  // Persist cart & wishlist
  useEffect(() => { (async () => { await saveCart(cart); })(); }, [cart]);
  useEffect(() => { (async () => { await saveWishlist(wishlist); })(); }, [wishlist]);

  useEffect(() => {
    (async () => {
      setCart(await loadCart());
      setWishlist(await loadWishlist());
    })();
  }, []);

  const addToCart = useCallback((item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const updateCartQuantity = useCallback((id: number, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id !== id) return i;
      const newQty = (i.quantity || 1) + delta;
      return newQty <= 0 ? { ...i, quantity: 1 } : { ...i, quantity: newQty };
    }));
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const addToWishlist = useCallback((item: any) => {
    setWishlist(prev => {
      if (prev.some(i => i.id === item.id)) return prev.filter(i => i.id !== item.id);
      return [...prev, item];
    });
  }, []);

  const removeFromWishlist = useCallback((id: number) => {
    setWishlist(prev => prev.filter(i => i.id !== id));
  }, []);

  const onViewProduct = useCallback((item: any) => {
    pushView('home', item.id);
  }, [pushView]);

  const currentTab = currentView.tab || 'home';

  const renderScreen = () => {
    switch (currentTab) {
      case 'home':
        if (currentView.productId) {
          return (
            <ProductDetailScreen
              items={items}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              wishlist={wishlist}
              navigation={{ goBack, navigate, push: (screen: string, params: any) => pushView('home', params.id) }}
              route={{ params: { id: currentView.productId } }}
              setSelectedArtistSlug={setSelectedArtistSlug}
            />
          );
        }
        return (
          <HomeScreen
            artists={artists}
            items={items}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            wishlist={wishlist}
            navigation={{ navigate }}
            onViewProduct={onViewProduct}
            setSelectedArtistSlug={setSelectedArtistSlug}
          />
        );
      case 'catalog':
        if (currentView.productId) {
          return (
            <ProductDetailScreen
              items={items}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              wishlist={wishlist}
              navigation={{ goBack, navigate, push: (screen: string, params: any) => pushView('catalog', params.id) }}
              route={{ params: { id: currentView.productId } }}
              setSelectedArtistSlug={setSelectedArtistSlug}
            />
          );
        }
        return (
          <CatalogScreen
            artists={artists}
            items={items}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            wishlist={wishlist}
            selectedArtistSlug={selectedArtistSlug}
            setSelectedArtistSlug={setSelectedArtistSlug}
            navigation={{ navigate }}
            onViewProduct={(item) => pushView('catalog', item.id)}
          />
        );
      case 'cart': return <CartScreen cart={cart} updateCartQuantity={updateCartQuantity} removeFromCart={removeFromCart} clearCart={clearCart} />;
      case 'wishlist': return <WishlistScreen wishlist={wishlist} removeFromWishlist={removeFromWishlist} addToCart={addToCart} onViewProduct={onViewProduct} />;
      case 'about': return <AboutScreen />;
      case 'profile': return isAuthenticated ? <ProfileScreen /> : <LoginScreen navigation={{ navigate }} />;
      case 'login': return <LoginScreen navigation={{ navigate }} />;
      case 'register': return <RegisterScreen navigation={{ navigate }} />;
      default: return <HomeScreen artists={artists} items={items} addToCart={addToCart} addToWishlist={addToWishlist} wishlist={wishlist} navigation={{ navigate }} onViewProduct={onViewProduct} setSelectedArtistSlug={setSelectedArtistSlug} />;
    }
  };

  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <MenuOverlay
        activeTab={currentTab}
        setTab={navigate}
        cartCount={cart.reduce((sum, i) => sum + (i.quantity || 1), 0)}
        wishlistCount={wishlist.length}
      />
      <View style={styles.content}>
        {renderScreen()}
      </View>
    </View>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

const styles = StyleSheet.create({
  appContainer: { flex: 1, backgroundColor: COLORS.bg },
  content: { flex: 1 },
});

export default App;
