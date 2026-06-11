import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Derive activeTab from URL for Header highlight
  const activeTab = location.pathname === '/' ? 'home' : location.pathname.slice(1).split('/')[0];

  const [selectedArtistSlug, setSelectedArtistSlug] = useState('');

  // Django fetched data state
  const [artists, setArtists] = useState([]);
  const [items, setItems] = useState([]);

  // Shopping Cart & Wishlist states with LocalStorage persistence
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('sticker_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('sticker_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch data from Django Backend on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Artists
        const artistRes = await fetch('http://127.0.0.1:8000/api/artists/');
        if (!artistRes.ok) throw new Error('Failed to fetch artists');
        const artistData = await artistRes.json();
        setArtists(artistData.artists);

        // Fetch Merch Items
        const merchRes = await fetch('http://127.0.0.1:8000/api/merch/');
        if (!merchRes.ok) throw new Error('Failed to fetch merch');
        const merchData = await merchRes.json();
        setItems(merchData.items);
      } catch (err) {
        console.warn('Backend API connection failed, using fallback mock data.', err);
        // Fallback mock data — все 10 артистов из БД
        const mockArtists = [
          { id: 1, name: "GONE.Fludd", slug: "gonefludd", description: "Психоделический рэп с дикой энергетикой. Король чупа-чупсов.", avatar_color: "cyan", is_musician: true },
          { id: 2, name: "ЛСП", slug: "lsp", description: "Меланхоличный инди-рэп, синти-поп баллады о любви и кризисе.", avatar_color: "pink", is_musician: true },
          { id: 3, name: "Pharaoh", slug: "pharaoh", description: "Клауд-рэп, фараонский стиль и атмосфера царской роскоши.", avatar_color: "yellow", is_musician: true },
          { id: 4, name: "Oxxxymiron", slug: "oxxxymiron", description: "Интеллектуальный рэп, грайм и баттлы. Мироновский вайб.", avatar_color: "orange", is_musician: true },
          { id: 5, name: "Скриптонит", slug: "skryptonite", description: "Бит-музыка, 36 Chambers, казахский колорит и плотный грув.", avatar_color: "green", is_musician: true },
          { id: 6, name: "Гуф", slug: "guf", description: "Олдскул, центр, 825 — классика русского рэпа.", avatar_color: "yellow", is_musician: true },
          { id: 7, name: "Miyagi", slug: "miyagi", description: "Рэп-регги, кавказские мотивы, Hajime и философия.", avatar_color: "green", is_musician: true },
          { id: 8, name: "Boulevard Depo", slug: "boulevard-depo", description: "Неон-трэп, RAPP, уличная эстетика и яркие образы.", avatar_color: "pink", is_musician: true },
          { id: 9, name: "ATL", slug: "atl", description: "Андеграунд, лес, мистика. Глубокий атмосферный рэп.", avatar_color: "cyan", is_musician: true },
          { id: 10, name: "FACE", slug: "face", description: "Поп-рэп, молодость, хайп и эстетика нулевых.", avatar_color: "orange", is_musician: true },
        ];

        // Цвета для стикеров по слагам
        const artistColorMap = {
          'gonefludd': 'cyan', 'lsp': 'pink', 'pharaoh': 'yellow',
          'oxxxymiron': 'orange', 'skryptonite': 'green', 'guf': 'yellow',
          'miyagi': 'green', 'boulevard-depo': 'pink', 'atl': 'cyan', 'face': 'orange',
        };

        // Заглушка мерча — по 6-7 товаров на каждого артиста
        const allItems = [
          // GONE.Fludd (id=1)
          { id: 1, artistId: 1, name: 'Футболка GONE.Fludd "Neon"', price: 2990, condition: 'new', type: 'tshirt', size: 'M', stock: 15, desc: 'Официальная футболка с неоновым принтом.' },
          { id: 2, artistId: 1, name: 'Худи GONE.Fludd "Candy"', price: 4990, condition: 'new', type: 'hoodie', size: 'L', stock: 10, desc: 'Тёплое худи с candy-принтом.' },
          { id: 3, artistId: 1, name: 'Винил GONE.Fludd "Boys Don\'t Cry"', price: 2490, condition: 'new', type: 'vinyl', size: null, stock: 20, desc: 'Лимитированный винил.' },
          { id: 4, artistId: 1, name: 'Кассета GONE.Fludd "Supa Luv"', price: 990, condition: 'new', type: 'cassette', size: null, stock: 30, desc: 'Кассета с демо-треками.' },
          { id: 5, artistId: 1, name: 'Кепка GONE.Fludd Logo', price: 1990, condition: 'new', type: 'cap', size: 'One Size', stock: 12, desc: 'Кепка с вышитым лого.' },
          { id: 6, artistId: 1, name: 'Стикерпак GONE.Fludd', price: 490, condition: 'new', type: 'accessory', size: null, stock: 50, desc: 'Набор стикеров 10x10 см.' },
          { id: 7, artistId: 1, name: 'Футболка GONE.Fludd "Neon" (Б/У)', price: 1790, condition: 'secondhand', type: 'tshirt', size: 'M', stock: 1, desc: 'Б/У футболка, состояние отличное.' },
          // ЛСП (id=2)
          { id: 8, artistId: 2, name: 'Футболка ЛСП "Magic City"', price: 2790, condition: 'new', type: 'tshirt', size: 'S', stock: 14, desc: 'Официальная футболка с принтом Magic City.' },
          { id: 9, artistId: 2, name: 'Худи ЛСП "Tragic City"', price: 4590, condition: 'new', type: 'hoodie', size: 'M', stock: 8, desc: 'Худи с трагичным принтом.' },
          { id: 10, artistId: 2, name: 'Винил ЛСП "Tragic City"', price: 2290, condition: 'new', type: 'vinyl', size: null, stock: 15, desc: 'Виниловая пластинка альбома.' },
          { id: 11, artistId: 2, name: 'Кассета ЛСП "Magic City"', price: 890, condition: 'new', type: 'cassette', size: null, stock: 25, desc: 'Кассета с альбомом.' },
          { id: 12, artistId: 2, name: 'Кепка ЛСП Broken Heart', price: 1890, condition: 'new', type: 'cap', size: 'One Size', stock: 10, desc: 'Кепка с вышитым разбитым сердцем.' },
          { id: 13, artistId: 2, name: 'Значок ЛСП', price: 290, condition: 'new', type: 'accessory', size: null, stock: 60, desc: 'Металлический значок с лого.' },
          { id: 14, artistId: 2, name: 'Футболка ЛСП "Безумие" (Б/У)', price: 1690, condition: 'secondhand', type: 'tshirt', size: 'M', stock: 1, desc: 'Б/У футболка, состояние хорошее.' },
          // Pharaoh (id=3)
          { id: 15, artistId: 3, name: 'Футболка Pharaoh "Pink Phloyd"', price: 3190, condition: 'new', type: 'tshirt', size: 'L', stock: 12, desc: 'Футболка с принтом Pink Phloyd.' },
          { id: 16, artistId: 3, name: 'Худи Pharaoh "Moscow"', price: 5290, condition: 'new', type: 'hoodie', size: 'XL', stock: 6, desc: 'Лимитированное худи Moscow.' },
          { id: 17, artistId: 3, name: 'Винил Pharaoh "Phosphorus"', price: 2690, condition: 'new', type: 'vinyl', size: null, stock: 18, desc: 'Винил с альбомом Phosphorus.' },
          { id: 18, artistId: 3, name: 'Кассета Pharaoh "Правило"', price: 990, condition: 'new', type: 'cassette', size: null, stock: 20, desc: 'Кассета с би-сайдами.' },
          { id: 19, artistId: 3, name: 'Кепка Pharaoh Skull', price: 2190, condition: 'new', type: 'cap', size: 'One Size', stock: 9, desc: 'Кепка с черепом и короной.' },
          { id: 20, artistId: 3, name: 'Брелок Pharaoh', price: 390, condition: 'new', type: 'accessory', size: null, stock: 40, desc: 'Металлический брелок с лого.' },
          { id: 21, artistId: 3, name: 'Футболка Pharaoh "Tour" (Б/У)', price: 1990, condition: 'secondhand', type: 'tshirt', size: 'L', stock: 1, desc: 'Редкая футболка с тура.' },
          // Oxxxymiron (id=4)
          { id: 22, artistId: 4, name: 'Футболка Oxxxymiron "X.X.X."', price: 2990, condition: 'new', type: 'tshirt', size: 'M', stock: 16, desc: 'Футболка с надписью X.X.X.' },
          { id: 23, artistId: 4, name: 'Худи Oxxxymiron "Горгород"', price: 5490, condition: 'new', type: 'hoodie', size: 'L', stock: 7, desc: 'Худи с принтом Горгород.' },
          { id: 24, artistId: 4, name: 'Винил Oxxxymiron "Горгород"', price: 2790, condition: 'new', type: 'vinyl', size: null, stock: 22, desc: 'Винил с альбомом Горгород.' },
          { id: 25, artistId: 4, name: 'Кассета Oxxxymiron "miXXX"', price: 1090, condition: 'new', type: 'cassette', size: null, stock: 18, desc: 'Кассета miXXXtape.' },
          { id: 26, artistId: 4, name: 'Кепка Oxxxymiron Crown', price: 2290, condition: 'new', type: 'cap', size: 'One Size', stock: 11, desc: 'Кепка с вышитой короной.' },
          { id: 27, artistId: 4, name: 'Нашивка Oxxxymiron', price: 290, condition: 'new', type: 'accessory', size: null, stock: 55, desc: 'Термонашивка с лого.' },
          // Скриптонит (id=5)
          { id: 28, artistId: 5, name: 'Футболка Скриптонит "36"', price: 2790, condition: 'new', type: 'tshirt', size: 'M', stock: 13, desc: 'Футболка с числом 36.' },
          { id: 29, artistId: 5, name: 'Худи Скриптонит "Дом"', price: 4990, condition: 'new', type: 'hoodie', size: 'L', stock: 9, desc: 'Худи с изображением дома.' },
          { id: 30, artistId: 5, name: 'Винил Скриптонит "Дом с нормальными явлениями"', price: 2590, condition: 'new', type: 'vinyl', size: null, stock: 14, desc: 'Винил с альбомом.' },
          { id: 31, artistId: 5, name: 'Кассета Скриптонит "Уличные дела"', price: 890, condition: 'new', type: 'cassette', size: null, stock: 20, desc: 'Кассета с ранними треками.' },
          { id: 32, artistId: 5, name: 'Кепка Скриптонит Note', price: 1990, condition: 'new', type: 'cap', size: 'One Size', stock: 10, desc: 'Кепка с нотным станом.' },
          { id: 33, artistId: 5, name: 'Сумка Скриптонит', price: 1490, condition: 'new', type: 'accessory', size: null, stock: 25, desc: 'Шопер с принтом.' },
          { id: 34, artistId: 5, name: 'Футболка Скриптонит "Tour" (Б/У)', price: 1590, condition: 'secondhand', type: 'tshirt', size: 'M', stock: 1, desc: 'Б/У футболка, состояние хорошее.' },
          // Гуф (id=6)
          { id: 35, artistId: 6, name: 'Футболка Гуф "825"', price: 2590, condition: 'new', type: 'tshirt', size: 'L', stock: 11, desc: 'Футболка с числом 825.' },
          { id: 36, artistId: 6, name: 'Худи Гуф "Centr"', price: 4790, condition: 'new', type: 'hoodie', size: 'XL', stock: 5, desc: 'Худи с лого Centr.' },
          { id: 37, artistId: 6, name: 'Винил Гуф "Город дорог"', price: 2390, condition: 'new', type: 'vinyl', size: null, stock: 12, desc: 'Винил с альбомом.' },
          { id: 38, artistId: 6, name: 'Кассета Гуф "Каникулы"', price: 790, condition: 'new', type: 'cassette', size: null, stock: 22, desc: 'Кассета с альбомом Каникулы.' },
          { id: 39, artistId: 6, name: 'Кепка Гуф Swing', price: 1890, condition: 'new', type: 'cap', size: 'One Size', stock: 8, desc: 'Кепка с качелями.' },
          { id: 40, artistId: 6, name: 'Ремень Гуф', price: 1290, condition: 'new', type: 'accessory', size: null, stock: 15, desc: 'Кожаный ремень с пряжкой.' },
          // Miyagi (id=7)
          { id: 41, artistId: 7, name: 'Футболка Miyagi "Hajime"', price: 2890, condition: 'new', type: 'tshirt', size: 'M', stock: 14, desc: 'Футболка с лого Hajime.' },
          { id: 42, artistId: 7, name: 'Худи Miyagi "Сатурн"', price: 5190, condition: 'new', type: 'hoodie', size: 'L', stock: 7, desc: 'Худи с принтом Сатурна.' },
          { id: 43, artistId: 7, name: 'Винил Miyagi "Yamakasi"', price: 2690, condition: 'new', type: 'vinyl', size: null, stock: 16, desc: 'Винил с альбомом Yamakasi.' },
          { id: 44, artistId: 7, name: 'Кассета Miyagi "Hajime"', price: 890, condition: 'new', type: 'cassette', size: null, stock: 24, desc: 'Кассета с первым альбомом.' },
          { id: 45, artistId: 7, name: 'Кепка Miyagi Mountains', price: 2090, condition: 'new', type: 'cap', size: 'One Size', stock: 9, desc: 'Кепка с вышитыми горами.' },
          { id: 46, artistId: 7, name: 'Браслет Miyagi', price: 490, condition: 'new', type: 'accessory', size: null, stock: 35, desc: 'Плетёный браслет с бусиной.' },
          { id: 47, artistId: 7, name: 'Футболка Miyagi "Hajime" (Б/У)', price: 1690, condition: 'secondhand', type: 'tshirt', size: 'M', stock: 1, desc: 'Б/У футболка, состояние хорошее.' },
          // Boulevard Depo (id=8)
          { id: 48, artistId: 8, name: 'Футболка Boulevard Depo "RAPP"', price: 2890, condition: 'new', type: 'tshirt', size: 'S', stock: 12, desc: 'Футболка с принтом RAPP.' },
          { id: 49, artistId: 8, name: 'Худи Boulevard Depo "Neon"', price: 5090, condition: 'new', type: 'hoodie', size: 'M', stock: 8, desc: 'Неоновое худи с лого.' },
          { id: 50, artistId: 8, name: 'Винил Boulevard Depo "Rapp 2"', price: 2490, condition: 'new', type: 'vinyl', size: null, stock: 14, desc: 'Винил с альбомом Rapp 2.' },
          { id: 51, artistId: 8, name: 'Кассета Boulevard Depo "Sweet Dreams"', price: 890, condition: 'new', type: 'cassette', size: null, stock: 18, desc: 'Кассета с EP.' },
          { id: 52, artistId: 8, name: 'Кепка Boulevard Depo Smile', price: 1990, condition: 'new', type: 'cap', size: 'One Size', stock: 10, desc: 'Кепка со смайлом.' },
          { id: 53, artistId: 8, name: 'Подвеска Boulevard Depo', price: 690, condition: 'new', type: 'accessory', size: null, stock: 28, desc: 'Серебряная подвеска с лого.' },
          // ATL (id=9)
          { id: 54, artistId: 9, name: 'Футболка ATL "Лес"', price: 2690, condition: 'new', type: 'tshirt', size: 'M', stock: 13, desc: 'Футболка с лесным принтом.' },
          { id: 55, artistId: 9, name: 'Худи ATL "Moon"', price: 4890, condition: 'new', type: 'hoodie', size: 'L', stock: 6, desc: 'Худи с изображением луны.' },
          { id: 56, artistId: 9, name: 'Винил ATL "Марабу"', price: 2590, condition: 'new', type: 'vinyl', size: null, stock: 15, desc: 'Винил с альбомом Марабу.' },
          { id: 57, artistId: 9, name: 'Кассета ATL "Лимитка"', price: 790, condition: 'new', type: 'cassette', size: null, stock: 20, desc: 'Кассета лимитированного тиража.' },
          { id: 58, artistId: 9, name: 'Кепка ATL Wolf', price: 1890, condition: 'new', type: 'cap', size: 'One Size', stock: 9, desc: 'Кепка с волком.' },
          { id: 59, artistId: 9, name: 'Платок ATL', price: 590, condition: 'new', type: 'accessory', size: null, stock: 30, desc: 'Бандана с принтом.' },
          // FACE (id=10)
          { id: 60, artistId: 10, name: 'Футболка FACE "Юморист"', price: 2590, condition: 'new', type: 'tshirt', size: 'L', stock: 14, desc: 'Футболка с принтом Юморист.' },
          { id: 61, artistId: 10, name: 'Худи FACE "VLONE"', price: 4990, condition: 'new', type: 'hoodie', size: 'XL', stock: 5, desc: 'Худи в стиле VLONE.' },
          { id: 62, artistId: 10, name: 'Винил FACE "Пути неисповедимы"', price: 2390, condition: 'new', type: 'vinyl', size: null, stock: 18, desc: 'Винил с альбомом.' },
          { id: 63, artistId: 10, name: 'Кассета FACE "Hate Love"', price: 790, condition: 'new', type: 'cassette', size: null, stock: 22, desc: 'Кассета с EP Hate Love.' },
          { id: 64, artistId: 10, name: 'Кепка FACE TV', price: 1990, condition: 'new', type: 'cap', size: 'One Size', stock: 11, desc: 'Кепка с телевизором.' },
          { id: 65, artistId: 10, name: 'Чехол FACE', price: 490, condition: 'new', type: 'accessory', size: null, stock: 40, desc: 'Силиконовый чехол для телефона.' },
          { id: 66, artistId: 10, name: 'Футболка FACE "Tour" (Б/У)', price: 1490, condition: 'secondhand', type: 'tshirt', size: 'L', stock: 1, desc: 'Б/У футболка с тура.' },
        ];

        const mockItems = allItems.map(p => ({
          id: p.id,
          artist: mockArtists.find(a => a.id === p.artistId) || mockArtists[0],
          name: p.name,
          price: p.price,
          description: p.desc,
          condition: p.condition,
          size: p.size || 'One Size',
          stock: p.stock,
          is_original: true,
          image_sticker_type: p.type,
          sticker_color: artistColorMap[mockArtists.find(a => a.id === p.artistId)?.slug || 'gonefludd'] || 'yellow',
        }));

        setArtists(mockArtists);
        setItems(mockItems);
      }
    };
    fetchData();
  }, []);

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('sticker_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sticker_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart Management Helper Methods
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Management Helper Methods
  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const existing = prevWishlist.find((item) => item.id === product.id);
      if (existing) {
        // Remove if clicked again
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
  };

  // Navigation helpers
  const handleNavigate = (tab) => {
    if (tab === 'catalog') {
      setSelectedArtistSlug('');
    }
    navigate(tab === 'home' ? '/' : `/${tab}`);
  };

  const onViewProduct = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="app-container min-h-screen pb-16">
      {/* Pinned Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
      />

      {/* Main route content */}
      <main className="mt-8 transition-opacity duration-300">
        <Routes>
          <Route path="/" element={
            <Home
              artists={artists}
              items={items}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              wishlist={wishlist}
              setActiveTab={handleNavigate}
              setSelectedArtistSlug={setSelectedArtistSlug}
              onViewProduct={onViewProduct}
            />
          } />
          <Route path="/home" element={
            <Home
              artists={artists}
              items={items}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              wishlist={wishlist}
              setActiveTab={handleNavigate}
              setSelectedArtistSlug={setSelectedArtistSlug}
              onViewProduct={onViewProduct}
            />
          } />
          <Route path="/catalog" element={
            <Catalog
              artists={artists}
              items={items}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              wishlist={wishlist}
              selectedArtistSlug={selectedArtistSlug}
              setSelectedArtistSlug={setSelectedArtistSlug}
              onViewProduct={onViewProduct}
            />
          } />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={
            <Cart
              cart={cart}
              updateCartQuantity={updateCartQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          } />
          <Route path="/wishlist" element={
            <Wishlist
              wishlist={wishlist}
              removeFromWishlist={removeFromWishlist}
              addToCart={addToCart}
              onViewProduct={onViewProduct}
            />
          } />
          <Route path="/profile" element={
            isAuthenticated ? <Profile /> : <Login onNavigate={handleNavigate} />
          } />
          <Route path="/login" element={<Login onNavigate={handleNavigate} />} />
          <Route path="/register" element={<Register onNavigate={handleNavigate} />} />
          <Route path="/product/:id" element={
            <ProductDetail
              items={items}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              wishlist={wishlist}
              setSelectedArtistSlug={setSelectedArtistSlug}
            />
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
