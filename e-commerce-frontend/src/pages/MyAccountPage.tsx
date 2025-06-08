import React, { useState, useEffect } from 'react';
import { User, Settings, Package, Heart, MapPin, CreditCard, Bell, Shield, Edit, Eye, EyeOff, Star, Calendar, Truck, Plus, Trash2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore'; // Adjust path as needed
import OrdersPage from './OrdersPage'; // Import the OrdersPage component

// Type definitions
interface Address {
  id: number;
  type: 'home' | 'work' | 'other';
  name: string;
  street: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
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

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
}

type TabId = 'profile' | 'orders' | 'addresses' | 'payments' | 'settings';

const MyAccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Zustand store
  const { 
    user, 
    isLoading, 
    error, 
    updateProfile, 
    getProfile, 
    clearError 
  } = useAuthStore();

  // Local state for form data
  const [userFormData, setUserFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'male' as 'male' | 'female' | 'other'
  });

  // Mock data for features not yet implemented in backend
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

  // Validation functions
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!userFormData.name.trim()) {
      errors.name = 'Ime je obavezno polje';
    }
    
    if (!userFormData.surname.trim()) {
      errors.surname = 'Prezime je obavezno polje';
    }
    
    if (!userFormData.email.trim()) {
      errors.email = 'Email je obavezno polje';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userFormData.email)) {
      errors.email = 'Unesite validan email';
    }
    
    if (!userFormData.phone.trim()) {
      errors.phone = 'Telefon je obavezno polje';
    } else if (!/^[0-9+\-\s()]+$/.test(userFormData.phone)) {
      errors.phone = 'Unesite validan broj telefona';
    }
    
    if (userFormData.dateOfBirth && !isValidDate(userFormData.dateOfBirth)) {
      errors.dateOfBirth = 'Unesite validan datum rođenja';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidDate = (dateString: string): boolean => {
    if (!dateString) return true; // Optional field
    
    try {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(dateString)) return false;
      
      const [year, month, day] = dateString.split('-').map(Number);
      if (!year || !month || !day || month < 1 || month > 12 || day < 1 || day > 31) {
        return false;
      }
      
      const inputDate = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      
      return inputDate <= today;
    } catch {
      return false;
    }
  };

  // Helper function to format date for HTML input (yyyy-MM-dd)
  const formatDateForInput = (dateValue: string | Date | null | undefined): string => {
    if (!dateValue) return '';
    
    try {
      let date: Date;
      
      if (dateValue instanceof Date) {
        date = dateValue;
      } else if (typeof dateValue === 'string') {
        // Handle both ISO strings and date-only strings
        date = new Date(dateValue);
      } else {
        return '';
      }
      
      if (isNaN(date.getTime())) return '';
      
      // Get the date in local timezone to avoid timezone issues
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Error formatting date for input:', error);
      return '';
    }
  };

  // Helper function to format date for backend (yyyy-MM-dd or null)
  const formatDateForBackend = (dateString: string): string | null => {
    if (!dateString) return null;
    
    try {
      // Validate the date string format (should be yyyy-MM-dd from HTML input)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(dateString)) {
        console.error('Invalid date format:', dateString);
        return null;
      }
      
      // Parse the date components to avoid timezone issues
      const [year, month, day] = dateString.split('-').map(Number);
      
      // Validate the date components
      if (!year || !month || !day || month < 1 || month > 12 || day < 1 || day > 31) {
        console.error('Invalid date components:', { year, month, day });
        return null;
      }
      
      // Create date object in local timezone for comparison
      const inputDate = new Date(year, month - 1, day); // month is 0-indexed
      const today = new Date();
      today.setHours(23, 59, 59, 999); // Set to end of today for comparison
      
      if (inputDate > today) {
        console.error('Date cannot be in the future:', dateString);
        return null;
      }
      
      // Return the date string as-is since HTML date input gives us yyyy-MM-dd format
      return dateString;
    } catch (error) {
      console.error('Error formatting date for backend:', error);
      return null;
    }
  };

  // Initialize form data when user data is loaded
  useEffect(() => {
    if (user) {
      setUserFormData({
        name: user.name || '',
        surname: user.surname || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: formatDateForInput(user.dateOfBirth),
        gender: (user.gender as 'male' | 'female' | 'other') || 'male'
      });
      // Clear any previous errors when user data loads
      setFormErrors({});
    }
  }, [user]);

  // Load user profile on component mount
  useEffect(() => {
    if (!user) {
      getProfile().catch(console.error);
    }
  }, []);

  // Clear errors when component unmounts or tab changes
  useEffect(() => {
    clearError();
    setFormErrors({});
  }, [activeTab, clearError]);

  const handleUserInfoChange = (field: keyof typeof userFormData, value: string) => {
    setUserFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific field error when user starts typing
    if (formErrors[field as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSaveProfile = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    try {
      // Prepare the data for backend with proper date formatting
      const updateData = {
        name: userFormData.name.trim(),
        surname: userFormData.surname.trim(),
        email: userFormData.email.trim(),
        phone: userFormData.phone.trim(),
        dateOfBirth: formatDateForBackend(userFormData.dateOfBirth),
        gender: userFormData.gender
      };

      console.log('Sending update data:', updateData); // Debug log

      await updateProfile(updateData);
      setIsEditing(false);
      setFormErrors({});
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancelEdit = () => {
    // Reset form data to original user data
    if (user) {
      setUserFormData({
        name: user.name || '',
        surname: user.surname || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: formatDateForInput(user.dateOfBirth),
        gender: (user.gender as 'male' | 'female' | 'other') || 'male'
      });
    }
    setIsEditing(false);
    setFormErrors({});
    clearError();
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Nova lozinka i potvrda se ne poklapaju');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('Nova lozinka mora imati najmanje 6 karaktera');
      return;
    }

    try {
      await updateProfile({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      alert('Lozinka je uspešno promenjena');
    } catch (error) {
      console.error('Failed to change password:', error);
    }
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
        <div className="flex space-x-3">
          {isEditing && (
            <button
              onClick={handleCancelEdit}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-600 hover:bg-gray-700/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <span>Otkaži</span>
            </button>
          )}
          <button
            onClick={handleSaveProfile}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>{isLoading ? 'Čuva...' : isEditing ? 'Sačuvaj' : 'Uredi'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-400">
          {error}
        </div>
      )}

      <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Ime <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={userFormData.name}
              disabled={!isEditing}
              onChange={(e) => handleUserInfoChange('name', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-700/30 border rounded-lg focus:border-orange-500 focus:outline-none disabled:opacity-50 ${
                formErrors.name ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Unesite vaše ime"
            />
            {formErrors.name && (
              <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Prezime <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={userFormData.surname}
              disabled={!isEditing}
              onChange={(e) => handleUserInfoChange('surname', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-700/30 border rounded-lg focus:border-orange-500 focus:outline-none disabled:opacity-50 ${
                formErrors.surname ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Unesite vaše prezime"
            />
            {formErrors.surname && (
              <p className="text-red-400 text-sm mt-1">{formErrors.surname}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={userFormData.email}
              disabled={!isEditing}
              onChange={(e) => handleUserInfoChange('email', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-700/30 border rounded-lg focus:border-orange-500 focus:outline-none disabled:opacity-50 ${
                formErrors.email ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Unesite vaš email"
            />
            {formErrors.email && (
              <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Telefon <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              value={userFormData.phone}
              disabled={!isEditing}
              onChange={(e) => handleUserInfoChange('phone', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-700/30 border rounded-lg focus:border-orange-500 focus:outline-none disabled:opacity-50 ${
                formErrors.phone ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Unesite vaš broj telefona"
            />
            {formErrors.phone && (
              <p className="text-red-400 text-sm mt-1">{formErrors.phone}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Datum rođenja</label>
            <input
              type="date"
              value={userFormData.dateOfBirth}
              disabled={!isEditing}
              onChange={(e) => handleUserInfoChange('dateOfBirth', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-700/30 border rounded-lg focus:border-orange-500 focus:outline-none disabled:opacity-50 ${
                formErrors.dateOfBirth ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            {formErrors.dateOfBirth && (
              <p className="text-red-400 text-sm mt-1">{formErrors.dateOfBirth}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Pol</label>
            <select
              value={userFormData.gender}
              disabled={!isEditing}
              onChange={(e) => handleUserInfoChange('gender', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none disabled:opacity-50"
            >
              <option value="male">Muški</option>
              <option value="female">Ženski</option>
              <option value="other">Ostalo</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-400">
          <span className="text-red-400">*</span> Obavezna polja
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
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
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
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
              placeholder="Unesite novu lozinku"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Potvrdi novu lozinku</label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
              placeholder="Potvrdite novu lozinku"
            />
          </div>
          <button 
            onClick={handlePasswordChange}
            disabled={isLoading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
          >
            {isLoading ? 'Menja...' : 'Promeni lozinku'}
          </button>
        </div>
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
      // Ispravno vraćamo OrdersPage
      return <OrdersPage />;

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