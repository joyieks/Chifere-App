import React, { useState } from 'react';
import BuyerLayout from '../../Buyer_Layout/Buyer_layout';

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
      <div className="max-w-3xl mx-auto p-4 md:p-8">
        {/* Delivery Address */}
        <div className="bg-white rounded shadow p-4 mb-6">
          <div className="text-lg font-bold text-red-600 mb-2 flex items-center gap-2">
            <span>📍</span> Delivery Address
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold">{demoOrder.address.name}</span>
            <span>{demoOrder.address.phone}</span>
            <span className="ml-2 text-gray-700">{demoOrder.address.address}</span>
            {demoOrder.address.isDefault && <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 rounded text-xs">Default</span>}
            <button className="ml-2 text-blue-600 hover:underline text-sm">Change</button>
          </div>
        </div>
        {/* Products Ordered */}
        <div className="bg-white rounded shadow p-4 mb-6">
          <div className="text-lg font-bold mb-4">Products Ordered</div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">{demoOrder.store.name}</span>
            {demoOrder.store.chat && <span className="ml-2 text-green-600 text-sm cursor-pointer">💬 chat now</span>}
          </div>
          <div className="flex items-center gap-4 border-b pb-4 mb-2">
            <img src={demoOrder.items[0].image} alt={demoOrder.items[0].name} className="w-20 h-20 object-contain rounded" />
            <div className="flex-1">
              <div className="font-semibold">{demoOrder.items[0].name}</div>
            </div>
            <div className="w-24 text-right">₱{demoOrder.items[0].price.toLocaleString()}</div>
            <div className="w-16 text-center">{demoOrder.items[0].qty}</div>
            <div className="w-28 text-right font-bold">₱{(demoOrder.items[0].price * demoOrder.items[0].qty).toLocaleString()}</div>
          </div>
        </div>
        {/* Payment Method */}
        <div className="bg-white rounded shadow p-4 mb-6">
          <div className="text-lg font-bold mb-2">Payment Method</div>
          <div className="flex gap-6 mb-2">
            {paymentMethods.map(pm => (
              <label key={pm.key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value={pm.key}
                  checked={payment === pm.key}
                  onChange={() => setPayment(pm.key)}
                  className="accent-blue-600"
                />
                <span>{pm.label}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Message for Seller */}
        <div className="bg-white rounded shadow p-4 mb-6">
          <div className="text-lg font-bold mb-2">Message for Seller</div>
          <textarea
            className="w-full border rounded p-2 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Leave a message for the seller (optional)"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>
        {/* Order Summary */}
        <div className="bg-white rounded shadow p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span>Item Total</span>
            <span>₱{itemTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span>Delivery Fee</span>
            <span>₱{demoOrder.deliveryFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-xl font-bold border-t pt-2 mt-2">
            <span>Total</span>
            <span className="text-red-600">₱{grandTotal.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="px-8 py-3 bg-green-700 text-white rounded-full font-semibold text-lg hover:bg-green-800">Place Order</button>
        </div>
      </div>
    </BuyerLayout>
  );
};

export default Checkout;
