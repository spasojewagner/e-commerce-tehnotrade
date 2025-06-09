import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, Heart, ChevronDown, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { Category } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore'; // Dodajemo import za cart store

interface HeaderProps {
  categories: Category[];
  onSidebarToggle: () => void;
  wishlistCount?: number;
}

const Header: React.FC<HeaderProps> = ({
  categories,
  onSidebarToggle,
  wishlistCount = 0
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const categoriesRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated, logout } = useAuthStore();
  const { items: cartItems, fetchCart } = useCartStore(); // Koristimo cart store

  // Računamo ukupan broj proizvoda u korpi
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Proveravamo da li je korisnik admin
  const isAdmin = user?.role === 'admin';

  // Učitavamo korpu kada se komponenta mount-uje ili kada se korisnik uloguje
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  // Funkcija za proveru da li je potreban skrol
  const checkScrollable = useCallback(() => {
    if (categoriesRef.current) {
      const element = categoriesRef.current;
      const scrollable = element.scrollWidth > element.clientWidth;
      setShowScrollButtons(scrollable);
      setCanScrollLeft(element.scrollLeft > 0);
      setCanScrollRight(element.scrollLeft < element.scrollWidth - element.clientWidth);
    }
  }, []);

  // Funkcija za skrolovanje levo
  const scrollLeft = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  // Funkcija za skrolovanje desno
  const scrollRight = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Event listener za skrol
  const handleScroll = () => {
    checkScrollable();
  };

  useEffect(() => {
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    
    const categoriesElement = categoriesRef.current;
    if (categoriesElement) {
      categoriesElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('resize', checkScrollable);
      if (categoriesElement) {
        categoriesElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [checkScrollable]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleToggleDropdown = useCallback((categoryName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const button = buttonRefs.current[categoryName];
    if (button) {
      const rect = button.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX
      });
    }
    setActiveDropdown(prev => prev === categoryName ? null : categoryName);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="relative z-50 bg-black/80 backdrop-blur-xl border-b border-orange-500/20 sticky top-0">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-3 border-b border-gray-800">
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span>🚚 Besplatna dostava preko 5000 RSD</span>
            <span>⚡ Express dostava za 2h</span>
            <span>🔥 Cyber Monday - do 50% popusta</span>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <Link to="/support" className="hover:text-orange-400 transition-colors">Podrška</Link>
            <Link to="/brands"  className="hover:text-orange-400 transition-colors">Brendovi</Link>
            <Link to="/faq"     className="hover:text-orange-400 transition-colors">Česta Pitanja</Link>
            <Link to="/products"className="hover:text-orange-400 transition-colors">Proizvodi</Link>
            {/* Dashboard link se prikazuje samo admin korisnicima */}
            {isAuthenticated && isAdmin && (
              <Link to="/dashboard" className="hover:text-orange-400 transition-colors">Dashboard</Link>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <button onClick={onSidebarToggle} className="lg:hidden p-2 hover:bg-orange-500/20 rounded-lg transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="text-3xl font-black bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              TEHNO<span className="text-white">TRADE</span>
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Pretražite proizvode, brendove..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full py-4 px-6 pl-14 bg-gray-800/50 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 group-hover:bg-gray-800/70"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
              >
                Traži
              </button>
            </div>
          </form>

          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="relative p-3 hover:bg-orange-500/20 rounded-xl transition-colors group">
              <Heart className="w-6 h-6 group-hover:text-orange-400" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative p-3 hover:bg-orange-500/20 rounded-xl transition-colors group">
              <ShoppingCart className="w-6 h-6 group-hover:text-orange-400" />
              {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile" className="flex items-center space-x-2 p-3 hover:bg-orange-500/20 rounded-xl transition-colors group">
                  <User className="w-6 h-6 group-hover:text-orange-400" />
                  <span className="hidden lg:block group-hover:text-orange-400 text-sm">
                    {user?.name || 'Profil'}
                  </span>
                </Link>
                <button onClick={handleLogout} className="flex items-center space-x-2 p-3 hover:bg-red-500/20 rounded-xl transition-colors group">
                  <LogOut className="w-6 h-6 group-hover:text-red-400" />
                  <span className="hidden lg:block group-hover:text-red-400 text-sm">Odjavi se</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-2 p-3 hover:bg-orange-500/20 rounded-xl transition-colors group">
                <User className="w-6 h-6 group-hover:text-orange-400" />
                <span className="hidden lg:block group-hover:text-orange-400">Prijava</span>
              </Link>
            )}
          </div>
        </div>

        {/* Category Navigation sa horizontalnim skrolom */}
        <div className="hidden lg:block relative">
          <div className="flex items-center">
            {/* Levo dugme za skrol */}
            {showScrollButtons && canScrollLeft && (
              <button
                onClick={scrollLeft}
                className="absolute left-0 z-10 bg-gradient-to-r from-gray-900 to-transparent p-2 hover:from-gray-800 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5 text-orange-400" />
              </button>
            )}

            {/* Kategorije sa skrolom */}
            <nav
              ref={categoriesRef}
              className="flex overflow-x-auto space-x-1 py-2 scrollbar-thin scrollbar-thumb-orange-500/60 scrollbar-track-gray-800/30 hover:scrollbar-thumb-orange-400 scroll-smooth"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(249, 115, 22, 0.6) rgba(31, 41, 55, 0.3)'
              }}
            >
              {categories.map((category, index) => (
                <button
                  key={index}
                  ref={el => { buttonRefs.current[category.name] = el; }}
                  onClick={e => handleToggleDropdown(category.name, e)}
                  className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 rounded-xl hover:bg-orange-500/20 transition-all duration-300 whitespace-nowrap group ${
                    activeDropdown === category.name ? 'bg-orange-500/20 text-orange-400' : ''
                  }`}
                >
                  <category.icon className="w-4 h-4 group-hover:text-orange-400" />
                  <span className="group-hover:text-orange-400 font-medium">{category.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === category.name ? 'rotate-180' : ''}`} />
                </button>
              ))}
            </nav>

            {/* Desno dugme za skrol */}
            {showScrollButtons && canScrollRight && (
              <button
                onClick={scrollRight}
                className="absolute right-0 z-10 bg-gradient-to-l from-gray-900 to-transparent p-2 hover:from-gray-800 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5 text-orange-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {activeDropdown && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
          {categories.map(cat => {
            if (cat.name !== activeDropdown) return null;
            return (
              <div
                key={cat.name}
                className="fixed z-50 w-64 bg-gray-900 border border-orange-500/30 rounded-xl shadow-2xl"
                style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
              >
                <div className="absolute -top-2 left-6 w-4 h-4 bg-gray-900 border-l border-t border-orange-500/30 transform rotate-45" />
                <div className="py-2">
                  {cat.subcategories.map((sub, i) => (
                    <Link
                      key={i}
                      to={`/products?category=${encodeURIComponent(sub)}`}
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-3 text-sm text-white hover:bg-orange-500/20 hover:text-orange-400 transition-all duration-200 border-b border-gray-800/50 last:border-b-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-orange-500/60 rounded-full" />
                        <span>{sub}</span>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-800/50 p-3">
                  <Link
                    to={`/products?category=${encodeURIComponent(cat.name)}`}
                    onClick={() => setActiveDropdown(null)}
                    className="text-xs text-orange-400 hover:text-orange-300 font-medium"
                  >
                    Pogledaj sve u {cat.name} →
                  </Link>
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* CSS stil za scrollbar */}
      <style jsx>{`
        /* Webkit browsers (Chrome, Safari, Edge) */
        nav::-webkit-scrollbar {
          height: 8px;
        }
        
        nav::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.3);
          border-radius: 4px;
        }
        
        nav::-webkit-scrollbar-thumb {
          background: rgba(249, 115, 22, 0.6);
          border-radius: 4px;
        }
        
        nav::-webkit-scrollbar-thumb:hover {
          background: rgba(249, 115, 22, 0.8);
        }
      `}</style>
    </header>
  );
};

export default Header;