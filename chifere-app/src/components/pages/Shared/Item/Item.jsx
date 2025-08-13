import React, { useState } from 'react';
import BuyerLayout from '../../Buyer/Buyer_Menu/Buyer_Layout/Buyer_layout';

// Placeholder product data
const demoProduct = {
  name: 'Airpods- Max',
  description: 'a perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods.',
  rating: 4.8,
  reviews: 121,
  price: 549.00,
  monthly: '99.99',
  images: [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-pink-202011?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1604022365000',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-green-202011?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1604022365000',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-spacegray-202011?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1604022365000',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-skyblue-202011?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1604022365000',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-silver-202011?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1604022365000',
  ],
  colors: [
    { name: 'Pink', value: '#e57373' },
    { name: 'Green', value: '#b2dfdb' },
    { name: 'Gray', value: '#757575' },
    { name: 'Blue', value: '#90caf9' },
    { name: 'Silver', value: '#e0e0e0' },
    { name: 'Navy', value: '#1a237e' },
  ],
  stock: 12,
  type: 'preloved', // or 'barter'
};

const Item = ({ product = demoProduct }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <BuyerLayout>
      <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-10 bg-white rounded-lg shadow mt-8">
        {/* Left: Images */}
        <div className="flex flex-col items-center w-full md:w-1/2">
          <div className="bg-gray-100 rounded-lg flex items-center justify-center mb-4 w-full aspect-square max-w-md">
            <img src={product.images[selectedImage]} alt={product.name} className="object-contain h-80 w-full" />
          </div>
          <div className="flex gap-2 mt-2">
            {product.images.map((img, idx) => (
              <button
                key={img}
                className={`border rounded-lg p-1 ${selectedImage === idx ? 'border-blue-600' : 'border-gray-200'}`}
                onClick={() => setSelectedImage(idx)}
              >
                <img src={img} alt="thumb" className="h-12 w-12 object-contain" />
              </button>
            ))}
          </div>
        </div>
        {/* Right: Details */}
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-1">{product.name}</h2>
            <div className="text-gray-600 mb-2">{product.description}</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-600 font-bold">★ {product.rating}</span>
              <span className="text-gray-500 text-sm">({product.reviews})</span>
            </div>
            <div className="text-2xl font-bold mb-1">${product.price.toFixed(2)}{product.type === 'preloved' && <span className="text-base font-normal ml-2">or {product.monthly}/month</span>}</div>
            <div className="text-sm text-gray-500 mb-2">Suggested payments with 6 months special financing</div>
          </div>
          <div>
            <div className="font-semibold mb-1">Choose a Color</div>
            <div className="flex gap-2 mb-2">
              {product.colors.map((color, idx) => (
                <button
                  key={color.value}
                  className={`w-7 h-7 rounded-full border-2 ${selectedColor === idx ? 'border-blue-600' : 'border-gray-300'}`}
                  style={{ background: color.value }}
                  onClick={() => setSelectedColor(idx)}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-2 py-1 border rounded">-</button>
            <span className="font-semibold text-lg">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="px-2 py-1 border rounded">+</button>
            <span className="text-sm text-orange-600 font-semibold ml-2">Only {product.stock} Items Left!</span>
          </div>
          <div className="flex gap-4 mt-2">
            {product.type === 'preloved' ? (
              <>
                <button className="px-8 py-3 bg-green-800 text-white rounded-full font-semibold text-lg hover:bg-green-900">Buy Now</button>
                <button className="px-8 py-3 border-2 border-green-800 text-green-800 rounded-full font-semibold text-lg hover:bg-green-50">Add to Cart</button>
              </>
            ) : (
              <>
                <button className="px-8 py-3 bg-blue-700 text-white rounded-full font-semibold text-lg hover:bg-blue-900">Barter Now</button>
                <button className="px-8 py-3 border-2 border-blue-700 text-blue-700 rounded-full font-semibold text-lg hover:bg-blue-50">Contact Seller</button>
              </>
            )}
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-orange-600 font-bold">🚚</span>
              <span>Free Delivery</span>
              <a href="#" className="underline text-blue-700 ml-2">Enter your Postal code for Delivery Availability</a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-orange-600 font-bold">↩️</span>
              <span>Return Delivery</span>
              <span className="ml-2">Free 30days Delivery Returns. <a href="#" className="underline text-blue-700">Details</a></span>
            </div>
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
};

export default Item;
