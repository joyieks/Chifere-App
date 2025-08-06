import React, { useState } from 'react';
import BuyerLayout from '../Buyer_Layout/Buyer_layout';

// Sample cart items grouped by store and type
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
    <h3 className="text-xl font-bold text-blue-800 mb-2">{title}</h3>
    <div className="bg-white rounded shadow p-4 mb-4">
      <div className="flex items-center border-b pb-2 mb-2">
        <input type="checkbox" checked={allSelected} onChange={handleSelectAll} className="mr-2" />
        <span className="font-semibold flex-1">Product</span>
        <span className="w-32 text-center">Unit Price</span>
        <span className="w-24 text-center">Quantity</span>
        <span className="w-32 text-center">Total Price</span>
        <span className="w-24 text-center">Actions</span>
      </div>
      {cart.map((store, storeIdx) => (
        <div key={store.store} className="mb-4 border rounded p-2 bg-blue-50">
          <div className="flex items-center mb-2">
            <input type="checkbox"
              checked={store.items.every(item => selected[item.id])}
              onChange={() => {
                const allChecked = store.items.every(item => selected[item.id]);
                setSelected(prev => {
                  const newSel = { ...prev };
                  store.items.forEach(item => { newSel[item.id] = !allChecked; });
                  return newSel;
                });
              }}
              className="mr-2" />
            <span className="font-semibold text-gray-700">{store.store}</span>
            <button className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium transition">Message</button>
          </div>
          {store.items.map(item => (
            <div key={item.id} className="flex items-center border-t py-3">
              <input type="checkbox" checked={!!selected[item.id]} onChange={() => handleSelect(item.id)} className="mr-2" />
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded mr-4" />
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{item.name}</div>
              </div>
              <div className="w-32 text-center">
                {isBarter ? <span className="text-lg font-bold text-blue-600">Barter Only</span> : <span className="text-lg font-bold text-gray-800">₱{item.price.toLocaleString()}</span>}
              </div>
              <div className="w-24 text-center flex items-center justify-center">
                <button className="px-2" disabled>-</button>
                <span className="mx-2">{item.quantity}</span>
                <button className="px-2" disabled>+</button>
              </div>
              <div className="w-32 text-center font-bold text-blue-800">{isBarter ? 'Barter Only' : `₱${(item.price * item.quantity).toLocaleString()}`}</div>
              <div className="w-24 text-center">
                <button className="text-red-500 hover:underline" onClick={() => handleRemove(storeIdx, item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
    <div className="flex items-center justify-between mt-4">
      <div>
        <input type="checkbox" checked={allSelected} onChange={handleSelectAll} className="mr-2" />
        <span className="mr-4">Select All</span>
        <button className="text-red-500 hover:underline" onClick={() => {
          setSelected({});
        }}>Delete</button>
      </div>
      <div className="text-xl font-bold text-blue-900">
        Total: <span className="text-blue-600">{isBarter ? 'Barter Only' : `₱${total.toLocaleString()}`}</span>
        <button className="ml-6 px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-bold">Check Out</button>
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
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">My Cart</h2>
        <div className="flex space-x-4 mb-8">
          <button onClick={() => setTab('all')} className={`px-6 py-2 rounded font-semibold border ${tab === 'all' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-800 border-blue-200'} transition`}>All</button>
          <button onClick={() => setTab('preloved')} className={`px-6 py-2 rounded font-semibold border ${tab === 'preloved' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-800 border-blue-200'} transition`}>Preloved Items</button>
          <button onClick={() => setTab('barter')} className={`px-6 py-2 rounded font-semibold border ${tab === 'barter' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-800 border-blue-200'} transition`}>Barter Items</button>
        </div>
        {(tab === 'all' || tab === 'preloved') && (
          <CartSection
            title="Preloved Items"
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
        {(tab === 'all' || tab === 'barter') && (
          <CartSection
            title="Barter Items"
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
    </BuyerLayout>
  );
};

export default Cart;
