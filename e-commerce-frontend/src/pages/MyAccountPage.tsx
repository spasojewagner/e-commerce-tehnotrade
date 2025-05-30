import React, { useState } from 'react';
import { User, Settings, Package, Heart, MapPin, CreditCard, Bell, Shield, Edit, Eye, EyeOff, Star, Calendar, Truck, Plus, Trash2 } from 'lucide-react';

// Type definitions
interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
}

interface Address {
  id: number;
  type: 'home' | 'work' | 'other';
  name: string;
  street: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  total: number;
  items: number;
  trackingNumber: string;
}

interface PaymentMethod {
  id: number;
  type: 'card' | 'paypal';
  cardNumber?: string;
  cardType?: string;
  expiryDate?: string;
  email?: string;
  isDefault: boolean;
}

interface NotificationSettings {
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
  sms: boolean;
}

type TabId = 'profile' | 'orders' | 'addresses' | 'payments' | 'settings';

const MyAccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: 'Marko',
    lastName: 'Petrović',
    email: 'marko.petrovic@email.com',
    phone: '+381 64 123 4567',
    dateOfBirth: '1990-05-15',
    gender: 'male'
  });

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      type: 'home',
      name: 'Kućna adresa',
      street: 'Kralja Petra 123',
      city: 'Beograd',
      postalCode: '11000',
      isDefault: true
    },
    {
      id: 2,
      type: 'work',
      name: 'Poslovna adresa',
      street: 'Knez Mihailova 45',
      city: 'Beograd',
      postalCode: '11000',
      isDefault: false
    }
  ]);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      type: 'card',
      cardNumber: '**** **** **** 1234',
      cardType: 'Visa',
      expiryDate: '12/26',
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      cardNumber: '**** **** **** 5678',
      cardType: 'MasterCard',
      expiryDate: '08/27',
      isDefault: false
    }
  ]);

  const [notifications, setNotifications] = useState<NotificationSettings>({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    sms: false
  });

  const orders: Order[] = [
    {
      id: 'ORD-2025-001',
      date: '2025-05-20',
      status: 'delivered',
      total: 89990,
      items: 3,
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-2025-002',
      date: '2025-05-25',
      status: 'processing',
      total: 25990,
      items: 2,
      trackingNumber: 'TRK987654321'
    },
    {
      id: 'ORD-2025-003',
      date: '2025-05-28',
      status: 'shipped',
      total: 15990,
      items: 1,
      trackingNumber: 'TRK456789123'
    }
  ];

  const getStatusColor = (status: Order['status']): string => {
    switch (status) {
      case 'delivered': return 'text-green-400 bg-green-500/20';
      case 'shipped': return 'text-blue-400 bg-blue-500/20';
      case 'processing': return 'text-orange-400 bg-orange-500/20';
      case 'cancelled': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusText = (status: Order['status']): string => {
    switch (status) {
      case 'delivered': return 'Dostavljeno';
      case 'shipped': return 'Poslato';
      case 'processing': return 'U obradi';
      case 'cancelled': return 'Otkazano';
      default: return 'Nepoznato';
    }
  };

  const handleUserInfoChange = (field: keyof UserInfo, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const deleteAddress = (id: number) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const deletePaymentMethod = (id: number) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
  };

  const updateNotificationSettings = (setting: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [setting]: value }));
  };

  const tabs = [
    { id: 'profile' as TabId, label: 'Profil', icon: User },
    { id: 'orders' as TabId, label: 'Porudžbine', icon: Package },
    { id: 'addresses' as TabId, label: 'Adrese', icon: MapPin },
    { id: 'payments' as TabId, label: 'Plaćanja', icon: CreditCard },
    { id: 'settings' as TabId, label: 'Podešavanja', icon: Settings }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Informacije o profilu</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
          <span>{isEditing ? 'Sačuvaj' : 'Uredi'}</span>
        </button>
      </div>

      <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Ime</label>
            <input
              type="text"
              value={userInfo.firstName}
              disabled={!isEditing}
              onChange={(e) => handleUserInfoChange('firstName', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Prezime</label>
            <input
              type="text"
              value={userInfo.lastName}
              disabled={!isEditing}
              onChange={(e) => handleUserInfoChange('lastName', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={userInfo.email}
              disabled={!isEditing}
              onChange={(e) => handleUserInfoChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Telefon</label>
            <input
              type="tel"
              value={userInfo.phone}
              disabled={!isEditing}
              onChange={(e) => handleUserInfoChange('phone', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Datum rođenja</label>
            <input
              type="date"
              value={userInfo.dateOfBirth}
              disabled={!isEditing}
              onChange={(e) => handleUserInfoChange('dateOfBirth', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Pol</label>
            <select
              value={userInfo.gender}
              disabled={!isEditing}
              onChange={(e) => handleUserInfoChange('gender', e.target.value as UserInfo['gender'])}
              className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none disabled:opacity-50"
            >
              <option value="male">Muški</option>
              <option value="female">Ženski</option>
              <option value="other">Ostalo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-bold mb-4">Promeni lozinku</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Trenutna lozinka</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none pr-12"
                placeholder="Unesite trenutnu lozinku"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Nova lozinka</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
              placeholder="Unesite novu lozinku"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Potvrdi novu lozinku</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
              placeholder="Potvrdite novu lozinku"
            />
          </div>
          <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium transition-colors">
            Promeni lozinku
          </button>
        </div>
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Moje porudžbine</h2>
      
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">#{order.id}</h3>
                <p className="text-gray-400 flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(order.date).toLocaleDateString('sr-RS')}
                </p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-gray-400 text-sm">Ukupno</p>
                <p className="text-xl font-bold text-orange-400">{order.total.toLocaleString()} RSD</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Broj stavki</p>
                <p className="text-lg font-medium">{order.items} stavki</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Broj za praćenje</p>
                <p className="text-lg font-medium">{order.trackingNumber}</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors">
                <Eye className="w-4 h-4" />
                <span>Detalji</span>
              </button>
              {order.status === 'delivered' && (
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-600 hover:bg-gray-700/30 rounded-lg transition-colors">
                  <Star className="w-4 h-4" />
                  <span>Oceni</span>
                </button>
              )}
              {order.status === 'shipped' && (
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-600 hover:bg-gray-700/30 rounded-lg transition-colors">
                  <Truck className="w-4 h-4" />
                  <span>Prati</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAddressesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Moje adrese</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span>Dodaj novu adresu</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map(address => (
          <div key={address.id} className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{address.name}</h3>
              {address.isDefault && (
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-sm font-medium rounded-full">
                  Glavna
                </span>
              )}
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-gray-300">{address.street}</p>
              <p className="text-gray-300">{address.city}, {address.postalCode}</p>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 py-2 border border-gray-600 hover:bg-gray-700/30 rounded-lg transition-colors">
                Uredi
              </button>
              <button 
                onClick={() => deleteAddress(address.id)}
                className="flex-1 py-2 text-red-400 border border-red-500/30 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                Obriši
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Načini plaćanja</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span>Dodaj karticu</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map(method => (
          <div key={method.id} className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-8 h-8 text-orange-400" />
                <div>
                  <h3 className="text-lg font-bold">{method.cardType}</h3>
                  <p className="text-gray-400">{method.cardNumber}</p>
                </div>
              </div>
              {method.isDefault && (
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-sm font-medium rounded-full">
                  Glavna
                </span>
              )}
            </div>
            
            <div className="mb-4">
              <p className="text-gray-400 text-sm">Ističe</p>
              <p className="text-lg font-medium">{method.expiryDate}</p>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 py-2 border border-gray-600 hover:bg-gray-700/30 rounded-lg transition-colors">
                Uredi
              </button>
              <button 
                onClick={() => deletePaymentMethod(method.id)}
                className="px-4 py-2 text-red-400 border border-red-500/30 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Podešavanja</h2>
      
      {/* Notifications */}
      <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Obaveštenja
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Ažuriranja porudžbina</p>
              <p className="text-gray-400 text-sm">Obaveštenja o statusu vaših porudžbina</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.orderUpdates}
                onChange={(e) => updateNotificationSettings('orderUpdates', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Promocije i ponude</p>
              <p className="text-gray-400 text-sm">Posebni popusti i akcije</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.promotions}
                onChange={(e) => updateNotificationSettings('promotions', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Newsletter</p>
              <p className="text-gray-400 text-sm">Mesečni bilteni sa novostima</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.newsletter}
                onChange={(e) => updateNotificationSettings('newsletter', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS obaveštenja</p>
              <p className="text-gray-400 text-sm">Tekstualna obaveštenja na telefon</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => updateNotificationSettings('sms', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Privatnost i bezbednost
        </h3>
        <div className="space-y-4">
          <button className="w-full text-left p-4 border border-gray-600 hover:bg-gray-700/30 rounded-lg transition-colors">
            <p className="font-medium">Preuzmi moje podatke</p>
            <p className="text-gray-400 text-sm">Preuzmite kopiju svih vaših podataka</p>
          </button>
          
          <button className="w-full text-left p-4 border border-red-500/30 hover:bg-red-500/10 rounded-lg transition-colors">
            <p className="font-medium text-red-400">Obriši nalog</p>
            <p className="text-gray-400 text-sm">Trajno obriši vaš nalog i sve podatke</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'orders':
        return renderOrdersTab();
      case 'addresses':
        return renderAddressesTab();
      case 'payments':
        return renderPaymentsTab();
      case 'settings':
        return renderSettingsTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Moj nalog</h1>
          <p className="text-gray-300">Upravljajte svojim profilom i podešavanjima</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
              <div className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-300 hover:bg-gray-700/50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {renderActiveTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;