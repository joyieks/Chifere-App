import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const storeData = {
  1: {
    name: 'Brilliant Channel',
    logo: '/maya.png',
    banner: '/gcash.png',
    rating: 4.8,
    reviews: 2547,
    followers: 15420,
    products: 892,
    verified: true,
    location: 'Cebu City, Philippines',
    description: 'Your trusted partner for electronics and gadgets. We offer genuine products with warranty.',
    joinedDate: 'March 2020',
    responseRate: '98%',
    responseTime: '2 hours'
  }
};

const allStoreProducts = [
  {
    id: 1,
    name: 'Canon EOS 2000D Camera With 18-55 DC III KIT SET',
    image: '/maya.png',
    price: 21900,
    originalPrice: 25000,
    discount: 12,
    rating: 4.5,
    reviews: 89,
    sold: 245,
    category: 'Cameras',
    tags: ['Canon', 'DSLR', 'Photography'],
    inStock: true,
    stockCount: 15,
    isNew: false,
    isFeatured: true
  },
  {
    id: 2,
    name: 'Sony WH-1000XM4 Wireless Noise Canceling Headphones',
    image: '/gcash.png',
    price: 15990,
    originalPrice: 18000,
    discount: 11,
    rating: 4.7,
    reviews: 156,
    sold: 89,
    category: 'Audio',
    tags: ['Sony', 'Wireless', 'Noise Canceling'],
    inStock: true,
    stockCount: 8,
    isNew: true,
    isFeatured: true
  },
  {
    id: 3,
    name: 'Apple iPhone 13 Pro Max 256GB Space Gray',
    image: '/maya.png',
    price: 65990,
    originalPrice: 70000,
    discount: 6,
    rating: 4.9,
    reviews: 234,
    sold: 567,
    category: 'Smartphones',
    tags: ['Apple', 'iPhone', '5G'],
    inStock: true,
    stockCount: 3,
    isNew: false,
    isFeatured: false
  },
  {
    id: 4,
    name: 'Samsung Galaxy Watch 4 44mm Bluetooth',
    image: '/gcash.png',
    price: 12990,
    originalPrice: 15000,
    discount: 13,
    rating: 4.4,
    reviews: 67,
    sold: 123,
    category: 'Wearables',
    tags: ['Samsung', 'Smartwatch', 'Fitness'],
    inStock: false,
    stockCount: 0,
    isNew: false,
    isFeatured: false
  },
  {
    id: 5,
    name: 'MacBook Pro 13" M2 Chip 256GB Silver',
    image: '/maya.png',
    price: 68990,
    originalPrice: 75000,
    discount: 8,
    rating: 4.8,
    reviews: 98,
    sold: 45,
    category: 'Laptops',
    tags: ['Apple', 'MacBook', 'M2'],
    inStock: true,
    stockCount: 12,
    isNew: true,
    isFeatured: false
  },
  {
    id: 6,
    name: 'Nintendo Switch OLED Model White',
    image: '/gcash.png',
    price: 19990,
    originalPrice: 22000,
    discount: 9,
    rating: 4.6,
    reviews: 178,
    sold: 298,
    category: 'Gaming',
    tags: ['Nintendo', 'Gaming', 'OLED'],
    inStock: true,
    stockCount: 20,
    isNew: false,
    isFeatured: true
  },
  {
    id: 7,
    name: 'Dell XPS 13 Intel Core i7 16GB RAM',
    image: '/maya.png',
    price: 58990,
    originalPrice: 65000,
    discount: 9,
    rating: 4.5,
    reviews: 112,
    sold: 78,
    category: 'Laptops',
    tags: ['Dell', 'Intel', 'Ultrabook'],
    inStock: true,
    stockCount: 6,
    isNew: false,
    isFeatured: false
  },
  {
    id: 8,
    name: 'AirPods Pro 2nd Generation',
    image: '/gcash.png',
    price: 13990,
    originalPrice: 15000,
    discount: 7,
    rating: 4.7,
    reviews: 203,
    sold: 456,
    category: 'Audio',
    tags: ['Apple', 'Wireless', 'Earbuds'],
    inStock: true,
    stockCount: 25,
    isNew: true,
    isFeatured: true
  },
  {
    id: 9,
    name: 'iPad Air 5th Gen 256GB WiFi',
    image: '/maya.png',
    price: 38990,
    originalPrice: 42000,
    discount: 7,
    rating: 4.6,
    reviews: 89,
    sold: 134,
    category: 'Tablets',
    tags: ['Apple', 'iPad', 'Tablet'],
    inStock: true,
    stockCount: 18,
    isNew: false,
    isFeatured: false
  },
  {
    id: 10,
    name: 'Samsung 55" 4K QLED Smart TV',
    image: '/gcash.png',
    price: 45990,
    originalPrice: 52000,
    discount: 12,
    rating: 4.4,
    reviews: 67,
    sold: 89,
    category: 'Electronics',
    tags: ['Samsung', 'TV', '4K', 'Smart'],
    inStock: true,
    stockCount: 4,
    isNew: false,
    isFeatured: false
  },
  {
    id: 11,
    name: 'Logitech MX Master 3S Wireless Mouse',
    image: '/maya.png',
    price: 5990,
    originalPrice: 7000,
    discount: 14,
    rating: 4.8,
    reviews: 145,
    sold: 267,
    category: 'Accessories',
    tags: ['Logitech', 'Mouse', 'Wireless'],
    inStock: true,
    stockCount: 35,
    isNew: false,
    isFeatured: false
  },
  {
    id: 12,
    name: 'JBL Charge 5 Portable Bluetooth Speaker',
    image: '/gcash.png',
    price: 8990,
    originalPrice: 10000,
    discount: 10,
    rating: 4.5,
    reviews: 234,
    sold: 189,
    category: 'Audio',
    tags: ['JBL', 'Bluetooth', 'Speaker'],
    inStock: true,
    stockCount: 22,
    isNew: false,
    isFeatured: false
  }
];

const BStore_Items = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState(allStoreProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const store = storeData[storeId] || storeData[1];
  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      const matchesAvailability = filterAvailability === 'all' || 
                                 (filterAvailability === 'instock' && product.inStock) ||
                                 (filterAvailability === 'outofstock' && !product.inStock);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesAvailability && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'newest': return b.isNew - a.isNew || b.id - a.id;
        case 'popularity': return b.sold - a.sold;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
  };

  const handleAddToWishlist = (product) => {
    console.log('Adding to wishlist:', product);
  };

  const handleProductClick = (productId) => {
    navigate(`/buyer/product/${productId}`);
  };

  const handleBackToStore = () => {
    navigate(`/buyer/store/${storeId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Store Header Bar */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToStore}
                className="flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Store
              </button>
              
              <div className="flex items-center space-x-3">
                <img 
                  src={store.logo} 
                  alt={store.name} 
                  className="w-10 h-10 object-cover rounded-xl"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-800">{store.name}</h1>
                  <p className="text-sm text-gray-600">{filteredProducts.length} of {products.length} products</p>
                </div>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 002-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-white/20">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1 relative">
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Sort */}
              <div className="lg:w-48">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all duration-200 font-semibold flex items-center space-x-2 lg:w-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
                <span>Filters</span>
                {showFilters ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
                    <select 
                      value={filterCategory} 
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      {categories.filter(cat => cat !== 'all').map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Availability Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Availability</label>
                    <select 
                      value={filterAvailability} 
                      onChange={(e) => setFilterAvailability(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Products</option>
                      <option value="instock">In Stock Only</option>
                      <option value="outofstock">Out of Stock</option>
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Price Range</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0] || ''}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1] || ''}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000])}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">All Products</h2>
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          {/* Quick Filter Tags */}
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition-colors duration-200">
              On Sale ({products.filter(p => p.discount > 0).length})
            </button>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200">
              New Arrivals ({products.filter(p => p.isNew).length})
            </button>
            <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors duration-200">
              Featured ({products.filter(p => p.isFeatured).length})
            </button>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('all');
                setFilterAvailability('all');
                setPriceRange([0, 100000]);
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg border border-white/20 overflow-hidden group hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => handleProductClick(product.id)}
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 space-y-2">
                    {product.discount > 0 && (
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        -{product.discount}%
                      </div>
                    )}
                    {product.isNew && (
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        NEW
                      </div>
                    )}
                    {product.isFeatured && (
                      <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        ⭐
                      </div>
                    )}
                  </div>

                  {/* Stock Status */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-y-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWishlist(product);
                      }}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white transition-all duration-200 shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {product.name}
                  </h3>

                  {/* Rating and Sales */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-600">{product.rating} ({product.reviews})</span>
                    </div>
                    <span className="text-xs text-gray-500">{product.sold} sold</span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-blue-600">₱{product.price.toLocaleString()}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">₱{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>

                  {/* Stock Info */}
                  {product.inStock && (
                    <div className="mb-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.stockCount <= 5 
                          ? 'bg-orange-100 text-orange-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {product.stockCount <= 5 ? `Only ${product.stockCount} left` : 'In Stock'}
                      </span>
                    </div>
                  )}

                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    disabled={!product.inStock}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                      product.inStock
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => handleProductClick(product.id)}
              >
                <div className="p-6">
                  <div className="flex items-center space-x-6">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                          <span className="text-white text-xs font-bold">OUT</span>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
                            {product.name}
                          </h3>
                          
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-sm text-gray-600">{product.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500">{product.sold} sold</span>
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{product.category}</span>
                          </div>

                          <div className="flex items-center space-x-2 mt-2">
                            {product.discount > 0 && (
                              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-semibold">
                                -{product.discount}%
                              </span>
                            )}
                            {product.isNew && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                                NEW
                              </span>
                            )}
                            {product.isFeatured && (
                              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">
                                FEATURED
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="text-right ml-6">
                          <div className="mb-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-blue-600">₱{product.price.toLocaleString()}</span>
                              {product.originalPrice > product.price && (
                                <span className="text-sm text-gray-500 line-through">₱{product.originalPrice.toLocaleString()}</span>
                              )}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToWishlist(product);
                              }}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                              }}
                              disabled={!product.inStock}
                              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                                product.inStock
                                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default BStore_Items;

