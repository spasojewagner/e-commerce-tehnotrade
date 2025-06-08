import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Truck, User, MapPin, Phone, Mail, Package, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { useOrdersStore } from '../store/useOrdersStore';

interface OrderData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  deliveryInfo: {
    address: string;
    city: string;
    postalCode: string;
    note?: string;
  };
  paymentMethod: 'card' | 'cash';
  items: any[];
  totals: {
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
  };
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const { user, isAuthenticated, getProfile } = useAuthStore();
  const { createOrder, loading: orderLoading } = useOrdersStore();
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('cash');
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    city: '',
    postalCode: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  // Učitaj podatke korisnika pri mount-u komponente
  useEffect(() => {
    const loadUserData = async () => {
      if (isAuthenticated && !user) {
        try {
          await getProfile();
        } catch (error) {
          console.error('Greška pri učitavanju profila:', error);
        }
      }
    };

    loadUserData();
  }, [isAuthenticated, user, getProfile]);

  // Automatski popuni polja kada se učitaju podaci korisnika
  useEffect(() => {
    if (user && isAuthenticated) {
      setPersonalInfo({
        firstName: user.name || '',
        lastName: user.surname || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user, isAuthenticated]);

  // Calculate totals
  const subtotal = items
    .filter(item => item.product && typeof item.product.price === 'number')
    .reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const shipping = subtotal > 50000 ? 0 : 500;
  const discount = 0; // You can implement promo code logic here
  const total = subtotal + shipping - discount;

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 5000);
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleDeliveryInfoChange = (field: string, value: string) => {
    setDeliveryInfo(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const requiredPersonalFields = ['firstName', 'lastName', 'email', 'phone'];
    const requiredDeliveryFields = ['address', 'city', 'postalCode'];

    for (const field of requiredPersonalFields) {
      if (!personalInfo[field as keyof typeof personalInfo].trim()) {
        showNotification(`Molimo unesite ${field === 'firstName' ? 'ime' : field === 'lastName' ? 'prezime' : field === 'email' ? 'email' : 'telefon'}`, 'error');
        return false;
      }
    }

    for (const field of requiredDeliveryFields) {
      if (!deliveryInfo[field as keyof typeof deliveryInfo].trim()) {
        showNotification(`Molimo unesite ${field === 'address' ? 'adresu' : field === 'city' ? 'grad' : 'poštanski broj'}`, 'error');
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(personalInfo.email)) {
      showNotification('Molimo unesite validnu email adresu', 'error');
      return false;
    }

    // Phone validation (simple check for Serbian numbers)
    const phoneRegex = /^(\+381|0)[0-9]{8,9}$/;
    if (!phoneRegex.test(personalInfo.phone.replace(/\s/g, ''))) {
      showNotification('Molimo unesite validan broj telefona', 'error');
      return false;
    }

    return true;
  };

  const createOrderHandler = async () => {
    if (!validateForm()) return;

    // Proveri da li je korisnik ulogovan
    if (!isAuthenticated || !user) {
      showNotification('Morate biti ulogovani da biste napravili porudžbinu', 'error');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);

    try {
      // FIXED: Properly prepare order data with correct structure
      const orderData = {
  // koristi _id iz usera, fallback na id ako negde promeniš
  userId: (user as any)._id || (user as any).id,
  items: items.map(item => ({
    product: item.product._id ,
    quantity: item.quantity
  })),
  shippingAddress: {
    street: deliveryInfo.address,
    city: deliveryInfo.city,
    postalCode: deliveryInfo.postalCode,
    country: 'Srbija',
    phone: personalInfo.phone,
    note: deliveryInfo.note || undefined
  }
};


      console.log('Sending order data:', orderData); // Debug log

      // Kreiraj porudžbinu koristeći useOrdersStore
      const createdOrder = await createOrder(orderData);

      if (createdOrder) {
        // Obriši korpu
        await clearCart();

        // Prikaži uspešnu notifikaciju
        showNotification('Porudžbina je uspešno kreirana!', 'success');

        // Preusmeri na stranicu sa porudžbinama nakon kratke pauze
        setTimeout(() => {
          navigate('/profile/orders');
        }, 2000);
      } else {
        showNotification('Greška pri kreiranju porudžbine. Pokušajte ponovo.', 'error');
      }

    } catch (error: any) {
      console.error('Greška pri kreiranju porudžbine:', error);
      
      // More detailed error handling
      if (error?.response) {
        console.error('Server response:', error.response.data);
        const message = error.response.data?.message || 'Greška pri kreiranju porudžbine';
        showNotification(message, 'error');
      } else {
        showNotification('Greška pri kreiranju porudžbine. Pokušajte ponovo.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return null; // Will redirect via useEffect
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
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 max-w-sm ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-start space-x-3">
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            )}
            <div>
              <p className="font-medium">{notification.message}</p>
              {notification.type === 'success' && notification.message.includes('kreirana') && (
                <button 
                  onClick={() => navigate('/profile/orders')}
                  className="mt-2 text-sm underline hover:no-underline"
                >
                  Pogledaj porudžbine →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8 max-w-7xl mx-auto">
          <button 
            onClick={() => navigate('/cart')}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Završi kupovinu</h1>
          {/* Dodaj indikator da su podaci učitani */}
          {isAuthenticated && user && (
            <div className="flex items-center space-x-2 text-green-400 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Podaci učitani iz profila</span>
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="xl:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <User className="w-5 h-5 mr-2 text-orange-400" />
                  Lični podaci
                  {isAuthenticated && user && (
                    <span className="ml-2 text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
                      Auto-popunjeno
                    </span>
                  )}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Ime *
                    </label>
                    <input
                      type="text"
                      value={personalInfo.firstName}
                      onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
                      placeholder="Unesite ime"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Prezime *
                    </label>
                    <input
                      type="text"
                      value={personalInfo.lastName}
                      onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
                      placeholder="Unesite prezime"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
                      placeholder="+381 60 123 4567"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-orange-400" />
                  Adresa dostave
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Adresa *
                    </label>
                    <input
                      type="text"
                      value={deliveryInfo.address}
                      onChange={(e) => handleDeliveryInfoChange('address', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
                      placeholder="Unesite adresu"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Grad *
                      </label>
                      <input
                        type="text"
                        value={deliveryInfo.city}
                        onChange={(e) => handleDeliveryInfoChange('city', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
                        placeholder="Unesite grad"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Poštanski broj *
                      </label>
                      <input
                        type="text"
                        value={deliveryInfo.postalCode}
                        onChange={(e) => handleDeliveryInfoChange('postalCode', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
                        placeholder="21000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Napomena (opciono)
                    </label>
                    <textarea
                      value={deliveryInfo.note}
                      onChange={(e) => handleDeliveryInfoChange('note', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
                      placeholder="Dodatne informacije za dostavu..."
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-orange-400" />
                  Način plaćanja
                </h3>
                <div className="space-y-4">
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'cash' 
                        ? 'border-orange-500 bg-orange-500/10' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setPaymentMethod('cash')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'cash' ? 'border-orange-500' : 'border-gray-600'
                      }`}>
                        {paymentMethod === 'cash' && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Package className="w-5 h-5 text-gray-400" />
                        <span className="font-medium">Plaćanje pri preuzimanju</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2 ml-7">
                      Platite kada vam stigne paket na adresu
                    </p>
                  </div>

                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'card' 
                        ? 'border-orange-500 bg-orange-500/10' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'card' ? 'border-orange-500' : 'border-gray-600'
                      }`}>
                        {paymentMethod === 'card' && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-5 h-5 text-gray-400" />
                        <span className="font-medium">Plaćanje karticom</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2 ml-7">
                      Sigurno plaćanje putem interneta
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Order Items */}
              <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold mb-4">Vaša porudžbina</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product._id} className="flex items-center space-x-3 p-3 bg-gray-700/20 rounded-lg">
                      <div className="w-12 h-12 bg-gray-700/30 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        {item.product.images && item.product.images.length > 0 ? (
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-lg">📦</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.product.name}</h4>
                        <p className="text-xs text-gray-400">
                          {item.quantity} x {item.product.price.toLocaleString()} RSD
                        </p>
                      </div>
                      <div className="text-sm font-bold text-orange-400">
                        {(item.product.price * item.quantity).toLocaleString()} RSD
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
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
                  className="w-full mt-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={createOrderHandler}
                  disabled={isSubmitting || orderLoading}
                >
                  {(isSubmitting || orderLoading) ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-b-2 border-white rounded-full"></div>
                      <span>KREIRANJE PORUDŽBINE...</span>
                    </>
                  ) : (
                    <>
                      <Package className="w-5 h-5" />
                      <span>POTVRDI PORUDŽBINU</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Klikom na "Potvrdi porudžbinu" prihvatate naše uslove korišćenja
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;