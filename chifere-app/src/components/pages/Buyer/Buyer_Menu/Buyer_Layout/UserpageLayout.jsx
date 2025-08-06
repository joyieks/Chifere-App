import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import brentImg from '/src/assets/brent.jpg';

const UserpageLayout = ({ children }) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg p-6 flex flex-col">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <img src={brentImg} alt="Brent Manalo" className="w-20 h-20 rounded-full object-cover border-4 border-blue-800 mb-2" />
          <span className="font-bold text-lg text-blue-900">Brent Manalo</span>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          <button
            className={`flex items-center justify-between px-4 py-2 rounded hover:bg-blue-50 text-gray-800 font-semibold focus:outline-none ${location.pathname === '/buyer/notifications' ? 'cursor-default' : ''}`}
            onClick={() => {
              if (location.pathname !== '/buyer/notifications') {
                setShowAccountMenu((prev) => !prev);
              }
            }}
            disabled={location.pathname === '/buyer/notifications'}
          >
            <span>My Account</span>
            {location.pathname !== '/buyer/notifications' && (
              <svg className={`w-4 h-4 ml-2 transition-transform ${showAccountMenu ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            )}
          </button>
          {showAccountMenu && (
            <div className="ml-8 flex flex-col gap-1 mb-2">
              <button className="text-left px-2 py-1 rounded hover:bg-blue-100 text-gray-700" onClick={() => navigate('/buyer/account/profile')}>Profile</button>
              <button className="text-left px-2 py-1 rounded hover:bg-blue-100 text-gray-700" onClick={() => navigate('/buyer/account/bank-cards')}>Bank & Cards</button>
              <button className="text-left px-2 py-1 rounded hover:bg-blue-100 text-gray-700" onClick={() => navigate('/buyer/account/address')}>Address</button>
              <button className="text-left px-2 py-1 rounded hover:bg-blue-100 text-gray-700" onClick={() => navigate('/buyer/account/change-password')}>Change Password</button>
            </div>
          )}
          <button className="text-left px-4 py-2 rounded hover:bg-blue-50 text-gray-800 font-semibold" onClick={() => navigate('/buyer/purchase')}>My Purchase</button>
          <button className="text-left px-4 py-2 rounded hover:bg-blue-50 text-gray-800 font-semibold" onClick={() => navigate('/buyer/notifications')}>Notifications</button>
          <button className="text-left px-4 py-2 rounded hover:bg-blue-50 text-gray-800 font-semibold" onClick={() => navigate('/buyer/settings')}>Settings</button>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default UserpageLayout; 