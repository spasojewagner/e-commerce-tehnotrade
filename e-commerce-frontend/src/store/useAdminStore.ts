import { create } from 'zustand';
import { axiosInstance } from '../https';

// Tipovi podataka (isti kao prije)
interface User {
  _id: string;
  id: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
  gender: string;
  role: string;
  terms: boolean;
  dateOfBirth?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  sku: string;
  images: string[];
  brand: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
  priceAtTime: number;
  _id: string;
}

interface ShippingAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
  note?: string;
}

type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

interface Order {
  _id: string;
  user: User;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalOrders?: number;
  totalUsers?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

interface AdminState {
  // Orders state
  orders: Order[];
  currentOrder: Order | null;
  ordersLoading: boolean;
  ordersError: string | null;
  ordersPagination: Pagination | null;

  // Users state
  users: User[];
  usersLoading: boolean;
  usersError: string | null;
  usersPagination: Pagination | null;

  // General state
  isLoading: boolean;
  error: string | null;

  // Request tracking to prevent duplicates
  activeRequests: Set<string>;

  // Actions
  getAllOrders: (page?: number, limit?: number, status?: OrderStatus) => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  getOrderById: (orderId: string) => Promise<void>;
  getAllUsers: (page?: number, limit?: number, search?: string) => Promise<void>;
  clearError: () => void;
  clearCurrentOrder: () => void;
}

// Utility funkcija za handle grešaka
const handleError = (error: any, fallbackMessage: string): string => {
  return error.response?.data?.message || 
         error.response?.data?.error || 
         error.message || 
         fallbackMessage;
};

export const useAdminStore = create<AdminState>((set, get) => ({
  // Initial state
  orders: [],
  currentOrder: null,
  ordersLoading: false,
  ordersError: null,
  ordersPagination: null,

  users: [],
  usersLoading: false,
  usersError: null,
  usersPagination: null,

  isLoading: false,
  error: null,
  activeRequests: new Set(),

  // Actions
  getAllOrders: async (page = 1, limit = 10, status) => {
    const requestKey = `orders-${page}-${limit}-${status || 'all'}`;
    const state = get();
    
    // Provjeri da li je zahtjev već u tijeku
    if (state.activeRequests.has(requestKey)) {
      console.log('Orders request already in progress, skipping...');
      return;
    }

    // Dodaj zahtjev u aktivne zahtjeve
    set((state) => ({
      activeRequests: new Set([...state.activeRequests, requestKey]),
      ordersLoading: true,
      ordersError: null
    }));
    
    try {
      const params: any = { page, limit };
      if (status) {
        params.status = status;
      }

      console.log('Fetching orders with params:', params);
      const response = await axiosInstance.get('/api/orders/admin/all', { params });
      
      set((state) => {
        const newActiveRequests = new Set(state.activeRequests);
        newActiveRequests.delete(requestKey);
        
        return {
          orders: response.data.orders || [],
          ordersPagination: response.data.pagination || null,
          ordersLoading: false,
          ordersError: null,
          activeRequests: newActiveRequests
        };
      });
    } catch (error: any) {
      const errorMessage = handleError(error, 'Greška pri učitavanju porudžbina');
      
      set((state) => {
        const newActiveRequests = new Set(state.activeRequests);
        newActiveRequests.delete(requestKey);
        
        return {
          ordersLoading: false,
          ordersError: errorMessage,
          orders: [],
          ordersPagination: null,
          activeRequests: newActiveRequests
        };
      });
      
      console.error('Greška pri dobijanju porudžbina:', error);
    }
  },

  updateOrderStatus: async (orderId: string, status: OrderStatus) => {
    const requestKey = `update-order-${orderId}`;
    const state = get();
    
    if (state.activeRequests.has(requestKey)) {
      console.log('Order update already in progress, skipping...');
      return;
    }

    set((state) => ({
      activeRequests: new Set([...state.activeRequests, requestKey]),
      isLoading: true,
      error: null
    }));
    
    try {
      const response = await axiosInstance.put(`/api/orders/${orderId}/status`, { status });
      
      const updatedOrder = response.data.order;
      set((state) => {
        const newActiveRequests = new Set(state.activeRequests);
        newActiveRequests.delete(requestKey);
        
        return {
          orders: state.orders.map((order) =>
            order._id === orderId ? { ...order, ...updatedOrder } : order
          ),
          currentOrder: state.currentOrder?._id === orderId 
            ? { ...state.currentOrder, ...updatedOrder } 
            : state.currentOrder,
          isLoading: false,
          error: null,
          activeRequests: newActiveRequests
        };
      });
    } catch (error: any) {
      const errorMessage = handleError(error, 'Greška pri ažuriranju statusa porudžbine');
      
      set((state) => {
        const newActiveRequests = new Set(state.activeRequests);
        newActiveRequests.delete(requestKey);
        
        return {
          isLoading: false,
          error: errorMessage,
          activeRequests: newActiveRequests
        };
      });
      
      console.error('Greška pri ažuriranju statusa:', error);
      throw error;
    }
  },

  getOrderById: async (orderId: string) => {
    const requestKey = `order-${orderId}`;
    const state = get();
    
    if (state.activeRequests.has(requestKey)) {
      console.log('Order fetch already in progress, skipping...');
      return;
    }

    set((state) => ({
      activeRequests: new Set([...state.activeRequests, requestKey]),
      ordersLoading: true,
      ordersError: null
    }));
    
    try {
      const response = await axiosInstance.get(`/api/orders/${orderId}`);
      
      set((state) => {
        const newActiveRequests = new Set(state.activeRequests);
        newActiveRequests.delete(requestKey);
        
        return {
          currentOrder: response.data.order || null,
          ordersLoading: false,
          ordersError: null,
          activeRequests: newActiveRequests
        };
      });
    } catch (error: any) {
      const errorMessage = handleError(error, 'Greška pri učitavanju porudžbine');
      
      set((state) => {
        const newActiveRequests = new Set(state.activeRequests);
        newActiveRequests.delete(requestKey);
        
        return {
          ordersLoading: false,
          ordersError: errorMessage,
          currentOrder: null,
          activeRequests: newActiveRequests
        };
      });
      
      console.error('Greška pri dobijanju porudžbine:', error);
    }
  },

  getAllUsers: async (page = 1, limit = 10, search) => {
    const requestKey = `users-${page}-${limit}-${search || 'all'}`;
    const state = get();
    
    if (state.activeRequests.has(requestKey)) {
      console.log('Users request already in progress, skipping...');
      return;
    }

    set((state) => ({
      activeRequests: new Set([...state.activeRequests, requestKey]),
      usersLoading: true,
      usersError: null
    }));
    
    try {
      const params: any = { page, limit };
      if (search) {
        params.search = search;
      }

      console.log('Fetching users with params:', params);
      const response = await axiosInstance.get('/api/users', { params });
      
      set((state) => {
        const newActiveRequests = new Set(state.activeRequests);
        newActiveRequests.delete(requestKey);
        
        return {
          users: response.data.users || [],
          usersPagination: response.data.pagination || null,
          usersLoading: false,
          usersError: null,
          activeRequests: newActiveRequests
        };
      });
    } catch (error: any) {
      const errorMessage = handleError(error, 'Greška pri učitavanju korisnika');
      
      set((state) => {
        const newActiveRequests = new Set(state.activeRequests);
        newActiveRequests.delete(requestKey);
        
        return {
          usersLoading: false,
          usersError: errorMessage,
          users: [],
          usersPagination: null,
          activeRequests: newActiveRequests
        };
      });
      
      console.error('Greška pri dobijanju korisnika:', error);
    }
  },

  clearError: () => {
    set({ error: null, ordersError: null, usersError: null });
  },

  clearCurrentOrder: () => {
    set({ currentOrder: null });
  }
}));