import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiUser, FiLogOut, FiMenu, FiX, FiBell, FiPhone, FiMessageCircle, FiSettings } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useToast } from './Toast';
import theme from '../styles/designSystem';
import SearchAutocomplete from './SearchAutocomplete';

const Navigation = ({ showPromotionalBar = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, switchRole } = useAuth();
  const { getCartCount } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'success');
    navigate('/');
  };

  const handleRoleSwitch = (newRole) => {
    if (switchRole(newRole)) {
      showToast(`Switched to ${newRole} mode`, 'success');
      const dashboardPath = newRole === 'seller' ? '/seller/dashboard' : '/buyer/dashboard';
      navigate(dashboardPath);
    }
  };

  const handleSuggestionSelected = (suggestion) => {
    // Custom handling for suggestion selection if needed
    // The SearchAutocomplete component already handles navigation by default
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

          {/* Search Bar - Only show for buyers */}
          {(!user || user.role === 'buyer') && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <SearchAutocomplete 
                onSuggestionSelected={handleSuggestionSelected}
                className="w-full"
              />
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                {user.role === 'buyer' ? (
                  <>
                    {/* Buyer Navigation Elements */}
                    <Link
                      to="/buyer/messages"
                      className="text-gray-700 hover:text-blue-600 transition-colors relative flex items-center space-x-1"
                    >
                      <FiMessageCircle className="w-5 h-5" />
                      <span className="hidden lg:block text-sm">Messages</span>
                    </Link>

                    <Link
                      to="/buyer/notifications"
                      className="text-gray-700 hover:text-blue-600 transition-colors relative flex items-center space-x-1"
                    >
                      <FiBell className="w-5 h-5" />
                      <span className="hidden lg:block text-sm">Notifications</span>
                    </Link>

                    <Link
                      to="/buyer/wishlist"
                      className="text-gray-700 hover:text-red-500 transition-colors relative flex items-center space-x-1"
                    >
                      <FiHeart className="w-5 h-5" />
                      <span className="hidden lg:block text-sm">Wishlist</span>
                    </Link>

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
                  </>
                ) : (
                  <>
                    {/* Seller Navigation Elements - Just Messages */}
                    <Link
                      to="/seller/messages"
                      className="text-gray-700 hover:text-blue-600 transition-colors relative flex items-center space-x-1"
                    >
                      <FiMessageCircle className="w-5 h-5" />
                      <span className="hidden lg:block text-sm">Messages</span>
                    </Link>
                  </>
                )}
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="hidden lg:block">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {/* Role Status */}
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Current Mode</p>
                      <p className="text-sm font-medium text-gray-800 capitalize">
                        {user.role} Mode
                      </p>
                    </div>

                    {/* Account Links */}
                    <Link
                      to={user.role === 'buyer' ? '/buyer/account' : '/seller/profile'}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiUser className="inline mr-2 w-4 h-4" />
                      My Account
                    </Link>
                    
                    {user.role === 'buyer' && (
                      <Link
                        to="/buyer/purchase"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Purchases
                      </Link>
                    )}

                    <Link
                      to={user.role === 'buyer' ? '/buyer/settings' : '/seller/settings'}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiSettings className="inline mr-2 w-4 h-4" />
                      Settings
                    </Link>

                    {/* Role Switching */}
                    {user.canSwitchRoles && (
                      <>
                        <div className="border-t border-gray-100 my-1"></div>
                        <div className="px-4 py-2">
                          <p className="text-xs text-gray-500 mb-2">Switch Mode</p>
                          {user.role === 'buyer' ? (
                            <button
                              onClick={() => handleRoleSwitch('seller')}
                              className="w-full text-left px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <FiShoppingCart className="inline mr-2 w-4 h-4" />
                              Seller Mode
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRoleSwitch('buyer')}
                              className="w-full text-left px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <FiUser className="inline mr-2 w-4 h-4" />
                              Buyer Mode
                            </button>
                          )}
                        </div>
                      </>
                    )}

                    <div className="border-t border-gray-100 my-1"></div>
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
          {/* Mobile Search Bar - Only show for buyers */}
          {(!user || user.role === 'buyer') && (
            <div className="px-4 py-4 border-b border-gray-200">
              <SearchAutocomplete 
                onSuggestionSelected={handleSuggestionSelected}
                className="w-full"
              />
            </div>
          )}
          
          <div className="px-4 py-2 space-y-1">
            {user ? (
              <>
                {user.role === 'buyer' ? (
                  <>
                    <Link
                      to="/buyer/messages"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Messages
                    </Link>
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
                  </>
                ) : (
                  <>
                    <Link
                      to="/seller/dashboard"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/seller/products"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Products
                    </Link>
                    <Link
                      to="/seller/orders"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Orders (7)
                    </Link>
                    <Link
                      to="/seller/messages"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Messages
                    </Link>
                    <Link
                      to="/seller/analytics"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Analytics
                    </Link>
                    <Link
                      to="/seller/settings"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Settings
                    </Link>
                  </>
                )}
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