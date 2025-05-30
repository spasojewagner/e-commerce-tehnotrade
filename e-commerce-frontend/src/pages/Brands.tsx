import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, Star, Zap, Award, Sparkles, ChevronRight, Grid3X3, List, Heart } from 'lucide-react';

interface Brand {
  name: string;
  category: string;
  rating: number;
  description: string;
  isPopular?: boolean;
  isFeatured?: boolean;
}

const Brands: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const brands: Brand[] = [
    { name: 'TESLA', category: 'tech', rating: 4.9, description: 'Revolucionarna elektromobilnost', isPopular: true, isFeatured: true },
    { name: 'HP PSG', category: 'tech', rating: 4.3, description: 'Personalni sistemi i gaming' },
    { name: 'Trust', category: 'tech', rating: 4.1, description: 'Pouzdani gaming dodaci' },
    { name: 'Xiaomi', category: 'tech', rating: 4.6, description: 'Inovativna tehnologija za sve', isPopular: true },
    { name: 'TP-Link', category: 'networking', rating: 4.4, description: 'Mrežna oprema vrhunskog kvaliteta' },
    { name: 'Lenovo', category: 'tech', rating: 4.2, description: 'Laptopovi i poslovni računari' },
    { name: 'Tesla WG', category: 'gaming', rating: 4.5, description: 'Gaming gear i oprema' },
    { name: 'Samsung', category: 'tech', rating: 4.7, description: 'Globalni tehnološki lider', isPopular: true, isFeatured: true },
    { name: 'Asus', category: 'tech', rating: 4.5, description: 'Inovativni hardver i laptopovi' },
    { name: 'HP Supplies', category: 'office', rating: 4.0, description: 'Kancelarijski materijali' },
    { name: 'Kingston', category: 'storage', rating: 4.6, description: 'Memorijski uređaji i SSD' },
    { name: 'GoPro', category: 'cameras', rating: 4.4, description: 'Akcione kamere za avanture', isFeatured: true },
    { name: 'Corsair', category: 'gaming', rating: 4.7, description: 'Gaming periferije i komponente', isPopular: true },
    { name: 'DJI', category: 'cameras', rating: 4.8, description: 'Dronovi i stabilizatori', isFeatured: true },
    { name: 'Bombata', category: 'accessories', rating: 4.2, description: 'Stylish torbe i ranac' },
    { name: 'TCL', category: 'tv', rating: 4.3, description: 'Smart TV i displej tehnologija' },
    { name: 'Whirlpool', category: 'appliances', rating: 4.1, description: 'Bela tehnika za dom' },
    { name: 'Ninja', category: 'appliances', rating: 4.5, description: 'Kuhinjski aparati i blenderi' },
    { name: 'Baseus', category: 'accessories', rating: 4.4, description: 'Mobilni dodaci i powerbank' },
    { name: 'Barner', category: 'accessories', rating: 4.0, description: 'Blue light naočare' },
    { name: 'Honor', category: 'tech', rating: 4.3, description: 'Pametni telefoni i wearables' },
    { name: 'Bosch', category: 'appliances', rating: 4.6, description: 'Premium kućni aparati', isPopular: true },
    { name: 'Silicon Power', category: 'storage', rating: 4.2, description: 'Memorije i storage rešenja' },
    { name: 'Shark', category: 'appliances', rating: 4.4, description: 'Usisivači i čišćenje' },
    { name: 'HP IPG', category: 'office', rating: 4.1, description: 'Imaging i printing rešenja' },
    { name: 'HyperX', category: 'gaming', rating: 4.8, description: 'Gaming slušalice i periferije',  },
    { name: 'HP ESG', category: 'enterprise', rating: 4.3, description: 'Enterprise serveri i storage' },
    { name: 'Microsoft', category: 'tech', rating: 4.5, description: 'Software i cloud rešenja', isPopular: true },
    { name: 'LG', category: 'appliances', rating: 4.4, description: 'Bela tehnika i displej' },
    { name: 'Toshiba', category: 'storage', rating: 4.2, description: 'Hard diskovi i storage' },
    { name: 'Gigabyte', category: 'tech', rating: 4.5, description: 'Matične ploče i grafičke' },
    { name: 'Acer', category: 'tech', rating: 4.1, description: 'Laptopovi i monitori' },
    { name: 'AMD', category: 'tech', rating: 4.7, description: 'Procesori i grafičke kartice', isPopular: true },
    { name: 'APsystems', category: 'energy', rating: 4.3, description: 'Solarna energija i mikro inverteri' },
    { name: 'APC', category: 'enterprise', rating: 4.4, description: 'UPS i zaštita napajanja' },
    { name: 'AOC', category: 'displays', rating: 4.2, description: 'Monitori i display rešenja' },
    { name: 'HMD Global', category: 'tech', rating: 4.0, description: 'Nokia telefoni' },
    { name: 'Ariston', category: 'appliances', rating: 4.3, description: 'Grejanje i sanitarna oprema' },
    { name: 'Canon Supplies', category: 'office', rating: 4.2, description: 'Printer toneri i potrošni materijal' },
    { name: 'Bosch Security', category: 'security', rating: 4.5, description: 'Sigurnosni sistemi',},
    { name: 'Philips', category: 'appliances', rating: 4.4, description: 'Kućni apparati i zdravstvena tehnologija' },
    { name: 'Infinix', category: 'tech', rating: 4.1, description: 'Dostupni pametni telefoni' },
    { name: 'Segway', category: 'transport', rating: 4.3, description: 'Električni skuteri i transport' },
    { name: 'Canon', category: 'cameras', rating: 4.6, description: 'Fotoaparati i printing', isPopular: true }
  ];

  const categories = [
    { id: 'all', name: 'Sve kategorije', icon: Grid3X3 },
    { id: 'tech', name: 'Tehnologija', icon: Zap },
    { id: 'gaming', name: 'Gaming', icon: Award },
    { id: 'appliances', name: 'Aparati', icon: Star },
    { id: 'cameras', name: 'Kamere', icon: Sparkles }
  ];

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || brand.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (brandName: string) => {
    setFavorites(prev => 
      prev.includes(brandName) 
        ? prev.filter(name => name !== brandName)
        : [...prev, brandName]
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth - scrollRef.current.clientWidth) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-900/50 to-orange-900/50 backdrop-blur-sm border-b border-white/10 w-full">
          <div className="w-full px-4 py-16 lg:py-24">
            <div className="text-center w-full">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-orange-500/20 rounded-full border border-white/20 mb-6">
                <Sparkles className="w-4 h-4 mr-2 text-orange-400" />
                <span className="text-sm font-medium bg-gradient-to-r from-purple-300 to-orange-300 bg-clip-text text-transparent">
                  Premium brendovi
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
                <span className="bg-gradient-to-r from-white via-purple-200 to-orange-200 bg-clip-text text-transparent">
                  BRUTALNI
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  BRENDOVI
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Otkrijte najjače brendove koji definišu budućnost tehnologije i inovacija
              </p>

              {/* Floating Brand Names */}
              <div ref={scrollRef} className="overflow-hidden whitespace-nowrap mb-8 w-full">
                <div className="inline-flex space-x-8 animate-scroll">
                  {[...brands, ...brands].map((brand, index) => (
                    <span 
                      key={index} 
                      className="text-2xl md:text-3xl font-bold text-white/20 hover:text-white/40 transition-colors"
                    >
                      {brand.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="w-full px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6 mb-8 w-full">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Pretražite brendove..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-purple-500/50 focus:bg-white/10 backdrop-blur-sm transition-all text-white placeholder-gray-400"
              />
            </div>

            {/* View Toggle */}
            <div className="flex bg-white/5 rounded-2xl p-1 backdrop-blur-sm border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'grid' 
                  ? 'bg-gradient-to-r from-purple-500 to-orange-500 text-white' 
                  : 'text-gray-400 hover:text-white'}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'list' 
                  ? 'bg-gradient-to-r from-purple-500 to-orange-500 text-white' 
                  : 'text-gray-400 hover:text-white'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-8 w-full">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all border backdrop-blur-sm ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-500 to-orange-500 border-transparent text-white shadow-lg shadow-purple-500/25'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Featured Brands Showcase */}
          <div className="mb-12 w-full">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2 text-orange-400" />
              Izdvojeni brendovi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {brands.filter(brand => brand.isFeatured).map(brand => (
                <div key={brand.name} className="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-orange-500 rounded-2xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{brand.name.charAt(0)}</span>
                      </div>
                      <button
                        onClick={() => toggleFavorite(brand.name)}
                        className={`p-2 rounded-full transition-all ${
                          favorites.includes(brand.name) 
                            ? 'bg-red-500/20 text-red-400' 
                            : 'bg-white/10 text-gray-400 hover:text-red-400'
                        }`}
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-orange-300 transition-colors">{brand.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{brand.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{brand.rating}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Brands */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-6 w-full">
              <h2 className="text-2xl font-bold flex items-center">
                <Filter className="w-6 h-6 mr-2 text-purple-400" />
                Svi brendovi ({filteredBrands.length})
              </h2>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                {filteredBrands.map(brand => (
                  <div key={brand.name} className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-orange-500/20 rounded-xl flex items-center justify-center border border-white/10">
                          <span className="text-white font-bold">{brand.name.charAt(0)}</span>
                        </div>
                        {brand.isPopular && (
                          <div className="px-2 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-500/30">
                            <span className="text-xs font-medium text-orange-300">HOT</span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-bold text-sm mb-1 group-hover:text-purple-300 transition-colors">{brand.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-400">{brand.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3 w-full">
                {filteredBrands.map(brand => (
                  <div key={brand.name} className="group flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer w-full">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-orange-500/20 rounded-xl flex items-center justify-center border border-white/10">
                        <span className="text-white font-bold">{brand.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold group-hover:text-purple-300 transition-colors">{brand.name}</h3>
                          {brand.isPopular && (
                            <span className="px-2 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-500/30 text-xs font-medium text-orange-300">HOT</span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">{brand.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{brand.rating}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;