import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const storeData = {
  1: {
    name: 'Brilliant Channel',
    logo: '/maya.png',
    banner: '/gcash.png',
    rating: 4.8,
    reviews: 2547,
    followers: 15420,
    products: 892,
    verified: true,
    location: 'Cebu City, Philippines',
    description: 'Your trusted partner for electronics and gadgets. We offer genuine products with warranty and excellent customer service.',
    categories: ['Electronics', 'Cameras', 'Audio', 'Mobile Accessories'],
    joinedDate: 'March 2020',
    responseRate: '98%',
    responseTime: '2 hours',
    policies: {
      shipping: 'Free shipping for orders over ₱1,500',
      returns: '7-day return policy',
      warranty: '1-year warranty on all products'
    },
    awards: ['Top Seller 2024', 'Best Customer Service', 'Verified Merchant'],
    socialMedia: {
      facebook: 'brilliantchannelph',
      instagram: 'brilliant_channel',
      youtube: 'BrilliantChannelPH'
    }
  }
};

const storeProducts = [
  {
    id: 1,
    name: 'Canon EOS 2000D Camera With 18-55 DC III KIT SET',
    image: '/maya.png',
    price: 21900,
    originalPrice: 25000,
    discount: 12,
    rating: 4.5,
    reviews: 89,
    sold: 245,
    category: 'Cameras',
    featured: true
  },
  {
    id: 2,
    name: 'Sony WH-1000XM4 Wireless Noise Canceling Headphones',
    image: '/gcash.png',
    price: 15990,
    originalPrice: 18000,
    discount: 11,
    rating: 4.7,
    reviews: 156,
    sold: 89,
    category: 'Audio',
    featured: true
  },
  {
    id: 3,
    name: 'Apple iPhone 13 Pro Max 256GB',
    image: '/maya.png',
    price: 65990,
    originalPrice: 70000,
    discount: 6,
    rating: 4.9,
    reviews: 234,
    sold: 567,
    category: 'Smartphones',
    featured: false
  },
  {
    id: 4,
    name: 'Samsung Galaxy Watch 4 44mm',
    image: '/gcash.png',
    price: 12990,
    originalPrice: 15000,
    discount: 13,
    rating: 4.4,
    reviews: 67,
    sold: 123,
    category: 'Wearables',
    featured: true
  }
];

const BStore = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('products');

  const store = storeData[storeId] || storeData[1];
  const featuredProducts = storeProducts.filter(p => p.featured);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleViewAllProducts = () => {
    navigate(`/buyer/store/${storeId}/products`);
  };

  const handleProductClick = (productId) => {
    navigate(`/buyer/product/${productId}`);
  };

  const handleContactSeller = () => {
    // Contact seller logic
    console.log('Contacting seller...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Store Header */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <img 
          src={store.banner} 
          alt="Store banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white/80 hover:text-white font-medium mb-8 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-8 lg:space-y-0 lg:space-x-12">
            {/* Store Logo */}
            <div className="w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center border-4 border-white/30 group-hover:scale-105 transition-transform duration-300">
              <img 
                src={store.logo} 
                alt={store.name} 
                className="w-24 h-24 object-cover rounded-2xl"
              />
            </div>

            {/* Store Info */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-4 mb-3">
                    <h1 className="text-5xl font-bold">{store.name}</h1>
                    {store.verified && (
                      <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-lg">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Verified Store</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white/90 text-lg">{store.location}</span>
                  </div>
                  
                  <p className="text-white/90 mb-6 max-w-3xl text-lg leading-relaxed">{store.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-3 lg:ml-8">
                  <button 
                    onClick={handleFollow}
                    className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                      isFollowing 
                        ? 'bg-white/20 text-white border-2 border-white/30 hover:bg-white/30' 
                        : 'bg-white text-blue-600 hover:bg-gray-100 shadow-lg'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow Store'}
                  </button>
                  <button 
                    onClick={handleContactSeller}
                    className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 font-semibold border border-white/30"
                  >
                    Contact Seller
                  </button>
                </div>
              </div>

              {/* Store Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30">
                  <div className="flex items-center space-x-3 mb-2">
                    <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-2xl font-bold">{store.rating}</span>
                  </div>
                  <p className="text-white/80 text-sm">{store.reviews.toLocaleString()} reviews</p>
                </div>

                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30">
                  <div className="flex items-center space-x-3 mb-2">
                    <svg className="w-6 h-6 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                    <span className="text-2xl font-bold">{store.followers.toLocaleString()}</span>
                  </div>
                  <p className="text-white/80 text-sm">followers</p>
                </div>

                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30">
                  <div className="flex items-center space-x-3 mb-2">
                    <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    <span className="text-2xl font-bold">{store.products}</span>
                  </div>
                  <p className="text-white/80 text-sm">products</p>
                </div>

                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30">
                  <div className="flex items-center space-x-3 mb-2">
                    <svg className="w-6 h-6 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-2xl font-bold">{store.responseTime}</span>
                  </div>
                  <p className="text-white/80 text-sm">response time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-2 shadow-lg border border-white/20">
              {{
                products: 'Featured Products',
                about: 'About Store',
                policies: 'Policies',
                reviews: 'Reviews'
              }[activeTab]}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Featured Products
              </h2>
              <button 
                onClick={handleViewAllProducts}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
              >
                <span>View All Products</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg border border-white/20 overflow-hidden group hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        -{product.discount}%
                      </div>
                    )}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white transition-all duration-200 shadow-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">{product.sold} sold</span>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-blue-600">₱{product.price.toLocaleString()}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">₱{product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                    </div>

                    <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-semibold transform hover:scale-105 transition-all duration-200">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About {store.name}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Store Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Joined: {store.joinedDate}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Response Rate: {store.responseRate}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Avg Response Time: {store.responseTime}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {store.categories.map((category, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Awards & Recognition</h3>
                <div className="space-y-2">
                  {store.awards.map((award, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-gray-700">{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Store Policies</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                <div className="flex items-center space-x-3 mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <h3 className="text-xl font-semibold text-blue-800">Shipping</h3>
                </div>
                <p className="text-blue-700">{store.policies.shipping}</p>
              </div>

              <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                <div className="flex items-center space-x-3 mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <h3 className="text-xl font-semibold text-green-800">Returns</h3>
                </div>
                <p className="text-green-700">{store.policies.returns}</p>
              </div>

              <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200">
                <div className="flex items-center space-x-3 mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-purple-800">Warranty</h3>
                </div>
                <p className="text-purple-700">{store.policies.warranty}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-400 mb-2">Reviews Coming Soon</h3>
              <p className="text-gray-500">Customer reviews will be displayed here</p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BStore;

