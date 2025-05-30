import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard, Truck, Gift, Percent, LucideIcon } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
  inStock: boolean;
  discount: number;
}

interface AppliedPromo {
  code: string;
  discount: number;
  amount: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Premium Laptop",
      category: "Elektronika",
      price: 89990,
      originalPrice: 99990,
      quantity: 1,
      image: "💻",
      inStock: true,
      discount: 10
    },
    {
      id: 2,
      name: "Wireless Slušalice",
      category: "Audio",
      price: 15990,
      originalPrice: 19990,
      quantity: 2,
      image: "🎧",
      inStock: true,
      discount: 20
    },
    {
      id: 3,
      name: "Gaming Miš",
      category: "Gaming",
      price: 5990,
      originalPrice: 7990,
      quantity: 1,
      image: "🖱️",
      inStock: false,
      discount: 25
    }
  ]);

  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (promoCode === 'POPUST10') {
      setAppliedPromo({ 
        code: 'POPUST10', 
        discount: 10, 
        amount: subtotal * 0.1 
      });
    } else if (promoCode === 'NOVO20') {
      setAppliedPromo({ 
        code: 'NOVO20', 
        discount: 20, 
        amount: subtotal * 0.2 
      });
    }
    setPromoCode('');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50000 ? 0 : 500;
  const promoDiscount = appliedPromo ? appliedPromo.amount : 0;
  const total = subtotal + shipping - promoDiscount;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="text-center mt-20">
            <ShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Vaša korpa je prazna</h1>
            <p className="text-gray-400 mb-8">Dodajte proizvode u korpu da biste nastavili sa kupovinom</p>
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all">
              Nastavi kupovinu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold">Korpa ({cartItems.length})</h1>
          </div>
          <button 
            className="text-orange-400 hover:text-orange-300 font-medium"
            onClick={() => setCartItems([])}
          >
            Obriši sve
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                <div className="flex items-center space-x-6">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-700/30 rounded-xl flex items-center justify-center text-3xl">
                    {item.image}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                        <p className="text-gray-400 text-sm mb-2">{item.category}</p>
                        <div className="flex items-center space-x-3">
                          <span className="text-orange-400 font-bold text-lg">
                            {item.price.toLocaleString()} RSD
                          </span>
                          <span className="text-gray-500 line-through text-sm">
                            {item.originalPrice.toLocaleString()} RSD
                          </span>
                          <span className="px-2 py-1 bg-red-500 text-xs font-bold rounded">
                            -{item.discount}%
                          </span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center space-x-2 mt-3 mb-4">
                      {item.inStock ? (
                        <>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-green-400 text-sm">Na stanju</span>
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-red-400 text-sm">Nema na stanju</span>
                        </>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-700 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 hover:bg-gray-700 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 border-x border-gray-700 min-w-[60px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 hover:bg-gray-700 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-400">Ukupno</p>
                        <p className="text-xl font-bold text-orange-400">
                          {(item.price * item.quantity).toLocaleString()} RSD
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium transition-colors"
                >
                  Primeni
                </button>
              </div>
              {appliedPromo && (
                <div className="mt-3 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm">
                    ✓ Kod "{appliedPromo.code}" je primenjen (-{appliedPromo.discount}%)
                  </p>
                </div>
              )}
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

              <button className="w-full mt-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>NASTAVI SA PLAĆANJEM</span>
              </button>

              <div className="mt-4 text-center">
                <button className="text-orange-400 hover:text-orange-300 font-medium">
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
  );
};

export default CartPage;