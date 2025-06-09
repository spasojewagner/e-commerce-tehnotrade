import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  FileText,
  PieChart,
  Activity
} from 'lucide-react';
import { useAdminStore } from './../../store/useAdminStore';

const AdminPanelIzvestaji: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [reportType, setReportType] = useState('overview');

  const { orders, users, ordersLoading } = useAdminStore();

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const completedOrders = orders.filter(order => order.status === 'completed').length;
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    

    return {
      totalRevenue,
      totalOrders: orders.length,
      completedOrders,
      pendingOrders,
      totalUsers: users.length,
      averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0
    };
  }, [orders, users]);

  const monthlyData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'];
    return months.map(month => ({
      month,
      revenue: Math.floor(Math.random() * 500000) + 200000,
      orders: Math.floor(Math.random() * 50) + 20
    }));
  }, []);

  const ReportCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    change: string;
    color: string;
  }> = ({ title, value, icon, change, color }) => (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 ${color} rounded-xl`}>
          {icon}
        </div>
        <span className="text-sm text-green-400">{change}</span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </h3>
      <p className="text-gray-400">{title}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-orange-400" />
            Izveštaji
          </h1>
          <p className="text-gray-400 mt-1">
            Analiza prodaje i performansi
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-gray-700/30 border border-gray-600/50 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-orange-500/50"
          >
            <option value="week">Poslednja nedelja</option>
            <option value="month">Poslednji mesec</option>
            <option value="quarter">Poslednji kvartal</option>
            <option value="year">Poslednja godina</option>
          </select>
          
          <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-xl transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Izvezi</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <ReportCard
          title="Ukupni prihod"
          value={`${stats.totalRevenue.toLocaleString()} RSD`}
          icon={<DollarSign className="w-6 h-6 text-green-400" />}
          change="+12.5%"
          color="bg-green-500/20"
        />
        
        <ReportCard
          title="Ukupno narudžbina"
          value={stats.totalOrders}
          icon={<ShoppingCart className="w-6 h-6 text-blue-400" />}
          change="+8.2%"
          color="bg-blue-500/20"
        />
{/*         
        <ReportCard
          title="Aktivni korisnici"
        //   value={stats.activeUsers}
          icon={<Users className="w-6 h-6 text-purple-400" />}
          change="+15.3%"
          color="bg-purple-500/20"
        /> */}
        
        <ReportCard
          title="Prosečna vrednost"
          value={`${stats.averageOrderValue.toLocaleString()} RSD`}
          icon={<TrendingUp className="w-6 h-6 text-orange-400" />}
          change="+5.7%"
          color="bg-orange-500/20"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Mesečni prihod</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Prihod</span>
            </div>
          </div>
          
          <div className="relative h-64">
            <div className="absolute inset-0 flex items-end justify-between space-x-2">
              {monthlyData.slice(0, 8).map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg"
                    style={{ height: `${(data.revenue / 700000) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-400 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <h2 className="text-xl font-bold text-white mb-6">Status narudžbina</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">Završene</span>
              </div>
              <span className="text-white font-semibold">{stats.completedOrders}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-gray-300">Na čekanju</span>
              </div>
              <span className="text-white font-semibold">{stats.pendingOrders}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-gray-300">U obradi</span>
              </div>
              <span className="text-white font-semibold">
                {stats.totalOrders - stats.completedOrders - stats.pendingOrders}
              </span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-700/30 rounded-xl">
            <div className="flex items-center space-x-3">
              <Activity className="w-5 h-5 text-orange-400" />
              <div>
                <p className="text-sm text-gray-300">Stopa konverzije</p>
                <p className="text-lg font-bold text-white">
                  {stats.totalOrders > 0 ? ((stats.completedOrders / stats.totalOrders) * 100).toFixed(1) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Detaljni izveštaji</h2>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="bg-gray-700/30 border border-gray-600/50 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-orange-500/50"
          >
            <option value="overview">Pregled</option>
            <option value="sales">Prodaja</option>
            <option value="customers">Kupci</option>
            <option value="products">Proizvodi</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors text-left">
            <div className="flex items-center space-x-3 mb-3">
              <FileText className="w-6 h-6 text-orange-400" />
              <span className="font-semibold text-white">Mesečni izveštaj</span>
            </div>
            <p className="text-sm text-gray-400">
              Kompletna analiza za {selectedPeriod === 'month' ? 'poslednji mesec' : 'izabrani period'}
            </p>
          </button>
          
          <button className="p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors text-left">
            <div className="flex items-center space-x-3 mb-3">
              <PieChart className="w-6 h-6 text-blue-400" />
              <span className="font-semibold text-white">Analiza proizvoda</span>
            </div>
            <p className="text-sm text-gray-400">
              Najtraženiji proizvodi i kategorije
            </p>
          </button>
          
          <button className="p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors text-left">
            <div className="flex items-center space-x-3 mb-3">
              <Users className="w-6 h-6 text-purple-400" />
              <span className="font-semibold text-white">Analiza kupaca</span>
            </div>
            <p className="text-sm text-gray-400">
              Demografija i ponašanje kupaca
            </p>
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-bold text-white mb-6">Ključni pokazatelji</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="p-4 bg-gray-700/30 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">ROI</span>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">24.5%</p>
          </div>
          
          <div className="p-4 bg-gray-700/30 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Zadržavanje kupaca</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">68%</p>
          </div>
          
          <div className="p-4 bg-gray-700/30 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Prosečno vreme na sajtu</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">4:32</p>
          </div>
          
          <div className="p-4 bg-gray-700/30 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Stopa napuštanja</span>
              <Package className="w-4 h-4 text-orange-400" />
            </div>
            <p className="text-2xl font-bold text-white">12.3%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelIzvestaji;