import React, { useState } from 'react';

const ChangePassword = () => {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [sentOtp] = useState('123456'); // mock OTP
  const [success, setSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setShowOtp(true);
  };
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === sentOtp) {
      setShowOtp(false);
      setSuccess(true);
      setCurrent('');
      setNewPass('');
      setConfirm('');
      setOtp('');
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg px-12 py-10 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-8 text-blue-800 text-left">Change Password</h1>
        <div className="flex flex-col items-center">
          <form onSubmit={handleSave} className="space-y-6 w-full max-w-sm">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Current Password</label>
              <input
                type="password"
                value={current}
                onChange={e => setCurrent(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">New Password</label>
              <input
                type="password"
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400 bg-white"
                required
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow">Save</button>
            </div>
          </form>
        </div>
        {/* OTP Modal */}
        {showOtp && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <form onSubmit={handleOtpSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xs">
              <h2 className="text-xl font-bold mb-4 text-blue-800">Enter OTP</h2>
              <p className="mb-2 text-gray-600">We sent a 6-digit code to your email.</p>
              <input
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                maxLength={6}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                placeholder="Enter OTP"
              />
              <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Verify</button>
            </form>
          </div>
        )}
        {/* Success Modal */}
        {success && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-xs w-full text-center">
              <h2 className="text-xl font-bold mb-4 text-green-600">Password Changed Successfully!</h2>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => setSuccess(false)}>OK</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
