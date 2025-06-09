import React, { useState } from 'react';
import { Package, Plus, Edit, Trash2, Search, Filter, Eye, Star } from 'lucide-react';

const AdminPanelProizvodi = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    stock: ''
  });

  // Mock proizvodi za prikaz
  const [products] = useState([
    {
      id: 1,
      name: 'Gejming miš',
      price: 4500,
      category: 'Periferije',
      stock: 25,
      rating: 4.5,
      image: 'https://via.placeholder.com/100'
    },
    {
      id: 2,
      name: 'Mehanička tastatura',
      price: 8900,
      category: 'Periferije',
      stock: 15,
      rating: 4.8,
      image: 'https://via.placeholder.com/100'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dodajem proizvod:', formData);
    // Ovde bi bio API poziv za dodavanje proizvoda
    setShowAddForm(false);
    setFormData({
      name: '',
      price: '',
      category: '',
      description: '',
      image: '',
      stock: ''
    });
  };

  const ProductCard = ({ product }) => (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
            <Package className="w-8 h-8 text-orange-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{product.name}</h3>
            <p className="text-gray-400">{product.category}</p>
            <div className="flex items-center space-x-1 mt-1">
              <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
              <span className="text-sm text-gray-300">{product.rating}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-orange-400">{product.price.toLocaleString()} RSD</p>
          <p className="text-sm text-gray-400">Na stanju: {product.stock}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs ${
          product.stock > 20 
            ? 'bg-green-500/20 text-green-400' 
            : product.stock > 5 
            ? 'bg-orange-500/20 text-orange-400' 
            : 'bg-red-500/20 text-red-400'
        }`}>
          {product.stock > 20 ? 'Dostupno' : product.stock > 5 ? 'Malo' : 'Kritično'}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Upravljanje proizvodima</h1>
          <p className="text-gray-400">Dodajte, uređujte i upravljajte proizvodima</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Dodaj proizvod</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Pretraži proizvode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700/30 border border-gray-600/50 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-orange-500/50 focus:bg-gray-700/50 transition-all text-white"
          />
        </div>
        <button className="px-6 py-3 bg-gray-700/30 border border-gray-600/50 rounded-xl hover:bg-gray-700/50 transition-colors flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300">Filter</span>
        </button>
      </div>

      {/* Add Product Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Dodaj novi proizvod</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Naziv proizvoda *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500/50 text-white"
                    placeholder="Unesite naziv proizvoda"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cena (RSD) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500/50 text-white"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Kategorija *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500/50 text-white"
                  >
                    <option value="">Izaberite kategoriju</option>
                    <option value="Periferije">Periferije</option>
                    <option value="Komponente">Komponente</option>
                    <option value="Laptopovi">Laptopovi</option>
                    <option value="Monitori">Monitori</option>
                    <option value="Ostalo">Ostalo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Količina na stanju *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500/50 text-white"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  URL slike
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500/50 text-white"
                  placeholder="https://example.com/slika.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Opis proizvoda
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500/50 text-white resize-none"
                  placeholder="Unesite opis proizvoda..."
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition-colors"
                >
                  Otkaži
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg text-white transition-all duration-300"
                >
                  Dodaj proizvod
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Package className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{products.length}</p>
              <p className="text-gray-400">Ukupno proizvoda</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Package className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {products.reduce((sum, p) => sum + p.stock, 0)}
              </p>
              <p className="text-gray-400">Ukupno na stanju</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <Package className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {products.filter(p => p.stock < 10).length}
              </p>
              <p className="text-gray-400">Malo na stanju</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelProizvodi;