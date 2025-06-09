// components/ProtectedRoute.tsx
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

interface ProtectedRouteProps {
  roles?: string[]; // ako je undefined - samo login zaštita
  children?: React.ReactNode; // za kompatibilnost sa postojećim kodom
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles, children }) => {
  const { user, isInitialized, isLoading, isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) {
      checkAuth();
    }
  }, [isInitialized, checkAuth]);

  // Loading state
  if (isLoading || !isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Učitavanje...</p>
        </div>
      </div>
    );
  }

  // Ako nije ulogovan
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Ako su definisane uloge i korisnik nema odgovarajuću ulogu
  if (roles && user && !roles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-center bg-red-500/10 border border-red-500/20 rounded-xl p-8 max-w-md">
          <div className="text-red-400 text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-white mb-2">Pristup odbijen</h2>
          <p className="text-gray-300 mb-4">
            Nemate dozvolu za pristup ovoj stranici.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Nazad
          </button>
        </div>
      </div>
    );
  }

  // Sve je u redu - prikaži sadržaj
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;