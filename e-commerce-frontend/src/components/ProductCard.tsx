import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Eye, ShoppingCart } from 'lucide-react';
import { Product, usePrefetchProduct } from '../hooks/useProducts';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  showQuickView?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onAddToWishlist,
  showQuickView = true
}) => {
  const prefetchProduct = usePrefetchProduct();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToWishlist?.(product);
  };

  const handleMouseEnter = () => {
    // Prefetch product details kada user hover preko kartice
    prefetchProduct(product._id);
  };

  // Izračunaj discount procenat ako nije već definisan
  const discount = product.discount || 
    (product.originalPrice && product.price ? 
      Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0);

  // Izračunaj rating display
  const rating = product.rating || 4.5; // default rating
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <Link 
      to={`/product/${product._id}`}
      className="group relative bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20 block"
      onMouseEnter={handleMouseEnter}
    >
      {/* Product Badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        {product.isNew && (
          <span className="px-2 py-1 bg-blue-500 text-xs font-bold rounded-full">NOVO</span>
        )}
        {product.isHot && (
          <span className="px-2 py-1 bg-red-500 text-xs font-bold rounded-full">🔥 HOT</span>
        )}
        {discount > 0 && (
          <span className="px-2 py-1 bg-orange-500 text-xs font-bold rounded-full">-{discount}%</span>
        )}
        {!product.inStock && (
          <span className="px-2 py-1 bg-gray-500 text-xs font-bold rounded-full">NEMA</span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button 
          onClick={handleAddToWishlist}
          className="p-2 bg-black/50 rounded-full hover:bg-orange-500/20 transition-colors"
          title="Dodaj u listu želja"
        >
          <Heart className="w-4 h-4" />
        </button>
        {showQuickView && (
          <button 
            className="p-2 bg-black/50 rounded-full hover:bg-orange-500/20 transition-colors"
            title="Brz pregled"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Product Image */}
      {/* Product Image */}
<div className="text-center mb-6">
  {product.images && product.images.length > 0 ? (
    <img
      src={product.images[0]}
      alt={product.name}
                // možeš i ukloniti, ako želiš
      width={320}                  // odgovara klasi h-48 (192px) i w-full
      height={192}
      className="w-full h-48 object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
      decoding="async"             // opcionalno, pomaže performansama
    />
  ) : (
    <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
      📦
    </div>
  )}
</div>


      {/* Product Info */}
      <div className="space-y-3">
        {/* Category & Brand */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-orange-400 font-medium">
            {product.categories && product.categories.length > 0 ? product.categories[0] : 'Ostalo'}
          </span>
          {product.brand && (
            <span className="text-gray-400">{product.brand}</span>
          )}
        </div>

        {/* Product Name */}
        <h3 
          className="font-bold text-lg group-hover:text-orange-400 transition-colors line-clamp-2"
          title={product.name}
        >
          {product.name}
        </h3>
        
        {/* SKU */}
        {product.sku && (
          <div className="text-xs text-gray-500">SKU: {product.sku}</div>
        )}

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex text-orange-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${
                  i < fullStars 
                    ? 'fill-current' 
                    : i === fullStars && hasHalfStar 
                      ? 'fill-current opacity-50' 
                      : ''
                }`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-400">({rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-orange-400">
            {product.price.toLocaleString()} RSD
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-lg text-gray-500 line-through">
              {product.originalPrice.toLocaleString()} RSD
            </span>
          )}
        </div>

        {/* Stock Info */}
        {product.stock !== undefined && (
          <div className="text-sm">
            {product.stock > 0 ? (
              <span className="text-green-400">Na stanju: {product.stock}</span>
            ) : (
              <span className="text-red-400">Nema na stanju</span>
            )}
          </div>
        )}

        {/* Warranty */}
        {product.warranty && (
          <div className="text-sm text-gray-400">
            Garancija: {product.warranty}
          </div>
        )}

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          disabled={!product.inStock && product.stock === 0}
          className={`w-full py-3 rounded-xl font-bold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 ${
            !product.inStock && product.stock === 0
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 group-hover:scale-105'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>
              {!product.inStock && product.stock === 0 ? 'NEMA NA STANJU' : 'DODAJ U KORPU'}
            </span>
          </div>
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;