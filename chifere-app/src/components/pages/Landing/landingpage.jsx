import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiUser, FiChevronDown, FiStar, FiSearch, FiPhone, FiMapPin, FiFilter, FiBell, FiTrendingUp, FiTag, FiUsers, FiShield } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState('login');
  const [favorites, setFavorites] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample product data with better variety
  const products = [
    {
      id: 1,
      name: "iPhone 14 Pro Max",
      description: "Brand new, 256GB, Deep Purple",
      price: 65999.00,
      originalPrice: 75999.00,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
      rating: 4.9,
      reviews: 234,
      seller: "TechHub Manila",
      condition: "Brand New",
      discount: 13
    },
    {
      id: 2,
      name: "MacBook Air M2",
      description: "13-inch, 8GB RAM, 256GB SSD",
      price: 58999.00,
      originalPrice: 64999.00,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
      rating: 4.8,
      reviews: 189,
      seller: "Apple Store Cebu",
      condition: "Brand New",
      discount: 9
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      description: "Noise canceling headphones",
      price: 15999.00,
      originalPrice: 19999.00,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      rating: 4.7,
      reviews: 156,
      seller: "Audio Paradise",
      condition: "Like New",
      discount: 20
    },
    {
      id: 4,
      name: "Canon EOS R6 Mark II",
      description: "Professional mirrorless camera",
      price: 149999.00,
      originalPrice: 165999.00,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500",
      rating: 4.9,
      reviews: 98,
      seller: "Camera Central",
      condition: "Brand New",
      discount: 10
    }
  ];

  // Barter Items
  const barterItems = [
    {
      id: 5,
      name: "Gaming PC Setup",
      description: "RTX 4070, i7-13700K, 32GB RAM",
      price: "Trade for MacBook Pro",
      image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500",
      rating: 5,
      reviews: 42,
      seller: "GamerHub"
    },
    {
      id: 6,
      name: "Vintage Vinyl Records",
      description: "Classic rock collection (50+ albums)",
      price: "Trade for Guitar",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
      rating: 4.8,
      reviews: 37,
      seller: "Vinyl Collector"
    }
  ];

  const categories = [
    { name: "Electronics", icon: "📱", count: "2.5k+" },
    { name: "Fashion", icon: "👗", count: "1.8k+" },
    { name: "Home & Living", icon: "🏠", count: "950+" },
    { name: "Sports", icon: "⚽", count: "720+" },
    { name: "Books", icon: "📚", count: "680+" },
    { name: "Automotive", icon: "🚗", count: "450+" },
    { name: "Gaming", icon: "🎮", count: "890+" },
    { name: "Beauty", icon: "💄", count: "650+" }
  ];

  const stats = [
    { label: "Active Users", value: "50K+", icon: FiUsers },
    { label: "Items Listed", value: "125K+", icon: FiTag },
    { label: "Successful Trades", value: "25K+", icon: FiTrendingUp },
    { label: "Trust Score", value: "98%", icon: FiShield }
  ];

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(item => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleAuthClick = (type) => {
    setAuthType(type);
    setShowAuthModal(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowCategories(false);
    if (showCategories) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showCategories]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-3 px-6">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
              <FiMapPin size={14} />
              <span className="font-medium">University of Cebu Banilad</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
            <FiPhone size={14} />
              <span>+63 912 345 6789</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4 bg-blue-800/30 px-4 py-1 rounded-full">
              <span className="font-semibold">🎉 Get 50% Off on Selected Items</span>
              <button className="text-yellow-300 hover:text-yellow-100 font-semibold underline">
                Shop Now
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <select className="bg-transparent border border-blue-700 text-white text-sm focus:outline-none px-2 py-1 rounded">
              <option className="bg-blue-800">English</option>
              <option className="bg-blue-800">Filipino</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg py-4 px-6 sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <img src="/chiflogo.png" alt="Chifere Logo" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-indigo-700 bg-clip-text text-transparent">
                  ChiFere Cebu
                </h1>
                <p className="text-xs text-gray-500">Your trusted marketplace</p>
              </div>
          </motion.div>
          
            {/* Enhanced Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products, brands, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-3 pl-12 pr-16 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
                />
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg">
                  Search
                </button>
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-2">
              {[
                { icon: FiBell, label: "Notifications", badge: 3 },
                { icon: FiHeart, label: "Wishlist", badge: favorites.length },
                { icon: FiShoppingCart, label: "Cart", badge: 2 }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={index}
                    onClick={() => navigate('/login')}
                    className="relative p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
                  >
                    <IconComponent size={22} />
                    {item.badge > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                        {item.badge}
                      </span>
                    )}
                    <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.label}
                    </span>
                  </button>
                );
              })}
              
              <div className="w-px h-8 bg-gray-300 mx-2"></div>
              
              <button
                onClick={() => navigate('/login')}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg transform hover:scale-105"
              >
                <FiUser size={18} />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-indigo-900/10 to-purple-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                Now serving 50K+ users in Cebu
        </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                  Buy, Sell & Trade
                </span>
                <br />
                <span className="text-gray-800">with Confidence</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join Cebu's most trusted marketplace for preloved items and unique barter opportunities. 
                Connect with local sellers and discover amazing deals in your area.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
                  onClick={() => navigate('/login')}
                >
                  <FiShoppingCart size={20} />
                  <span>Start Shopping</span>
                </button>
                <button 
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center justify-center space-x-2"
                  onClick={() => navigate('/login')}
                >
                  <FiUsers size={20} />
                  <span>Join Community</span>
                </button>
      </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <IconComponent className="text-white" size={20} />
                      </div>
                      <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            
            {/* Right Content - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-3xl p-8 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  {products.slice(0, 4).map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="bg-white rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                      onClick={() => navigate('/login')}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-24 object-cover rounded-xl mb-3 group-hover:scale-105 transition-transform duration-300"
                      />
                      <h4 className="font-semibold text-sm text-gray-800 mb-1 truncate">{product.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-bold text-sm">₱{product.price.toLocaleString()}</span>
                        <div className="flex items-center">
                          <FiStar className="text-yellow-400" size={12} />
                          <span className="text-xs text-gray-500 ml-1">{product.rating}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-70 blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-70 blur-xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Browse by Category</h2>
              <p className="text-xl text-gray-600">Find exactly what you're looking for</p>
            </motion.div>
        </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-blue-200"
                onClick={() => navigate('/login')}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-800 transition-colors duration-200 mb-2">
                {category.name}
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-blue-600 font-medium">
                  {category.count} items
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

        {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Featured Products</h2>
              <p className="text-xl text-gray-600">Handpicked deals just for you</p>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200">
              View All Products
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
                onClick={() => navigate('/login')}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {product.discount && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        -{product.discount}%
                      </span>
                    )}
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      {product.condition}
                    </span>
                  </div>
                  
                  {/* Wishlist */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${
                      favorites.includes(product.id)
                        ? 'bg-red-500 text-white scale-110'
                        : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    <FiHeart size={18} />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                    {product.name}
                  </h3>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                    <p className="text-blue-600 text-sm font-medium mt-1">{product.seller}</p>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                      <div>
                      <span className="text-2xl font-bold text-blue-600">₱{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">₱{product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                  </div>
                  
                  {/* Add to Cart */}
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold transform group-hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2">
                    <FiShoppingCart size={18} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Barter Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Barter & Trade</h2>
              <p className="text-xl text-gray-600 mb-8">Exchange items with other community members</p>
              <div className="inline-flex items-center bg-purple-100 text-purple-800 px-6 py-3 rounded-full font-semibold">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                Trade without money - Just exchange!
              </div>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {barterItems.map((item, index) => (
                            <motion.div 
                  key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-purple-100 hover:border-purple-200"
                onClick={() => navigate('/login')}
              >
                <div className="flex items-start space-x-6">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                      className="w-32 h-32 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -top-2 -right-2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      BARTER
                    </div>
                </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors duration-200">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                                           <FiStar 
                       key={i} 
                            className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                     />
                    ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        {item.rating} ({item.reviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-purple-600">{item.price}</span>
                        <p className="text-sm text-gray-500">by {item.seller}</p>
                  </div>
                      <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-xl hover:from-purple-700 hover:to-indigo-700 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200">
                      Make Offer
                    </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Start Trading?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of satisfied users who have found great deals and made successful trades on ChiFere Cebu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-200 shadow-2xl transform hover:scale-105"
                onClick={() => navigate('/login')}
              >
                Get Started Today
              </button>
              <button 
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-blue-900 transition-all duration-200"
                onClick={() => navigate('/login')}
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Floating shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-400 rounded-full opacity-20 blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                  <img src="/chiflogo.png" alt="Chifere Logo" className="w-6 h-6 object-contain" />
                </div>
                <span className="text-2xl font-bold">ChiFere Cebu</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your trusted marketplace for buying, selling, and bartering items in Cebu. 
                Building connections through trade.
              </p>
              <div className="flex items-center space-x-2 text-gray-400">
                <FiMapPin size={18} />
                <span>University of Cebu Banilad</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {["About Us", "How It Works", "Contact", "Help Center", "Terms of Service"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Categories</h3>
              <ul className="space-y-3">
                {["Electronics", "Fashion", "Home & Garden", "Sports", "Gaming"].map((category) => (
                  <li key={category}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline">
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Stay Connected</h3>
              <p className="text-gray-400 mb-4">
                Get the latest deals and updates delivered to your inbox.
              </p>
              <div className="flex mb-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-r-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold">
                  Subscribe
          </button>
              </div>
        </div>
      </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 ChiFere Cebu. All rights reserved. Made with ❤️ in Cebu City.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              onClick={() => setShowAuthModal(false)}
            >
              ✕
            </button>
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiUser className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {authType === 'login' ? 'Welcome Back!' : 'Join ChiFere'}
            </h2>
              <p className="text-gray-600 mt-2">
                {authType === 'login' ? 'Sign in to your account' : 'Create your account to get started'}
              </p>
            </div>
            
            <form className="space-y-6">
              {authType === 'signup' && (
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-bold text-lg transition-all duration-200 shadow-lg transform hover:scale-105"
              >
                {authType === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <button 
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
                onClick={() => setAuthType(authType === 'login' ? 'signup' : 'login')}
              >
                {authType === 'login' 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;