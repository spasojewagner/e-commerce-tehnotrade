import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Calendar, 
  ShoppingCart,
  Eye,
  Ban,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAdminStore } from './../../store/useAdminStore';

const AdminPanelKupci: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const {
    users,
    usersLoading,
    usersError,
    usersPagination,
    getAllUsers
  } = useAdminStore();

  useEffect(() => {
    getAllUsers(currentPage, 10);
  }, [currentPage]);

  const filteredUsers = useMemo(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // if (filterStatus !== 'all') {
    //   filtered = filtered.filter(user => 
    //     filterStatus === 'active' ? user.isActive : !user.isActive
    //   );
    // }

    return filtered;
  }, [users, searchTerm, filterStatus]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sr-RS');
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive 
      ? 'text-green-400 bg-green-500/20' 
      : 'text-red-400 bg-red-500/20';
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? 'Aktivan' : 'Neaktivan';
  };

  if (usersLoading && users.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Users className="w-8 h-8 mr-3 text-orange-400" />
            Kupci
          </h1>
          <p className="text-gray-400 mt-1">
            Upravljanje korisnicima i kupcima
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-400">
            Ukupno: {usersPagination?.totalUsers || users.length} kupaca
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Pretraži kupce..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700/30 border border-gray-600/50 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-orange-500/50 focus:bg-gray-700/50 transition-all text-white"
            />
          </div>
          
          <div className="relative">
            <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-700/30 border border-gray-600/50 rounded-xl pl-10 pr-8 py-3 focus:outline-none focus:border-orange-500/50 focus:bg-gray-700/50 transition-all text-white appearance-none cursor-pointer"
            >
              <option value="all">Svi statusi</option>
              <option value="active">Aktivni</option>
              <option value="inactive">Neaktivni</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div 
              key={user._id}
              className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300"
            >
              {/* User Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {user.name && user.surname 
                        ? `${user.name} ${user.surname}`
                        : user.email
                      }
                    </h3>
                  
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{user.email}</span>
                </div>
                
                {user.phone && (
                  <div className="flex items-center space-x-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{user.phone}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-3 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">
                    Registrovan: {formatDate(user.createdAt)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3 text-sm">
                  <ShoppingCart className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">
                    Narudžbine: {user.orderCount || 0}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700/50">
                <button className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">Detalji</span>
                </button>
                
            
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Nema rezultata
            </h3>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== 'all' 
                ? 'Promenite filtere pretrage'
                : 'Nema registrovanih kupaca'
              }
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {usersPagination && usersPagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700/30 border border-gray-600/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700/50 transition-colors text-white"
          >
            Prethodna
          </button>
          
          <span className="text-gray-400">
            Strana {currentPage} od {usersPagination.totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, usersPagination.totalPages))}
            disabled={currentPage === usersPagination.totalPages}
            className="px-4 py-2 bg-gray-700/30 border border-gray-600/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700/50 transition-colors text-white"
          >
            Sledeća
          </button>
        </div>
      )}

      {/* Error State */}
      {usersError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span className="text-red-400">{usersError}</span>
        </div>
      )}
    </div>
  );
};

export default AdminPanelKupci;