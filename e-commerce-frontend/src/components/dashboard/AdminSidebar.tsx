import React, { useMemo } from 'react';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Star, 
  BarChart3, 
  Settings, 
  Users, 
  CreditCard, 
  TrendingUp,
  Bell
} from 'lucide-react';
import { useAdminStore } from './../../store/useAdminStore';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  isActive?: boolean;
}

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeSection,
  setActiveSection,
  sidebarCollapsed,
  setSidebarCollapsed
}) => {
  const { orders } = useAdminStore();

  const newOrders = useMemo(() => 
    orders.filter(order => order.status === 'pending').length,
    [orders]
  );

  const sidebarItems: SidebarItem[] = useMemo(() => [
    { id: 'dashboard', label: 'Početna', icon: <Home className="w-5 h-5" />, isActive: activeSection === 'dashboard' },
    { id: 'orders', label: 'Narudžbine', icon: <ShoppingCart className="w-5 h-5" />, badge: newOrders },
    { id: 'customers', label: 'Kupci', icon: <Users className="w-5 h-5" /> },
    { id: 'products-mgmt', label: 'Proizvodi', icon: <Package className="w-5 h-5" /> },
    { id: 'reports', label: 'Izveštaji', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analitika', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'payments', label: 'Plaćanja', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'marketing', label: 'Marketing', icon: <Bell className="w-5 h-5" /> },
    { id: 'reviews', label: 'Recenzije', icon: <Star className="w-5 h-5" /> },
    { id: 'settings', label: 'Podešavanja', icon: <Settings className="w-5 h-5" /> }
  ], [activeSection, newOrders]);

  return (
    <div className={`absolute left-0 h-full bg-gray-800/30 backdrop-blur-sm border-r border-gray-700/50 transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'} z-50`}>
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          {!sidebarCollapsed && (
            <h1 className="text-xl font-bold text-orange-400">Admin Panel</h1>
          )}
        </div>
        
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                item.isActive || activeSection === item.id
                  ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 text-orange-400' 
                  : 'hover:bg-gray-700/30 text-gray-300 hover:text-orange-400'
              }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="bg-orange-500 text-black text-xs px-2 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;