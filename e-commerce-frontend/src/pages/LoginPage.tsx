// Dodaj ovo u svoje App.tsx routes:
// <Route path="/login" element={<LoginPage />} />

// LoginPage.tsx - kreiraj kao zasebnu komponentu
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    gender: 'muški',
    agreeToTerms: false
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ovde bi bila logika za login/register
    console.log('Form submitted:', formData);
    // Redirect to home after successful login/register
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
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

      <div className="flex items-center justify-center min-h-screen px-4 py-12">
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
            {/* Toggle Buttons */}
            <div className="flex bg-gray-800/50 rounded-xl p-1 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  isLogin 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Prijava
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  !isLogin 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
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
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full py-4 px-12 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                          placeholder="Marko"
                          required
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Prezime</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full py-4 px-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                        placeholder="Petrović"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Telefon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full py-4 px-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                      placeholder="+381 64 123 4567"
                      required
                    />
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
                        required
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Pol</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full py-4 px-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white transition-all duration-300"
                      >
                        <option value="muški">Muški</option>
                        <option value="ženski">Ženski</option>
                        <option value="ostalo">Ostalo</option>
                      </select>
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
                    className="w-full py-4 px-12 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="marko.petrovic@email.com"
                    required
                  />
                </div>
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
                    className="w-full py-4 px-12 pr-12 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
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
                      className="w-full py-4 px-12 pr-12 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Terms Agreement (Only for Registration) */}
              {!isLogin && (
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
                    required
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
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-orange-500/25 transform hover:scale-[1.02]"
              >
                {isLogin ? 'Prijavite se' : 'Kreirajte nalog'}
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
                <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-700 rounded-xl bg-gray-800/50 text-sm font-medium text-white hover:bg-gray-700/50 transition-all duration-300">
                  <span className="mr-2">🔍</span>
                  Google
                </button>
                <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-700 rounded-xl bg-gray-800/50 text-sm font-medium text-white hover:bg-gray-700/50 transition-all duration-300">
                  <span className="mr-2">📘</span>
                  Facebook
                </button>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-8 text-gray-400">
            <p className="text-sm">
              Registracijom prihvatate naše{' '}
              <Link to="/uslovi-koriscenja-i-prodaje" className="text-orange-400 hover:text-orange-300">
                uslove korišćenja
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;