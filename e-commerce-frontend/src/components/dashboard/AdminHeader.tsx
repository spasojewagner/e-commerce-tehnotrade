import React, { useMemo } from 'react';
import { Package, Search, Bell, User } from 'lucide-react';
import { useAdminStore } from './../../store/useAdminStore';

interface AdminHeaderProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  sidebarCollapsed,
  setSidebarCollapsed
}) => {
  const { orders, clearError,  } = useAdminStore();

  const newOrders = useMemo(() => 
    orders.filter(order => order.status === 'pending').length,
    [orders]
  );

  

  return (
    <header className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700/50 p-6 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-700/30 transition-colors mr-4"
          >
            <Package className="w-5 h-5" />
          </button>
          <span className="text-2xl font-bold text-orange-400">Dashboard</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Pretraži..."
              className="bg-gray-700/30 border border-gray-600/50 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-orange-500/50 focus:bg-gray-700/50 transition-all"
            />
          </div>
          
          {/* <button 
            onClick={handleRefresh}
            className="relative p-2 rounded-xl hover:bg-gray-700/30 transition-colors"
            title="Osvježi podatke"
          >
            <Bell className="w-5 h-5" />
            {newOrders > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></span>
            )}
          </button>
           */}
          <button className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-700/30 transition-colors">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;