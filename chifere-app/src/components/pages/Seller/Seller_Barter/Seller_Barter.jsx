import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiSearch, FiFilter, FiTag, FiDollarSign, FiStar, FiMessageSquare } from 'react-icons/fi';
import SellerLayout from '../Seller_Layout/Seller_layout.jsx';
import { useNavigate } from 'react-router-dom';

const SellerBarter = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Mock barter items data
  const barterItems = [
    {
      id: 1,
      name: 'Nike Air Max',
      description: 'Excellent condition Nike Air Max running shoes, size 10',
      category: 'Fashion',
      condition: 'Excellent',
      originalPrice: '₱8,500',
      barterValue: '₱3,500',
      images: ['/src/assets/shoppinggirl.png'],
      status: 'Active',
      views: 45,
      messages: 8,
      createdAt: '2024-01-10',
      tags: ['Shoes', 'Nike', 'Running']
    },
    {
      id: 2,
      name: 'Samsung Galaxy S21',
      description: 'Samsung Galaxy S21 in good condition, comes with original box',
      category: 'Electronics',
      condition: 'Good',
      originalPrice: '₱35,000',
      barterValue: '₱18,000',
      images: ['/src/assets/shoppinggirl.png'],
      status: 'Active',
      views: 89,
      messages: 12,
      createdAt: '2024-01-08',
      tags: ['Phone', 'Samsung', 'Android']
    },
    {
      id: 3,
      name: 'Adidas Ultraboost',
      description: 'Adidas Ultraboost running shoes, barely used, size 9',
      category: 'Fashion',
      condition: 'Like New',
      originalPrice: '₱12,000',
      barterValue: '₱5,500',
      images: ['/src/assets/shoppinggirl.png'],
      status: 'Pending',
      views: 23,
      messages: 3,
      createdAt: '2024-01-12',
      tags: ['Shoes', 'Adidas', 'Running']
    },
    {
      id: 4,
      name: 'Canon DSLR Camera',
      description: 'Canon EOS Rebel T7 DSLR camera with 18-55mm lens',
      category: 'Electronics',
      condition: 'Excellent',
      originalPrice: '₱45,000',
      barterValue: '₱25,000',
      images: ['/src/assets/dslr.png'],
      status: 'Active',
      views: 156,
      messages: 25,
      createdAt: '2024-01-05',
      tags: ['Camera', 'Canon', 'DSLR']
    },
    {
      id: 5,
      name: 'Apple Watch Series 6',
      description: 'Apple Watch Series 6 GPS, 44mm, excellent condition',
      category: 'Electronics',
      condition: 'Excellent',
      originalPrice: '₱28,000',
      barterValue: '₱15,000',
      images: ['/src/assets/watch.png'],
      status: 'Sold',
      views: 234,
      messages: 18,
      createdAt: '2024-01-03',
      tags: ['Watch', 'Apple', 'Smartwatch']
    },
    {
      id: 6,
      name: 'Gaming Laptop',
      description: 'ASUS ROG Gaming Laptop, RTX 3060, 16GB RAM',
      category: 'Electronics',
      condition: 'Good',
      originalPrice: '₱75,000',
      barterValue: '₱45,000',
      images: ['/src/assets/shoppinggirl.png'],
      status: 'Active',
      views: 67,
      messages: 9,
      createdAt: '2024-01-15',
      tags: ['Laptop', 'Gaming', 'ASUS']
    }
  ];

  const filters = [
    { key: 'all', label: 'All Items', count: barterItems.length },
    { key: 'active', label: 'Active', count: barterItems.filter(item => item.status === 'Active').length },
    { key: 'pending', label: 'Pending', count: barterItems.filter(item => item.status === 'Pending').length },
    { key: 'sold', label: 'Sold', count: barterItems.filter(item => item.status === 'Sold').length },
  ];

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Collectibles',
    'Art',
    'Books',
    'Toys',
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Sold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Like New': return 'bg-green-100 text-green-800';
      case 'Excellent': return 'bg-blue-100 text-blue-800';
      case 'Good': return 'bg-yellow-100 text-yellow-800';
      case 'Fair': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredItems = barterItems.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.status.toLowerCase() === activeFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddItem = () => {
    navigate('/seller/barter/add');
  };

  const handleEditItem = (id) => {
    navigate(`/seller/barter/edit/${id}`);
  };

  const handleViewItem = (id) => {
    navigate(`/seller/barter/view/${id}`);
  };

  const handleDeleteItem = (id) => {
    // Handle delete logic
    console.log('Deleting item:', id);
  };

  return (
    <SellerLayout>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Barter Items</h1>
              <p className="text-gray-600">Manage your barter item listings</p>
            </div>
            <motion.button
              onClick={handleAddItem}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiPlus size={20} />
              <span>Add Barter Item</span>
            </motion.button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {filters.slice(1).map((filter) => (
            <motion.div
              key={filter.key}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{filter.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{filter.count}</p>
                </div>
                <div className={`p-3 rounded-full ${getStatusColor(filter.label)}`}>
                  <FiTag size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>

            {/* View Mode and Search */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-64 px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Items Grid/List */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FiTag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No barter items found</h3>
            <p className="text-gray-600 mb-6">Start by adding your first barter item</p>
            <button
              onClick={handleAddItem}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Barter Item
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {viewMode === 'grid' ? (
                  // Grid View
                  <div>
                    <div className="relative">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleViewItem(item.id)}
                            className="text-blue-600 hover:text-blue-700"
                            title="View"
                          >
                            <FiEye size={16} />
                          </button>
                          <button
                            onClick={() => handleEditItem(item.id)}
                            className="text-green-600 hover:text-green-700"
                            title="Edit"
                          >
                            <FiEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-600 hover:text-red-700"
                            title="Delete"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
                          {item.condition}
                        </span>
                        <span className="text-sm text-gray-500">{item.category}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Original Price:</span>
                          <span className="font-medium text-gray-900">{item.originalPrice}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Barter Value:</span>
                          <span className="font-semibold text-blue-600">{item.barterValue}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <FiEye size={12} className="mr-1" />
                            {item.views}
                          </span>
                          <span className="flex items-center">
                            <FiMessageSquare size={12} className="mr-1" />
                            {item.messages}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{item.createdAt}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // List View
                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                            <div className="flex space-x-1">
                              <button
                                onClick={() => handleViewItem(item.id)}
                                className="text-blue-600 hover:text-blue-700"
                                title="View"
                              >
                                <FiEye size={16} />
                              </button>
                              <button
                                onClick={() => handleEditItem(item.id)}
                                className="text-green-600 hover:text-green-700"
                                title="Edit"
                              >
                                <FiEdit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="text-red-600 hover:text-red-700"
                                title="Delete"
                              >
                                <FiTrash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
                              {item.condition}
                            </span>
                            <span className="text-sm text-gray-500">{item.category}</span>
                          </div>
                          
                          <div className="flex items-center space-x-6">
                            <div className="text-right">
                              <div className="text-sm text-gray-500">Original Price</div>
                              <div className="font-medium text-gray-900">{item.originalPrice}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">Barter Value</div>
                              <div className="font-semibold text-blue-600">{item.barterValue}</div>
                            </div>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center">
                                <FiEye size={12} className="mr-1" />
                                {item.views}
                              </span>
                              <span className="flex items-center">
                                <FiMessageSquare size={12} className="mr-1" />
                                {item.messages}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </SellerLayout>
  );
};

export default SellerBarter; 