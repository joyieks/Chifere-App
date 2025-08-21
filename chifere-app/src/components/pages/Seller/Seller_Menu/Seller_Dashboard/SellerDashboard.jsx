import React, { useState, useEffect } from 'react';
import SellerLayout from '../Seller_Layout/SellerLayout';
import { theme } from '../../../../../styles/designSystem';
import { FiDollarSign, FiPackage, FiEye, FiTrendingUp, FiShoppingCart, FiMessageSquare } from 'react-icons/fi';

const SellerDashboard = () => {
  const [stats, setStats] = useState({
    totalEarnings: 45250,
    totalProducts: 24,
    totalViews: 1847,
    activeOrders: 7,
    pendingOffers: 3,
    messages: 12
  });

  const [recentProducts, setRecentProducts] = useState([
    {
      id: 1,
      name: 'Vintage Leather Jacket',
      price: 2500,
      views: 127,
      status: 'active',
      image: '/placeholder-product.svg',
      category: 'fashion'
    },
    {
      id: 2,
      name: 'MacBook Pro 13"',
      price: 68990,
      views: 234,
      status: 'sold',
      image: '/placeholder-product.svg',
      category: 'electronics'
    },
    {
      id: 3,
      name: 'Antique Wooden Chair',
      price: 0,
      views: 89,
      status: 'barter',
      image: '/placeholder-product.svg',
      category: 'furniture'
    }
  ]);

  const [recentOrders, setRecentOrders] = useState([
    {
      id: 'ORD-001',
      buyer: 'Maria Santos',
      product: 'iPhone 12 Pro',
      amount: 45000,
      status: 'processing',
      date: '2025-01-20'
    },
    {
      id: 'ORD-002',
      buyer: 'Juan Dela Cruz',
      product: 'Gaming Laptop',
      amount: 35000,
      status: 'shipped',
      date: '2025-01-19'
    },
    {
      id: 'ORD-003',
      buyer: 'Ana Reyes',
      product: 'Vintage Camera',
      amount: 0,
      status: 'barter',
      date: '2025-01-18'
    }
  ]);

  const StatCard = ({ icon: Icon, title, value, color = 'blue', trend = null }) => (
    <div className="card-base p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">
            {typeof value === 'number' && title.includes('Earnings') ? `₱${value.toLocaleString()}` : value}
          </p>
          {trend && (
            <div className="flex items-center mt-2">
              <FiTrendingUp className={`w-4 h-4 mr-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" 
             style={{ backgroundColor: theme.colors[color][100] }}>
          <Icon className="w-6 h-6" style={{ color: theme.colors[color][500] }} />
        </div>
      </div>
    </div>
  );

  const ProductCard = ({ product }) => (
    <div className="card-base p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center space-x-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 mb-1">{product.name}</h4>
          <p className="text-sm text-gray-600 mb-2">
            {product.price === 0 ? 'Barter Only' : `₱${product.price.toLocaleString()}`}
          </p>
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.status === 'active' ? 'bg-green-100 text-green-700' :
              product.status === 'sold' ? 'bg-blue-100 text-blue-700' :
              'bg-orange-100 text-orange-700'
            }`}>
              {product.status}
            </span>
            <div className="flex items-center text-sm text-gray-500">
              <FiEye className="w-4 h-4 mr-1" />
              {product.views}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const OrderCard = ({ order }) => (
    <div className="card-base p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-800">{order.id}</h4>
          <p className="text-sm text-gray-600">{order.buyer}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
          order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
          order.status === 'barter' ? 'bg-orange-100 text-orange-700' :
          'bg-green-100 text-green-700'
        }`}>
          {order.status}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{order.product}</p>
          <p className="font-semibold" style={{ color: theme.colors.primary[600] }}>
            {order.amount === 0 ? 'Barter' : `₱${order.amount.toLocaleString()}`}
          </p>
        </div>
        <p className="text-xs text-gray-500">{order.date}</p>
      </div>
    </div>
  );

  return (
    <SellerLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            <StatCard
              icon={FiDollarSign}
              title="Total Earnings"
              value={stats.totalEarnings}
              color="primary"
              trend={12.5}
            />
            <StatCard
              icon={FiPackage}
              title="Products Listed"
              value={stats.totalProducts}
              color="secondary"
              trend={8.2}
            />
            <StatCard
              icon={FiEye}
              title="Total Views"
              value={stats.totalViews}
              color="info"
              trend={15.3}
            />
            <StatCard
              icon={FiShoppingCart}
              title="Active Orders"
              value={stats.activeOrders}
              color="success"
            />
            <StatCard
              icon={FiTrendingUp}
              title="Pending Offers"
              value={stats.pendingOffers}
              color="warning"
            />
            <StatCard
              icon={FiMessageSquare}
              title="New Messages"
              value={stats.messages}
              color="error"
            />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Products */}
            <div className="card-base p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Recent Products</h2>
                <button className="text-sm font-medium" style={{ color: theme.colors.primary[500] }}>
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="card-base p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                <button className="text-sm font-medium" style={{ color: theme.colors.primary[500] }}>
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentOrders.map(order => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </div>
          </div>

        </div>
    </SellerLayout>
  );
};

export default SellerDashboard;