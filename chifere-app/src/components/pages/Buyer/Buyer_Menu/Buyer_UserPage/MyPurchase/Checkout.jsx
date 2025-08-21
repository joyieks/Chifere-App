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

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import BuyerLayout from '../../Buyer_Layout/Buyer_layout';
import { theme } from '../../../../../../styles/designSystem';

// Demo Stripe for frontend-only (no actual API calls)
const stripePromise = loadStripe('pk_test_demo_key_for_frontend_only');

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

// Payment methods including Stripe
const paymentMethods = [
  { key: 'stripe', label: 'Credit/Debit Card', icon: '💳' },
  { key: 'gcash', label: 'Gcash', icon: '📱' },
  { key: 'paymaya', label: 'Paymaya', icon: '💰' },
  { key: 'cod', label: 'Cash on Delivery', icon: '💵' },
];

// Stripe Card Element styles
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

// Stripe Payment Form Component
const StripePaymentForm = ({ clientSecret, onSuccess, onError, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const card = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: 'Customer Name', // TODO: Get from user data
        },
      }
    });

    if (error) {
      console.error('Payment failed:', error);
      onError(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      onSuccess(paymentIntent);
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div 
        className="p-4 border rounded-lg"
        style={{ 
          borderColor: theme.colors.gray[300],
          backgroundColor: theme.colors.gray[50]
        }}
      >
        <CardElement options={cardElementOptions} />
      </div>
      
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50"
        style={{
          backgroundColor: processing ? theme.colors.gray[400] : theme.colors.success[600],
          color: theme.colors.white
        }}
      >
        {processing ? 'Processing...' : `Pay ₱${amount.toLocaleString()}`}
      </button>
    </form>
  );
};

const CheckoutForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [payment, setPayment] = useState('stripe');
  const [message, setMessage] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  // Get order data from cart navigation or use demo data
  const cartData = location.state;
  const orderData = cartData ? {
    items: cartData.selectedItems,
    isBarter: cartData.isBarter,
    total: cartData.total,
    deliveryFee: cartData.isBarter ? 0 : 150 // Demo delivery fee
  } : demoOrder;

  const itemTotal = orderData.items ? orderData.items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) : 0;
  const grandTotal = orderData.isBarter ? 0 : itemTotal + orderData.deliveryFee;

  // Create payment intent when payment method is stripe
  useEffect(() => {
    if (payment === 'stripe') {
      createPaymentIntent();
    }
  }, [payment, grandTotal]);

  const createPaymentIntent = async () => {
    // Frontend-only demo - no API calls
    console.log('Demo payment setup for amount:', grandTotal);
    setClientSecret('pi_mock_client_secret_for_demo');
  };

  const handlePaymentSuccess = (paymentIntent) => {
    setPaymentStatus('success');
    console.log('Payment successful:', paymentIntent);
    // TODO: Update order status in Firebase
    // navigate('/buyer/orders/confirmation');
  };

  const handlePaymentError = (error) => {
    setPaymentStatus('error');
    console.error('Payment error:', error);
  };

  const handlePlaceOrder = () => {
    if (payment !== 'stripe') {
      // Handle other payment methods (COD, GCash, etc.)
      console.log('Order placed with payment method:', payment);
      // TODO: Process order with selected payment method
      navigate('/buyer/orders');
    }
  };

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
              {cartData ? 'Selected Store' : demoOrder.store.name}
            </span>
            {(!cartData || demoOrder.store.chat) && (
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
              src={orderData.items[0].image} 
              alt={orderData.items[0].name} 
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
                {orderData.items[0].name}
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
          <div className="space-y-3">
            {paymentMethods.map(pm => (
              <label key={pm.key} className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <input
                  type="radio"
                  name="payment"
                  value={pm.key}
                  checked={payment === pm.key}
                  onChange={() => setPayment(pm.key)}
                  className="w-4 h-4"
                  style={{ accentColor: theme.colors.primary[600] }}
                />
                <span className="text-xl">{pm.icon}</span>
                <span 
                  className="transition-colors duration-200 group-hover:opacity-75"
                  style={{ 
                    color: payment === pm.key ? theme.colors.primary[600] : theme.colors.gray[700],
                    fontWeight: payment === pm.key ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.normal
                  }}
                >
                  {pm.label}
                </span>
                {payment === pm.key && pm.key === 'stripe' && (
                  <span className="ml-auto text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    Secure Payment
                  </span>
                )}
              </label>
            ))}
          </div>
          
          {/* Stripe Payment Form */}
          {payment === 'stripe' && clientSecret && (
            <div className="mt-6 p-4 border rounded-lg" style={{ borderColor: theme.colors.gray[200], backgroundColor: theme.colors.gray[50] }}>
              <h4 className="font-semibold text-gray-800 mb-3">Card Details</h4>
              <StripePaymentForm
                clientSecret={clientSecret}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                amount={grandTotal}
              />
            </div>
          )}
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
              <span style={{ color: theme.colors.gray[800] }}>₱{orderData.deliveryFee.toLocaleString()}</span>
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
        
        {/* Payment Methods Section */}
        {!orderData.isBarter && (
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
              💳 Payment Method
            </div>
            
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.key}
                  className="flex items-center p-4 cursor-pointer transition-all duration-200"
                  style={{
                    border: payment === method.key 
                      ? `2px solid ${theme.colors.primary[500]}` 
                      : `1px solid ${theme.colors.gray[300]}`,
                    borderRadius: theme.borderRadius.lg,
                    backgroundColor: payment === method.key 
                      ? theme.colors.primary[50] 
                      : theme.colors.gray[50]
                  }}
                  onClick={() => setPayment(method.key)}
                  onMouseEnter={(e) => {
                    if (payment !== method.key) {
                      e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (payment !== method.key) {
                      e.currentTarget.style.backgroundColor = theme.colors.gray[50];
                    }
                  }}
                >
                  <span className="text-2xl mr-3">{method.icon}</span>
                  <span 
                    style={{ 
                      fontWeight: theme.typography.fontWeight.medium,
                      color: theme.colors.gray[800]
                    }}
                  >
                    {method.label}
                  </span>
                  {payment === method.key && (
                    <span className="ml-auto text-2xl">✓</span>
                  )}
                </div>
              ))}
            </div>
            
            {/* Stripe Card Input - Handled by StripePaymentForm component above */}
          </div>
        )}
        
        {/* Barter Notice for Barter Items */}
        {orderData.isBarter && (
          <div 
            className="mb-6 p-6 text-center"
            style={{
              backgroundColor: theme.colors.secondary[50],
              borderRadius: theme.borderRadius['2xl'],
              border: `2px solid ${theme.colors.secondary[200]}`
            }}
          >
            <div className="text-4xl mb-2">🔄</div>
            <div 
              style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.secondary[700],
                marginBottom: theme.spacing[2]
              }}
            >
              Barter Exchange
            </div>
            <p style={{ color: theme.colors.secondary[600] }}>
              This is a barter transaction. No payment required - you'll exchange items directly with the seller.
            </p>
          </div>
        )}
        
        {/* Place Order Button - Only show for non-Stripe payments */}
        {payment !== 'stripe' && (
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
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        )}

        {/* Payment Status Messages */}
        {paymentStatus === 'success' && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <span className="text-green-600 text-lg mr-2">✅</span>
              <div>
                <h3 className="text-green-800 font-semibold">Payment Successful!</h3>
                <p className="text-green-600 text-sm">Your order has been processed successfully.</p>
              </div>
            </div>
          </div>
        )}

        {paymentStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <span className="text-red-600 text-lg mr-2">❌</span>
              <div>
                <h3 className="text-red-800 font-semibold">Payment Failed</h3>
                <p className="text-red-600 text-sm">Please check your card details and try again.</p>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </BuyerLayout>
  );
};

// Main Checkout component wrapped with Stripe Elements
const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
