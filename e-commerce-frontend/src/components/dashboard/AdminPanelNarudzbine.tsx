import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
    ShoppingCart,
    Eye,
    Search,
    Filter,
    Plus,
    ChevronLeft,
    ChevronRight,
    FileText,
    Calendar,
    User,
    CreditCard,
    Package,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Edit
} from 'lucide-react';
import { useAdminStore } from './../../store/useAdminStore';
import { useProduct } from './../../hooks/useProducts';

interface OrderStatus {
    completed: string;
    processing: string;
    pending: string;
    cancelled: string;
}

// Komponenta za prikaz jedne narudžbine
const OrderCard: React.FC<{
    order: any;
    onViewDetails: (order: any) => void;
    onUpdateStatus: (orderId: string, status: string) => void;
}> = ({ order, onViewDetails, onUpdateStatus }) => {
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'text-green-400 bg-green-500/20 border-green-500/30';
            case 'processing': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
            case 'pending': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
            case 'cancelled': return 'text-red-400 bg-red-500/20 border-red-500/30';
            default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            case 'processing': return <Clock className="w-4 h-4" />;
            case 'pending': return <AlertCircle className="w-4 h-4" />;
            case 'cancelled': return <XCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
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
        return new Date(dateString).toLocaleDateString('sr-RS', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const customerName = order.user?.name && order.user?.surname
        ? `${order.user.name} ${order.user.surname}`
        : order.user?.email || 'Nepoznat korisnik';

    const handleStatusChange = async (newStatus: string) => {
        setIsUpdatingStatus(true);
        try {
            await onUpdateStatus(order._id, newStatus);
        } catch (error) {
            console.error('Greška pri ažuriranju statusa:', error);
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    return (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                        <ShoppingCart className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">#{order._id.slice(-8)}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <User className="w-4 h-4" />
                            <span>{customerName}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="text-sm font-medium">{getStatusText(order.status)}</span>
                    </div>

                    {/* Status update dropdown */}
                    <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        disabled={isUpdatingStatus}
                        className="text-xs bg-gray-700/50 border border-gray-600/50 rounded-lg px-2 py-1 text-gray-300 focus:outline-none focus:border-orange-500/50 disabled:opacity-50"
                    >
                        <option value="pending">Na čekanju</option>
                        <option value="processing">U obradi</option>
                        <option value="completed">Završeno</option>
                        <option value="cancelled">Otkazano</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-gray-300">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{formatDate(order.createdAt)}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-300">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-bold text-orange-400">{order.totalAmount.toLocaleString()} RSD</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-300">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{order.items?.length || 0} proizvoda</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-300">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{order.paymentMethod || 'N/A'}</span>
                </div>
            </div>

            <div className="flex justify-end space-x-2">
                <button
                    onClick={() => onViewDetails(order)}
                    className="px-4 py-2 bg-orange-500/20 border border-orange-500/30 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-colors flex items-center space-x-2"
                >
                    <Eye className="w-4 h-4" />
                    <span>Detalji</span>
                </button>
            </div>

            {isUpdatingStatus && (
                <div className="mt-2 text-center">
                    <div className="inline-flex items-center space-x-2 text-orange-400 text-sm">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                        <span>Ažuriram status...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

// Komponenta za prikaz detalja narudžbine
const OrderDetailsModal: React.FC<{
    order: any;
    onClose: () => void;
    onUpdateStatus: (orderId: string, status: string) => void;
}> = ({ order, onClose, onUpdateStatus }) => {
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    if (!order) return null;

    const customerName = order.user?.name && order.user?.surname
        ? `${order.user.name} ${order.user.surname}`
        : order.user?.email || 'Nepoznat korisnik';

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'text-green-400 bg-green-500/20 border-green-500/30';
            case 'processing': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
            case 'pending': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
            case 'cancelled': return 'text-red-400 bg-red-500/20 border-red-500/30';
            default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
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

    const handleStatusChange = async (newStatus: string) => {
        setIsUpdatingStatus(true);
        try {
            await onUpdateStatus(order._id, newStatus);
        } catch (error) {
            console.error('Greška pri ažuriranju statusa:', error);
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Detalji narudžbine #{order._id.slice(-8)}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <XCircle className="w-6 h-6 text-gray-400" />
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Status Section */}
                    <div className="bg-gray-700/30 rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-white mb-3">Status narudžbine</h3>
                        <div className="flex items-center justify-between">
                            <div className={`flex items-center space-x-2 px-3 py-2 rounded-full border ${getStatusColor(order.status)}`}>
                                <span className="text-sm font-medium">{getStatusText(order.status)}</span>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Edit className="w-4 h-4 text-gray-400" />
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(e.target.value)}
                                    disabled={isUpdatingStatus}
                                    className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500/50 disabled:opacity-50"
                                >
                                    <option value="pending">Na čekanju</option>
                                    <option value="processing">U obradi</option>
                                    <option value="completed">Završeno</option>
                                    <option value="cancelled">Otkazano</option>
                                </select>
                            </div>
                        </div>

                        {isUpdatingStatus && (
                            <div className="mt-3 flex items-center space-x-2 text-orange-400 text-sm">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                                <span>Ažuriram status...</span>
                            </div>
                        )}
                    </div>

                    {/* Informacije o korisniku */}
                    <div className="bg-gray-700/30 rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-white mb-3">Informacije o korisniku</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-400">Ime:</span>
                                <p className="text-white">{customerName}</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Email:</span>
                                <p className="text-white">{order.user?.email || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Adresa dostave */}
                    {order.shippingAddress && (
                        <div className="bg-gray-700/30 rounded-xl p-4">
                            <h3 className="text-lg font-semibold text-white mb-3">Adresa dostave</h3>
                            <div className="text-sm">
                                <p className="text-white">{order.shippingAddress.street}</p>
                                <p className="text-white">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                <p className="text-white">{order.shippingAddress.country}</p>
                            </div>
                        </div>
                    )}

                    {/* Proizvodi */}
                    <div className="bg-gray-700/30 rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-white mb-3">Proizvodi</h3>
                        <div className="space-y-3">
                            {order.items?.map((item: any, index: number) => {
                                // pozovi hook sa ID-jem proizvoda
                                const { data, isLoading, error } = useProduct(item.product.toString());

                                // izvuci podatke
                                const prod = data?.data;
                                const img = prod?.images?.[0];
                                const name = prod?.name;
                                const price = prod?.price;

                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-gray-600/30 rounded-lg"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                                                {isLoading && <div className="animate-pulse w-full h-full bg-gray-500" />}
                                                {error && <span className="text-red-400 text-xs">!</span>}
                                                {img && (
                                                    <img
                                                        src={img}
                                                        alt={name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">
                                                    {name || `Proizvod ${index + 1}`}
                                                </p>
                                                <p className="text-gray-400 text-sm">
                                                    Količina: {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-orange-400 font-bold">
                                            {(price ?? item.priceAtTime).toLocaleString()} RSD
                                        </p>
                                    </div>
                                );
                            }) ?? (
                                    <p className="text-gray-400">Nema informacija o proizvodima</p>
                                )}
                        </div>
                    </div>

                    {/* Ukupno */}
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-white">Ukupno:</span>
                            <span className="text-2xl font-bold text-orange-400">{order.totalAmount.toLocaleString()} RSD</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdminPanelNarudzbine: React.FC = () => {
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 12;

    const {
        orders,
        ordersLoading,
        ordersError,
        ordersPagination,
        getAllOrders,
        updateOrderStatus,
        clearError
    } = useAdminStore();

    // Učitaj narudžbine na mount
    useEffect(() => {
        getAllOrders(currentPage, ordersPerPage);
    }, [currentPage, getAllOrders]);

    // Funkcija za refresh podataka
    const handleRefresh = useCallback(async () => {
        clearError();
        await getAllOrders(currentPage, ordersPerPage);
    }, [currentPage, ordersPerPage, getAllOrders, clearError]);

    // Funkcija za ažuriranje statusa
    const handleUpdateStatus = useCallback(async (orderId: string, status: string) => {
        try {
            await updateOrderStatus(orderId, status as 'pending' | 'processing' | 'completed' | 'cancelled');
            // Osvježi podatke nakon uspješnog ažuriranja
            await getAllOrders(currentPage, ordersPerPage);
        } catch (error) {
            console.error('Greška pri ažuriranju statusa:', error);
            throw error;
        }
    }, [updateOrderStatus, getAllOrders, currentPage, ordersPerPage]);

    // Filtrirane narudžbine
    const filteredOrders = useMemo(() => {
        let filtered = orders;

        // Filter po statusu
        if (statusFilter !== 'all') {
            filtered = filtered.filter(order => order.status === statusFilter);
        }

        // Filter po pretrazi
        if (searchQuery) {
            filtered = filtered.filter(order =>
                order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (order.user?.name && order.user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (order.user?.surname && order.user.surname.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (order.user?.email && order.user.email.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        return filtered;
    }, [orders, statusFilter, searchQuery]);

    // Statistike
    const stats = useMemo(() => {
        const total = orders.length;
        const completed = orders.filter(o => o.status === 'completed').length;
        const processing = orders.filter(o => o.status === 'processing').length;
        const pending = orders.filter(o => o.status === 'pending').length;
        const cancelled = orders.filter(o => o.status === 'cancelled').length;

        return { total, completed, processing, pending, cancelled };
    }, [orders]);

    if (ordersLoading && orders.length === 0) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Učitavam narudžbine...</p>
                </div>
            </div>
        );
    }

    if (ordersError && orders.length === 0) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <FileText className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-red-400 mb-4">{ordersError}</p>
                    <button
                        onClick={handleRefresh}
                        className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors"
                    >
                        Pokušaj ponovo
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Narudžbine</h1>
                    <p className="text-gray-400 mt-1">Upravljanje narudžbinama i statusima</p>
                </div>

                <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg">
                    <Plus className="w-5 h-5" />
                    <span>Nova narudžbina</span>
                </button>
            </div>

            {/* Statistike */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                    <p className="text-gray-400 text-sm">Ukupno</p>
                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                    <p className="text-green-400 text-sm">Završeno</p>
                    <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <p className="text-blue-400 text-sm">U obradi</p>
                    <p className="text-2xl font-bold text-blue-400">{stats.processing}</p>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                    <p className="text-orange-400 text-sm">Na čekanju</p>
                    <p className="text-2xl font-bold text-orange-400">{stats.pending}</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <p className="text-red-400 text-sm">Otkazano</p>
                    <p className="text-2xl font-bold text-red-400">{stats.cancelled}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Pretraži po ID, imenu ili email-u korisnika..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-700/30 border border-gray-600/50 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-orange-500/50 focus:bg-gray-700/50 transition-all text-white"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-gray-700/30 border border-gray-600/50 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500/50 text-white"
                        >
                            <option value="all">Svi statusi</option>
                            <option value="pending">Na čekanju</option>
                            <option value="processing">U obradi</option>
                            <option value="completed">Završeno</option>
                            <option value="cancelled">Otkazano</option>
                        </select>
                    </div>

                    <button
                        onClick={handleRefresh}
                        className="bg-orange-500/20 border border-orange-500/30 text-orange-400 px-4 py-3 rounded-xl hover:bg-orange-500/30 transition-colors"
                    >
                        Osvježi
                    </button>
                </div>
            </div>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <OrderCard
                            key={order._id}
                            order={order}
                            onViewDetails={setSelectedOrder}
                            onUpdateStatus={handleUpdateStatus}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">
                            {searchQuery || statusFilter !== 'all'
                                ? 'Nema narudžbina koje odgovaraju kriterijumima pretrage'
                                : 'Nema dostupnih narudžbina'
                            }
                        </p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {ordersPagination && ordersPagination.totalPages > 1 && (
                <div className="flex items-center justify-between bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
                    <p className="text-gray-400">
                        Prikazano {((currentPage - 1) * ordersPerPage) + 1} - {Math.min(currentPage * ordersPerPage, ordersPagination.totalOrders || 0)} od {ordersPagination.totalOrders || 0} narudžbina
                    </p>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg bg-gray-700/30 border border-gray-600/50 text-gray-400 hover:text-white hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <span className="px-4 py-2 text-white">
                            {currentPage} / {ordersPagination.totalPages}
                        </span>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, ordersPagination.totalPages))}
                            disabled={currentPage === ordersPagination.totalPages}
                            className="p-2 rounded-lg bg-gray-700/30 border border-gray-600/50 text-gray-400 hover:text-white hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Order Details Modal */}
            {selectedOrder && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onUpdateStatus={handleUpdateStatus}
                />
            )}
        </div>
    );
};

export default AdminPanelNarudzbine;