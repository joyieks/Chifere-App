import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar, FiSearch, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../Navigation';
import { useCart } from '../../../contexts/CartContext';
import { useToast } from '../../Toast';

const LandingPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Sony WH-1000XM4",
      description: "Premium noise-canceling wireless headphones",
      price: 15999.00,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      rating: 5,
      reviews: 234
    },
    {
      id: 2,
      name: "Apple AirPods Pro",
      description: "Active noise cancellation with transparency mode",
      price: 12999.00,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
      rating: 5,
      reviews: 189
    },
    {
      id: 3,
      name: "Bose QuietComfort 35",
      description: "Industry-leading noise cancellation",
      price: 8999.00,
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
      rating: 5,
      reviews: 156
    },
    {
      id: 4,
      name: "Sennheiser HD 660S",
      description: "Reference-class open-back headphones",
      price: 24999.00,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      rating: 5,
      reviews: 98
    }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`${product.name} added to cart!`, 'success');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Welcome to Chifere
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Your trusted marketplace for buying, selling, and bartering
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="flex-1 px-6 py-4 text-gray-900 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-r-lg transition-colors"
                >
                  <FiSearch className="w-6 h-6" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600">Discover amazing deals and unique items</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm ml-2">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    ₱{product.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FiShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/buyer/store')}
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>View All Products</span>
            <FiArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Categories</h2>
            <p className="text-gray-600">Find what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Electronics', icon: '📱', color: 'bg-blue-500' },
              { name: 'Fashion', icon: '👕', color: 'bg-pink-500' },
              { name: 'Home & Garden', icon: '🏠', color: 'bg-green-500' },
              { name: 'Sports', icon: '⚽', color: 'bg-orange-500' },
              { name: 'Books', icon: '📚', color: 'bg-purple-500' },
              { name: 'Automotive', icon: '🚗', color: 'bg-red-500' },
              { name: 'Toys', icon: '🎮', color: 'bg-yellow-500' },
              { name: 'Health', icon: '💊', color: 'bg-teal-500' }
            ].map((category, index) => (
              <motion.button
                key={category.name}
                className="group p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => navigate('/buyer/store')}
              >
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of users buying and selling on Chifere
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Sign Up Now
            </button>
            <button
              onClick={() => navigate('/login')}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;