import React, { useMemo, useEffect, useState } from 'react';
import { 
  Users, 
  ShoppingCart, 
  TrendingUp,
  Plus,
  Eye,
  BarChart3,
  Settings
} from 'lucide-react';
import { useAdminStore } from './../../store/useAdminStore';
import StatCard from './StatsCard';
import OrderRow from './OrdeRow';

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  newOrders: number;
  pendingReviews: number;
}

const AdminPanelPocetna: React.FC = () => {
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  
  const {
    orders,
    ordersLoading,
    users,
    usersLoading,
    ordersPagination,
    usersPagination,
    getAllOrders,
    getAllUsers
  } = useAdminStore();

  // Početni load podataka - samo jednom
  useEffect(() => {
    if (!initialLoadComplete) {
      const loadInitialData = async () => {
        try {
          await Promise.all([
            getAllOrders(1, 6),
            getAllUsers(1, 10)
          ]);
        } catch (error) {
          console.error('Error loading initial data:', error);
        } finally {
          setInitialLoadComplete(true);
        }
      };

      loadInitialData();
    }
  }, [initialLoadComplete, getAllOrders, getAllUsers]);

  // Memoized računanje statistika
  const stats: DashboardStats = useMemo(() => ({
    totalUsers: usersPagination?.totalUsers || users.length,
    totalOrders: ordersPagination?.totalOrders || orders.length,
    totalCustomers: usersPagination?.totalUsers || users.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
    newOrders: orders.filter(order => order.status === 'pending').length,
    pendingReviews: 45
  }), [orders, users, ordersPagination, usersPagination]);

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users className="w-6 h-6" />}
          label="Ukupno korisnika"
          value={stats.totalUsers}
          iconBg="bg-blue-500/20"
          iconColor="text-blue-400"
          trend="+12%"
        />
        
        <StatCard
          icon={<ShoppingCart className="w-6 h-6" />}
          label="Ukupno narudžbina"
          value={stats.totalOrders}
          iconBg="bg-green-500/20"
          iconColor="text-green-400"
          trend="+8%"
        />
        
        <StatCard
          icon={<Users className="w-6 h-6" />}
          label="Ukupno kupaca"
          value={stats.totalCustomers}
          iconBg="bg-purple-500/20"
          iconColor="text-purple-400"
          trend="+15%"
        />
        
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="Ukupni prihod"
          value={stats.totalRevenue}
          suffix=" RSD"
          iconBg="bg-orange-500/20"
          iconColor="text-orange-400"
          trend="+23%"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Recent Orders - Takes up more space */}
        <div className="xl:col-span-3 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              Najnovije narudžbine
              {ordersLoading && <span className="text-sm text-gray-400 ml-2">(učitavam...)</span>}
            </h2>
            <button className="text-orange-400 hover:text-orange-300 transition-colors flex items-center space-x-1">
              <span>Vidi sve</span>
              <Eye className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {orders.length > 0 ? (
              orders.slice(0, 6).map((order) => (
                <OrderRow key={order._id} order={order} />
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-gray-400">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nema dostupnih narudžbina</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions and Notifications */}
        <div className="xl:col-span-1 space-y-6">
          {/* Quick Actions */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <h2 className="text-xl font-bold text-white mb-6">Brze akcije</h2>
            
            <div className="space-y-3">
              <button className="w-full p-3 bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl hover:from-orange-500/30 hover:to-orange-600/30 transition-all duration-300 group">
                <div className="flex items-center space-x-3">
                  <Plus className="w-5 h-5 text-orange-400" />
                  <span className="text-white group-hover:text-orange-400 transition-colors text-sm">Dodaj proizvod</span>
                </div>
              </button>
              
              <button className="w-full p-3 bg-gray-700/20 rounded-xl hover:bg-gray-700/30 transition-colors group">
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                  <span className="text-white group-hover:text-orange-400 transition-colors text-sm">Pregled narudžbina</span>
                </div>
              </button>
              
              <button className="w-full p-3 bg-gray-700/20 rounded-xl hover:bg-gray-700/30 transition-colors group">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                  <span className="text-white group-hover:text-orange-400 transition-colors text-sm">Generiši izveštaj</span>
                </div>
              </button>
              
              <button className="w-full p-3 bg-gray-700/20 rounded-xl hover:bg-gray-700/30 transition-colors group">
                <div className="flex items-center space-x-3">
                  <Settings className="w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                  <span className="text-white group-hover:text-orange-400 transition-colors text-sm">Podešavanja</span>
                </div>
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Obaveštenja</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-300">{stats.newOrders} novih narudžbina</span>
              </div>
              <div className="flex items-center space-x-3 text-sm p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-300">{stats.pendingReviews} recenzija čeka odobrenje</span>
              </div>
              <div className="flex items-center space-x-3 text-sm p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">Sistem radi stabilno</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanelPocetna;