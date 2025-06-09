import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  suffix?: string;
  trend?: string;
  iconBg: string;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  label, 
  value, 
  suffix = '', 
  trend = '+12%', 
  iconBg, 
  iconColor 
}) => (
  <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 ${iconBg} rounded-xl`}>
        <div className={iconColor}>{icon}</div>
      </div>
      <span className="text-sm text-gray-400">{trend}</span>
    </div>
    <h3 className="text-2xl font-bold text-white mb-1">
      {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
    </h3>
    <p className="text-gray-400">{label}</p>
  </div>
);

export default StatCard;