/**
 * Cart Page Component
 * 
 * This component follows the ChiFere design system established in /styles/designSystem.js
 * 
 * Design System Usage:
 * - Colors: Uses theme.colors tokens for consistent branding
 * - Typography: Applies theme.typography for font sizes and weights
 * - Spacing: Uses theme.spacing for consistent margins and padding
 * - Shadows: Applies theme.shadows for card elevation
 * - Border Radius: Uses theme.borderRadius for consistent corners
 * - Animations: Uses theme.animations for smooth transitions
 * - Components: Leverages theme.components for button and card styling
 * 
 * Key Features:
 * - Modern card-based design consistent with Landing/Wishlist/Checkout pages
 * - Fully responsive design using Tailwind breakpoints
 * - Interactive elements with hover states and animations
 * - Separate handling for Preloved and Barter items
 * - Proper focus states for accessibility
 * 
 * Firebase Integration Notes:
 * - Demo cart data marked with TODO comments for Firebase implementation
 * - Cart state will be synchronized with Firestore
 * - Store messaging will connect to Firebase messaging service
 * 
 * @version 2.0.0 - Complete redesign using design system
 */

import React, { useState } from 'react';
import BuyerLayout from '../Buyer_Layout/Buyer_layout';
import theme from '../../../../../styles/designSystem';

// TODO: Firebase Implementation - Replace with real cart data from Firestore
// This demo data should be replaced with actual cart items from the database
const initialPrelovedCart = [
  {
    store: 'Brilliant Channel',
    items: [
      {
        id: 1,
        name: 'Canon EOS 2000D Camera With 18-55 DC III KIT SET',
        price: 21900,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=200',
      },
    ],
  },
];

// TODO: Firebase Implementation - Replace with real barter cart data
const initialBarterCart = [
  {
    store: 'Barter Store',
    items: [
      {
        id: 101,
        name: 'Vintage Vinyl Collection',
        price: 0,
        barter: true,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=200',
      },
    ],
  },
];

const CartSection = ({ title, cart, selected, setSelected, handleRemove, handleSelectAll, handleSelect, allSelected, total, isBarter }) => (
  <div className="mb-8">
    {/* Section Header */}
    <h3 
      className="text-2xl font-bold mb-6"
      style={{ color: theme.colors.gray[800] }}
    >
      {title}
    </h3>

    {/* Items Container */}
    <div 
      className="overflow-hidden mb-6"
      style={{
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius['2xl'],
        boxShadow: theme.shadows.lg,
        border: `1px solid ${theme.colors.gray[200]}`
      }}
    >
      {cart.map((store, storeIdx) => (
        <div key={store.store} className="border-b last:border-b-0" style={{ borderColor: theme.colors.gray[100] }}>
          {/* Store Header */}
          <div 
            className="p-6 border-b"
            style={{ 
              backgroundColor: theme.colors.primary[50],
              borderColor: theme.colors.gray[200]
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <input 
                  type="checkbox"
              checked={store.items.every(item => selected[item.id])}
              onChange={() => {
                const allChecked = store.items.every(item => selected[item.id]);
                setSelected(prev => {
                  const newSel = { ...prev };
                  store.items.forEach(item => { newSel[item.id] = !allChecked; });
                  return newSel;
                });
              }}
                  className="w-5 h-5 rounded"
                  style={{ accentColor: theme.colors.primary[600] }}
                />
                <span 
                  className="text-lg font-semibold"
                  style={{ color: theme.colors.gray[800] }}
                >
                  {store.store}
                </span>
              </div>
              <button 
                className="px-4 py-2 rounded-xl font-medium transition-all duration-200"
                style={{
                  backgroundColor: theme.colors.primary[600],
                  color: theme.colors.white
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = theme.colors.primary[700];
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = theme.colors.primary[600];
                }}
              >
                💬 Message Store
              </button>
            </div>
          </div>

          {/* Store Items */}
          <div className="space-y-0">
            {store.items.map((item, itemIdx) => (
              <div 
                key={item.id} 
                className="p-6 border-b last:border-b-0 transition-all duration-200"
                style={{ borderColor: theme.colors.gray[100] }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = theme.colors.gray[50];
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = theme.colors.white;
                }}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  {/* Checkbox & Image */}
                  <div className="flex items-center space-x-4">
                    <input 
                      type="checkbox" 
                      checked={!!selected[item.id]} 
                      onChange={() => handleSelect(item.id)} 
                      className="w-5 h-5 rounded"
                      style={{ accentColor: theme.colors.primary[600] }}
                    />
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 object-cover"
                      style={{ borderRadius: theme.borderRadius.lg }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 
                      className="text-lg font-semibold mb-2 line-clamp-2"
                      style={{ color: theme.colors.gray[800] }}
                    >
                      {item.name}
                    </h4>
                    
                    {/* Price */}
                    <div className="mb-3">
                      {isBarter ? (
                        <span 
                          className="text-xl font-bold px-3 py-1 rounded-full"
                          style={{ 
                            backgroundColor: theme.colors.secondary[100],
                            color: theme.colors.secondary[700]
                          }}
                        >
                          🔄 Barter Only
                        </span>
                      ) : (
                        <span 
                          className="text-2xl font-bold"
                          style={{ color: theme.colors.primary[600] }}
                        >
                          ₱{item.price.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 mb-4">
                      <span 
                        className="text-sm font-medium"
                        style={{ color: theme.colors.gray[600] }}
                      >
                        Quantity:
                      </span>
                      <div 
                        className="flex items-center border rounded-lg"
                        style={{ borderColor: theme.colors.gray[300] }}
                      >
                        <button 
                          className="p-2 transition-colors duration-200"
                          style={{ color: theme.colors.gray[400] }}
                          disabled
                        >
                          −
                        </button>
                        <span 
                          className="px-4 py-2 min-w-[3rem] text-center"
                          style={{ color: theme.colors.gray[800] }}
                        >
                          {item.quantity}
                        </span>
                        <button 
                          className="p-2 transition-colors duration-200"
                          style={{ color: theme.colors.gray[400] }}
                          disabled
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Total & Actions */}
                  <div className="flex flex-col items-end space-y-4">
                    <div className="text-right">
                      <div 
                        className="text-sm"
                        style={{ color: theme.colors.gray[600] }}
                      >
                        Total
                      </div>
                      <div 
                        className="text-xl font-bold"
                        style={{ color: theme.colors.primary[600] }}
                      >
                        {isBarter ? 'Barter Only' : `₱${(item.price * item.quantity).toLocaleString()}`}
                      </div>
              </div>
                    
                    <button 
                      className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
                      style={{
                        color: theme.colors.error[600],
                        backgroundColor: 'transparent',
                        border: `1px solid ${theme.colors.error[200]}`
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = theme.colors.error[50];
                        e.target.style.borderColor = theme.colors.error[300];
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.borderColor = theme.colors.error[200];
                      }}
                      onClick={() => handleRemove(storeIdx, item.id)}
                    >
                      🗑️ Remove
                    </button>
              </div>
              </div>
              </div>
            ))}
            </div>
        </div>
      ))}
    </div>

    {/* Section Footer */}
    <div 
      className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl"
      style={{
        backgroundColor: theme.colors.gray[50],
        border: `1px solid ${theme.colors.gray[200]}`
      }}
    >
      {/* Bulk Actions */}
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input 
            type="checkbox" 
            checked={allSelected} 
            onChange={handleSelectAll} 
            className="w-5 h-5 rounded"
            style={{ accentColor: theme.colors.primary[600] }}
          />
          <span 
            className="font-medium"
            style={{ color: theme.colors.gray[700] }}
          >
            Select All
          </span>
        </label>
        <button 
          className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
          style={{
            color: theme.colors.error[600],
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = theme.colors.error[50];
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
          onClick={() => setSelected({})}
        >
          🗑️ Delete Selected
        </button>
      </div>

      {/* Total & Checkout */}
      <div className="flex items-center space-x-6">
        <div className="text-right">
          <div 
            className="text-sm"
            style={{ color: theme.colors.gray[600] }}
          >
            Total Amount
          </div>
          <div 
            className="text-2xl font-bold"
            style={{ color: theme.colors.primary[600] }}
          >
            {isBarter ? 'Barter Only' : `₱${total.toLocaleString()}`}
          </div>
        </div>
        <button 
          className="px-8 py-3 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105"
          style={{
            background: `linear-gradient(to right, ${theme.colors.primary[600]}, ${theme.colors.primary[500]})`,
            color: theme.colors.white,
            boxShadow: theme.shadows.lg
          }}
          onMouseEnter={(e) => {
            e.target.style.background = `linear-gradient(to right, ${theme.colors.primary[700]}, ${theme.colors.primary[600]})`;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = `linear-gradient(to right, ${theme.colors.primary[600]}, ${theme.colors.primary[500]})`;
          }}
          // TODO: Firebase Implementation - Connect to checkout flow
          onClick={() => console.log('Checkout clicked - implement navigation to checkout')}
        >
          🛒 Check Out
        </button>
      </div>
    </div>
  </div>
);

const Cart = () => {
  const [tab, setTab] = useState('all'); // 'all', 'preloved', 'barter'
  // Preloved
  const [prelovedCart, setPrelovedCart] = useState(initialPrelovedCart);
  const [prelovedSelected, setPrelovedSelected] = useState({});
  const prelovedAllItemIds = prelovedCart.flatMap(store => store.items.map(item => item.id));
  const prelovedAllSelected = prelovedAllItemIds.length > 0 && prelovedAllItemIds.every(id => prelovedSelected[id]);
  const handlePrelovedSelectAll = () => {
    if (prelovedAllSelected) {
      setPrelovedSelected({});
    } else {
      const newSelected = {};
      prelovedAllItemIds.forEach(id => { newSelected[id] = true; });
      setPrelovedSelected(newSelected);
    }
  };
  const handlePrelovedSelect = (id) => {
    setPrelovedSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };
  const handlePrelovedRemove = (storeIdx, itemId) => {
    setPrelovedCart(prev => prev.map((store, idx) =>
      idx === storeIdx
        ? { ...store, items: store.items.filter(item => item.id !== itemId) }
        : store
    ).filter(store => store.items.length > 0));
    setPrelovedSelected(prev => {
      const newSel = { ...prev };
      delete newSel[itemId];
      return newSel;
    });
  };
  const prelovedTotal = prelovedCart.reduce((sum, store) =>
    sum + store.items.reduce((s, item) => s + (prelovedSelected[item.id] ? item.price * item.quantity : 0), 0)
  , 0);

  // Barter
  const [barterCart, setBarterCart] = useState(initialBarterCart);
  const [barterSelected, setBarterSelected] = useState({});
  const barterAllItemIds = barterCart.flatMap(store => store.items.map(item => item.id));
  const barterAllSelected = barterAllItemIds.length > 0 && barterAllItemIds.every(id => barterSelected[id]);
  const handleBarterSelectAll = () => {
    if (barterAllSelected) {
      setBarterSelected({});
    } else {
      const newSelected = {};
      barterAllItemIds.forEach(id => { newSelected[id] = true; });
      setBarterSelected(newSelected);
    }
  };
  const handleBarterSelect = (id) => {
    setBarterSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };
  const handleBarterRemove = (storeIdx, itemId) => {
    setBarterCart(prev => prev.map((store, idx) =>
      idx === storeIdx
        ? { ...store, items: store.items.filter(item => item.id !== itemId) }
        : store
    ).filter(store => store.items.length > 0));
    setBarterSelected(prev => {
      const newSel = { ...prev };
      delete newSel[itemId];
      return newSel;
    });
  };
  const barterTotal = barterCart.reduce((sum, store) =>
    sum + store.items.reduce((s, item) => s + (barterSelected[item.id] ? 0 : 0), 0)
  , 0);

  return (
    <BuyerLayout>
      <div className="min-h-screen" style={{ backgroundColor: theme.colors.background.accent }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.primary[600]} 0%, ${theme.colors.primary[500]} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              🛒 My Shopping Cart
            </h1>
            <p style={{ color: theme.colors.gray[600] }} className="text-lg">
              Review and manage your selected items
            </p>
          </div>

          {/* Tab Navigation */}
          <div 
            className="flex flex-col sm:flex-row gap-3 mb-8 p-2 rounded-2xl"
            style={{
              backgroundColor: theme.colors.white,
              boxShadow: theme.shadows.lg,
              border: `1px solid ${theme.colors.gray[200]}`
            }}
          >
            {[
              { key: 'all', label: '📦 All Items', count: prelovedCart.length + barterCart.length },
              { key: 'preloved', label: '♻️ Preloved Items', count: prelovedCart.length },
              { key: 'barter', label: '🔄 Barter Items', count: barterCart.length }
            ].map((tabItem) => (
              <button 
                key={tabItem.key}
                onClick={() => setTab(tabItem.key)} 
                className="flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 relative"
                style={{
                  backgroundColor: tab === tabItem.key ? theme.colors.primary[600] : 'transparent',
                  color: tab === tabItem.key ? theme.colors.white : theme.colors.gray[700],
                  border: tab === tabItem.key ? 'none' : `1px solid transparent`
                }}
                onMouseEnter={(e) => {
                  if (tab !== tabItem.key) {
                    e.target.style.backgroundColor = theme.colors.gray[50];
                  }
                }}
                onMouseLeave={(e) => {
                  if (tab !== tabItem.key) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>{tabItem.label}</span>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: tab === tabItem.key ? theme.colors.white : theme.colors.primary[100],
                      color: tab === tabItem.key ? theme.colors.primary[600] : theme.colors.primary[700]
                    }}
                  >
                    {tabItem.count}
                  </span>
                </span>
              </button>
            ))}
          </div>

          {/* Empty State */}
          {prelovedCart.length === 0 && barterCart.length === 0 && (
            <div className="text-center py-20">
              <div 
                className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{
                  background: `linear-gradient(to bottom right, ${theme.colors.gray[100]}, ${theme.colors.gray[200]})`
                }}
              >
                <span className="text-6xl">🛒</span>
              </div>
              <h3 
                className="text-3xl font-bold mb-4"
                style={{ color: theme.colors.gray[400] }}
              >
                Your cart is empty
              </h3>
              <p 
                className="mb-8 text-lg"
                style={{ color: theme.colors.gray[500] }}
              >
                Start adding items you love to your cart
              </p>
              <button 
                onClick={() => window.location.href = '/buyer/dashboard'}
                className="px-8 py-4 rounded-xl font-semibold transform hover:scale-105 text-lg transition-all duration-200"
                style={{
                  background: `linear-gradient(to right, ${theme.colors.primary[600]}, ${theme.colors.primary[500]})`,
                  color: theme.colors.white,
                  boxShadow: theme.shadows.lg
                }}
              >
                🛍️ Start Shopping
              </button>
        </div>
          )}

          {/* Cart Content */}
          {(tab === 'all' || tab === 'preloved') && prelovedCart.length > 0 && (
            <CartSection
              title="♻️ Preloved Items"
              cart={prelovedCart}
              selected={prelovedSelected}
              setSelected={setPrelovedSelected}
              handleRemove={handlePrelovedRemove}
              handleSelectAll={handlePrelovedSelectAll}
              handleSelect={handlePrelovedSelect}
              allSelected={prelovedAllSelected}
              total={prelovedTotal}
              isBarter={false}
            />
          )}
          {(tab === 'all' || tab === 'barter') && barterCart.length > 0 && (
            <CartSection
              title="🔄 Barter Items"
              cart={barterCart}
              selected={barterSelected}
              setSelected={setBarterSelected}
              handleRemove={handleBarterRemove}
              handleSelectAll={handleBarterSelectAll}
              handleSelect={handleBarterSelect}
              allSelected={barterAllSelected}
              total={barterTotal}
              isBarter={true}
            />
          )}
        </div>
      </div>
    </BuyerLayout>
  );
};

export default Cart;

// Add line-clamp styles
const styles = `
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
