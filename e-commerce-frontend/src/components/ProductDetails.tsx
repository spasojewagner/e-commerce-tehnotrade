import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Share2, Shield, Truck, RotateCcw, Minus, Plus } from 'lucide-react';
import { Product, useProduct } from '../hooks/useProducts';

interface ProductDetailProps {
  onAddToCart?: (product: Product, quantity: number) => void;
  onAddToWishlist?: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  onAddToCart, 
  onAddToWishlist 
}) => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Koristimo useProduct hook iz useProducts.ts
  const { data: productResponse, isLoading, error } = useProduct(id || '');
  
  const product = productResponse?.data;

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    if (product) {
      onAddToCart?.(product, quantity);
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      onAddToWishlist?.(product);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-16 w-16 border-b-2 border-orange-500 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Učitavanje proizvoda...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-red-400">Greška pri učitavanju</h1>
          <p className="text-gray-400 mb-4">{error.message}</p>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Proizvod nije pronađen</h1>
          <p className="text-gray-400">Proizvod sa ID {id} ne postoji u našoj bazi.</p>
        </div>
      </div>
    );
  }

  // Pripremi podatke za prikaz
  const images = product.images && product.images.length > 0 ? product.images : ['📦'];
  const category = product.categories && product.categories.length > 0 ? product.categories[0] : 'Ostalo';
  const rating = product.rating || 4.5;
  const discount = product.discount || 
    (product.originalPrice && product.price ? 
      Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 min-h-screen mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <ol className="flex items-center space-x-2 text-gray-400">
            <li><a href="/" className="hover:text-orange-400">Početna</a></li>
            <li>/</li>
            <li><a href="/products" className="hover:text-orange-400">{category}</a></li>
            <li>/</li>
            <li className="text-white">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-800/30 rounded-2xl flex items-center justify-center border border-gray-700/50 overflow-hidden">
              {images[selectedImage].startsWith('http') ? (
                <img 
                  src={images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-8xl">{images[selectedImage]}</div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-800/30 rounded-xl flex items-center justify-center border transition-all overflow-hidden ${
                    selectedImage === index 
                      ? 'border-orange-500 scale-105' 
                      : 'border-gray-700/50 hover:border-orange-500/50'
                  }`}
                >
                  {img.startsWith('http') ? (
                    <img 
                      src={img} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-4xl">{img}</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center gap-4 mb-2">
                {product.isNew && (
                  <span className="px-3 py-1 bg-blue-500 text-sm font-bold rounded-full">NOVO</span>
                )}
                {product.isHot && (
                  <span className="px-3 py-1 bg-red-500 text-sm font-bold rounded-full">🔥 HOT</span>
                )}
                {discount > 0 && (
                  <span className="px-3 py-1 bg-orange-500 text-sm font-bold rounded-full">-{discount}%</span>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-orange-400 font-medium">{category}</p>
              {product.sku && (
                <p className="text-gray-400 text-sm">SKU: {product.sku}</p>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex text-orange-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-current' : ''}`} />
                ))}
              </div>
              <span className="text-lg">({rating})</span>
              <span className="text-gray-400">156 recenzija</span>
            </div>

            {/* Price */}
            <div className="py-4 border-y border-gray-700/50">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-4xl font-bold text-orange-400">{product.price.toLocaleString()} RSD</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-2xl text-gray-500 line-through">{product.originalPrice.toLocaleString()} RSD</span>
                )}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="text-green-400 font-medium">Ušteda: {(product.originalPrice - product.price).toLocaleString()} RSD</p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.stock > 0 ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 font-medium">Na stanju ({product.stock} kom)</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-400 font-medium">Nema na stanju</span>
                </>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="font-medium">Količina:</span>
              <div className="flex items-center border border-gray-700 rounded-lg">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 hover:bg-gray-700 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border-x border-gray-700 min-w-[60px] text-center">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 hover:bg-gray-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>DODAJ U KORPU</span>
              </button>
              <button 
                onClick={handleAddToWishlist}
                className="p-4 border-2 border-orange-500 rounded-xl hover:bg-orange-500/20 transition-colors"
              >
                <Heart className="w-6 h-6" />
              </button>
              <button className="p-4 border-2 border-gray-700 rounded-xl hover:bg-gray-700/20 transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-700/50">
              <div className="text-center">
                <Truck className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <p className="text-sm font-medium">Besplatna dostava</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <p className="text-sm font-medium">{product.warranty || '2 godine garancije'}</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <p className="text-sm font-medium">30 dana povraćaj</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold mb-3">Opis proizvoda</h3>
              <p className="text-gray-300 leading-relaxed">{product.description}</p>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-xl font-bold mb-3">Specifikacije</h3>
              <div className="bg-gray-800/30 rounded-xl p-4 space-y-3">
                {product.brand && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/30">
                    <span className="text-gray-400">Brend:</span>
                    <span className="font-medium">{product.brand}</span>
                  </div>
                )}
                {product.warranty && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/30">
                    <span className="text-gray-400">Garancija:</span>
                    <span className="font-medium">{product.warranty}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-2 border-b border-gray-700/30">
                  <span className="text-gray-400">Dostupnost:</span>
                  <span className="font-medium">{product.stock > 0 ? 'Na stanju' : 'Nema na stanju'}</span>
                </div>
                {product.categories && product.categories.map((cat, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700/30 last:border-b-0">
                    <span className="text-gray-400">Kategorija:</span>
                    <span className="font-medium">{cat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;