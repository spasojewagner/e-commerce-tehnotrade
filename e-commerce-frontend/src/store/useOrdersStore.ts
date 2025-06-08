import { create } from 'zustand';
import { axiosInstance } from '../https/index';

// Tipovi za Order
export interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
    sku: string;
    images: string[];
    brand?: string;
  };
  quantity: number;
  priceAtTime: number;
}

export interface ShippingAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
  note?: string;
}

export interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    surname: string;
    email: string;
    phone?: string;
  };
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  totalAmount?: number;
  calculatedTotal?: number; // virtual polje iz mongoose
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  userId: string;
  items: Array<{
    product: string;
    quantity: number;
  }>;
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country?: string;
    phone?: string;
    note?: string;
  };
}

export interface UpdateOrderData {
  status?: 'pending' | 'processing' | 'completed' | 'cancelled';
  items?: Array<{
    product: string;
    quantity: number;
    priceAtTime?: number;
  }>;
  shippingAddress?: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    phone?: string;
    note?: string;
  };
}

interface OrdersState {
  orders: Order[];
  userOrders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

interface OrdersActions {
  // Kreiranje porudžbine
  createOrder: (orderData: CreateOrderData) => Promise<Order | null>;

  // Dobijanje porudžbina korisnika
  getUserOrders: (userId: string) => Promise<void>;

  // Dobijanje svih porudžbina (admin)
  getAllOrders: (page?: number, limit?: number, status?: string) => Promise<void>;

  // Dobijanje porudžbine po ID-u
  getOrderById: (orderId: string) => Promise<void>;

  // Ažuriranje porudžbine
  updateOrder: (orderId: string, updateData: UpdateOrderData) => Promise<Order | null>;

  // Ažuriranje statusa porudžbine
  updateOrderStatus: (orderId: string, status: 'pending' | 'processing' | 'completed' | 'cancelled') => Promise<Order | null>;

  // Brisanje porudžbine
  deleteOrder: (orderId: string) => Promise<boolean>;

  // Utility funkcije
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearCurrentOrder: () => void;
  clearUserOrders: () => void;
  clearAllOrders: () => void;

  // Lokalne funkcije za manipulaciju stanja
  addOrderToList: (order: Order) => void;
  removeOrderFromList: (orderId: string) => void;
  updateOrderInList: (orderId: string, updatedOrder: Order) => void;

  // Kalkulacija ukupne cene
  calculateOrderTotal: (order: Order) => number;

  // Filtriranje porudžbina po statusu
  getOrdersByStatus: (status: string) => Order[];
}

type OrdersStore = OrdersState & OrdersActions;

export const useOrdersStore = create<OrdersStore>((set, get) => ({
  // Početno stanje
  orders: [],
  userOrders: [],
  currentOrder: null,
  loading: false,
  error: null,

  // Kreiranje porudžbine
  createOrder: async (orderData: CreateOrderData) => {
    const { setLoading, setError } = get();

    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.post('/api/orders', orderData);

      if (response.data.order) {
        // Dodaj porudžbinu u listu
        set(state => ({
          orders: [response.data.order, ...state.orders],
          userOrders: response.data.order.user._id === orderData.userId
            ? [response.data.order, ...state.userOrders]
            : state.userOrders
        }));

        return response.data.order;
      }

      return null;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Greška pri kreiranju porudžbine';
      setError(errorMessage);
      console.error('Greška pri kreiranju porudžbine:', error);
      return null;
    } finally {
      setLoading(false);
    }
  },

  // Dobijanje porudžbina korisnika
  getUserOrders: async (userId: string) => {
    const { setLoading, setError } = get();
    //
    console.log('[Store] getUserOrders → GET /api/orders/user/' + userId);
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get(`/api/orders/user/${userId}`);
      //
      console.log('[Store] response.data =', response.data);

      if (response.data.orders) {
        set({ userOrders: response.data.orders });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Greška pri učitavanju porudžbina korisnika';
      setError(errorMessage);
      console.error('Greška pri učitavanju porudžbina korisnika:', error);
    } finally {
      setLoading(false);
    }
  },

  // Dobijanje svih porudžbina (admin) sa paginacijom
  getAllOrders: async (page = 1, limit = 10, status?: string) => {
    const { setLoading, setError } = get();

    try {
      setLoading(true);
      setError(null);

      let url = `/api/orders?page=${page}&limit=${limit}`;
      if (status) {
        url += `&status=${status}`;
      }

      const response = await axiosInstance.get(url);

      if (response.data.orders) {
        set({
          orders: response.data.orders,
          // Možeš dodati pagination info u state ako treba
        });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Greška pri učitavanju svih porudžbina';
      setError(errorMessage);
      console.error('Greška pri učitavanju svih porudžbina:', error);
    } finally {
      setLoading(false);
    }
  },

  // Dobijanje porudžbine po ID-u
  getOrderById: async (orderId: string) => {
    const { setLoading, setError } = get();

    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get(`/api/orders/${orderId}`);

      if (response.data.order) {
        set({ currentOrder: response.data.order });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Greška pri učitavanju porudžbine';
      setError(errorMessage);
      console.error('Greška pri učitavanju porudžbine:', error);
    } finally {
      setLoading(false);
    }
  },

  // Ažuriranje porudžbine
  updateOrder: async (orderId: string, updateData: UpdateOrderData) => {
    const { setLoading, setError, updateOrderInList } = get();

    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.put(`/api/orders/${orderId}`, updateData);

      if (response.data.order) {
        // Ažuriraj porudžbinu u listi
        updateOrderInList(orderId, response.data.order);

        // Ažuriraj trenutnu porudžbinu ako je to ista
        set(state => ({
          currentOrder: state.currentOrder?._id === orderId
            ? response.data.order
            : state.currentOrder
        }));

        return response.data.order;
      }

      return null;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Greška pri ažuriranju porudžbine';
      setError(errorMessage);
      console.error('Greška pri ažuriranju porudžbine:', error);
      return null;
    } finally {
      setLoading(false);
    }
  },

  // Ažuriranje statusa porudžbine
  updateOrderStatus: async (orderId: string, status: 'pending' | 'processing' | 'completed' | 'cancelled') => {
    const { setLoading, setError, updateOrderInList } = get();

    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.put(`/api/orders/${orderId}`, { status });

      if (response.data.order) {
        // Ažuriraj porudžbinu u listi
        updateOrderInList(orderId, response.data.order);

        // Ažuriraj trenutnu porudžbinu ako je to ista
        set(state => ({
          currentOrder: state.currentOrder?._id === orderId
            ? response.data.order
            : state.currentOrder
        }));

        return response.data.order;
      }

      return null;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Greška pri ažuriranju statusa porudžbine';
      setError(errorMessage);
      console.error('Greška pri ažuriranju statusa porudžbine:', error);
      return null;
    } finally {
      setLoading(false);
    }
  },

  // Brisanje porudžbine
  deleteOrder: async (orderId: string) => {
    const { setLoading, setError, removeOrderFromList } = get();

    try {
      setLoading(true);
      setError(null);

      await axiosInstance.delete(`/api/orders/${orderId}`);

      // Ukloni porudžbinu iz liste
      removeOrderFromList(orderId);

      // Obriši trenutnu porudžbinu ako je to ista
      set(state => ({
        currentOrder: state.currentOrder?._id === orderId ? null : state.currentOrder
      }));

      return true;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Greška pri brisanju porudžbine';
      setError(errorMessage);
      console.error('Greška pri brisanju porudžbine:', error);
      return false;
    } finally {
      setLoading(false);
    }
  },

  // Utility funkcije
  setLoading: (loading: boolean) => set({ loading }),

  setError: (error: string | null) => set({ error }),

  clearCurrentOrder: () => set({ currentOrder: null }),

  clearUserOrders: () => set({ userOrders: [] }),

  clearAllOrders: () => set({ orders: [] }),

  // Lokalne funkcije za manipulaciju stanja
  addOrderToList: (order: Order) => {
    set(state => ({
      orders: [order, ...state.orders]
    }));
  },

  removeOrderFromList: (orderId: string) => {
    set(state => ({
      orders: state.orders.filter(order => order._id !== orderId),
      userOrders: state.userOrders.filter(order => order._id !== orderId)
    }));
  },

  updateOrderInList: (orderId: string, updatedOrder: Order) => {
    set(state => ({
      orders: state.orders.map(order =>
        order._id === orderId ? updatedOrder : order
      ),
      userOrders: state.userOrders.map(order =>
        order._id === orderId ? updatedOrder : order
      )
    }));
  },

  // Kalkulacija ukupne cene porudžbine
  calculateOrderTotal: (order: Order) => {
    // Koristi totalAmount ako postoji, inače kalkuliši
    if (order.totalAmount) return order.totalAmount;
    if (order.calculatedTotal) return order.calculatedTotal;

    return order.items.reduce((total, item) => {
      return total + (item.priceAtTime * item.quantity);
    }, 0);
  },

  // Filtriranje porudžbina po statusu
  getOrdersByStatus: (status: string) => {
    const { orders } = get();
    return orders.filter(order => order.status === status);
  }
}));