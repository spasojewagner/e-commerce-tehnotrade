import { create } from 'zustand';
import { axiosInstance } from '../https';

// Tipovi - POTPUNO USKLAĐEN sa backend User modelom
export interface User {
  _id: string,
  id?: string;
  email: string;
  name: string;
  role: string;
  surname: string;
  phone: string; // OBAVEZNO - required: true u backend modelu
  gender: string; // OBAVEZNO - required: true u backend modelu  
  terms: boolean; // default: false u backend modelu
  dateOfBirth?: Date | string | null; // OPCIONO - required: false u backend modelu
  createdAt?: string; // Automatski polja od Mongoose
  updatedAt?: string; // Automatski polja od Mongoose
}

export interface RegisterData {
  email: string;
  name: string;
  surname: string;
  phone: string;
  password: string;
  gender: string;
  terms?: boolean;
  dateOfBirth?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  email?: string;
  name?: string;
  surname?: string;
  phone?: string;
  gender?: string;
  terms?: boolean;
  dateOfBirth?: string | null;
  currentPassword?: string;
  newPassword?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  
  // Actions
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  getProfile: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,

  clearError: () => set({ error: null }),
  
  setLoading: (loading: boolean) => set({ isLoading: loading }),

  login: async (data: LoginData) => {
    try {
      set({ isLoading: true, error: null });
       
      const response = await axiosInstance.post('/api/auth/login', data);
      
      // Dodaj debug log za login response
      console.log('Login response:', response.data);
      
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        isInitialized: true,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Greška prilikom prijave';
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isInitialized: true,
        error: errorMessage,
      });
      throw new Error(errorMessage);
    }
  },

  register: async (data: RegisterData) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await axiosInstance.post('/api/auth/register', data);
      
      // Dodaj debug log za register response
      console.log('Register response:', response.data);
      
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        isInitialized: true,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Greška prilikom registracije';
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isInitialized: true,
        error: errorMessage,
      });
      throw new Error(errorMessage);
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      
      await axiosInstance.post('/api/auth/logout');
      
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isInitialized: true,
        error: null,
      });
    } catch (error: any) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isInitialized: true,
        error: null,
      });
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      
      const response = await axiosInstance.get('/api/auth/check-auth');
      
      // Dodaj debug log za checkAuth response
      console.log('CheckAuth response:', response.data);
      
      if (response.data.isAuthenticated) {
        set({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
          isInitialized: true,
          error: null,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true,
          error: null,
        });
      }
    } catch (error: any) {
      console.error('CheckAuth error:', error);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isInitialized: true,
        error: null,
      });
    }
  },

  getProfile: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await axiosInstance.get('/api/auth/profile');
      
      // KLJUČNO: Dodaj detaljne debug logove
      console.log('GetProfile full response:', response);
      console.log('GetProfile response.data:', response.data);
      console.log('GetProfile user object:', response.data.user);
      
      // Proveri da li su sva polja prisutna
      if (response.data.user) {
        console.log('User phone field:', response.data.user.phone);
        console.log('User dateOfBirth field:', response.data.user.dateOfBirth);
        console.log('User gender field:', response.data.user.gender);
        console.log('All user fields:', Object.keys(response.data.user));
      }
      
      set({
        user: response.data.user,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      console.error('GetProfile error:', error);
      const errorMessage = error.response?.data?.error || 'Greška prilikom dobijanja profila';
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw new Error(errorMessage);
    }
  },

  updateProfile: async (data: UpdateProfileData) => {
    try {
      set({ isLoading: true, error: null });
      
      // Dodaj debug log za update data
      console.log('Updating profile with data:', data);
      
      const response = await axiosInstance.put('/api/auth/update-profile', data);
      
      // Dodaj debug log za update response
      console.log('UpdateProfile response:', response.data);
      
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        isInitialized: true,
        error: null,
      });
    } catch (error: any) {
      console.error('UpdateProfile error:', error);
      const errorMessage = error.response?.data?.error || 'Greška prilikom ažuriranja profila';
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw new Error(errorMessage);
    }
  },
}));