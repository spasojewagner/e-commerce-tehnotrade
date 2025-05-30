import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Filter, Star, Heart, Eye, Zap, Smartphone, Laptop, Monitor, Camera, Headphones, Gamepad2, Tv, Home } from 'lucide-react';

const TehnoTrade = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Svi proizvodi');

  const categories = [
    { name: 'Proizvodi', icon: Home, subcategories: ['Svi proizvodi', 'Novo', 'Akcije', 'Preporučeno'] },
    { name: 'Bela tehnika', icon: Home, subcategories: ['Frižideri', 'Veš mašine', 'Sudmašine', 'Aspiratori'] },
    { name: 'Mali kućni aparati', icon: Zap, subcategories: ['Mikser', 'Blender', 'Toster', 'Kafa aparati'] },
    { name: 'Mali kuhinjski aparati', icon: Home, subcategories: ['Mikrotalasne', 'Rerna', 'Ringlice', 'Friteza'] },
    { name: 'Televizori', icon: Tv, subcategories: ['LED TV', 'OLED TV', 'QLED TV', 'Smart TV'] },
    { name: 'Laptopovi', icon: Laptop, subcategories: ['Gaming', 'Poslovni', 'Ultrabook', 'Budget'] },
    { name: 'Mobilni telefoni', icon: Smartphone, subcategories: ['iPhone', 'Samsung', 'Xiaomi', 'Huawei'] },
    { name: 'Foto i video oprema', icon: Camera, subcategories: ['Kamere', 'Objektivi', 'Tripod', 'Akcione kamere'] }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Samsung Galaxy S24 Ultra',
      price: 149999,
      originalPrice: 169999,
      image: '📱',
      rating: 4.8,
      discount: 12,
      category: 'Mobilni telefoni',
      isNew: true
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
      isHot: true
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
      isNew: true
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
      isHot: true
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
      isNew: false
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
      isHot: true
    }
  ];

  const hotDeals = [
    { name: 'iPhone 15 Pro Max', discount: 25, timeLeft: '2h 45m' },
    { name: 'Gaming Setup', discount: 30, timeLeft: '5h 12m' },
    { name: 'Smart Home Bundle', discount: 40, timeLeft: '1h 23m' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl animate-ping"></div>
      </div>

      {/* Header */}
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
              <button className="hover:text-orange-400 transition-colors">Moj nalog</button>
              <button className="hover:text-orange-400 transition-colors">Podrška</button>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 hover:bg-orange-500/20 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="text-3xl font-black bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                TEHNO<span className="text-white">TRADE</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="Pretražite proizvode, brendove..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-4 px-6 pl-14 bg-gray-800/50 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 group-hover:bg-gray-800/70"
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-orange-500/25">
                  Traži
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-3 hover:bg-orange-500/20 rounded-xl transition-colors group">
                <Heart className="w-6 h-6 group-hover:text-orange-400" />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">3</span>
              </button>
              <button className="relative p-3 hover:bg-orange-500/20 rounded-xl transition-colors group">
                <ShoppingCart className="w-6 h-6 group-hover:text-orange-400" />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">7</span>
              </button>
              <button className="flex items-center space-x-2 p-3 hover:bg-orange-500/20 rounded-xl transition-colors group">
                <User className="w-6 h-6 group-hover:text-orange-400" />
                <span className="hidden lg:block group-hover:text-orange-400">Prijava</span>
              </button>
            </div>
          </div>

          {/* Category Navigation */}
          <nav className="hidden lg:flex space-x-1 py-2 overflow-x-auto">
            {categories.map((category, index) => (
              <button
                key={index}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl hover:bg-orange-500/20 transition-all duration-300 whitespace-nowrap group"
              >
                <category.icon className="w-4 h-4 group-hover:text-orange-400" />
                <span className="group-hover:text-orange-400 font-medium">{category.name}</span>
                <ChevronDown className="w-4 h-4 group-hover:text-orange-400" />
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Layout with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-black/95 backdrop-blur-xl transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:w-64 border-r border-orange-500/20`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-xl font-bold">Kategorije</h2>
            <button onClick={() => setIsSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-2">
            {categories.map((category, index) => (
              <div key={index} className="group">
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-orange-500/20 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <category.icon className="w-5 h-5 group-hover:text-orange-400" />
                    <span className="font-medium group-hover:text-orange-400">{category.name}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 group-hover:text-orange-400" />
                </button>
                <div className="ml-8 mt-2 space-y-1">
                  {category.subcategories.map((sub, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => setSelectedCategory(sub)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === sub 
                          ? 'bg-orange-500/20 text-orange-400' 
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Hot Deals Sidebar */}
          <div className="mt-8 p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl border border-orange-500/30">
            <h3 className="font-bold text-orange-400 mb-3 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              FLASH AKCIJE
            </h3>
            {hotDeals.map((deal, index) => (
              <div key={index} className="mb-3 p-2 bg-black/30 rounded-lg">
                <div className="text-sm font-medium">{deal.name}</div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-orange-400 font-bold">-{deal.discount}%</span>
                  <span className="text-xs text-red-400">⏰ {deal.timeLeft}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          {/* Hero Section */}
          <section className="relative py-20 px-4">
            <div className="container mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-orange-500/20 rounded-full text-orange-400 text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                MEGA CYBER WEEK - POSLEDNJI DAN!
              </div>
              <h1 className="text-6xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent leading-tight">
                BRUTALNA<br />TEHNOLOGIJA
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Najnovija tehnologija, najbolje cene, najbrža dostava. Otkrijte svet inovacija koji menja sve!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105">
                  ISTRAŽITE AKCIJE 🔥
                </button>
                <button className="px-8 py-4 border-2 border-orange-500 rounded-xl font-bold text-lg hover:bg-orange-500/20 transition-all duration-300">
                  NOVI PROIZVODI ⚡
                </button>
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl font-black">
                  FEATURED <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">PROIZVODI</span>
                </h2>
                <button className="flex items-center space-x-2 px-6 py-3 border border-orange-500 rounded-full hover:bg-orange-500/20 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="group relative bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20">
                    {/* Product Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="px-2 py-1 bg-blue-500 text-xs font-bold rounded-full">NOVO</span>
                      )}
                      {product.isHot && (
                        <span className="px-2 py-1 bg-red-500 text-xs font-bold rounded-full">🔥 HOT</span>
                      )}
                      <span className="px-2 py-1 bg-orange-500 text-xs font-bold rounded-full">-{product.discount}%</span>
                    </div>

                    {/* Wishlist & Quick View */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-black/50 rounded-full hover:bg-orange-500/20 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-black/50 rounded-full hover:bg-orange-500/20 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Product Image */}
                    <div className="text-6xl mb-6 text-center group-hover:scale-110 transition-transform duration-300">
                      {product.image}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3">
                      <div className="text-sm text-orange-400 font-medium">{product.category}</div>
                      <h3 className="font-bold text-lg group-hover:text-orange-400 transition-colors">{product.name}</h3>
                      
                      {/* Rating */}
                      <div className="flex items-center space-x-2">
                        <div className="flex text-orange-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">({product.rating})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-orange-400">{product.price.toLocaleString()} RSD</span>
                        <span className="text-lg text-gray-500 line-through">{product.originalPrice.toLocaleString()} RSD</span>
                      </div>

                      {/* Add to Cart */}
                      <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform group-hover:scale-105">
                        DODAJ U KORPU
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Categories Grid */}
          <section className="py-16 px-4 bg-gradient-to-r from-gray-900/50 to-black/50">
            <div className="container mx-auto">
              <h2 className="text-4xl font-black text-center mb-12">
                SHOP BY <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">CATEGORY</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.slice(1).map((category, index) => (
                  <div key={index} className="group p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 text-center cursor-pointer hover:transform hover:scale-105">
                    <category.icon className="w-12 h-12 mx-auto mb-4 text-orange-400 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold group-hover:text-orange-400 transition-colors">{category.name}</h3>
                    <p className="text-sm text-gray-400 mt-2">{category.subcategories.length} kategorija</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default TehnoTrade;