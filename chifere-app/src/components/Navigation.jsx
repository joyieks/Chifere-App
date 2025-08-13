import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiUser, FiLogOut, FiMenu, FiX, FiBell, FiPhone, FiSearch } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useToast } from './Toast';
import theme from '../styles/designSystem';

const Navigation = ({ showPromotionalBar = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'success');
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full">
      {/* Promotional Bar */}
      {showPromotionalBar && (
        <div style={{ backgroundColor: theme.colors.primary[800] }} className="text-white py-2 px-6">
          <div className="container mx-auto flex justify-between items-center text-sm">
            <div className="flex items-center space-x-2">
              <FiPhone size={14} />
              <span>University of Cebu Banilad</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Get 50% Off on Selected Items</span>
              <Link to="/buyer/dashboard" className="underline hover:no-underline">Shop Now</Link>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                className="bg-transparent border-none text-white text-sm focus:outline-none"
                style={{ backgroundColor: 'transparent' }}
              >
                <option value="en">Eng</option>
              </select>
              <select 
                className="bg-transparent border-none text-white text-sm focus:outline-none"
                style={{ backgroundColor: 'transparent' }}
              >
                <option value="cebu">Cebu</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="bg-white shadow-md sticky top-0" style={{ zIndex: theme.zIndex.sticky }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center" style={{ height: theme.components.navigation.height }}>
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/chiflogo.png" alt="Chifere Cebu" className="h-8 w-8" />
            <span className="text-xl font-bold">
              <span style={{ color: '#3B82F6' }}>ChiFere</span>
              <span style={{ color: '#10B981' }}> Cebu</span>
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands, or categories..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                {/* Notifications */}
                <Link
                  to="/buyer/notifications"
                  className="text-gray-700 hover:text-blue-600 transition-colors relative flex items-center space-x-1"
                >
                  <FiBell className="w-5 h-5" />
                  <span className="hidden lg:block text-sm">Notifications</span>
                </Link>

                {/* Wishlist */}
                <Link
                  to="/buyer/wishlist"
                  className="text-gray-700 hover:text-red-500 transition-colors relative flex items-center space-x-1"
                >
                  <FiHeart className="w-5 h-5" />
                  <span className="hidden lg:block text-sm">Wishlist</span>
                </Link>

                {/* Cart */}
                <Link
                  to="/buyer/cart"
                  className="text-gray-700 hover:text-blue-600 transition-colors relative flex items-center space-x-1"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  <span className="hidden lg:block text-sm">Cart</span>
                  {getCartCount() > 0 && (
                    <span 
                      className="absolute -top-2 -right-2 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                      style={{ backgroundColor: theme.colors.error[500] }}
                    >
                      {getCartCount()}
                    </span>
                  )}
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="hidden lg:block">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      to="/buyer/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Account
                    </Link>
                    <Link
                      to="/buyer/purchase"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Purchases
                    </Link>
                    <Link
                      to="/buyer/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiLogOut className="inline mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>


      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          {/* Mobile Search Bar */}
          <div className="px-4 py-4 border-b border-gray-200">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands, or categories..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
          </div>
          
          <div className="px-4 py-2 space-y-1">
            {user ? (
              <>
                <Link
                  to="/buyer/wishlist"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Wishlist
                </Link>
                <Link
                  to="/buyer/cart"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cart ({getCartCount()})
                </Link>
                <Link
                  to="/buyer/account"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
                <Link
                  to="/buyer/purchase"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Purchases
                </Link>
                <Link
                  to="/buyer/settings"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
      </nav>
    </div>
  );
};

export default Navigation; 