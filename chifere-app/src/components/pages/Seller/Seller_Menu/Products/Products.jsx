import React, { useState } from 'react';
import SellerLayout from '../Seller_Layout/SellerLayout';
import { theme } from '../../../../../styles/designSystem';
import { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiMoreVertical, 
  FiEye, 
  FiEdit3, 
  FiTrash2, 
  FiToggleLeft, 
  FiToggleRight,
  FiTrendingUp,
  FiDollarSign
} from 'react-icons/fi';

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Vintage Leather Jacket',
      price: 2500,
      originalPrice: 3500,
      category: 'Fashion',
      status: 'active',
      condition: 'Good',
      views: 127,
      likes: 23,
      image: '/placeholder-product.svg',
      createdAt: '2025-01-15',
      isBarter: false,
      isActive: true
    },
    {
      id: 2,
      name: 'MacBook Pro 13" M2',
      price: 68990,
      originalPrice: 75000,
      category: 'Electronics',
      status: 'sold',
      condition: 'Like New',
      views: 234,
      likes: 45,
      image: '/placeholder-product.svg',
      createdAt: '2025-01-10',
      isBarter: false,
      isActive: false
    },
    {
      id: 3,
      name: 'Antique Wooden Chair',
      price: 0,
      originalPrice: 0,
      category: 'Furniture',
      status: 'active',
      condition: 'Good',
      views: 89,
      likes: 12,
      image: '/placeholder-product.svg',
      createdAt: '2025-01-12',
      isBarter: true,
      barterFor: 'Vintage Books or Records',
      isActive: true
    },
    {
      id: 4,
      name: 'Samsung Galaxy Watch 4',
      price: 12990,
      originalPrice: 15000,
      category: 'Electronics',
      status: 'active',
      condition: 'Excellent',
      views: 156,
      likes: 34,
      image: '/placeholder-product.svg',
      createdAt: '2025-01-08',
      isBarter: false,
      isActive: true
    },
    {
      id: 5,
      name: 'Vintage Camera Collection',
      price: 0,
      originalPrice: 0,
      category: 'Collectibles',
      status: 'active',
      condition: 'Good',
      views: 67,
      likes: 18,
      image: '/placeholder-product.svg',
      createdAt: '2025-01-05',
      isBarter: true,
      barterFor: 'Vintage Watches or Coins',
      isActive: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'collectibles', label: 'Collectibles' }
  ];

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'sold', label: 'Sold' },
    { value: 'draft', label: 'Draft' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const toggleProductStatus = (productId) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, isActive: !product.isActive, status: !product.isActive ? 'active' : 'inactive' }
        : product
    ));
  };

  const deleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  const ProductCard = ({ product }) => (
    <div className="card-base p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start space-x-4">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="absolute -top-2 -right-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.status === 'active' ? 'bg-green-100 text-green-700' :
              product.status === 'sold' ? 'bg-blue-100 text-blue-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {product.status}
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleProductStatus(product.id)}
                className={`p-1 rounded transition-colors ${product.isActive ? 'text-green-500 hover:text-green-600' : 'text-gray-400 hover:text-gray-500'}`}
              >
                {product.isActive ? <FiToggleRight className="w-5 h-5" /> : <FiToggleLeft className="w-5 h-5" />}
              </button>
              <div className="relative group">
                <button className="p-1 rounded hover:bg-gray-100">
                  <FiMoreVertical className="w-5 h-5 text-gray-400" />
                </button>
                <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                      <FiEye className="w-4 h-4 mr-3" />
                      View Details
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                      <FiEdit3 className="w-4 h-4 mr-3" />
                      Edit Product
                    </button>
                    <button 
                      onClick={() => deleteProduct(product.id)}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <FiTrash2 className="w-4 h-4 mr-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-3">
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
              {product.category}
            </span>
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
              {product.condition}
            </span>
            {product.isBarter && (
              <span className="text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded-full">
                Barter
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              {product.isBarter ? (
                <div>
                  <p className="font-bold text-orange-600">Barter Only</p>
                  <p className="text-sm text-gray-600">For: {product.barterFor}</p>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold" style={{ color: theme.colors.primary[600] }}>
                    ₱{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ₱{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              )}
              <p className="text-xs text-gray-500">Listed on {product.createdAt}</p>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end space-x-4 text-sm text-gray-600 mb-1">
                <div className="flex items-center">
                  <FiEye className="w-4 h-4 mr-1" />
                  {product.views}
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 mr-1">♥</span>
                  {product.likes}
                </div>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <FiTrendingUp className="w-3 h-3 mr-1" />
                Performance
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SellerLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Add Button */}
        <div className="flex justify-end mb-6">
          <button className="btn-base btn-md btn-primary">
            <FiPlus className="w-5 h-5 mr-2" />
            Add New Product
          </button>
        </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card-base p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Products</p>
                  <p className="text-2xl font-bold text-gray-800">{products.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FiTrendingUp className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="card-base p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Active Listings</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {products.filter(p => p.status === 'active').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FiToggleRight className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>

            <div className="card-base p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Sold Items</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {products.filter(p => p.status === 'sold').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FiDollarSign className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </div>

            <div className="card-base p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Views</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {products.reduce((sum, p) => sum + p.views, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FiEye className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="card-base p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-base pl-10 pr-4"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-base min-w-[160px]"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="input-base min-w-[140px]"
                >
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>

                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn-base btn-md btn-outline"
                >
                  <FiFilter className="w-5 h-5 mr-2" />
                  Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="card-base p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <FiTrendingUp className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <button className="btn-base btn-md btn-primary">
                  <FiPlus className="w-5 h-5 mr-2" />
                  Add Your First Product
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="flex items-center justify-between mt-8">
              <p className="text-sm text-gray-600">
                Showing 1 to {filteredProducts.length} of {filteredProducts.length} results
              </p>
              <div className="flex items-center space-x-2">
                <button className="btn-base btn-sm btn-outline" disabled>
                  Previous
                </button>
                <button className="btn-base btn-sm btn-primary">
                  1
                </button>
                <button className="btn-base btn-sm btn-outline" disabled>
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
    </SellerLayout>
  );
};

export default Products;