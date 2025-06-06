import React, { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard, Truck, Gift, Percent, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore, CartItem } from '../store/useCartStore';

interface AppliedPromo {
  code: string;
  discount: number;
  amount: number;
}

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    items, 
    loading, 
    error, 
    fetchCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useCartStore();

  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });

  // Fetch cart on component mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Show notification
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleUpdateQuantity = async (productId: string, delta: number) => {
    const item = items.find(item => item.product._id === productId);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);
    
    // Check stock if available
    if (item.product.stock && newQuantity > item.product.stock) {
      showNotification('Nema dovoljno proizvoda na stanju', 'error');
      return;
    }

    try {
      await updateQuantity(productId, newQuantity);
      showNotification('Količina ažurirana', 'success');
    } catch (err) {
      showNotification('Greška pri ažuriranju količine', 'error');
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await removeFromCart(productId);
      showNotification('Proizvod uklonjen iz korpe', 'success');
    } catch (err) {
      showNotification('Greška pri uklanjanju proizvoda', 'error');
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Da li ste sigurni da želite da obrišete sve proizvode iz korpe?')) {
      try {
        await clearCart();
        showNotification('Korpa je obrisana', 'success');
      } catch (err) {
        showNotification('Greška pri brisanju korpe', 'error');
      }
    }
  };

  const applyPromoCode = () => {
    // Dodajemo proveru da li postoje validi proizvodi u korpi
    const validItems = items.filter(item => item.product && typeof item.product.price === 'number');
    const subtotal = validItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    if (promoCode === 'POPUST10') {
      setAppliedPromo({ 
        code: 'POPUST10', 
        discount: 10, 
        amount: subtotal * 0.1 
      });
      showNotification('Promo kod je uspešno primenjen!', 'success');
    } else if (promoCode === 'NOVO20') {
      setAppliedPromo({ 
        code: 'NOVO20', 
        discount: 20, 
        amount: subtotal * 0.2 
      });
      showNotification('Promo kod je uspešno primenjen!', 'success');
    } else {
      showNotification('Neispravni promo kod', 'error');
    }
    setPromoCode('');
  };

  // Sigurno računanje subtotal-a sa proverom
  const subtotal = items
    .filter(item => item.product && typeof item.product.price === 'number')
    .reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const shipping = subtotal > 50000 ? 0 : 500;
  const promoDiscount = appliedPromo ? appliedPromo.amount : 0;
  const total = subtotal + shipping - promoDiscount;

  // Error state
  if (error) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="w-full px-4 py-8">
          <div className="text-center mt-20">
            <AlertCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Greška pri učitavanju korpe</h1>
            <p className="text-gray-400 mb-8">{error}</p>
            <button 
              onClick={() => fetchCart()}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all"
            >
              Pokušaj ponovo
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="w-full px-4 py-8">
          <div className="flex justify-center py-20">
            <div className="animate-spin h-16 w-16 border-b-2 border-orange-500 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 w-full px-4 py-8">
          <div className="text-center mt-20">
            <ShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Vaša korpa je prazna</h1>
            <p className="text-gray-400 mb-8">Dodajte proizvode u korpu da biste nastavili sa kupovinom</p>
            <button 
              onClick={() => navigate('/products')}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all"
            >
              Nastavi kupovinu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="relative z-10 w-full px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold">Korpa ({items.length})</h1>
          </div>
          {items.length > 0 && (
            <button 
              className="text-orange-400 hover:text-orange-300 font-medium"
              onClick={handleClearCart}
              disabled={loading}
            >
              Obriši sve
            </button>
          )}
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="xl:col-span-2 space-y-4">
              {items.map((item, index) => {
                // Dodajemo proveru da li item i item.product postoje
                if (!item || !item.product) {
                  return (
                    <div key={`error-item-${index}`} className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                      <div className="text-center text-gray-400">
                        <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                        <p>Greška pri učitavanju proizvoda</p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={item.product._id} className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-700/30 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                        {item.product.images && item.product.images.length > 0 ? (
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name || 'Proizvod'}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-3xl">📦</div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 w-full">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-1">{item.product.name || 'Nepoznat proizvod'}</h3>
                            <div className="flex items-center space-x-3">
                              <span className="text-orange-400 font-bold text-lg">
                                {typeof item.product.price === 'number' 
                                  ? `${item.product.price.toLocaleString()} RSD`
                                  : 'Cena nedostupna'
                                }
                              </span>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveItem(item.product._id)}
                            disabled={loading}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 self-start"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center space-x-2 mt-3 mb-4">
                          {item.product.stock && item.product.stock > 0 ? (
                            <>
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-green-400 text-sm">
                                Na stanju ({item.product.stock} kom)
                              </span>
                            </>
                          ) : item.product.stock === 0 ? (
                            <>
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span className="text-red-400 text-sm">Nema na stanju</span>
                            </>
                          ) : (
                            <>
                              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                              <span className="text-gray-400 text-sm">Dostupno</span>
                            </>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                          <div className="flex items-center border border-gray-700 rounded-lg">
                            <button
                              onClick={() => handleUpdateQuantity(item.product._id, -1)}
                              disabled={loading || item.quantity <= 1}
                              className="p-2 hover:bg-gray-700 transition-colors disabled:opacity-50"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 border-x border-gray-700 min-w-[60px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.product._id, 1)}
                              disabled={loading}
                              className="p-2 hover:bg-gray-700 transition-colors disabled:opacity-50"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-left sm:text-right">
                            <p className="text-sm text-gray-400">Ukupno</p>
                            <p className="text-xl font-bold text-orange-400">
                              {typeof item.product.price === 'number'
                                ? `${(item.product.price * item.quantity).toLocaleString()} RSD`
                                : 'Cena nedostupna'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Promo Code */}
              <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Percent className="w-5 h-5 mr-2 text-orange-400" />
                  Promo kod
                </h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Unesite kod"
                    className="flex-1 px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
                  />
                  <button
                    onClick={applyPromoCode}
                    disabled={!promoCode.trim()}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    Primeni
                  </button>
                </div>
                {appliedPromo && (
                  <div className="mt-3 p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex justify-between items-center">
                    <p className="text-green-400 text-sm">
                      ✓ Kod "{appliedPromo.code}" je primenjen (-{appliedPromo.discount}%)
                    </p>
                    <button
                      onClick={() => setAppliedPromo(null)}
                      className="text-green-400 hover:text-green-300 text-sm underline"
                    >
                      Ukloni
                    </button>
                  </div>
                )}
                <div className="mt-2 text-xs text-gray-500">
                  Probajte: POPUST10 ili NOVO20
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold mb-4">Rezime porudžbine</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Međuzbir:</span>
                    <span>{subtotal.toLocaleString()} RSD</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dostava:</span>
                    <span className={shipping === 0 ? 'text-green-400' : ''}>
                      {shipping === 0 ? 'Besplatno' : `${shipping.toLocaleString()} RSD`}
                    </span>
                  </div>

                  {appliedPromo && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Popust ({appliedPromo.code}):</span>
                      <span className="text-green-400">-{promoDiscount.toLocaleString()} RSD</span>
                    </div>
                  )}

                  {shipping === 0 && (
                    <div className="flex items-center text-green-400 text-sm">
                      <Truck className="w-4 h-4 mr-2" />
                      Besplatna dostava za porudžbine preko 50.000 RSD
                    </div>
                  )}

                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Ukupno:</span>
                      <span className="text-orange-400">{total.toLocaleString()} RSD</span>
                    </div>
                  </div>
                </div>

                <button 
                  className="w-full mt-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  onClick={() => navigate('/checkout')}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>NASTAVI SA PLAĆANJEM</span>
                </button>

                <div className="mt-4 text-center">
                  <button 
                    onClick={() => navigate('/products')}
                    className="text-orange-400 hover:text-orange-300 font-medium"
                  >
                    Nastavi kupovinu
                  </button>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-gray-800/30 rounded-2xl p-4 border border-gray-700/50">
                <div className="flex items-center justify-center space-x-4 text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">SSL Zaštićeno</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Gift className="w-4 h-4" />
                    <span className="text-sm">30 dana garancije</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;