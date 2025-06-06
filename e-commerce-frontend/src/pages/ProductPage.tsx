import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown, X, Search, SlidersHorizontal, ShoppingCart } from 'lucide-react';
import { useProducts, useBrands, useCategories, ProductQueryParams } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { Product } from '../hooks/useProducts';
import { useCartStore } from '../store/useCartStore';

interface FilterState {
  category: string;
  brand: string;
  minPrice: number | null;
  maxPrice: number | null;
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Cart store
  const { addToCart, items: cartItems, loading: cartLoading, error: cartError } = useCartStore();
  
  // State za filtere
  const [filters, setFilters] = useState<FilterState>({
    category: searchParams.get('category') || '',
    brand:    searchParams.get('brand')    || '',
    minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : null,
    maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : null,
    search:   searchParams.get('search')   || '',
    sortBy:   searchParams.get('sortBy')   || 'name',
    sortOrder:(searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc'
  });

  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [itemsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Notification state
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });

  // **SINKRONIZACIJA STATE-A SA URL-OM**
  useEffect(() => {
    setFilters({
      category: searchParams.get('category') || '',
      brand:    searchParams.get('brand')    || '',
      minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : null,
      maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : null,
      search:   searchParams.get('search')   || '',
      sortBy:   searchParams.get('sortBy')   || 'name',
      sortOrder:(searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc'
    });
    setCurrentPage(parseInt(searchParams.get('page') || '1'));
  }, [searchParams]);

  // Prepare query parameters
  const queryParams: ProductQueryParams = {
    page:       currentPage,
    limit:      itemsPerPage,
    ...(filters.category && { category: filters.category }),
    ...(filters.brand    && { brand:    filters.brand }),
    ...(filters.minPrice && { minPrice: filters.minPrice }),
    ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
    ...(filters.search   && { search:   filters.search }),
    sortBy:     filters.sortBy,
    sortOrder:  filters.sortOrder
  };

  // Fetch data using React Query hooks
  const { data: productsData, isLoading, error, refetch } = useProducts(queryParams);
  const { data: brandsData }     = useBrands();
  const { data: categoriesData } = useCategories();

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.brand)    params.set('brand',    filters.brand);
    if (filters.minPrice !== null) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== null) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.search)  params.set('search',   filters.search);
    if (filters.sortBy !== 'name')   params.set('sortBy',   filters.sortBy);
    if (filters.sortOrder !== 'asc') params.set('sortOrder',filters.sortOrder);
    if (currentPage > 1) params.set('page', currentPage.toString());
    setSearchParams(params);
  }, [filters, currentPage, setSearchParams]);

  // Show notification
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      brand:    '',
      minPrice: null,
      maxPrice: null,
      search:   '',
      sortBy:   'name',
      sortOrder:'asc'
    });
    setCurrentPage(1);
  };

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product._id, 1);
      showNotification(`${product.name} je dodat u korpu!`, 'success');
    } catch (error) {
      showNotification('Greška pri dodavanju u korpu', 'error');
    }
  };

  const handleAddToWishlist = (product: Product) => {
    console.log('Dodaj u listu želja:', product);
    showNotification(`${product.name} je dodat u listu želja!`, 'success');
    // TODO: implementiraj wishlist funkcionalnost
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const renderPagination = () => {
    if (!productsData?.pagination) return null;
    const { currentPage, totalPages, hasNextPage, hasPrevPage } = productsData.pagination;
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage   = Math.min(totalPages, currentPage + 2);
    for (let i = startPage; i <= endPage; i++) pages.push(i);

    return (
      <div className="flex justify-center items-center space-x-2 mt-12">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={!hasPrevPage}
          className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50">
          Prethodna
        </button>
        {startPage > 1 && <>
          <button onClick={() => setCurrentPage(1)} className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700">1</button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>}
        {pages.map(p => (
          <button key={p} onClick={() => setCurrentPage(p)}
            className={`px-3 py-2 rounded-lg ${p === currentPage ? 'bg-orange-500 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}>
            {p}
          </button>
        ))}
        {endPage < totalPages && <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <button onClick={() => setCurrentPage(totalPages)} className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700">
            {totalPages}
          </button>
        </>}
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={!hasNextPage}
          className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50">
          Sledeća
        </button>
      </div>
    );
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-400 mb-4">Greška pri učitavanju</h1>
          <p className="mb-6 text-gray-400">{error.message}</p>
          <button onClick={() => refetch()} className="px-6 py-3 bg-orange-500 rounded-lg hover:bg-orange-600">Pokušaj ponovo</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Animated bg blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Proizvodi</h1>
            <p className="text-gray-400">{productsData?.pagination.totalItems || 0} proizvoda</p>
          </div>
          
          {/* Cart button */}
          <button
            onClick={goToCart}
            className="relative flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Korpa</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>

        {/* Search & controls */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pretraži proizvode..."
              value={filters.search}
              onChange={e => handleFilterChange('search', e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => setShowFilters(!showFilters)} className="flex items-center px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                <SlidersHorizontal className="w-4 h-4" /> <span>Filteri</span>
              </button>
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={e => {
                  const [sb, so] = e.target.value.split('-');
                  handleFilterChange('sortBy', sb);
                  handleFilterChange('sortOrder', so);
                }}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
              >
                <option value="name-asc">Naziv A-Z</option>
                <option value="name-desc">Naziv Z-A</option>
                <option value="price-asc">Cena rastući</option>
                <option value="price-desc">Cena opadajući</option>
                <option value="createdAt-desc">Najnoviji</option>
                <option value="createdAt-asc">Najstariji</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode==='grid'?'bg-orange-500':'bg-gray-800 hover:bg-gray-700'}`}><Grid className="w-4 h-4" /></button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode==='list'?'bg-orange-500':'bg-gray-800 hover:bg-gray-700'}`}><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="mb-8 p-6 bg-gray-800/30 rounded-xl border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category */}
              <div>
                <label className="block mb-2">Kategorija</label>
                <select
                  value={filters.category}
                  onChange={e => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
                >
                  <option value="">Sve kategorije</option>
                  {categoriesData?.data && Object.keys(categoriesData.data).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              {/* Brand */}
              <div>
                <label className="block mb-2">Brend</label>
                <select
                  value={filters.brand}
                  onChange={e => handleFilterChange('brand', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
                >
                  <option value="">Svi brendovi</option>
                  {brandsData?.data?.map(b => (
                    <option key={b.name} value={b.name}>
                      {b.name} ({b.count})
                    </option>
                  ))}
                </select>
              </div>
              {/* Min price */}
              <div>
                <label className="block mb-2">Min. cena</label>
                <input
                  type="number"
                  value={filters.minPrice||''}
                  onChange={e => handleFilterChange('minPrice', e.target.value?parseInt(e.target.value):null)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
                />
              </div>
              {/* Max price */}
              <div>
                <label className="block mb-2">Max. cena</label>
                <input
                  type="number"
                  value={filters.maxPrice||''}
                  onChange={e => handleFilterChange('maxPrice', e.target.value?parseInt(e.target.value):null)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span>Aktivni filteri: {Object.values(filters).filter(v=>v && v!=='').length}</span>
              <button onClick={clearFilters} className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700">
                <X className="inline w-4 h-4 mr-1"/> Očisti sve
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin h-16 w-16 border-b-2 border-orange-500 rounded-full"></div>
          </div>
        )}

        {/* Products */}
        {!isLoading && productsData?.data && (
          <>
            {productsData.data.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-2xl mb-4">Nema proizvoda</h3>
                <button onClick={clearFilters} className="px-6 py-3 bg-orange-500 rounded-lg hover:bg-orange-600">Očisti filtere</button>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode==='grid'?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6':'grid-cols-1'}`}>
                {productsData.data.map(prod => (
                  <ProductCard
                    key={prod._id}
                    product={prod}
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
               
                  />
                ))}
              </div>
            )}
            {productsData.pagination.totalPages > 1 && renderPagination()}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;