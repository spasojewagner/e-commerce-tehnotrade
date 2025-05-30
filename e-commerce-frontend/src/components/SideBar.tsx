import React from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, Zap } from 'lucide-react';
import { Category, HotDeal } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  hotDeals: HotDeal[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  categories, 
  hotDeals, 
  selectedCategory, 
  onCategorySelect 
}) => {
  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-black/95 backdrop-blur-xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:w-64 border-r border-orange-500/20`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="text-xl font-bold">Kategorije</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-2">
          {categories.map((category, index) => (
            <div key={index} className="group">
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-orange-500/20 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <category.icon className="w-5 h-5 group-hover:text-orange-400" />
                  <span className="font-medium group-hover:text-orange-400">{category.name}</span>
                </div>
                <ChevronDown className="w-4 h-4 group-hover:text-orange-400" />
              </button>
              <div className="ml-8 mt-2 space-y-1">
                {category.subcategories.map((sub, subIndex) => (
                  <button
                    key={subIndex}
                    onClick={() => onCategorySelect(sub)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === sub 
                        ? 'bg-orange-500/20 text-orange-400' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Hot Deals Sidebar */}
        <div className="mt-8 p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl border border-orange-500/30">
          <h3 className="font-bold text-orange-400 mb-3 flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            FLASH AKCIJE
          </h3>
          {hotDeals.map((deal, index) => (
            <Link 
              key={index} 
              to={`/deals/${encodeURIComponent(deal.name.toLowerCase())}`}
              className="block mb-3 p-2 bg-black/30 rounded-lg hover:bg-black/50 transition-colors"
            >
              <div className="text-sm font-medium">{deal.name}</div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-orange-400 font-bold">-{deal.discount}%</span>
                <span className="text-xs text-red-400">⏰ {deal.timeLeft}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;