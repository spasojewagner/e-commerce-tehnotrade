// AdminPanelAnalitika.tsx
import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, ShoppingCart, DollarSign, Calendar } from 'lucide-react';

const AdminPanelAnalitika: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7days');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Analitika</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-gray-700/30 border border-gray-600/50 rounded-xl px-4 py-2 focus:outline-none focus:border-orange-500/50"
        >
          <option value="7days">Poslednih 7 dana</option>
          <option value="30days">Poslednih 30 dana</option>
          <option value="90days">Poslednja 3 meseca</option>
          <option value="1year">Poslednja godina</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-sm text-green-400">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">2,543</h3>
          <p className="text-gray-400">Posetilaca</p>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <ShoppingCart className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-sm text-green-400">+8%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">186</h3>
          <p className="text-gray-400">Konverzija</p>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <DollarSign className="w-6 h-6 text-orange-400" />
            </div>
            <span className="text-sm text-green-400">+23%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">89,240</h3>
          <p className="text-gray-400">Prihod (RSD)</p>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-sm text-green-400">+15%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">4.2%</h3>
          <p className="text-gray-400">Stopa rasta</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <h2 className="text-xl font-bold text-white mb-4">Prodaja po danima</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <BarChart3 className="w-16 h-16 opacity-50" />
            <span className="ml-4">Grafik se učitava...</span>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <h2 className="text-xl font-bold text-white mb-4">Top proizvodi</h2>
          <div className="space-y-4">
            {[
              { name: 'Proizvod A', sales: 125, percentage: 85 },
              { name: 'Proizvod B', sales: 98, percentage: 65 },
              { name: 'Proizvod C', sales: 76, percentage: 45 },
              { name: 'Proizvod D', sales: 52, percentage: 35 }
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{product.name}</p>
                  <p className="text-sm text-gray-400">{product.sales} prodaja</p>
                </div>
                <div className="w-24 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full" 
                    style={{ width: `${product.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminPanelAnalitika;