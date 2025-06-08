import React, { useEffect, useState } from 'react';
import { Calendar, Eye, Star, Truck, Package, AlertCircle, RefreshCw, ChevronDown, ChevronUp, User, MapPin, CreditCard, Clock } from 'lucide-react';
import { useOrdersStore, type Order, type OrderItem } from '../store/useOrdersStore';
import { useAuthStore } from '../store/useAuthStore';

const getStatusColor = (status: Order['status']): string => {
  switch (status) {
    case 'completed': return 'text-green-400 bg-green-500/20 border-green-500/30';
    case 'processing': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
    case 'pending': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
    case 'cancelled': return 'text-red-400 bg-red-500/20 border-red-500/30';
    default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
  }
};

const getStatusText = (status: Order['status']): string => {
  switch (status) {
    case 'completed': return 'Završeno';
    case 'processing': return 'U obradi';
    case 'pending': return 'Na čekanju';
    case 'cancelled': return 'Otkazano';
    default: return 'Nepoznato';
  }
};

// Komponenta za prikaz detalja porudžbine
const OrderDetails: React.FC<{ order: Order; onClose: () => void }> = ({ order, onClose }) => {
  const { calculateOrderTotal } = useOrdersStore();
  const total = order.totalAmount || calculateOrderTotal(order);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700/50">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm p-6 border-b border-gray-700/50 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white">Porudžbina #{order._id.slice(-8)}</h3>
              <p className="text-gray-400 mt-1">Detaljan prikaz vaše porudžbine</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Status i osnovne informacije */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 rounded-2xl p-6 border border-gray-700/30">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-5 h-5 text-orange-400" />
                <h4 className="font-semibold text-white">Status porudžbine</h4>
              </div>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
              <p className="text-gray-400 text-sm mt-3">
                Kreirana: {new Date(order.createdAt).toLocaleDateString('sr-RS', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 rounded-2xl p-6 border border-gray-700/30">
              <div className="flex items-center space-x-3 mb-3">
                <User className="w-5 h-5 text-orange-400" />
                <h4 className="font-semibold text-white">Informacije o kupcu</h4>
              </div>
              <div className="space-y-2">
                <p className="text-white font-medium">{order.user.name} {order.user.surname}</p>
                <p className="text-gray-400 text-sm">{order.user.email}</p>
                {order.user.phone && (
                  <p className="text-gray-400 text-sm">{order.user.phone}</p>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-2xl p-6 border border-orange-500/20">
              <div className="flex items-center space-x-3 mb-3">
                <CreditCard className="w-5 h-5 text-orange-400" />
                <h4 className="font-semibold text-white">Ukupan iznos</h4>
              </div>
              <p className="text-3xl font-bold text-orange-400">{total.toLocaleString()} RSD</p>
              <p className="text-gray-400 text-sm mt-2">{order.items.length} stavki</p>
            </div>
          </div>

          {/* Adresa dostave */}
          {order.shippingAddress && (
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 rounded-2xl p-6 border border-gray-700/30">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="w-5 h-5 text-orange-400" />
                <h4 className="text-lg font-semibold text-white">Adresa dostave</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-white">{order.shippingAddress.street}</p>
                  <p className="text-gray-400">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                  <p className="text-gray-400">{order.shippingAddress.country || 'Srbija'}</p>
                </div>
                {order.shippingAddress.phone && (
                  <div>
                    <p className="text-gray-400 text-sm">Telefon za dostavu:</p>
                    <p className="text-white">{order.shippingAddress.phone}</p>
                  </div>
                )}
              </div>
              {order.shippingAddress.note && (
                <div className="mt-4 pt-4 border-t border-gray-700/30">
                  <p className="text-gray-400 text-sm">Napomena:</p>
                  <p className="text-white">{order.shippingAddress.note}</p>
                </div>
              )}
            </div>
          )}

          {/* Stavke porudžbine */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Package className="w-6 h-6 text-orange-400 mr-3" />
              Stavke porudžbine
            </h4>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-800/40 to-gray-800/20 rounded-2xl p-6 border border-gray-700/30 hover:border-gray-600/50 transition-colors">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gray-700/30 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-600/30">
                      {item.product.images && item.product.images.length > 0 ? (
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h5 className="font-semibold text-white text-lg mb-2">{item.product.name}</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        {item.product.sku && (
                          <p className="text-gray-400">SKU: <span className="text-gray-300">{item.product.sku}</span></p>
                        )}
                        {item.product.brand && (
                          <p className="text-gray-400">Brend: <span className="text-gray-300">{item.product.brand}</span></p>
                        )}
                        <p className="text-gray-400">Jedinična cena: <span className="text-white font-medium">{item.priceAtTime.toLocaleString()} RSD</span></p>
                        <p className="text-gray-400">Količina: <span className="text-white font-medium">{item.quantity}</span></p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-400">
                        {(item.priceAtTime * item.quantity).toLocaleString()} RSD
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ukupan iznos */}
          <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/10 rounded-2xl p-6 border-t-4 border-orange-500">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-white">Ukupno za plaćanje:</span>
              <span className="text-3xl font-bold text-orange-400">{total.toLocaleString()} RSD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrdersPage: React.FC = () => {
  const { user, isInitialized } = useAuthStore();
  const { 
    userOrders, 
    loading, 
    error, 
    getUserOrders, 
    calculateOrderTotal,
    setError 
  } = useOrdersStore();
  
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);

  // Čekaj da se auth inicijalizuje pre učitavanja porudžbina
  useEffect(() => {
    const loadOrders = async () => {
      // Proveri da li je auth inicijalizovan i da li postoji korisnik
      if (isInitialized && user?._id && !initialLoad) {
        console.log('Loading orders for user:', user._id);
        try {
          await getUserOrders(user._id);
          setInitialLoad(true);
        } catch (error) {
          console.error('Error loading user orders:', error);
        }
      }
    };

    loadOrders();
  }, [user?._id, isInitialized, getUserOrders, initialLoad]);

  // Funkcija za učitavanje porudžbina
  const loadUserOrders = async () => {
    if (user?._id) {
      console.log('Refreshing orders for user:', user._id);
      await getUserOrders(user._id);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadUserOrders();
    } catch (error) {
      console.error('Error refreshing orders:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Prikaži loading samo ako nisu inicijalizovani auth ili se učitavaju podaci
  if (!isInitialized || (loading && userOrders.length === 0 && !initialLoad)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Moje porudžbine</h1>
            <p className="text-gray-400">Pregled svih vaših porudžbina</p>
          </div>
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="animate-spin h-12 w-12 border-b-2 border-orange-500 rounded-full mx-auto mb-4"></div>
              <span className="text-gray-400 text-lg">Učitavam porudžbine...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Ako nema korisnika, prikaži poruku
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Moje porudžbine</h1>
            <p className="text-gray-400">Pregled svih vaših porudžbina</p>
          </div>
          <div className="text-center py-24">
            <div className="bg-gray-800/30 rounded-3xl p-12 max-w-md mx-auto border border-gray-700/50">
              <Package className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Potrebno je da se prijavite</h3>
              <p className="text-gray-400 mb-8">Da biste videli svoje porudžbine, potrebno je prvo da se prijavite.</p>
              <button 
                onClick={() => window.location.href = '/login'}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl transition-all duration-200 font-semibold text-white shadow-lg hover:shadow-orange-500/25"
              >
                Prijavite se
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Moje porudžbine</h1>
            <p className="text-gray-400">Pregled svih vaših porudžbina</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="mt-4 sm:mt-0 flex items-center space-x-2 px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-colors disabled:opacity-50 border border-gray-700/50"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="font-medium">Osveži</span>
          </button>
        </div>

        {/* Error handling */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-6 mb-8 backdrop-blur-sm">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-red-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-red-300 mb-2">Greška pri učitavanju</h4>
                <p className="text-red-400">{error}</p>
                <button 
                  onClick={clearError}
                  className="mt-3 text-sm text-red-300 hover:text-red-200 underline"
                >
                  Zatvori obaveštenje
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Orders list */}
        {userOrders.length === 0 && initialLoad ? (
          <div className="text-center py-24">
            <div className="bg-gray-800/30 rounded-3xl p-12 max-w-md mx-auto border border-gray-700/50">
              <Package className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Nemate porudžbine</h3>
              <p className="text-gray-400 mb-8">Kada napravite porudžbinu, pojaviće se ovde.</p>
              <button 
                onClick={() => window.location.href = '/products'}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl transition-all duration-200 font-semibold text-white shadow-lg hover:shadow-orange-500/25"
              >
                Počni kupovinu
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {userOrders.map(order => {
              const total = order.totalAmount || calculateOrderTotal(order);
              
              return (
                <div key={order._id} className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 hover:shadow-xl hover:shadow-black/20">
                  {/* Header porudžbine */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white">#{order._id.slice(-8)}</h3>
                      <p className="text-gray-400 flex items-center mt-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(order.createdAt).toLocaleDateString('sr-RS', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  {/* Statistike */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-700/30 rounded-2xl border border-gray-600/30">
                      <p className="text-gray-400 text-sm mb-1">Ukupno</p>
                      <p className="text-xl font-bold text-orange-400">{total.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">RSD</p>
                    </div>
                    <div className="text-center p-4 bg-gray-700/30 rounded-2xl border border-gray-600/30">
                      <p className="text-gray-400 text-sm mb-1">Stavki</p>
                      <p className="text-xl font-bold text-white">{order.items.length}</p>
                      <p className="text-xs text-gray-500">proizvoda</p>
                    </div>
                    <div className="text-center p-4 bg-gray-700/30 rounded-2xl border border-gray-600/30">
                      <p className="text-gray-400 text-sm mb-1">Izmena</p>
                      <p className="text-sm font-medium text-white">
                        {new Date(order.updatedAt).toLocaleDateString('sr-RS')}
                      </p>
                      <p className="text-xs text-gray-500">datum</p>
                    </div>
                  </div>

                  {/* Preview proizvoda */}
                  <div className="mb-6">
                    <p className="text-gray-400 text-sm mb-3 font-medium">Proizvodi u porudžbini:</p>
                    <div className="flex flex-wrap gap-2">
                      {order.items.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 bg-gray-700/40 rounded-xl px-4 py-2 border border-gray-600/30">
                          <span className="text-sm text-white font-medium">{item.product.name}</span>
                          <span className="text-xs text-orange-400 bg-orange-500/20 px-2 py-1 rounded-full">x{item.quantity}</span>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="flex items-center justify-center bg-gray-700/40 rounded-xl px-4 py-2 border border-gray-600/30">
                          <span className="text-sm text-gray-400">+{order.items.length - 3} više</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Akcije */}
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl transition-all duration-200 font-medium text-white shadow-lg hover:shadow-orange-500/25"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Detalji</span>
                    </button>
                    
                    {order.status === 'completed' && (
                      <button className="flex items-center space-x-2 px-6 py-3 border border-gray-600 hover:bg-gray-700/50 rounded-xl transition-colors text-gray-300 hover:text-white">
                        <Star className="w-4 h-4" />
                        <span>Oceni</span>
                      </button>
                    )}
                    
                    {order.status === 'processing' && (
                      <button className="flex items-center space-x-2 px-6 py-3 border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 rounded-xl transition-colors">
                        <Truck className="w-4 h-4" />
                        <span>Prati</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal za detalje porudžbine */}
        {selectedOrder && (
          <OrderDetails 
            order={selectedOrder} 
            onClose={() => setSelectedOrder(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default OrdersPage;