import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  SvgHome, 
  SvgCatalog, 
  SvgAbout, 
  SvgCart, 
  SvgWishlist, 
  SvgProfile, 
  SvgMusicNote,
  SvgTag,
  SvgLightning,
  SvgLogout,
} from './CustomSvg';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
}

const Header = ({ activeTab, setActiveTab, cartCount, wishlistCount }: HeaderProps) => {
  const { user, isAuthenticated, logout } = useAuth();
  const tabs = [
    { id: 'home', label: 'Главная', icon: SvgHome },
    { id: 'catalog', label: 'Каталог', icon: SvgCatalog },
    { id: 'about', label: 'О нас', icon: SvgAbout },
    { id: 'profile', label: isAuthenticated ? 'Профиль' : 'Войти', icon: SvgProfile },
  ];

  return (
    <header className="header">
      {/* Main header */}
      <div className="header-main">
        <div className="header-logo animate-logo-pulse" onClick={() => setActiveTab('home')}>
          <SvgMusicNote className="w-6 h-6" color="#f59e0b" />
          <span className="header-logo-text">
            <span className="text-gradient-gold animate-ember">STICKER</span>
            <span className="text-white/40 mx-1">//</span>
            <span className="text-white/70">MERCH</span>
          </span>
        </div>

        <nav className="header-nav flex-1 justify-center">
          {tabs.map((tab, idx) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`header-nav-item animate-rise animate-rise-${idx + 1} ${isActive ? 'active' : ''}`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="header-actions">
          <button 
            className={`header-icon-btn animate-float-fast ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
            style={{ animationDelay: '0s' }}
          >
            <SvgWishlist className="w-5 h-5" color="currentColor" fill="none" />
            {wishlistCount > 0 && <span className="header-badge-sm">{wishlistCount}</span>}
          </button>
          <button 
            className={`header-icon-btn animate-float-fast ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
            style={{ animationDelay: '0.2s' }}
          >
            <SvgCart className="w-5 h-5" color="currentColor" />
            {cartCount > 0 && <span className="header-badge-sm">{cartCount}</span>}
          </button>
          {isAuthenticated ? (
            <button
              className="header-icon-btn animate-float-fast"
              onClick={logout}
              title="Выйти"
              style={{ animationDelay: '0.4s' }}
            >
              <SvgLogout className="w-5 h-5" color="currentColor" />
            </button>
          ) : (
            <button 
              className={`header-icon-btn animate-float-fast ${activeTab === 'login' || activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
              style={{ animationDelay: '0.4s' }}
            >
              <SvgProfile className="w-5 h-5" color="currentColor" />
            </button>
          )}
        </div>
      </div>

      {/* Tab nav for mobile */}
      <div className="header-mobile-nav">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`header-mobile-item ${isActive ? 'active' : ''}`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="header-mobile-label">{tab.label}</span>
            </button>
          );
        })}
        {/* Mobile-only cart & wishlist icons with badges */}
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`header-mobile-item ${activeTab === 'wishlist' ? 'active' : ''}`}
        >
          <div className="relative">
            <SvgWishlist className="w-5 h-5" color="currentColor" fill="none" />
            {wishlistCount > 0 && <span className="header-badge-mobile top-[-4px] right-[-8px]">{wishlistCount}</span>}
          </div>
          <span className="header-mobile-label">Избранное</span>
        </button>
        <button
          onClick={() => setActiveTab('cart')}
          className={`header-mobile-item ${activeTab === 'cart' ? 'active' : ''}`}
        >
          <div className="relative">
            <SvgCart className="w-5 h-5" color="currentColor" />
            {cartCount > 0 && <span className="header-badge-mobile top-[-4px] right-[-8px]">{cartCount}</span>}
          </div>
          <span className="header-mobile-label">Корзина</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
