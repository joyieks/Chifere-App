import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/pages/Landing/landingpage.jsx';
import Login from './components/pages/Authentication/Login.jsx';
import Signup from './components/pages/Authentication/signup.jsx';
import BuyerDashboard from './components/pages/Buyer/Buyer_Menu/Buyer_Dashboard/Buyer_Dashboard.jsx';
import UserPageLayout from './components/pages/Buyer/Buyer_Menu/Buyer_UserPage/UserPageLayout/UserPageLayout.jsx';
import MyAccount from './components/pages/Buyer/Buyer_Menu/Buyer_UserPage/MyAccount/MyAccount.jsx';
import MyPurchase from './components/pages/Buyer/Buyer_Menu/Buyer_UserPage/MyPurchase/MyPurchase.jsx';
import Settings from './components/pages/Buyer/Buyer_Menu/Buyer_UserPage/Settings/Settings.jsx';
import Notifications from './components/pages/Buyer/Buyer_Menu/Buyer_UserPage/Notifications/Notifications.jsx';
import BankAndCards from './components/pages/Buyer/Buyer_Menu/Buyer_UserPage/MyAccount/BankAndCards.jsx';
import Address from './components/pages/Buyer/Buyer_Menu/Buyer_UserPage/MyAccount/Address.jsx';
import ChangePassword from './components/pages/Buyer/Buyer_Menu/Buyer_UserPage/MyAccount/ChangePassword.jsx';
import Wishlists from './components/pages/Buyer/Buyer_Menu/Buyer_Wishlist/Wishlists.jsx';
import Cart from './components/pages/Buyer/Buyer_Menu/Buyer_Cart/Cart.jsx';
import TrackOrder from './components/pages/Buyer/Buyer_Menu/Buyer_UserPage/MyPurchase/TrackOrder.jsx';
import Item from './components/pages/Shared/Item/Item.jsx';
import SearchResult from './components/pages/Shared/SearchItem/SearchResult.jsx';
import Checkout from './components/pages/Buyer/Buyer_Menu/Buyer_UserPage/MyPurchase/Checkout.jsx';
import BStore from './components/pages/Buyer/Buyer_Store/BStore.jsx';
import BStore_Items from './components/pages/Buyer/Buyer_Store/BStore_Items.jsx';

// Seller Components
import SellerDashboard from './components/pages/Seller/Seller_Dashboard/Seller_Dashboard.jsx';
import SellerOrders from './components/pages/Seller/Seller_Orders/Seller_Orders.jsx';
import SellerSettings from './components/pages/Seller/Seller_Settings/Seller_Settings.jsx';
import SellerNotifications from './components/pages/Seller/Seller_Notifications/Seller_Notifications.jsx';
import SellerBarter from './components/pages/Seller/Seller_Barter/Seller_Barter.jsx';
import SellerPreloved from './components/pages/Seller/Seller_Preloved/Seller_Preloved.jsx';

function AppRoutes() {
  const location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Buyer Routes */}
      <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
      <Route path="/buyer_menu/buyer_dashboard" element={<BuyerDashboard />} />
      <Route path="/buyer/account" element={<UserPageLayout><MyAccount /></UserPageLayout>} />
      <Route path="/buyer/account/bank-cards" element={<UserPageLayout><BankAndCards /></UserPageLayout>} />
      <Route path="/buyer/account/address" element={<UserPageLayout><Address /></UserPageLayout>} />
      <Route path="/buyer/account/change-password" element={<UserPageLayout><ChangePassword /></UserPageLayout>} />
      <Route path="/buyer/purchase" element={<UserPageLayout><MyPurchase /></UserPageLayout>} />
      <Route path="/buyer/purchase/track-order/:orderId" element={<UserPageLayout><TrackOrder /></UserPageLayout>} />
      <Route path="/buyer/settings" element={<UserPageLayout><Settings /></UserPageLayout>} />
      <Route path="/buyer/notifications" element={<UserPageLayout><Notifications /></UserPageLayout>} />
      <Route path="/buyer/wishlist" element={<Wishlists key={location.pathname} />} />
      <Route path="/buyer/cart" element={<Cart key={location.pathname} />} />
      <Route path="/buyer/store" element={<BStore />} />
      <Route path="/buyer/store/items" element={<BStore_Items />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/item/:itemId" element={<Item />} />
      <Route path="/search" element={<SearchResult />} />
      
      {/* Seller Routes */}
      <Route path="/seller/dashboard" element={<SellerDashboard />} />
      <Route path="/seller/orders" element={<SellerOrders />} />
      <Route path="/seller/settings" element={<SellerSettings />} />
      <Route path="/seller/notifications" element={<SellerNotifications />} />
      <Route path="/seller/barter" element={<SellerBarter />} />
      <Route path="/seller/preloved" element={<SellerPreloved />} />
      <Route path="/seller/analytics" element={<SellerDashboard />} />
      <Route path="/seller/search" element={<SearchResult />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
