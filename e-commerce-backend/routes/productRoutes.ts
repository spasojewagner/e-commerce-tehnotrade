// routes/productRoutes.ts
import express, { Router } from 'express';
import {
  getProducts,
  getProductById,
  getProductBySku,
  getCategories,
  getBrands
} from '../controllers/productController';

const router: Router = express.Router();

// GET /api/products - Lista proizvoda sa filterima i paginacijom
router.get('/', getProducts);

// GET /api/products/categories - Sve kategorije
router.get('/categories', getCategories);

// GET /api/products/brands - Svi brendovi
router.get('/brands', getBrands);

// GET /api/products/:id - Proizvod po ID
router.get('/:id', getProductById);

// GET /api/products/sku/:sku - Proizvod po SKU
router.get('/sku/:sku', getProductBySku);

export default router;

/* 
PRIMERI KORIŠĆENJA:

1. Osnovno dohvatanje:
GET /api/products

2. Sa paginacijom:
GET /api/products?page=2&limit=24

3. Filter po kategoriji:
GET /api/products?category=Bela Tehnika

4. Filter po brendu:
GET /api/products?brand=Samsung

5. Filter po ceni:
GET /api/products?minPrice=100&maxPrice=500

6. Pretraga:
GET /api/products?search=frizider

7. Sortiranje:
GET /api/products?sortBy=price&sortOrder=desc

8. Kombinovani filteri:
GET /api/products?category=Mali kucni aparati&brand=Philips&minPrice=50&maxPrice=200&page=1&limit=12&sortBy=price&sortOrder=asc

9. Dohvati kategorije:
GET /api/products/categories

10. Dohvati brendove:
GET /api/products/brands

11. Dohvati proizvod po ID:
GET /api/products/6372b1c22bf14ad3dc944f75

12. Dohvati proizvod po SKU:
GET /api/products/sku/CAIOTG-01

ODGOVOR STRUKTURA:
{
  "success": true,
  "data": [...products],
  "pagination": {
    "currentPage": 1,
    "totalPages": 15,
    "totalItems": 180,
    "itemsPerPage": 12,
    "hasNextPage": true,
    "hasPrevPage": false,
    "nextPage": 2,
    "prevPage": null
  },
  "appliedFilters": {
    "category": "Bela Tehnika",
    "brand": null,
    "minPrice": null,
    "maxPrice": null,
    "search": null,
    "sortBy": "name",
    "sortOrder": "asc"
  }
}

TIPOVI ZA KLIJENTSKU STRANU:

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
*/