import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import Error404 from './components/pages/Error404';
import { ProductGridSkeleton } from './components/Skeleton';

// Lazy load components for better performance
const LandingPage = lazy(() => import('./components/pages/Landing/landingpage.jsx'));
const Login = lazy(() => import('./components/pages/Authentication/Login.jsx'));
const Signup = lazy(() => import('./components/pages/Authentication/signup.jsx'));
const BuyerDashboard = lazy(() => import('./components/pages/Buyer/Buyer_Menu/Buyer_Dashboard/Buyer_Dashboard.jsx'));
const UserPageLayout = lazy(() => import('./components/pages/Buyer/Buyer_Menu/Buyer_UserPage/UserPageLayout/UserPageLayout.jsx'));
const MyAccount = lazy(() => import('./components/pages/Buyer/Buyer_Menu/Buyer_UserPage/MyAccount/MyAccount.jsx'));
const MyPurchase = lazy(() => import('./components/pages/Buyer/Buyer_Menu/Buyer_UserPage/MyPurchase/MyPurchase.jsx'));
const Settings = lazy(() => import('./components/pages/Buyer/Buyer_Menu/Buyer_UserPage/Settings/Settings.jsx'));
const Notifications = lazy(() => import('./components/pages/Buyer/Buyer_Menu/Buyer_UserPage/Notifications/Notifications.jsx'));
const BankAndCards = lazy(() => import('./components/pages/Buyer/Buyer_Menu/Buyer_UserPage/MyAccount/BankAndCards.jsx'));
const Address = lazy(() => import('./components/pages/Buyer/Buyer_Menu/Buyer_UserPage/MyAccount/Address.jsx'));
const ChangePassword = lazy(() => import('./components/pages/Buyer/Buyer_Menu/Buyer_UserPage/MyAccount/ChangePassword.jsx'));
const Wishlists = lazy(() => import('./components/pages/Buyer/Buyer_Menu/Buyer_Wishlist/Wishlists.jsx'));
const Cart = lazy(() => import('./components/pages/Buyer/Buyer_Menu/Buyer_Cart/Cart.jsx'));
const TrackOrder = lazy(() => import('./components/pages/Buyer/Buyer_Menu/Buyer_UserPage/MyPurchase/TrackOrder.jsx'));
const Item = lazy(() => import('./components/pages/Shared/Item/Item.jsx'));
const SearchResult = lazy(() => import('./components/pages/Shared/SearchItem/SearchResult.jsx'));
const Checkout = lazy(() => import('./components/pages/Buyer/Buyer_Menu/Buyer_UserPage/MyPurchase/Checkout.jsx'));
const BStore = lazy(() => import('./components/pages/Buyer/Buyer_Store/BStore.jsx'));
const BStore_Items = lazy(() => import('./components/pages/Buyer/Buyer_Store/BStore_Items.jsx'));
const StorePage = lazy(() => import('./components/pages/Buyer/BuyerStore/StorePage.jsx'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function AppRoutes() {
  const location = useLocation();
  
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <ProtectedRoute requireAuth={false}>
              <Signup />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Buyer Routes */}
        <Route 
          path="/buyer/dashboard" 
          element={
            <ProtectedRoute>
              <BuyerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/buyer/account" 
          element={
            <ProtectedRoute>
              <UserPageLayout><MyAccount /></UserPageLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/buyer/account/bank-cards" 
          element={
            <ProtectedRoute>
              <UserPageLayout><BankAndCards /></UserPageLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/buyer/account/address" 
          element={
            <ProtectedRoute>
              <UserPageLayout><Address /></UserPageLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/buyer/account/change-password" 
          element={
            <ProtectedRoute>
              <UserPageLayout><ChangePassword /></UserPageLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/buyer/purchase" 
          element={
            <ProtectedRoute>
              <UserPageLayout><MyPurchase /></UserPageLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/buyer/purchase/track-order/:orderId" 
          element={
            <ProtectedRoute>
              <UserPageLayout><TrackOrder /></UserPageLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/buyer/settings" 
          element={
            <ProtectedRoute>
              <UserPageLayout><Settings /></UserPageLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/buyer/notifications" 
          element={
            <ProtectedRoute>
              <UserPageLayout><Notifications /></UserPageLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/buyer/wishlist" 
          element={
            <ProtectedRoute>
              <Wishlists key={location.pathname} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/buyer/cart" 
          element={
            <ProtectedRoute>
              <Cart key={location.pathname} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/buyer/store" 
          element={
            <ProtectedRoute>
              <StorePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/buyer/store/:storeId" 
          element={
            <ProtectedRoute>
              <StorePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/buyer/store/items" 
          element={
            <ProtectedRoute>
              <BStore_Items />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/store/:storeId" 
          element={
            <StorePage />
          } 
        />
        
        {/* Semi-protected routes (can be accessed without login but with limited functionality) */}
        <Route path="/item/:itemId" element={<Item />} />
        <Route path="/search" element={<SearchResult />} />
        
        {/* Checkout route - requires authentication */}
        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } 
        />
        
        {/* 404 Error Page */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Router>
            <AppRoutes />
          </Router>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
