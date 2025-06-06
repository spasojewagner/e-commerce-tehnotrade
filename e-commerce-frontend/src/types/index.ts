import { LucideIcon } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  discount: number;
  category: string;
  isNew?: boolean;
  isHot?: boolean;
  description?: string;
  specifications?: Record<string, string>;
  images?: string[];
  inStock?: boolean;
  stockQuantity?: number;
  brand?: string;
  warranty?: string;
  reviews?: Review[];
}

export interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Category {
  name: string;
  icon: LucideIcon;
  subcategories: string[];
}

export interface HotDeal {
  name: string;
  discount: number;
  timeLeft: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  brands: string[];
  rating: number;
  inStock: boolean;
}