/**
 * Checkout Page Component
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
 * - Components: Leverages theme.components for button and input styling
 * 
 * Key Features:
 * - Fully responsive design using Tailwind breakpoints
 * - Consistent with other pages like Landing and Wishlist
 * - Interactive elements with hover states
 * - Proper focus states for accessibility
 * 
 * Firebase Integration Notes:
 * - Demo data marked with TODO comments for Firebase implementation
 * - Payment methods and order data will be dynamic
 * - Order processing will connect to Firebase services
 * 
 * @version 2.0.0 - Updated to use design system
 */

import React, { useState } from 'react';
import BuyerLayout from '../../Buyer_Layout/Buyer_layout';
import theme from '../../../../../../styles/designSystem';

// TODO: Firebase Implementation - Replace with real data from Firestore
// This demo data should be replaced with actual order data from the database
const demoOrder = {
  address: {
    name: 'Joan Joy Diocampo',
    phone: '(+63) 9981921194',
    address: '7th street Hagdanan, San Antonio Village Apas Cebu City, Apas, Cebu City, Visayas, Cebu, 6000',
    isDefault: true,
  },
  store: {
    name: 'Brilliant Channel',
    chat: true,
  },
  items: [
    {
      id: 'cam1',
      name: 'Canon EOS 2000D Camera With 18-55 DC III KIT ...',
      image: 'https://cdn.shopify.com/s/files/1/0275/3649/5399/products/Canon-EOS-2000D-18-55mm-III-Kit-DSLR-Camera-Black-1_600x.jpg',
      price: 21900,
      qty: 1,
    },
  ],
  voucher: 0,
  deliveryFee: 150,
};

// TODO: Firebase Implementation - Replace with payment methods from configuration
const paymentMethods = [
  { key: 'gcash', label: 'Gcash' },
  { key: 'paymaya', label: 'Paymaya' },
  { key: 'cod', label: 'Cash on Delivery' },
];

const Checkout = () => {
  const [payment, setPayment] = useState('gcash');
  const [message, setMessage] = useState('');

  const itemTotal = demoOrder.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const grandTotal = itemTotal + demoOrder.deliveryFee;

  return (
    <BuyerLayout>
      <div className="min-h-screen" style={{ backgroundColor: theme.colors.background.accent }}>
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary[600]} 0%, ${theme.colors.secondary[500]} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Checkout
          </h1>
          <p style={{ color: theme.colors.gray[600] }} className="text-lg">
            Review your order and complete your purchase
          </p>
        </div>

        {/* Delivery Address */}
        <div 
          className="mb-6 overflow-hidden" 
          style={{
            backgroundColor: theme.colors.white,
            borderRadius: theme.borderRadius['2xl'],
            boxShadow: theme.shadows.lg,
            border: `1px solid ${theme.colors.gray[200]}`,
            padding: theme.spacing[6]
          }}
        >
          <div 
            className="mb-4 flex items-center gap-3"
            style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.primary[600]
            }}
          >
            <span>📍</span> Delivery Address
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span 
              style={{ 
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.gray[800]
              }}
            >
              {demoOrder.address.name}
            </span>
            <span style={{ color: theme.colors.gray[600] }}>{demoOrder.address.phone}</span>
            <span 
              className="flex-1 min-w-0" 
              style={{ color: theme.colors.gray[700] }}
            >
              {demoOrder.address.address}
            </span>
            {demoOrder.address.isDefault && (
              <span 
                className="text-xs"
                style={{
                  padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
                  backgroundColor: theme.colors.primary[100],
                  color: theme.colors.primary[700],
                  borderRadius: theme.borderRadius.full
                }}
              >
                Default
              </span>
            )}
            <button 
              className="text-sm transition-colors duration-200 hover:underline"
              style={{ color: theme.colors.primary[600] }}
            >
              Change
            </button>
          </div>
        </div>
        {/* Products Ordered */}
        <div 
          className="mb-6 overflow-hidden" 
          style={{
            backgroundColor: theme.colors.white,
            borderRadius: theme.borderRadius['2xl'],
            boxShadow: theme.shadows.lg,
            border: `1px solid ${theme.colors.gray[200]}`,
            padding: theme.spacing[6]
          }}
        >
          <div 
            className="mb-6"
            style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.gray[800]
            }}
          >
            Products Ordered
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span 
              style={{ 
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.gray[800]
              }}
            >
              {demoOrder.store.name}
            </span>
            {demoOrder.store.chat && (
              <button 
                className="text-sm cursor-pointer transition-colors duration-200 hover:opacity-75"
                style={{ color: theme.colors.success[600] }}
              >
                💬 chat now
              </button>
            )}
          </div>
          <div 
            className="flex flex-col sm:flex-row items-center gap-4 pb-4" 
            style={{ 
              borderBottom: `1px solid ${theme.colors.gray[200]}`,
              marginBottom: theme.spacing[4]
            }}
          >
            <img 
              src={demoOrder.items[0].image} 
              alt={demoOrder.items[0].name} 
              className="w-20 h-20 object-contain"
              style={{ borderRadius: theme.borderRadius.lg }}
            />
            <div className="flex-1 min-w-0">
              <div 
                style={{ 
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.gray[800]
                }}
              >
                {demoOrder.items[0].name}
              </div>
            </div>
            <div 
              className="w-24 text-right"
              style={{ color: theme.colors.gray[600] }}
            >
              ₱{demoOrder.items[0].price.toLocaleString()}
            </div>
            <div 
              className="w-16 text-center"
              style={{ color: theme.colors.gray[600] }}
            >
              {demoOrder.items[0].qty}
            </div>
            <div 
              className="w-28 text-right"
              style={{ 
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.primary[600]
              }}
            >
              ₱{(demoOrder.items[0].price * demoOrder.items[0].qty).toLocaleString()}
            </div>
          </div>
        </div>
        {/* Payment Method */}
        <div 
          className="mb-6 overflow-hidden" 
          style={{
            backgroundColor: theme.colors.white,
            borderRadius: theme.borderRadius['2xl'],
            boxShadow: theme.shadows.lg,
            border: `1px solid ${theme.colors.gray[200]}`,
            padding: theme.spacing[6]
          }}
        >
          <div 
            className="mb-4"
            style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.gray[800]
            }}
          >
            Payment Method
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
            {paymentMethods.map(pm => (
              <label key={pm.key} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="payment"
                  value={pm.key}
                  checked={payment === pm.key}
                  onChange={() => setPayment(pm.key)}
                  className="w-4 h-4"
                  style={{ accentColor: theme.colors.primary[600] }}
                />
                <span 
                  className="transition-colors duration-200 group-hover:opacity-75"
                  style={{ 
                    color: payment === pm.key ? theme.colors.primary[600] : theme.colors.gray[700],
                    fontWeight: payment === pm.key ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.normal
                  }}
                >
                  {pm.label}
                </span>
              </label>
            ))}
          </div>
        </div>
        {/* Message for Seller */}
        <div 
          className="mb-6 overflow-hidden" 
          style={{
            backgroundColor: theme.colors.white,
            borderRadius: theme.borderRadius['2xl'],
            boxShadow: theme.shadows.lg,
            border: `1px solid ${theme.colors.gray[200]}`,
            padding: theme.spacing[6]
          }}
        >
          <div 
            className="mb-4"
            style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.gray[800]
            }}
          >
            Message for Seller
          </div>
          <textarea
            className="w-full min-h-[80px] resize-none transition-all duration-200"
            style={{
              border: `1px solid ${theme.colors.gray[300]}`,
              borderRadius: theme.borderRadius.lg,
              padding: theme.spacing[3],
              fontSize: theme.typography.fontSize.base,
              backgroundColor: theme.colors.gray[50],
              color: theme.colors.gray[800]
            }}
            placeholder="Leave a message for the seller (optional)"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onFocus={(e) => {
              e.target.style.borderColor = theme.colors.primary[500];
              e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primary[100]}`;
              e.target.style.backgroundColor = theme.colors.white;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = theme.colors.gray[300];
              e.target.style.boxShadow = 'none';
              e.target.style.backgroundColor = theme.colors.gray[50];
            }}
          />
        </div>
        {/* Order Summary */}
        <div 
          className="mb-6 overflow-hidden" 
          style={{
            backgroundColor: theme.colors.white,
            borderRadius: theme.borderRadius['2xl'],
            boxShadow: theme.shadows.lg,
            border: `1px solid ${theme.colors.gray[200]}`,
            padding: theme.spacing[6]
          }}
        >
          <div 
            className="mb-4"
            style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.gray[800]
            }}
          >
            Order Summary
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span style={{ color: theme.colors.gray[600] }}>Item Total</span>
              <span style={{ color: theme.colors.gray[800] }}>₱{itemTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ color: theme.colors.gray[600] }}>Delivery Fee</span>
              <span style={{ color: theme.colors.gray[800] }}>₱{demoOrder.deliveryFee.toLocaleString()}</span>
            </div>
            <div 
              className="flex justify-between items-center pt-3"
              style={{ 
                borderTop: `1px solid ${theme.colors.gray[200]}`,
                marginTop: theme.spacing[3]
              }}
            >
              <span 
                style={{ 
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.gray[800]
                }}
              >
                Total
              </span>
              <span 
                style={{ 
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.primary[600]
                }}
              >
                ₱{grandTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        {/* Place Order Button */}
        <div className="flex justify-end">
          <button 
            className="transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            style={{
              padding: `${theme.spacing[4]} ${theme.spacing[8]}`,
              backgroundColor: theme.colors.success[600],
              color: theme.colors.white,
              borderRadius: theme.borderRadius.full,
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.semibold,
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.colors.success[700];
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = theme.colors.success[600];
            }}
            // TODO: Firebase Implementation - Connect to order processing service
            onClick={() => console.log('Order placed - implement Firebase order creation')}
          >
            Place Order
          </button>
        </div>
        </div>
      </div>
    </BuyerLayout>
  );
};

export default Checkout;
