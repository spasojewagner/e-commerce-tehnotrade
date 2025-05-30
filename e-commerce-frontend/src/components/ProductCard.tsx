import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onAddToWishlist 
}) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart?.(product);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToWishlist?.(product);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group relative bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20 block"
    >
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
        <button 
          onClick={handleAddToWishlist}
          className="p-2 bg-black/50 rounded-full hover:bg-orange-500/20 transition-colors"
        >
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
        <button 
          onClick={handleAddToCart}
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform group-hover:scale-105"
        >
          DODAJ U KORPU
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;