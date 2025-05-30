import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Product, Category } from '../types';

interface HomePageProps {
  featuredProducts: Product[];
  categories: Category[];
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ 
  featuredProducts, 
  categories, 
  onAddToCart, 
  onAddToWishlist 
}) => {
  return (
    <main className="flex-1">
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
            <Link 
              to="/deals" 
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105"
            >
              ISTRAŽITE AKCIJE 🔥
            </Link>
            <Link 
              to="/new-products" 
              className="px-8 py-4 border-2 border-orange-500 rounded-xl font-bold text-lg hover:bg-orange-500/20 transition-all duration-300"
            >
              NOVI PROIZVODI ⚡
            </Link>
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
            <Link 
              to="/products" 
              className="flex items-center space-x-2 px-6 py-3 border border-orange-500 rounded-full hover:bg-orange-500/20 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Svi proizvodi</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
              />
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
              <Link
                key={index}
                to={`/category/${encodeURIComponent(category.name.toLowerCase())}`}
                className="group p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 text-center cursor-pointer hover:transform hover:scale-105"
              >
                <category.icon className="w-12 h-12 mx-auto mb-4 text-orange-400 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold group-hover:text-orange-400 transition-colors">{category.name}</h3>
                <p className="text-sm text-gray-400 mt-2">{category.subcategories.length} kategorija</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;