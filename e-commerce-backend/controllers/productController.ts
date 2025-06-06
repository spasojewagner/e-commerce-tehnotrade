// controllers/productController.ts
import { Request, Response } from 'express';
import { Product } from '../models/products';

// Tipovi za query parametre
interface ProductQueryParams {
  page?: string;
  limit?: string;
  category?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface ProductFilters {
  categories?: { $in: string[] };
  brand?: { $regex: string; $options: string };
  price?: { $gte?: number; $lte?: number };
  $or?: Array<{
    name?: { $regex: string; $options: string };
    description?: { $regex: string; $options: string };
    sku?: { $regex: string; $options: string };
  }>;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

interface ProductResponse {
  success: boolean;
  data: any[];
  pagination: PaginationInfo;
  appliedFilters: Partial<ProductQueryParams>;
}

interface SingleProductResponse {
  success: boolean;
  data?: any;
  message?: string;
}

interface CategoriesResponse {
  success: boolean;
  data: OrganizedCategories;
}

interface BrandsResponse {
  success: boolean;
  data: Array<{
    name: string;
    count: number;
  }>;
}

interface OrganizedCategories {
  [key: string]: {
    subcategories: { [key: string]: any };
  };
}

export const getProducts = async (req: Request<{}, ProductResponse, {}, ProductQueryParams>, res: Response<ProductResponse>): Promise<void> => {
  try {
    const {
      page = '1',
      limit = '12',
      category,
      brand,
      minPrice,
      maxPrice,
      search,
      sortBy = 'name',
      sortOrder = 'asc'
    } = req.query;

    // Build query object
    const query: ProductFilters = {};

    // Filter by category (exact match ili contains)
    if (category) {
      query.categories = { $in: [category] };
    }

    // Filter by brand
    if (brand) {
      query.brand = { $regex: brand, $options: 'i' };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination setup
    const pageNum: number = parseInt(page);
    const limitNum: number = parseInt(limit);
    const skip: number = (pageNum - 1) * limitNum;

    // Sort setup
    const sortObj: Record<string, 1 | -1> = {};
    sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute queries
    const [products, totalCount] = await Promise.all([
      Product.find(query)
        .sort(sortObj)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Product.countDocuments(query)
    ]);

    // Calculate pagination info
    const totalPages: number = Math.ceil(totalCount / limitNum);
    const hasNextPage: boolean = pageNum < totalPages;
    const hasPrevPage: boolean = pageNum > 1;

    const paginationInfo: PaginationInfo = {
      currentPage: pageNum,
      totalPages,
      totalItems: totalCount,
      itemsPerPage: limitNum,
      hasNextPage,
      hasPrevPage,
      nextPage: hasNextPage ? pageNum + 1 : null,
      prevPage: hasPrevPage ? pageNum - 1 : null
    };

    const response: ProductResponse = {
      success: true,
      data: products,
      pagination: paginationInfo,
      appliedFilters: {
        category,
        brand,
        minPrice,
        maxPrice,
        search,
        sortBy,
        sortOrder
      }
    };

    res.json(response);

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      data: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: 12,
        hasNextPage: false,
        hasPrevPage: false,
        nextPage: null,
        prevPage: null
      },
      appliedFilters: {}
    });
  }
};

export const getProductById = async (req: Request<{ id: string }>, res: Response<SingleProductResponse>): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found'
      });
      return;
    }

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getProductBySku = async (req: Request<{ sku: string }>, res: Response<SingleProductResponse>): Promise<void> => {
  try {
    const { sku } = req.params;
    const product = await Product.findOne({ sku });

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found'
      });
      return;
    }

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getCategories = async (req: Request, res: Response<CategoriesResponse>): Promise<void> => {
  try {
    // Uzmi sve kategorije iz svih proizvoda
    const categories: string[] = await Product.distinct('categories');
    
    // Organizuj kategorije u hijerarhiju
    const organizedCategories: OrganizedCategories = organizeCategories(categories);

    res.json({
      success: true,
      data: organizedCategories
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      data: {}
    });
  }
};

export const getBrands = async (req: Request, res: Response<BrandsResponse>): Promise<void> => {
  try {
    const brandsWithCount = await Product.aggregate([
      { $group: { _id: '$brand', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const brands = brandsWithCount.map(item => ({
      name: item._id,
      count: item.count
    }));

    res.json({
      success: true,
      data: brands
    });

  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({
      success: false,
      data: []
    });
  }
};

// Helper function za organizaciju kategorija
const organizeCategories = (categories: string[]): OrganizedCategories => {
  const organized: OrganizedCategories = {};
  let currentMainCategory = '';

  categories.forEach(category => {
    if (!category.startsWith('-')) {
      // Glavna kategorija
      currentMainCategory = category;
      if (!organized[category]) {
        organized[category] = { subcategories: {} };
      }
    } else if (category.startsWith('--')) {
      // Pod-podkategorija
      const name = category.substring(2);
      if (currentMainCategory && organized[currentMainCategory]) {
        // Dodeli pod-podkategoriju u poslednju podkategoriju
        // Ovo je kompleksnije jer treba da čuvaš kontekst poslednje podkategorije
      }
    } else if (category.startsWith('-')) {
      // Podkategorija
      const name = category.substring(1);
      if (currentMainCategory && organized[currentMainCategory]) {
        organized[currentMainCategory].subcategories[name] = { subsubcategories: {} };
      }
    }
  });

  return organized;
};