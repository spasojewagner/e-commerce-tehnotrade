import {
    Bike,
    ChefHat,
    Gamepad2,
    Glasses,
    HardDrive,
    Heart,
    Home,
    Monitor,
    Smartphone,
    Sun,
    Tv,
    Wind,
    Zap
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Components
import Header from './components/Header';
import ProductDetail from './components/ProductDetails';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';

// Types
import Footer from './components/Footer';
import Brands from './pages/Brands';
import CartPage from './pages/CartPage';
import FAQPage from './pages/FAQPage';
import PlacanjePlatnimKarticama from './pages/footer/PlacanjePlatnimKarticama';
import PravaPotrosaca from './pages/footer/PravaPotrosaca';
import Reklamacije from './pages/footer/Reklamacije';
import UsloviIsporuke from './pages/footer/UsloviIsporuke';
import UsloviKoriscenja from './pages/footer/UsloviKoriscenja';
import ZastitaPrivatnosti from './pages/footer/ZastitaPrivatnosti';
import LoginPage from './pages/LoginPage';
import MyAccountPage from './pages/MyAccountPage';
import { CartItem, Category, HotDeal, Product } from './types';

// Auth store
import AdminDashboard from './components/dashboard/AdminDashboard';
import CategoryProductsPage from './pages/CategoryProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductPage';
import { useAuthStore } from './store/useAuthStore';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Svi proizvodi');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  // Auth store
  const { checkAuth, isLoading: authLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const categories: Category[] = [
    {
      name: 'Bela Tehnika',
      icon: Home,
      subcategories: [
        'Frižideri',
        'Zamrzivači',
        'Sporeti',
        'Sudomašine',
        'Mikrotalasne pećnice',
        'Aspiratori',
        'Ugradbene ploče',
        'Ugradbene rerne',
        'Ugradbeni setovi',
        'Bojleri',
        'Veš mašine'
      ]
    },
    {
      name: 'Mali kućni aparati',
      icon: Zap,
      subcategories: [
        'Usisivači',
        'Usisivači oprema',
        'Pegle',
        'Paročistači',
        'Telesne vage'
      ]
    },
    {
      name: 'Mali kuhinjski aparati',
      icon: ChefHat,
      subcategories: [
        'Čaše za piće',
        'Kuhinjske vage',
        'Aparati za sladoled',
        'Air Fryers',
        'Blenderi',
        'Indukcioni rešoi',
        'Multikukeri',
        'Šokovnici',
        'Aparati za kafu',
        'Grilovi',
        'Ketleri',
        'Seckalice',
        'Tosteri'
      ]
    },
    {
      name: 'Računari i monitori',
      icon: Monitor,
      subcategories: [
        'Laptopovi',
        'Desktop računari',
        'Monitori',
        'Kućišta',
        'Procesori',
        'Hard diskovi',
        'Grafičke karte',
        'Konfiguracije'
      ]
    },
    {
      name: 'Računarska oprema',
      icon: HardDrive,
      subcategories: [
        'Tastature',
        'Miševi',
        'Podloge za miševe',
        'Memorije',
        'RAM memorije',
        'Memorijske kartice',
        'USB memorije',
        'Štampači',
        'Laserski štampači',
        'Laserski MF štampači',
        'Inkjet štampači',
        'Ploteri',
        'Toneri',
        'Oprema za štampače',
        'Rad za štampače',
        'Torbe i futrole',
        'Matične ploče',
        'Optički uređaji',
        'Kertridži',
        'Adapteri',
        'Kuleri',
        'Skeneri',
        'SSD',
        'UPS',
        'UPS oprema',
        'Mrežna oprema',
        'Mrežni wireless adapteri',
        'Mrežni access point',
        'Mrežni extenderi',
        'Mrežni home WiFi',
        'Mrežne kartice',
        'Mrežna oprema',
        'Mrežni powerline',
        'Mrežni ruteri',
        'Mrežni smart home',
        'Mrežni switch',
        'Kablovi',
        'Server oprema',
        'Licence',
        'MS LEGALIZATION',
        'MS OEM',
        'MS Retail App',
        'MS retail OS',
        'OEM Enterprise license'
      ]
    },
    {
      name: 'Gaming',
      icon: Gamepad2,
      subcategories: [
        'Gaming oprema',
        'Gaming stolice',
        'Konzole za igranje'
      ]
    },
    {
      name: 'Telefoni i tableti',
      icon: Smartphone,
      subcategories: [
        'Mobilni telefoni',
        'Mobilni telefoni oprema',
        'Tableti',
        'Tableti oprema',
        'Smart satovi',
        'Baterije',
        'Prenosni baterijski generatori',
        'Slušalice za mobilne telefone',
        'Fitness narukvice'
      ]
    },
    {
      name: 'TV i Audio',
      icon: Tv,
      subcategories: [
        'Televizori',
        'Televizori oprema',
        'Projektori',
        'Audio oprema',
        'Zvučnici',
        'Slušalice',
        'Mikrofoni',
        'NVR',
        'Foto i video oprema',
        'Akcione kamere i oprema',
        'Web kamere',
        'Dronovi',
        'Dronovi oprema',
        'IP video kamere'
      ]
    },
    {
      name: 'Klime i grejanje',
      icon: Wind,
      subcategories: [
        'Klime',
        'Klime oprema',
        'Klime sistemi',
        'Prečišćivači vazduha',
        'Prečišćivači vazduha oprema',
        'Grejna tela',
        'Toplotne pumpe'
      ]
    },
    {
      name: 'Trotineti',
      icon: Bike,
      subcategories: [
        'Električni trotineti',
        'Električni trotineti oprema'
      ]
    },
    {
      name: 'Naočare',
      icon: Glasses,
      subcategories: []
    },
    {
      name: 'Nega i lepota',
      icon: Heart,
      subcategories: [
        'Fenovi za kosu',
        'Stajleri za kosu',
        'Prese za kosu'
      ]
    },
    {
      name: 'Solarni paneli',
      icon: Sun,
      subcategories: [
        'Solarni paneli',
        'Invertori za solarne panele',
        'Kablovi za solarne panele',
        'Konektori za solarne panele',
        'Konstrukcija za solarne panele',
        'Oprema za solarne panele'
      ]
    }
  ];

  const featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Samsung Galaxy S24 Ultra',
      price: 149999,
      originalPrice: 169999,
      image: '📱',
      rating: 4.8,
      discount: 12,
      category: 'Mobilni telefoni',
      isNew: true,
      brand: 'Samsung',
      warranty: '2 godine',
      inStock: true,
      stockQuantity: 25,
      description: 'Najnoviji Samsung Galaxy S24 Ultra sa naprednim kamerama i S Pen funkcionalnostima.',
      specifications: {
        'Ekran': '6.8" Dynamic AMOLED',
        'Procesor': 'Snapdragon 8 Gen 3',
        'RAM': '12GB',
        'Memorija': '256GB',
        'Kamera': '200MP glavna kamera'
      }
    },
    {
      id: 2,
      name: 'MacBook Air M3',
      price: 189999,
      originalPrice: 219999,
      image: '💻',
      rating: 4.9,
      discount: 14,
      category: 'Laptopovi',
      isHot: true,
      brand: 'Apple',
      warranty: '1 godina',
      inStock: true,
      stockQuantity: 15,
      description: 'Revolucionarni MacBook Air sa M3 chipom za izuzetne performanse i bateriju.',
      specifications: {
        'Procesor': 'Apple M3',
        'RAM': '8GB',
        'SSD': '256GB',
        'Ekran': '13.6" Liquid Retina',
        'Baterija': 'Do 18 sati'
      }
    },
    {
      id: 3,
      name: 'LG OLED C4 65"',
      price: 199999,
      originalPrice: 239999,
      image: '📺',
      rating: 4.7,
      discount: 17,
      category: 'Televizori',
      isNew: true,
      brand: 'LG',
      warranty: '2 godine',
      inStock: true,
      stockQuantity: 8,
      description: 'Premium OLED televizor sa α9 AI procesorom i Dolby Vision tehnologijom.',
      specifications: {
        'Dijagonala': '65 inča',
        'Rezolucija': '4K UHD',
        'Tehnologija': 'OLED',
        'Smart TV': 'webOS',
        'HDR': 'Dolby Vision IQ'
      }
    },
    {
      id: 4,
      name: 'Sony Alpha 7R V',
      price: 459999,
      originalPrice: 499999,
      image: '📷',
      rating: 4.9,
      discount: 8,
      category: 'Foto oprema',
      isHot: true,
      brand: 'Sony',
      warranty: '2 godine',
      inStock: true,
      stockQuantity: 5,
      description: 'Profesionalna mirrorless kamera sa 61MP senzorom i naprednim AI mogućnostima.',
      specifications: {
        'Senzor': '61MP Full Frame',
        'ISO': '100-32000',
        'Video': '8K 24p',
        'Stabilizacija': '8-stop IBIS',
        'Fokus': '693 AF tačaka'
      }
    },
    {
      id: 5,
      name: 'Bosch KGN39VLEB',
      price: 89999,
      originalPrice: 109999,
      image: '🧊',
      rating: 4.6,
      discount: 18,
      category: 'Bela tehnika',
      isNew: false,
      brand: 'Bosch',
      warranty: '2 godine',
      inStock: true,
      stockQuantity: 12,
      description: 'Kombinovani frižider sa VitaFresh tehnologijom za duže čuvanje namirnica.',
      specifications: {
        'Kapacitet': '366L',
        'Energetska klasa': 'E',
        'NoFrost': 'Da',
        'VitaFresh': 'Da',
        'Buka': '39 dB'
      }
    },
    {
      id: 6,
      name: 'Dyson V15 Detect',
      price: 79999,
      originalPrice: 94999,
      image: '🧹',
      rating: 4.8,
      discount: 16,
      category: 'Mali aparati',
      isHot: true,
      brand: 'Dyson',
      warranty: '2 godine',
      inStock: true,
      stockQuantity: 20,
      description: 'Bežični usisivač sa laserskim otkrivanjem prašine i naprednim filtriranjem.',
      specifications: {
        'Motor': '125,000 rpm',
        'Baterija': 'Do 60 minuta',
        'Filtriranje': 'HEPA',
        'Laser': 'Da',
        'Težina': '3.1kg'
      }
    }
  ];

  const hotDeals: HotDeal[] = [
    { name: 'iPhone 15 Pro Max', discount: 25, timeLeft: '2h 45m' },
    { name: 'Gaming Setup', discount: 30, timeLeft: '5h 12m' },
    { name: 'Smart Home Bundle', discount: 40, timeLeft: '1h 23m' }
  ];

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
  };

  const handleAddToWishlist = (product: Product) => {
    setWishlistItems(prevItems => {
      if (prevItems.find(item => item.id === product.id)) {
        return prevItems.filter(item => item.id !== product.id);
      }
      return [...prevItems, product];
    });
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl animate-ping"></div>
        </div>

        <Header
          categories={categories}
          onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          wishlistCount={wishlistItems.length}
        />

        <div className="flex">
          <Routes>
            {/* JAVNE RUTE - dostupne svim korisnicima */}
            <Route
              path="/"
              element={
                <HomePage
                  featuredProducts={featuredProducts}
                  categories={categories}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                />
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route
              path="/category/:categoryName"
              element={
                <CategoryProductsPage
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                />
              }
            />
            <Route
              path="/search"
              element={
                <div className="flex-1 p-8">
                  <h1 className="text-4xl font-bold">Rezultati pretrage</h1>
                  <p className="text-gray-400 mt-4">Ovde će biti rezultati pretrage.</p>
                </div>
              }
            />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/zastita-privatnosti" element={<ZastitaPrivatnosti />} />
            <Route path="/prava-potrosaca" element={<PravaPotrosaca />} />
            <Route path="/uslovi-koriscenja-i-prodaje" element={<UsloviKoriscenja />} />
            <Route path="/uslovi-isporuke" element={<UsloviIsporuke />} />
            <Route path="/placanje-platnim-karticama" element={<PlacanjePlatnimKarticama />} />
            <Route path="/reklamacije" element={<Reklamacije />} />

            {/* ZAŠTIĆENE RUTE - samo ulogovani korisnici */}
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/profile" element={<MyAccountPage />} />
              <Route path="/profile/orders" element={<OrdersPage />} />
              <Route
                path="/wishlist"
                element={
                  <div className="flex-1 p-8">
                    <h1 className="text-4xl font-bold">Lista želja</h1>
                    <div className="mt-8">
                      {wishlistItems.length === 0 ? (
                        <p className="text-gray-400">Lista želja je prazna</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {wishlistItems.map((product) => (
                            <div key={product.id} className="bg-gray-800/30 rounded-xl p-4">
                              <span className="text-4xl block text-center mb-4">{product.image}</span>
                              <h3 className="font-bold">{product.name}</h3>
                              <p className="text-orange-400">{product.price.toLocaleString()} RSD</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                }
              />
            </Route>

            {/* ADMIN RUTE - samo administratori */}
            <Route element={<ProtectedRoute roles={['admin']} />}>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<div>Admin Products Management</div>} />
              <Route path="/admin/users" element={<div>Admin Users Management</div>} />
              <Route path="/admin/orders" element={<div>Admin Orders Management</div>} />
            </Route>

            {/* MODERATOR + ADMIN RUTE */}
            <Route element={<ProtectedRoute roles={['admin', 'moderator']} />}>
              <Route path="/moderate/reviews" element={<div>Moderate Reviews</div>} />
              <Route path="/moderate/content" element={<div>Moderate Content</div>} />
            </Route>

            {/* FALLBACK */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </Router>
  );
};

export default App;