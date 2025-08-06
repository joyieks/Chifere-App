import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BuyerLayout from '../../Buyer/Buyer_Menu/Buyer_Layout/Buyer_layout';

// Demo search results
const demoResults = [
  {
    id: '1',
    name: 'Wireless Headset',
    price: 299.99,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-pink-202011?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1604022365000',
    store: 'Panda Beauty',
  },
  {
    id: '2',
    name: 'Gaming Headset',
    price: 149.99,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-spacegray-202011?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1604022365000',
    store: 'Gadget Hub',
  },
  {
    id: '3',
    name: 'Bluetooth Headset',
    price: 99.99,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-skyblue-202011?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1604022365000',
    store: 'Audio World',
  },
];

const SearchResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get('query') || '';
  const filtered = demoResults.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <BuyerLayout>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 && <div className="col-span-full text-gray-500">No results found.</div>}
          {filtered.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col"
              onClick={() => navigate(`/item/${item.id}`)}
            >
              <img src={item.image} alt={item.name} className="h-48 w-full object-contain rounded-t-lg bg-gray-50" />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-semibold text-lg mb-1">{item.name}</div>
                  <div className="text-blue-700 font-bold text-xl mb-2">₱{item.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Store: <span className="font-semibold text-gray-700">{item.store}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BuyerLayout>
  );
};

export default SearchResult;
