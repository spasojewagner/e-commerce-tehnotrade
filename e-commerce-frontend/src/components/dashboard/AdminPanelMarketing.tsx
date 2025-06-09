// AdminPanelMarketing.tsx
import React, { useState } from 'react';
import { Mail, Users, TrendingUp, Send, Eye, MousePointer, Calendar } from 'lucide-react';

export const AdminPanelMarketing: React.FC = () => {
  const [activeTab, setActiveTab] = useState('campaigns');

  const campaigns = [
    { id: 1, name: 'Zimska rasprodaja', status: 'active', sent: 1250, opened: 785, clicked: 142, date: '2024-01-10' },
    { id: 2, name: 'Nova kolekcija', status: 'draft', sent: 0, opened: 0, clicked: 0, date: '2024-01-15' },
    { id: 3, name: 'Black Friday', status: 'completed', sent: 2100, opened: 1540, clicked: 398, date: '2023-11-24' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'draft': return 'text-yellow-400 bg-yellow-500/20';
      case 'completed': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktivna';
      case 'draft': return 'Nacrt';
      case 'completed': return 'Završena';
      default: return 'Nepoznato';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Marketing</h1>
        <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
          <Send className="w-4 h-4" />
          <span>Nova kampanja</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Mail className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">3,350</p>
              <p className="text-gray-400">Poslani email-ovi</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Eye className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">2,325</p>
              <p className="text-gray-400">Otvoreni</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <MousePointer className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">540</p>
              <p className="text-gray-400">Klikovi</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">16.1%</p>
              <p className="text-gray-400">CTR</p>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Email kampanje</h2>
          <div className="flex space-x-2">
            {['campaigns', 'templates', 'subscribers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-400 hover:text-orange-400'
                }`}
              >
                {tab === 'campaigns' ? 'Kampanje' : tab === 'templates' ? 'Templejti' : 'Pretplatnici'}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'campaigns' && (
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-700/20 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{campaign.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>Poslano: {campaign.sent}</span>
                      <span>Otvoreno: {campaign.opened}</span>
                      <span>Kliknuto: {campaign.clicked}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(campaign.status)}`}>
                    {getStatusText(campaign.status)}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{campaign.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="text-center py-12 text-gray-400">
            <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Nema dostupnih templejta</p>
          </div>
        )}

        {activeTab === 'subscribers' && (
          <div className="text-center py-12 text-gray-400">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Lista pretplatnika se učitava...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminPanelMarketing;