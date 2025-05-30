import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Home, Zap, Smartphone, Laptop, Monitor, Camera,
  Headphones, Gamepad2, Tv
} from 'lucide-react';

// Components
import Header from './components/Header';
import Sidebar from './components/SideBar';
import HomePage from './pages/HomePage';
import ProductDetail from './components/ProductDetails';

// Types
import { Product, Category, HotDeal, CartItem } from './types';
import CartPage from './pages/CartPage';
import MyAccountPage from './pages/MyAccountPage';
import Brands from './pages/Brands';
import FAQPage from './pages/FAQPage';
import Footer from './components/Footer';
import ZastitaPrivatnosti from './pages/footer/ZastitaPrivatnosti';
import PravaPotrosaca from './pages/footer/PravaPotrosaca';
import UsloviKoriscenja from './pages/footer/UsloviKoriscenja';
import UsloviIsporuke from './pages/footer/UsloviIsporuke';
import PlacanjePlatnimKarticama from './pages/footer/PlacanjePlatnimKarticama';
import Reklamacije from './pages/footer/Reklamacije';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Svi proizvodi');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  const categories: Category[] = [
    { name: 'Proizvodi', icon: Home, subcategories: ['Svi proizvodi', 'Novo', 'Akcije', 'Preporučeno'] },
    { name: 'Bela tehnika', icon: Home, subcategories: ['Frižideri', 'Veš mašine', 'Sudmašine', 'Aspiratori'] },
    { name: 'Mali kućni aparati', icon: Zap, subcategories: ['Mikser', 'Blender', 'Toster', 'Kafa aparati'] },
    { name: 'Mali kuhinjski aparati', icon: Home, subcategories: ['Mikrotalasne', 'Rerna', 'Ringlice', 'Friteza'] },
    { name: 'Televizori', icon: Tv, subcategories: ['LED TV', 'OLED TV', 'QLED TV', 'Smart TV'] },
    { name: 'Laptopovi', icon: Laptop, subcategories: ['Gaming', 'Poslovni', 'Ultrabook', 'Budget'] },
    { name: 'Mobilni telefoni', icon: Smartphone, subcategories: ['iPhone', 'Samsung', 'Xiaomi', 'Huawei'] },
    { name: 'Foto i video oprema', icon: Camera, subcategories: ['Kamere', 'Objektivi', 'Tripod', 'Akcione kamere'] }
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
          cartItemsCount={getTotalCartItems()}
          wishlistCount={wishlistItems.length}
        />
{/* 
        <div className="flex">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            categories={categories}
            hotDeals={hotDeals}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          /> */}

          <Routes>
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
            <Route
              path="/product/:id"
              element={
                <ProductDetail
                  products={featuredProducts}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                />
              }
            />
            <Route
              path="/category/:categoryName"
              element={
                <div className="flex-1 p-8">
                  <h1 className="text-4xl font-bold">Kategorija stranica</h1>
                  <p className="text-gray-400 mt-4">Ovde će biti lista proizvoda za izabranu kategoriju.</p>
                </div>
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
            <Route
              path="/cart"
              element={
                <CartPage />
              }
            />
            <Route
              path="/profile"
              element={
                <MyAccountPage />
              }
            />
            <Route
              path="/brands"
              element={
                <Brands />
              }
            />
            <Route
              path="/faq"
              element={
                <FAQPage />
              }
            />
            <Route
              path="/zastita-privatnosti"
              element={
                <ZastitaPrivatnosti />
              }
            />
            <Route
              path="/prava-potrosaca"
              element={
                <PravaPotrosaca />
              }
            />
            <Route
              path="/uslovi-koriscenja-i-prodaje"
              element={
                <UsloviKoriscenja />
              }
            />
            <Route
              path="/uslovi-isporuke"
              element={
                <UsloviIsporuke />
              }
            />
            <Route
              path="/placanje-platnim-karticama"
              element={
                <PlacanjePlatnimKarticama />
              }
            />
            <Route
              path="/reklamacije"
              element={
                <Reklamacije/>
              }
            />
            <Route path="/login" element={<LoginPage />} />
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
      {/* </div> */}
    </Router>
  );
};

export default App;