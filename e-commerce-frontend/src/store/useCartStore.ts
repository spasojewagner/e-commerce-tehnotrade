// src/store/useCartStore.ts
import { create } from 'zustand';
import { axiosInstance } from '../https/index'

export interface CartItem {
  product: {
    _id: string
    name: string
    price: number
    stock?: number
    images?: string[]
    // ...other product fields as needed
  }
  quantity: number
  addedAt: string
}

interface CartState {
  items: CartItem[]
  loading: boolean
  error: string | null
  fetchCart: () => Promise<void>
  addToCart: (productId: string, quantity?: number) => Promise<void>
  removeFromCart: (productId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loading: false,
  error: null,

  fetchCart: async () => {
    set({ loading: true, error: null })
    try {
      const res = await axiosInstance.get<{ success: boolean; cart: CartItem[] }>('/api/cart')
      set({ items: res.data.cart })
    } catch (err: any) {
      console.error('Fetch cart error:', err)
      set({ error: err.message || 'Failed to fetch cart' })
    } finally {
      set({ loading: false })
    }
  },

  addToCart: async (productId, quantity = 1) => {
    if (!productId) {
      console.error('addToCart: productId is required')
      set({ error: 'Product ID is required' })
      return
    }

    set({ loading: true, error: null })
    try {
      console.log('Adding to cart:', { productId, quantity })
      const res = await axiosInstance.post<{ success: boolean; cart: CartItem[] }>('/api/cart/add', { productId, quantity })
      set({ items: res.data.cart })
    } catch (err: any) {
      console.error('Add to cart error:', err)
      set({ error: err.message || 'Failed to add to cart' })
    } finally {
      set({ loading: false })
    }
  },

  removeFromCart: async (productId) => {
    if (!productId) {
      console.error('removeFromCart: productId is required')
      set({ error: 'Product ID is required' })
      return
    }

    set({ loading: true, error: null })
    try {
      console.log('Removing from cart:', productId)
      const res = await axiosInstance.delete<{ success: boolean; cart: CartItem[] }>(`/api/cart/remove/${productId}`)
      set({ items: res.data.cart })
    } catch (err: any) {
      console.error('Remove from cart error:', err)
      set({ error: err.message || 'Failed to remove from cart' })
    } finally {
      set({ loading: false })
    }
  },

  updateQuantity: async (productId, quantity) => {
    if (!productId) {
      console.error('updateQuantity: productId is required')
      set({ error: 'Product ID is required' })
      return
    }

    if (quantity < 1) {
      console.error('updateQuantity: quantity must be at least 1')
      set({ error: 'Quantity must be at least 1' })
      return
    }

    set({ loading: true, error: null })
    try {
      console.log('Updating quantity:', { productId, quantity })
      const res = await axiosInstance.put<{ success: boolean; cart: CartItem[] }>(`/api/cart/update/${productId}`, { quantity })
      set({ items: res.data.cart })
    } catch (err: any) {
      console.error('Update quantity error:', err)
      set({ error: err.message || 'Failed to update quantity' })
    } finally {
      set({ loading: false })
    }
  },

  clearCart: async () => {
    set({ loading: true, error: null })
    try {
      console.log('Clearing cart')
      await axiosInstance.delete<{ success: boolean; cart: CartItem[] }>('/api/cart/clear')
      set({ items: [] })
    } catch (err: any) {
      console.error('Clear cart error:', err)
      set({ error: err.message || 'Failed to clear cart' })
    } finally {
      set({ loading: false })
    }
  },
}))