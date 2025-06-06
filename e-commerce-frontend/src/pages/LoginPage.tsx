import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  surname: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  terms: boolean;
}

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    surname: '',
    phone: '',
    dateOfBirth: '',
    gender: 'muški',
    terms: false
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();
  const { login, register, isLoading, error, clearError, isAuthenticated } = useAuthStore();

  // Redirektuj ako je korisnik već prijavljen
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Očisti grešku kada se promeni tip forme
  useEffect(() => {
    clearError();
    setValidationErrors({});
  }, [isLogin, clearError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));

    // Ukloni grešku validacije za to polje kada korisnik počne da kuca
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Email validacija
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = 'Email je obavezan';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Neispravna email adresa';
    }

    // Password validacija
    if (!formData.password) {
      errors.password = 'Lozinka je obavezna';
    } else if (formData.password.length < 6) {
      errors.password = 'Lozinka mora imati najmanje 6 karaktera';
    }

    // Registracija validacije
    if (!isLogin) {
      if (!formData.name.trim()) {
        errors.name = 'Ime je obavezno';
      }

      if (!formData.surname.trim()) {
        errors.surname = 'Prezime je obavezno';
      }

      if (!formData.phone.trim()) {
        errors.phone = 'Telefon je obavezan';
      } else {
        const phoneRegex = /^[0-9+\-\s()]+$/;
        if (!phoneRegex.test(formData.phone)) {
          errors.phone = 'Neispravna format telefona';
        }
      }

      if (!formData.gender) {
        errors.gender = 'Pol je obavezan';
      }

      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Potvrda lozinke je obavezna';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Lozinke se ne poklapaju';
      }

      if (!formData.terms) {
        errors.terms = 'Morate prihvatiti uslove korišćenja';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        await register({
          email: formData.email,
          name: formData.name,
          surname: formData.surname,
          phone: formData.phone,
          password: formData.password,
          gender: formData.gender,
          terms: formData.terms,
          dateOfBirth: formData.dateOfBirth || undefined,
        });
      }
      
      // Navigacija će se desiti automatski kroz useEffect kada se isAuthenticated promeni
    } catch (err) {
      // Greška je već postavljena u store-u
      console.error('Form submission error:', err);
    }
  };

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      surname: '',
      phone: '',
      dateOfBirth: '',
      gender: 'muški',
      terms: false
    });
  };

  return (
    // KLJUČNA IZMENA: Dodao sam fixed pozicioniranje da prekrije ceo ekran
    <div className="fixed inset-0 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white z-50 overflow-y-auto">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl animate-ping"></div>
      </div>

      {/* Back Button */}
      <div className="absolute top-8 left-8 z-10">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-gray-400 hover:text-orange-400 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Nazad na početnu</span>
        </Link>
      </div>

      {/* KLJUČNA IZMENA: Dodao sam relative pozicioniranje i min-h-screen da se sadržaj pozicionira pravilno */}
      <div className="relative flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="text-4xl font-black bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent inline-block mb-4">
              TEHNO<span className="text-white">TRADE</span>
            </Link>
            <h1 className="text-3xl font-bold mb-2">
              {isLogin ? 'Dobrodošli nazad!' : 'Kreirajte nalog'}
            </h1>
            <p className="text-gray-400">
              {isLogin 
                ? 'Prijavite se u svoj nalog za pristup ekskluzivnim ponudama' 
                : 'Registrujte se i uživajte u našim pogodnostima'}
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-gray-800/30 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-8 shadow-2xl">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            {/* Toggle Buttons */}
            <div className="flex bg-gray-800/50 rounded-xl p-1 mb-8">
              <button
                type="button"
                onClick={handleToggleForm}
                disabled={isLoading}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  isLogin 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Prijava
              </button>
              <button
                type="button"
                onClick={handleToggleForm}
                disabled={isLoading}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  !isLogin 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Registracija
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Registration Fields */}
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Ime</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full py-4 px-12 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 ${
                            validationErrors.name ? 'border-red-500' : 'border-gray-700'
                          }`}
                          placeholder="Marko"
                          disabled={isLoading}
                        />
                      </div>
                      {validationErrors.name && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors.name}</p>
                      )}
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Prezime</label>
                      <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleInputChange}
                        className={`w-full py-4 px-4 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 ${
                          validationErrors.surname ? 'border-red-500' : 'border-gray-700'
                        }`}
                        placeholder="Petrović"
                        disabled={isLoading}
                      />
                      {validationErrors.surname && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors.surname}</p>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Telefon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full py-4 px-4 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 ${
                        validationErrors.phone ? 'border-red-500' : 'border-gray-700'
                      }`}
                      placeholder="+381 64 123 4567"
                      disabled={isLoading}
                    />
                    {validationErrors.phone && (
                      <p className="text-red-400 text-xs mt-1">{validationErrors.phone}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Datum rođenja</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full py-4 px-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white transition-all duration-300"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Pol</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={`w-full py-4 px-4 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white transition-all duration-300 ${
                          validationErrors.gender ? 'border-red-500' : 'border-gray-700'
                        }`}
                        disabled={isLoading}
                      >
                        <option value="muški">Muški</option>
                        <option value="ženski">Ženski</option>
                        <option value="ostalo">Ostalo</option>
                      </select>
                      {validationErrors.gender && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors.gender}</p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Email Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">Email adresa</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full py-4 px-12 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 ${
                      validationErrors.email ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="marko.petrovic@email.com"
                    disabled={isLoading}
                  />
                </div>
                {validationErrors.email && (
                  <p className="text-red-400 text-xs mt-1">{validationErrors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">Lozinka</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full py-4 px-12 pr-12 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 ${
                      validationErrors.password ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-red-400 text-xs mt-1">{validationErrors.password}</p>
                )}
              </div>

              {/* Confirm Password (Only for Registration) */}
              {!isLogin && (
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Potvrdite lozinku</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full py-4 px-12 pr-12 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 ${
                        validationErrors.confirmPassword ? 'border-red-500' : 'border-gray-700'
                      }`}
                      placeholder="••••••••"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {validationErrors.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1">{validationErrors.confirmPassword}</p>
                  )}
                </div>
              )}

              {/* Terms Agreement (Only for Registration) */}
              {!isLogin && (
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
                    disabled={isLoading}
                  />
                  <label className="text-sm text-gray-300">
                    Slažem se sa{' '}
                    <Link to="/uslovi-koriscenja-i-prodaje" className="text-orange-400 hover:text-orange-300 underline">
                      uslovima korišćenja
                    </Link>{' '}
                    i{' '}
                    <Link to="/zastita-privatnosti" className="text-orange-400 hover:text-orange-300 underline">
                      politikom privatnosti
                    </Link>
                  </label>
                </div>
              )}
              {validationErrors.terms && (
                <p className="text-red-400 text-xs">{validationErrors.terms}</p>
              )}

              {/* Forgot Password (Only for Login) */}
              {isLogin && (
                <div className="text-right">
                  <Link to="/forgot-password" className="text-sm text-orange-400 hover:text-orange-300 transition-colors">
                    Zaboravili ste lozinku?
                  </Link>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-orange-500 to-orange-600 py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-orange-500/25 transform hover:scale-[1.02] ${
                  isLoading ? 'opacity-50 cursor-not-allowed transform-none' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>{isLogin ? 'Prijavljivanje...' : 'Kreiranje naloga...'}</span>
                  </div>
                ) : (
                  isLogin ? 'Prijavite se' : 'Kreirajte nalog'
                )}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800/30 text-gray-400">ili se prijavite sa</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button 
                  type="button"
                  disabled={isLoading}
                  className={`w-full inline-flex justify-center py-3 px-4 border border-gray-700 rounded-xl bg-gray-800/50 text-sm font-medium text-white hover:bg-gray-700/50 transition-all duration-300 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="mr-2">🔍</span>
                  Google
                </button>
                <button 
                  type="button"
                  disabled={isLoading}
                  className={`w-full inline-flex justify-center py-3 px-4 border border-gray-700 rounded-xl bg-gray-800/50 text-sm font-medium text-white hover:bg-gray-700/50 transition-all duration-300 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="mr-2">📘</span>
                  Facebook
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-400">
              {isLogin ? (
                <p>
                  Nemate nalog?{' '}
                  <button
                    type="button"
                    onClick={handleToggleForm}
                    disabled={isLoading}
                    className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
                  >
                    Registrujte se
                  </button>
                </p>
              ) : (
                <p>
                  Već imate nalog?{' '}
                  <button
                    type="button"
                    onClick={handleToggleForm}
                    disabled={isLoading}
                    className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
                  >
                    Prijavite se
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;