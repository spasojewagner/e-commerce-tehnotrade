import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface OrderRowProps {
  order: any;
}

const OrderRow: React.FC<OrderRowProps> = ({ order }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'processing': return 'text-blue-400 bg-blue-500/20';
      case 'pending': return 'text-orange-400 bg-orange-500/20';
      case 'cancelled': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Završeno';
      case 'processing': return 'U obradi';
      case 'pending': return 'Na čekanju';
      case 'cancelled': return 'Otkazano';
      default: return 'Nepoznato';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sr-RS');
  };

  const customerName = order.user?.name && order.user?.surname 
    ? `${order.user.name} ${order.user.surname}`
    : order.user?.email || 'Nepoznat korisnik';

  return (
    <div className="flex items-center justify-between p-4 bg-gray-700/20 rounded-xl hover:bg-gray-700/30 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
          <ShoppingCart className="w-5 h-5" />
        </div>
        <div>
          <p className="font-medium text-white">#{order._id.slice(-6)}</p>
          <p className="text-sm text-gray-400">{customerName}</p>
          <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="font-bold text-orange-400">{order.totalAmount.toLocaleString()} RSD</p>
        <div className="flex items-center justify-end mt-1">
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
            {getStatusText(order.status)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderRow;