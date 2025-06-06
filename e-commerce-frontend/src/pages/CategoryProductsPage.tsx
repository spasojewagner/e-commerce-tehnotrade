// pages/CategoryProductsPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useProducts, ProductQueryParams } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { ChevronDown, Filter, Grid, List, Loader2 } from 'lucide-react';

interface CategoryProductsPageProps {
  onAddToCart: (product: any, quantity?: number) => void;
  onAddToWishlist: (product: any) => void;
}

const CategoryProductsPage: React.FC<CategoryProductsPageProps> = ({ 
  onAddToCart, 
  onAddToWishlist 
}) => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Filter states
  const [filters, setFilters] = useState<ProductQueryParams>({
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '12'),
    category: categoryName || undefined,
    brand: searchParams.get('brand') || undefined,
    minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
    maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
    search: searchParams.get('search') || undefined,
    sortBy: searchParams.get('sortBy') || 'name',
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc'
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products using the hook
  const { data: productsData, isLoading, error, refetch } = useProducts(filters);

  // Update filters when URL params change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: categoryName || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      brand: searchParams.get('brand') || undefined,
      minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
      search: searchParams.get('search') || undefined,
      sortBy: searchParams.get('sortBy') || 'name',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc'
    }));
  }, [categoryName, searchParams]);

  // Update URL when filters change
  const updateURL = (newFilters: Partial<ProductQueryParams>) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    // Reset to page 1 when filters change (except when explicitly changing page)
    if (!newFilters.hasOwnProperty('page')) {
      params.set('page', '1');
    }

    setSearchParams(params);
  };

  const handleFilterChange = (newFilters: Partial<ProductQueryParams>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    updateURL(newFilters);
  };

  const handleSortChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    handleFilterChange({ sortBy, sortOrder });
  };

  const handlePageChange = (page: number) => {
    handleFilterChange({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    const clearedFilters: ProductQueryParams = {
      page: 1,
      limit: filters.limit,
      category: categoryName || undefined,
      sortBy: 'name',
      sortOrder: 'asc'
    };
    setFilters(clearedFilters);
    updateURL(clearedFilters);
  };

  // Decode category name for display
  const displayCategoryName = decodeURIComponent(categoryName || 'Svi proizvodi');

  if (error) {
    return (
      <div className="flex-1 p-8">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-red-400 mb-2">Greška pri učitavanju proizvoda</h2>
          <p className="text-gray-400 mb-4">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors"
          >
            Pokušaj ponovo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{displayCategoryName}</h1>
        <p className="text-gray-400">
          {productsData?.pagination.totalItems || 0} proizvoda pronađeno
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-gray-800/30 hover:bg-gray-700/30 px-4 py-2 rounded-lg border border-gray-700/50 transition-colors lg:hidden"
        >
          <Filter size={18} />
          Filteri
        </button>

        <div className="flex items-center gap-4">
          {/* View Mode */}
          <div className="flex bg-gray-800/30 rounded-lg border border-gray-700/50">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-l-lg transition-colors ${
                viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-r-lg transition-colors ${
                viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List size={18} />
            </button>
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-');
                handleSortChange(sortBy, sortOrder as 'asc' | 'desc');
              }}
              className="bg-gray-800/30 border border-gray-700/50 rounded-lg px-4 py-2 text-white appearance-none pr-8 min-w-[200px]"
            >
              <option value="name-asc">Naziv A-Z</option>
              <option value="name-desc">Naziv Z-A</option>
              <option value="price-asc">Cena: Niska - Visoka</option>
              <option value="price-desc">Cena: Visoka - Niska</option>
              <option value="rating-desc">Najbolje ocenjeno</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <div className={`mb-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
        <div className="bg-gray-800/20 rounded-lg p-6 border border-gray-700/30">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Brend</label>
              <input
                type="text"
                placeholder="Pretraži brendove..."
                value={filters.brand || ''}
                onChange={(e) => handleFilterChange({ brand: e.target.value || undefined })}
                className="w-full bg-gray-700/30 border border-gray-600/50 rounded-lg px-3 py-2 text-white placeholder-gray-400"
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Min. cena</label>
              <input
                type="number"
                placeholder="0"
                value={filters.minPrice || ''}
                onChange={(e) => handleFilterChange({ minPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                className="w-full bg-gray-700/30 border border-gray-600/50 rounded-lg px-3 py-2 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Max. cena</label>
              <input
                type="number"
                placeholder="999999"
                value={filters.maxPrice || ''}
                onChange={(e) => handleFilterChange({ maxPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                className="w-full bg-gray-700/30 border border-gray-600/50 rounded-lg px-3 py-2 text-white placeholder-gray-400"
              />
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Obriši filtere
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin mr-2" size={24} />
          <span>Učitavanje proizvoda...</span>
        </div>
      )}

      {/* Products Grid/List */}
      {!isLoading && productsData && (
        <>
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'space-y-4'
          }`}>
            {productsData.data.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
                viewMode={viewMode}
              />
            ))}
          </div>

          {/* No Products */}
          {productsData.data.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400 mb-4">Nema proizvoda koji odgovaraju vašim kriterijumima</p>
              <button
                onClick={clearFilters}
                className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg transition-colors"
              >
                Obriši filtere
              </button>
            </div>
          )}

          {/* Pagination */}
          {productsData.pagination.totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 gap-2">
              <button
                onClick={() => handlePageChange(productsData.pagination.currentPage - 1)}
                disabled={!productsData.pagination.hasPrevPage}
                className="px-4 py-2 bg-gray-800/30 border border-gray-700/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700/30 transition-colors"
              >
                Prethodna
              </button>

              {Array.from({ length: productsData.pagination.totalPages }, (_, i) => i + 1)
                .filter(page => {
                  const current = productsData.pagination.currentPage;
                  return page === 1 || page === productsData.pagination.totalPages || 
                         (page >= current - 2 && page <= current + 2);
                })
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        page === productsData.pagination.currentPage
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-800/30 border border-gray-700/50 hover:bg-gray-700/30'
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}

              <button
                onClick={() => handlePageChange(productsData.pagination.currentPage + 1)}
                disabled={!productsData.pagination.hasNextPage}
                className="px-4 py-2 bg-gray-800/30 border border-gray-700/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700/30 transition-colors"
              >
                Sledeća
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryProductsPage;