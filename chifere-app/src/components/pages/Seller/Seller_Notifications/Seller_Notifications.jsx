import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiPackage, FiMessageSquare, FiStar, FiDollarSign, FiAlertCircle, FiCheckCircle, FiClock, FiTrash2, FiEye } from 'react-icons/fi';
import SellerLayout from '../Seller_Layout/Seller_layout.jsx';

const SellerNotifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      message: 'You have received a new order for iPhone 12 Pro from John Doe',
      time: '2 minutes ago',
      read: false,
      orderId: '#ORD001',
      amount: '₱25,000'
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message',
      message: 'Sarah Wilson sent you a message about the Samsung Galaxy',
      time: '15 minutes ago',
      read: false,
      customerName: 'Sarah Wilson'
    },
    {
      id: 3,
      type: 'review',
      title: 'New Review',
      message: 'Mike Johnson left a 5-star review for your MacBook Air',
      time: '1 hour ago',
      read: true,
      rating: 5,
      itemName: 'MacBook Air'
    },
    {
      id: 4,
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of ₱3,500 received for Nike Air Max order',
      time: '2 hours ago',
      read: true,
      amount: '₱3,500',
      orderId: '#ORD002'
    },
    {
      id: 5,
      type: 'system',
      title: 'System Update',
      message: 'Your store has been featured in the trending section',
      time: '3 hours ago',
      read: true
    },
    {
      id: 6,
      type: 'order',
      title: 'Order Status Updated',
      message: 'Order #ORD003 has been marked as delivered',
      time: '4 hours ago',
      read: true,
      orderId: '#ORD003',
      status: 'Delivered'
    },
    {
      id: 7,
      type: 'message',
      title: 'New Message',
      message: 'David Brown is interested in your Canon DSLR Camera',
      time: '5 hours ago',
      read: true,
      customerName: 'David Brown'
    },
    {
      id: 8,
      type: 'review',
      title: 'New Review',
      message: 'Lisa Garcia left a 4-star review for your Adidas Ultraboost',
      time: '6 hours ago',
      read: true,
      rating: 4,
      itemName: 'Adidas Ultraboost'
    }
  ]);

  const filters = [
    { key: 'all', label: 'All', count: notifications.length },
    { key: 'order', label: 'Orders', count: notifications.filter(n => n.type === 'order').length },
    { key: 'message', label: 'Messages', count: notifications.filter(n => n.type === 'message').length },
    { key: 'review', label: 'Reviews', count: notifications.filter(n => n.type === 'review').length },
    { key: 'payment', label: 'Payments', count: notifications.filter(n => n.type === 'payment').length },
    { key: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order': return FiPackage;
      case 'message': return FiMessageSquare;
      case 'review': return FiStar;
      case 'payment': return FiDollarSign;
      case 'system': return FiAlertCircle;
      default: return FiBell;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'order': return 'bg-blue-100 text-blue-800';
      case 'message': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'payment': return 'bg-purple-100 text-purple-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    return activeFilter === 'all' || notification.type === activeFilter;
  });

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SellerLayout>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
              <p className="text-gray-600">Stay updated with your store activities</p>
            </div>
            <div className="flex items-center space-x-4">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Mark all as read
                </button>
              )}
              <div className="relative">
                <FiBell size={24} className="text-gray-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {filters.slice(1).map((filter) => (
            <motion.div
              key={filter.key}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{filter.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{filter.count}</p>
                </div>
                <div className={`p-3 rounded-full ${getNotificationColor(filter.key)}`}>
                  {React.createElement(getNotificationIcon(filter.key), { size: 24 })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <FiBell className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
              <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full ${getNotificationColor(notification.type)}`}>
                      {React.createElement(getNotificationIcon(notification.type), { size: 20 })}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                          {!notification.read && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              New
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">{notification.time}</span>
                          <div className="flex items-center space-x-1">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-blue-600 hover:text-blue-700"
                                title="Mark as read"
                              >
                                <FiEye size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-red-600 hover:text-red-700"
                              title="Delete notification"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                      
                      {/* Additional details based on notification type */}
                      {notification.type === 'order' && notification.orderId && (
                        <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                          <span>Order: {notification.orderId}</span>
                          {notification.amount && <span>Amount: {notification.amount}</span>}
                          {notification.status && <span>Status: {notification.status}</span>}
                        </div>
                      )}
                      
                      {notification.type === 'message' && notification.customerName && (
                        <div className="mt-2 text-xs text-gray-500">
                          From: {notification.customerName}
                        </div>
                      )}
                      
                      {notification.type === 'review' && (
                        <div className="mt-2 flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                size={14}
                                className={i < notification.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            {notification.rating} stars for {notification.itemName}
                          </span>
                        </div>
                      )}
                      
                      {notification.type === 'payment' && (
                        <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                          <span>Amount: {notification.amount}</span>
                          {notification.orderId && <span>Order: {notification.orderId}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Load More Button */}
        {filteredNotifications.length > 0 && (
          <div className="mt-8 text-center">
            <button className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Load More
            </button>
          </div>
        )}
      </div>
    </SellerLayout>
  );
};

export default SellerNotifications; 