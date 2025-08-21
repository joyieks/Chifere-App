import React, { useState } from 'react';
import SellerLayout from '../Seller_Layout/SellerLayout';
import { theme } from '../../../../../styles/designSystem';
import { 
  FiPackage, 
  FiClock, 
  FiTruck, 
  FiCheck, 
  FiX, 
  FiEye,
  FiFilter,
  FiSearch,
  FiDownload
} from 'react-icons/fi';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-2025-001',
      buyerName: 'Maria Santos',
      buyerEmail: 'maria@email.com',
      productName: 'Vintage Leather Jacket',
      productImage: '/placeholder-product.svg',
      quantity: 1,
      amount: 2500,
      status: 'pending',
      orderDate: '2025-01-20T10:30:00',
      shippingAddress: '123 Colon St, Cebu City, 6000',
      paymentMethod: 'GCash',
      notes: 'Please pack carefully, it\'s a gift'
    },
    {
      id: 'ORD-2025-002',
      buyerName: 'Carlo Mendoza',
      buyerEmail: 'carlo@email.com',
      productName: 'MacBook Pro 13"',
      productImage: '/placeholder-product.svg',
      quantity: 1,
      amount: 68990,
      status: 'processing',
      orderDate: '2025-01-19T15:45:00',
      shippingAddress: '456 Lahug Ave, Cebu City, 6000',
      paymentMethod: 'PayMaya',
      notes: ''
    },
    {
      id: 'ORD-2025-003',
      buyerName: 'Luz Garcia',
      buyerEmail: 'luz@email.com',
      productName: 'Samsung Galaxy Watch',
      productImage: '/placeholder-product.svg',
      quantity: 1,
      amount: 12990,
      status: 'shipped',
      orderDate: '2025-01-18T09:15:00',
      shippingAddress: '789 IT Park, Cebu City, 6000',
      paymentMethod: 'Cash on Delivery',
      trackingNumber: 'SPX123456789',
      notes: 'Include warranty card'
    },
    {
      id: 'ORD-2025-004',
      buyerName: 'Rico Flores',
      buyerEmail: 'rico@email.com',
      productName: 'Antique Wooden Chair',
      productImage: '/placeholder-product.svg',
      quantity: 1,
      amount: 0,
      status: 'completed',
      orderDate: '2025-01-17T14:20:00',
      shippingAddress: '321 Banilad Rd, Cebu City, 6000',
      paymentMethod: 'Barter',
      barterItem: 'Vintage Books Collection',
      notes: 'Barter completed successfully'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-700', icon: FiClock },
    processing: { color: 'bg-blue-100 text-blue-700', icon: FiPackage },
    shipped: { color: 'bg-purple-100 text-purple-700', icon: FiTruck },
    completed: { color: 'bg-green-100 text-green-700', icon: FiCheck },
    cancelled: { color: 'bg-red-100 text-red-700', icon: FiX }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.productName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const OrderCard = ({ order }) => {
    const StatusIcon = statusConfig[order.status]?.icon || FiPackage;
    
    return (
      <div className="card-base p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{order.id}</h3>
            <p className="text-sm text-gray-600">
              {new Date(order.orderDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${statusConfig[order.status]?.color}`}>
              <StatusIcon className="w-4 h-4" />
              <span className="capitalize">{order.status}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Details */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Order Details</h4>
            <div className="flex items-center space-x-4 mb-3">
              <img
                src={order.productImage}
                alt={order.productName}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">{order.productName}</p>
                <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                <p className="font-semibold" style={{ color: theme.colors.primary[600] }}>
                  {order.amount === 0 ? `Barter: ${order.barterItem}` : `₱${order.amount.toLocaleString()}`}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Payment:</span> {order.paymentMethod}
            </p>
            {order.trackingNumber && (
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Tracking:</span> {order.trackingNumber}
              </p>
            )}
            {order.notes && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Notes:</span> {order.notes}
              </p>
            )}
          </div>

          {/* Buyer Details */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Buyer Information</h4>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium text-gray-700">Name:</span> {order.buyerName}
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Email:</span> {order.buyerEmail}
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Address:</span> {order.shippingAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button className="btn-base btn-sm btn-outline">
              <FiEye className="w-4 h-4 mr-2" />
              View Details
            </button>
            <button className="btn-base btn-sm btn-outline">
              <FiDownload className="w-4 h-4 mr-2" />
              Invoice
            </button>
          </div>
          
          {order.status === 'pending' && (
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => updateOrderStatus(order.id, 'processing')}
                className="btn-base btn-sm btn-primary"
              >
                Accept Order
              </button>
              <button 
                onClick={() => updateOrderStatus(order.id, 'cancelled')}
                className="btn-base btn-sm bg-red-500 text-white hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          )}
          
          {order.status === 'processing' && (
            <button 
              onClick={() => updateOrderStatus(order.id, 'shipped')}
              className="btn-base btn-sm btn-primary"
            >
              Mark as Shipped
            </button>
          )}
          
          {order.status === 'shipped' && (
            <button 
              onClick={() => updateOrderStatus(order.id, 'completed')}
              className="btn-base btn-sm btn-success"
              style={{ backgroundColor: theme.colors.success[500] }}
            >
              Mark as Completed
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <SellerLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Orders</h1>
              <p className="text-gray-600">Manage your customer orders</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Object.keys(statusConfig).map(status => (
              <div key={status} className="card-base p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1 capitalize">{status} Orders</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {orders.filter(order => order.status === status).length}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${statusConfig[status]?.color.replace('text-', 'text-').replace('bg-', 'bg-').replace('-700', '-100').replace('-100', '-100')}`}>
                    {React.createElement(statusConfig[status]?.icon, { className: `w-6 h-6 ${statusConfig[status]?.color.split(' ')[1]}` })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="card-base p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search orders, buyers, or products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-base pl-10 pr-4"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="input-base min-w-[160px]"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button className="btn-base btn-md btn-outline">
                  <FiFilter className="w-5 h-5 mr-2" />
                  More Filters
                </button>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                Showing {filteredOrders.length} of {orders.length} orders
              </p>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="card-base p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <FiPackage className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No orders found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map(order => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </div>
        </div>
    </SellerLayout>
  );
};

export default Orders;