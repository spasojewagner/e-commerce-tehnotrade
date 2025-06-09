
// AdminPanelPodešavanja.tsx
import React, { useState } from 'react';
import { Settings, Save, User, Bell, Shield, Database, Globe, Palette } from 'lucide-react';

const AdminPanelPodešavanja: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Podešavanja</h1>
        <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Sačuvaj promene</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <nav className="space-y-2">
            {[
              { id: 'general', label: 'Opšte', icon: <Settings className="w-4 h-4" /> },
              { id: 'profile', label: 'Profil', icon: <User className="w-4 h-4" /> },
              { id: 'notifications', label: 'Notifikacije', icon: <Bell className="w-4 h-4" /> },
              { id: 'security', label: 'Bezbednost', icon: <Shield className="w-4 h-4" /> },
              { id: 'database', label: 'Baza podataka', icon: <Database className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' 
                    : 'text-gray-300 hover:text-orange-400 hover:bg-gray-700/30'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Opšte podešavanja</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Naziv sajta</label>
                  <input type="text" className="w-full bg-gray-700/30 border border-gray-600/50 rounded-xl px-4 py-2 focus:outline-none focus:border-orange-500/50" defaultValue="Admin Panel" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Valuta</label>
                  <select className="w-full bg-gray-700/30 border border-gray-600/50 rounded-xl px-4 py-2 focus:outline-none focus:border-orange-500/50">
                    <option>RSD</option>
                    <option>EUR</option>
                    <option>USD</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Profil administratora</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ime i prezime</label>
                  <input type="text" className="w-full bg-gray-700/30 border border-gray-600/50 rounded-xl px-4 py-2 focus:outline-none focus:border-orange-500/50" defaultValue="Administrator" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input type="email" className="w-full bg-gray-700/30 border border-gray-600/50 rounded-xl px-4 py-2 focus:outline-none focus:border-orange-500/50" defaultValue="admin@example.com" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminPanelPodešavanja;