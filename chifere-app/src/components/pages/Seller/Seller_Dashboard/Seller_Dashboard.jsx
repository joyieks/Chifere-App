import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiPackage, FiUsers, FiTrendingUp, FiPlus, FiEye, FiEdit, FiTrash2, FiStar } from 'react-icons/fi';
import SellerLayout from '../Seller_Layout/Seller_layout.jsx';
import { useNavigate } from 'react-router-dom';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for dashboard
  const stats = [
    { title: 'Total Sales', value: '₱45,230', change: '+12.5%', icon: FiDollarSign, color: 'bg-green-500' },
    { title: 'Orders', value: '156', change: '+8.2%', icon: FiPackage, color: 'bg-blue-500' },
    { title: 'Customers', value: '89', change: '+15.3%', icon: FiUsers, color: 'bg-purple-500' },
    { title: 'Revenue', value: '₱12,450', change: '+22.1%', icon: FiTrendingUp, color: 'bg-orange-500' },
  ];

  const recentOrders = [
    {
      id: '#ORD001',
      customer: 'John Doe',
      item: 'iPhone 12 Pro',
      amount: '₱25,000',
      status: 'Pending',
      date: '2024-01-15',
      type: 'Preloved'
    },
    {
      id: '#ORD002',
      customer: 'Jane Smith',
      item: 'Nike Air Max',
      amount: '₱3,500',
      status: 'Shipped',
      date: '2024-01-14',
      type: 'Barter'
    },
    {
      id: '#ORD003',
      customer: 'Mike Johnson',
      item: 'MacBook Air',
      amount: '₱35,000',
      status: 'Delivered',
      date: '2024-01-13',
      type: 'Preloved'
    },
    {
      id: '#ORD004',
      customer: 'Sarah Wilson',
      item: 'Samsung Galaxy',
      amount: '₱18,000',
      status: 'Processing',
      date: '2024-01-12',
      type: 'Barter'
    },
  ];

  const topItems = [
    {
      name: 'iPhone 12 Pro',
      category: 'Electronics',
      sales: 15,
      revenue: '₱375,000',
      rating: 4.8,
      type: 'Preloved'
    },
    {
      name: 'Nike Air Max',
      category: 'Fashion',
      sales: 23,
      revenue: '₱80,500',
      rating: 4.6,
      type: 'Barter'
    },
    {
      name: 'MacBook Air',
      category: 'Electronics',
      sales: 8,
      revenue: '₱280,000',
      rating: 4.9,
      type: 'Preloved'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    return type === 'Preloved' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  };

  return (
    <SellerLayout>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color} text-white`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.button
            className="bg-blue-600 text-white p-6 rounded-xl shadow-sm hover:bg-blue-700 transition-colors"
            onClick={() => navigate('/seller/preloved/add')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <FiPlus size={24} />
              <div>
                <h3 className="font-semibold">Add Preloved Item</h3>
                <p className="text-sm opacity-90">List a new preloved item</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            className="bg-green-600 text-white p-6 rounded-xl shadow-sm hover:bg-green-700 transition-colors"
            onClick={() => navigate('/seller/barter/add')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <FiPlus size={24} />
              <div>
                <h3 className="font-semibold">Add Barter Item</h3>
                <p className="text-sm opacity-90">Create a new barter listing</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            className="bg-purple-600 text-white p-6 rounded-xl shadow-sm hover:bg-purple-700 transition-colors"
            onClick={() => navigate('/seller/orders')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <FiPackage size={24} />
              <div>
                <h3 className="font-semibold">View Orders</h3>
                <p className="text-sm opacity-90">Manage all orders</p>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'recent-orders', 'top-items'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab === 'overview' && 'Overview'}
                  {tab === 'recent-orders' && 'Recent Orders'}
                  {tab === 'top-items' && 'Top Items'}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
                  <div className="space-y-3">
                    {recentOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{order.customer}</p>
                          <p className="text-sm text-gray-600">{order.item}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(order.type)}`}>
                              {order.type}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{order.amount}</p>
                          <p className="text-xs text-gray-500">{order.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Items */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Items</h3>
                  <div className="space-y-3">
                    {topItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.category}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center">
                              <FiStar className="text-yellow-400" size={14} />
                              <span className="text-xs text-gray-600 ml-1">{item.rating}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                              {item.type}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{item.revenue}</p>
                          <p className="text-xs text-gray-500">{item.sales} sales</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'recent-orders' && (
              <div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.item}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{order.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(order.type)}`}>
                              {order.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <FiEye size={16} />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                <FiEdit size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'top-items' && (
              <div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {topItems.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.sales}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.revenue}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FiStar className="text-yellow-400" size={14} />
                              <span className="text-sm text-gray-900 ml-1">{item.rating}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                              {item.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <FiEye size={16} />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                <FiEdit size={16} />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <FiTrash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerDashboard; 