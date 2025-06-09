import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminPanelPocetna from './AdminPanelPocetna';
import AdminPanelNarudzbine from './AdminPanelNarudzbine';
 import AdminPanelKupci from './AdminPanelKupci';
import AdminPanelIzvestaji from './AdminPanelIzvestaji';
import AdminPanelPodešavanja from './AdminPanelPodešavanja';
import AdminPanelProizvodi from './AdminPanelProizvodi';
import AdminPanelPlaćanja from './AdminPanelPlaćanja';
import AdminPanelAnalitika from './AdminPanelAnalitika';
import AdminPanelMarketing from './AdminPanelMarketing';
import { useAdminStore } from '../../store/useAdminStore';

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  
  const { 
    ordersLoading, 
    usersLoading, 
    ordersError, 
    usersError, 
    orders, 
    users, 
    clearError, 
    getAllOrders,
    getAllUsers
  } = useAdminStore();

  // Initial data load - samo jednom kada se komponenta mount-a
  useEffect(() => {
    const loadInitialData = async () => {
      if (!initialLoadComplete) {
        try {
          await Promise.all([
            getAllOrders(1, 6), // Load first page with 6 items
            getAllUsers(1, 10)  // Load first page with 10 items
          ]);
        } catch (error) {
          console.error('Error loading initial data:', error);
        } finally {
          setInitialLoadComplete(true);
        }
      }
    };

    loadInitialData();
  }, []); // Prazna dependency lista - izvršava se samo jednom

  // Manual refresh funkcija
  const handleRefresh = async () => {
    try {
      clearError();
      await Promise.all([
        getAllOrders(1, 6),
        getAllUsers(1, 10)
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  // Loading state - prikaži samo ako nema podataka
  if ((ordersLoading || usersLoading) && !initialLoadComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="text-center p-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Učitavam podatke...</p>
        </div>
      </div>
    );
  }

  // Error state - prikaži samo ako nema podataka i ima grešku
  if ((ordersError || usersError) && orders.length === 0 && users.length === 0 && initialLoadComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="text-center p-6">
          <div className="text-red-500 mb-4">
            <Package className="w-12 h-12 mx-auto mb-2" />
            <p>{ordersError || usersError}</p>
          </div>
          <button 
            onClick={handleRefresh}
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors"
          >
            Pokušaj ponovo
          </button>
        </div>
      </div>
    );
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminPanelPocetna />;
      case 'orders':
        return <AdminPanelNarudzbine />;
      case 'customers':
        return <AdminPanelKupci />;
      case 'reports':
        return <AdminPanelIzvestaji />;
      case 'settings':
        return <AdminPanelPodešavanja />;
      case 'products-mgmt':
        return <AdminPanelProizvodi />;
      case 'payments':
        return <AdminPanelPlaćanja />;
      case 'analytics':
        return <AdminPanelAnalitika />;
      case 'marketing':
        return <AdminPanelMarketing />;
      default:
        return <AdminPanelPocetna />;
    }
  };

  return (
    <div className="min-h-screen flex relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      <div className={`flex-1 ${sidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <AdminHeader
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />

        <main className="p-6 pt-24 max-w-full">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;