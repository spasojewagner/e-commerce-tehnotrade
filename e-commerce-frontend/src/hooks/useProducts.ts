// hooks/useProducts.ts
import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';

const API_BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:4000/api"
  : "/api";


// Tipovi
export interface Product {
  _id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categories: string[];
  brand: string;
  images: string[];
  rating?: number;
  originalPrice?: number;
  discount?: number;
  isNew?: boolean;
  isHot?: boolean;
  inStock?: boolean;
  warranty?: string;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  pagination: PaginationInfo;
  appliedFilters: Partial<ProductQueryParams>;
}

export interface SingleProductResponse {
  success: boolean;
  data?: Product;
  message?: string;
}

export interface BrandInfo {
  name: string;
  count: number;
}

export interface BrandsResponse {
  success: boolean;
  data: BrandInfo[];
}

export interface CategoriesResponse {
  success: boolean;
  data: Record<string, any>;
}

export interface CreateProductData {
  sku: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categories: string[];
  brand: string;
  images: string[];
}

export interface UpdateProductData extends Partial<CreateProductData> {
  _id: string;
}

// API funkcije
const fetchProducts = async (filters: ProductQueryParams): Promise<ProductsResponse> => {
  const {
    page = 1,
    limit = 12,
    category,
    brand,
    minPrice,
    maxPrice,
    search,
    sortBy = 'name',
    sortOrder = 'asc'
  } = filters;

  const queryParams = new URLSearchParams();
  
  queryParams.append('page', page.toString());
  queryParams.append('limit', limit.toString());
  queryParams.append('sortBy', sortBy);
  queryParams.append('sortOrder', sortOrder);
  
  if (category) queryParams.append('category', category);
  if (brand) queryParams.append('brand', brand);
  if (minPrice !== undefined) queryParams.append('minPrice', minPrice.toString());
  if (maxPrice !== undefined) queryParams.append('maxPrice', maxPrice.toString());
  if (search) queryParams.append('search', search);

  const response = await fetch(`${API_BASE_URL}/products?${queryParams}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

const fetchProductById = async (id: string): Promise<SingleProductResponse> => {
  if (!id) throw new Error('Product ID is required');
  
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

const fetchProductBySku = async (sku: string): Promise<SingleProductResponse> => {
  if (!sku) throw new Error('Product SKU is required');
  
  const response = await fetch(`${API_BASE_URL}/products/sku/${sku}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

const fetchCategories = async (): Promise<CategoriesResponse> => {
  const response = await fetch(`${API_BASE_URL}/products/categories`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

const fetchBrands = async (): Promise<BrandsResponse> => {
  const response = await fetch(`${API_BASE_URL}/products/brands`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

const createProduct = async (productData: CreateProductData): Promise<SingleProductResponse> => {
  const token = localStorage.getItem('authToken');
  
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify(productData),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

const updateProduct = async (productData: UpdateProductData): Promise<SingleProductResponse> => {
  const token = localStorage.getItem('authToken');
  const { _id, ...updateData } = productData;
  
  const response = await fetch(`${API_BASE_URL}/products/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify(updateData),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

const deleteProduct = async (id: string): Promise<{ success: boolean; message: string }> => {
  const token = localStorage.getItem('authToken');
  
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// React Query Hooks
export const useProducts = (filters: ProductQueryParams = {}): UseQueryResult<ProductsResponse, Error> => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minuta
    gcTime: 10 * 60 * 1000, // 10 minuta
    refetchOnWindowFocus: false,
  });
};

export const useProduct = (id: string): UseQueryResult<SingleProductResponse, Error> => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id, // Pokreće query samo ako postoji ID
    staleTime: 10 * 60 * 1000, // 10 minuta
    gcTime: 15 * 60 * 1000, // 15 minuta
  });
};

export const useProductBySku = (sku: string): UseQueryResult<SingleProductResponse, Error> => {
  return useQuery({
    queryKey: ['product', 'sku', sku],
    queryFn: () => fetchProductBySku(sku),
    enabled: !!sku,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

export const useCategories = (): UseQueryResult<CategoriesResponse, Error> => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 30 * 60 * 1000, // 30 minuta - kategorije se retko menjaju
    gcTime: 60 * 60 * 1000, // 1 sat
  });
};

export const useBrands = (): UseQueryResult<BrandsResponse, Error> => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};

// Mutation hooks za CRUD operacije
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidate i refetch products queries
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
    onError: (error: Error) => {
      console.error('Error creating product:', error.message);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (data, variables) => {
      // Update cache za specifičan proizvod
      queryClient.setQueryData(['product', variables._id], data);
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
    onError: (error: Error) => {
      console.error('Error updating product:', error.message);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data, productId) => {
      // Ukloni iz cache-a
      queryClient.removeQueries({ queryKey: ['product', productId] });
      
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
    onError: (error: Error) => {
      console.error('Error deleting product:', error.message);
    },
  });
};

// Utility hooks
export const usePrefetchProduct = () => {
  const queryClient = useQueryClient();
  
  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ['product', id],
      queryFn: () => fetchProductById(id),
      staleTime: 10 * 60 * 1000,
    });
  };
};

// Hook za invalidaciju cache-a
export const useInvalidateProducts = () => {
  const queryClient = useQueryClient();
  
  return {
    invalidateAll: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
    invalidateProducts: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    invalidateProduct: (id: string) => {
      queryClient.invalidateQueries({ queryKey: ['product', id] });
    },
  };
};