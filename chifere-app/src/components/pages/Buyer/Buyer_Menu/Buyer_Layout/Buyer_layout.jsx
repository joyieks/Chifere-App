import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiChevronDown, FiPhone, FiSearch, FiBell, FiHeart } from 'react-icons/fi';
import brentImg from '/src/assets/brent.jpg';
import { useNavigate } from 'react-router-dom';

const BuyerLayout = ({ children }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.profile-dropdown')) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showDropdown]);

  // Close categories dropdown when clicking outside
  React.useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.categories-dropdown')) {
        setShowCategories(false);
      }
    };
    if (showCategories) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showCategories]);

  const handleDropdownToggle = () => setShowDropdown((prev) => !prev);

  const handleAccount = () => {
    setShowDropdown(false);
    navigate('/buyer/account');
  };
  const handlePurchased = () => {
    setShowDropdown(false);
    navigate('/buyer/purchase');
  };
  const handleSettings = () => {
    setShowDropdown(false);
    navigate('/buyer/settings');
  };
  const handleLogout = () => {
    setShowDropdown(false);
    // Add your logout logic here
  };

  const handleNotifications = () => {
    navigate('/buyer/notifications');
  };

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

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col">
      {/* Top Promotional Bar */}
      <div className="bg-blue-800 text-white py-2 px-6">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-2">
            <FiPhone size={14} />
            <span>University of Cebu Banilad</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Get 50% Off on Selected Items</span>
            <a href="#" className="underline hover:no-underline">Shop Now</a>
          </div>
          <div className="flex items-center space-x-4">
            <select className="bg-transparent border-none text-white text-sm focus:outline-none">
              <option>Eng</option>
            </select>
            <select className="bg-transparent border-none text-white text-sm focus:outline-none">
              <option>Location</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <motion.button
            className="flex items-center space-x-2 text-2xl font-bold text-blue-800 focus:outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate('/buyer/dashboard')}
            type="button"
            style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}
          >
            <img src="/chiflogo.png" alt="Chifere Logo" className="w-10 h-10 object-contain" />
            <span>ChiFere Cebu</span>
          </motion.button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative categories-dropdown">
              <button 
                className="flex items-center text-gray-700 hover:text-blue-800 transition bg-gray-100 border border-gray-300 rounded-full px-4 py-2 shadow-sm"
                onClick={e => {
                  e.stopPropagation();
                  setShowCategories(!showCategories);
                }}
                type="button"
              >
                <span>Categories</span>
                <FiChevronDown className="ml-0.5 -mr-1" />
              </button>
              {showCategories && (
                <div 
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-lg py-2 z-50 border border-gray-200"
                  onClick={e => e.stopPropagation()}
                >
                  {categories.map((category, index) => (
                    <a 
                      key={index} 
                      href="#" 
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 rounded-full transition"
                    >
                      {category}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <button className="text-gray-700 hover:text-blue-800 transition bg-gray-100 border border-gray-300 rounded-full px-4 py-2 shadow-sm">
              Barter Items
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Product"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyDown={e => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
                  }
                }}
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-800 transition" onClick={handleNotifications}>
                <FiBell size={20} />
                <span className="relative hidden sm:inline">
                    Notifications
                </span>
            </button>
            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-800 transition" onClick={() => navigate('/buyer/wishlist')}>
                <FiHeart size={20} />
                <span className="relative hidden sm:inline">
                    Wishlists
                </span>
            </button>
            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-800 transition" onClick={() => navigate('/buyer/cart')}>
              <FiShoppingCart size={20} />
              <span className="relative hidden sm:inline">
                Cart
                <span className="absolute -top-3 -right-4 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </span>
            </button>
            <div
              className="relative profile-dropdown"
              onMouseEnter={() => setShowDropdown(true)}
            >
              <button
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-800 transition focus:outline-none"
                onClick={handleDropdownToggle}
                type="button"
              >
                <img src={brentImg} alt="Brent" className="w-8 h-8 rounded-full object-cover border-2 border-blue-800" />
                <span className="hidden sm:inline font-semibold">Brent</span>
                <FiChevronDown className="ml-1" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-200 animate-fade-in">
                  <button onClick={handleAccount} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 rounded transition">My Account</button>
                  <button onClick={handlePurchased} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 rounded transition">My Purchased</button>
                  <button onClick={handleSettings} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 rounded transition">Settings</button>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 rounded transition">Log Out</button>
                </div>
              )}
            </div>
          </div> 
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default BuyerLayout;
