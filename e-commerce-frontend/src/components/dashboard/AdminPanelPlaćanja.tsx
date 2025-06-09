// AdminPanelPlaćanja.tsx
import React, { useState } from 'react';
import { CreditCard, DollarSign, TrendingUp, CheckCircle, XCircle, Clock } from 'lucide-react';

const AdminPanelPlaćanja: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const payments = [
    { id: 1, orderId: '#12345', customer: 'Marko Petrović', amount: 15000, status: 'completed', method: 'card', date: '2024-01-15' },
    { id: 2, orderId: '#12346', customer: 'Ana Nikolić', amount: 8500, status: 'pending', method: 'bank', date: '2024-01-14' },
    { id: 3, orderId: '#12347', customer: 'Stefan Jovanović', amount: 12000, status: 'failed', method: 'card', date: '2024-01-13' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Završeno';
      case 'pending': return 'Na čekanju';
      case 'failed': return 'Neuspešno';
      default: return 'Nepoznato';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Plaćanja</h1>
        <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors">
          Izvezi izveštaj
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">125,000</p>
              <p className="text-gray-400">Ukupno RSD</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <CheckCircle className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">156</p>
              <p className="text-gray-400">Uspešna plaćanja</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">23</p>
              <p className="text-gray-400">Na čekanju</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-500/20 rounded-xl">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">8</p>
              <p className="text-gray-400">Neuspešna</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Nedavna plaćanja</h2>
          <div className="flex space-x-2">
            {['all', 'completed', 'pending', 'failed'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeFilter === filter 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-400 hover:text-orange-400'
                }`}
              >
                {filter === 'all' ? 'Sve' : getStatusText(filter)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {payments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-700/20 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-white">{payment.orderId}</p>
                  <p className="text-sm text-gray-400">{payment.customer}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-orange-400">{payment.amount.toLocaleString()} RSD</p>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(payment.status)}
                  <span className="text-sm text-gray-400">{getStatusText(payment.status)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AdminPanelPlaćanja;