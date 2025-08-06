import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialWishlistItems = [
  {
    id: 1,
    name: 'Canon EOS 2000D Camera With 18-55 DC III KIT SET',
    image: '/maya.png',
    price: 21900,
    originalPrice: 25000,
    discount: 12,
    rating: 4.5,
    reviews: 89,
    seller: 'Brilliant Channel',
    inStock: true,
    stockCount: 15,
    category: 'Cameras',
    addedDate: '2025-01-20',
    priceHistory: [
      { date: '2025-01-15', price: 23000 },
      { date: '2025-01-20', price: 21900 },
    ]
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
    seller: 'Tech Store PH',
    inStock: true,
    stockCount: 8,
    category: 'Audio',
    addedDate: '2025-01-18',
    priceHistory: [
      { date: '2025-01-10', price: 16500 },
      { date: '2025-01-18', price: 15990 },
    ]
  },
  {
    id: 3,
    name: 'Apple iPhone 13 Pro Max 256GB',
    image: '/maya.png',
    price: 65990,
    originalPrice: 70000,
    discount: 6,
    rating: 4.9,
    reviews: 234,
    seller: 'Mobile Hub PH',
    inStock: false,
    stockCount: 0,
    category: 'Smartphones',
    addedDate: '2025-01-15',
    priceHistory: [
      { date: '2025-01-10', price: 68000 },
      { date: '2025-01-15', price: 65990 },
    ]
  },
  {
    id: 4,
    name: 'Samsung Galaxy Watch 4 44mm',
    image: '/gcash.png',
    price: 12990,
    originalPrice: 15000,
    discount: 13,
    rating: 4.4,
    reviews: 67,
    seller: 'Gadget Central',
    inStock: true,
    stockCount: 3,
    category: 'Wearables',
    addedDate: '2025-01-22',
    priceHistory: [
      { date: '2025-01-20', price: 13500 },
      { date: '2025-01-22', price: 12990 },
    ]
  },
  {
    id: 5,
    name: 'MacBook Pro 13" M2 Chip 256GB',
    image: '/maya.png',
    price: 68990,
    originalPrice: 75000,
    discount: 8,
    rating: 4.8,
    reviews: 98,
    seller: 'Apple Store PH',
    inStock: true,
    stockCount: 12,
    category: 'Laptops',
    addedDate: '2025-01-10',
    priceHistory: [
      { date: '2025-01-05', price: 72000 },
      { date: '2025-01-10', price: 68990 },
    ]
  }
];

const Wishlists = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPriceAlert, setShowPriceAlert] = useState(false);

  const categories = ['all', ...new Set(wishlistItems.map(item => item.category))];

  const handleRemoveItem = (itemId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    setSelectedItems(prev => prev.filter(id => id !== itemId));
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    const filteredIds = filteredItems.map(item => item.id);
    setSelectedItems(prev => 
      prev.length === filteredIds.length ? [] : filteredIds
    );
  };

  const handleRemoveSelected = () => {
    setWishlistItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const handleAddToCart = (item) => {
    console.log('Adding to cart:', item);
    // Add to cart logic here
  };

  const handleAddAllToCart = () => {
    const itemsToAdd = wishlistItems.filter(item => selectedItems.includes(item.id) && item.inStock);
    console.log('Adding all to cart:', itemsToAdd);
    // Add all to cart logic here
  };

  const handleProductClick = (productId) => {
    navigate(`/buyer/product/${productId}`);
  };

  const handleSellerClick = (seller) => {
    console.log('Viewing seller:', seller);
    // Navigate to seller store
  };

  const getPriceDrop = (item) => {
    if (item.priceHistory.length < 2) return null;
    const oldPrice = item.priceHistory[0].price;
    const newPrice = item.price;
    return oldPrice > newPrice ? oldPrice - newPrice : null;
  };

  const filteredItems = wishlistItems
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.seller.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === 'all' || 
                           (filterBy === 'instock' && item.inStock) ||
                           (filterBy === 'outofstock' && !item.inStock) ||
                           (filterBy === 'onsale' && item.discount > 0) ||
                           (item.category === filterBy);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest': return new Date(b.addedDate) - new Date(a.addedDate);
        case 'oldest': return new Date(a.addedDate) - new Date(b.addedDate);
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'name': return a.name.localeCompare(b.name);
        case 'rating': return b.rating - a.rating;
        default: return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            My Wishlist
          </h1>
          <p className="text-gray-600 text-xl">Save your favorite items and never miss a deal</p>
          
          {/* Wishlist Stats */}
          <div className="flex justify-center mt-6">
            <div className="flex space-x-6">
              <div className="bg-white/80 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20 shadow-lg">
                <span className="font-semibold text-purple-700">
                  {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="bg-white/80 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20 shadow-lg">
                <span className="font-semibold text-green-700">
                  {wishlistItems.filter(item => item.inStock).length} in stock
                </span>
              </div>
              <div className="bg-white/80 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20 shadow-lg">
                <span className="font-semibold text-red-700">
                  {wishlistItems.filter(item => item.discount > 0).length} on sale
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-white/20">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1 relative">
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search wishlist items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-lg"
                />
              </div>

              {/* Sort */}
              <div className="lg:w-48">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-lg"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Filter */}
              <div className="lg:w-48">
                <select 
                  value={filterBy} 
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-lg"
                >
                  <option value="all">All Items</option>
                  <option value="instock">In Stock</option>
                  <option value="outofstock">Out of Stock</option>
                  <option value="onsale">On Sale</option>
                  {categories.filter(cat => cat !== 'all').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {wishlistItems.length > 0 && (
          <div className="mb-6">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/20">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                      onChange={handleSelectAll}
                      className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="font-medium text-gray-700">
                      Select All ({selectedItems.length} selected)
                    </span>
                  </label>
                </div>

                {selectedItems.length > 0 && (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleAddAllToCart}
                      className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 font-semibold transition-all duration-200 flex items-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9H19M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
                      </svg>
                      <span>Add to Cart</span>
                    </button>
                    <button
                      onClick={handleRemoveSelected}
                      className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold transition-all duration-200 flex items-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Remove</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Wishlist Items */}
        <div className="space-y-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-16 h-16 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-400 mb-4">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-8 text-lg">
                {searchTerm || filterBy !== 'all' ? 'No items match your search criteria' : 'Start adding items you love to your wishlist'}
              </p>
              <button 
                onClick={() => navigate('/buyer/dashboard')}
                className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl hover:from-pink-700 hover:to-purple-700 font-semibold transform hover:scale-105 transition-all duration-200 text-lg"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden group hover:shadow-2xl transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Checkbox */}
                    <div className="flex items-start pt-2">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                    </div>

                    {/* Product Image */}
                    <div className="relative w-full lg:w-48 h-48 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => handleProductClick(item.id)}
                      />
                      
                      {/* Status Badges */}
                      <div className="absolute top-3 left-3 space-y-2">
                        {item.discount > 0 && (
                          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                            -{item.discount}%
                          </div>
                        )}
                        {!item.inStock && (
                          <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                            Out of Stock
                          </div>
                        )}
                        {item.stockCount <= 5 && item.inStock && (
                          <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                            Low Stock
                          </div>
                        )}
                      </div>

                      {/* Price Drop Alert */}
                      {getPriceDrop(item) && (
                        <div className="absolute bottom-3 left-3">
                          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>₱{getPriceDrop(item)} off</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-3">
                        <h3 
                          className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200 cursor-pointer line-clamp-2"
                          onClick={() => handleProductClick(item.id)}
                        >
                          {item.name}
                        </h3>
                        
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Seller and Rating */}
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={() => handleSellerClick(item.seller)}
                          className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                        >
                          by {item.seller}
                        </button>
                        
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm text-gray-600">{item.rating} ({item.reviews})</span>
                          </div>
                          <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl font-bold text-purple-600">₱{item.price.toLocaleString()}</span>
                          {item.originalPrice > item.price && (
                            <span className="text-lg text-gray-500 line-through">₱{item.originalPrice.toLocaleString()}</span>
                          )}
                          {item.discount > 0 && (
                            <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full font-semibold">
                              Save ₱{(item.originalPrice - item.price).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Added Date and Stock Info */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-sm text-gray-500">
                          Added {new Date(item.addedDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </div>
                        
                        {item.inStock && (
                          <div className={`text-sm px-3 py-1 rounded-full font-medium ${
                            item.stockCount <= 5 
                              ? 'bg-orange-100 text-orange-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {item.stockCount <= 5 ? `Only ${item.stockCount} left` : 'In Stock'}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.inStock}
                          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                            item.inStock
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 shadow-lg'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9H19M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
                          </svg>
                          <span>{item.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                        </button>
                        
                        <button
                          onClick={() => handleProductClick(item.id)}
                          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Price Alert Banner */}
        {wishlistItems.some(item => getPriceDrop(item)) && (
          <div className="mt-8 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-800">Great News! Prices Dropped</h3>
                  <p className="text-green-700">Some items in your wishlist are now available at lower prices!</p>
                </div>
              </div>
              <button className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold transition-all duration-200">
                View Deals
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
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

export default Wishlists;