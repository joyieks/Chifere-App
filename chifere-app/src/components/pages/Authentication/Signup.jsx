import React, { useState } from 'react';
import { motion } from 'framer-motion';
import shoppingGirl from '../../../assets/shoppinggirl.png';
import { FiUser, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../../contexts/AuthContext';
import { useToast } from '../../../components/Toast';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(null); // 'buyer' or 'seller'
  const [formData, setFormData] = useState({
    // Buyer fields
    firstName: '',
    lastName: '',
    middleName: '',
    contact: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Seller fields
    storeName: '',
    storeAddress: '',
    businessInfo: '',
    sellerContact: '',
    sellerPassword: '',
    sellerConfirmPassword: '',
    // Verification
    code: '',
    terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [emailError, setEmailError] = useState('');
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Password strength checker
  function getPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    if (strength <= 2) return 'Weak';
    if (strength === 3 || strength === 4) return 'Medium';
    if (strength === 5) return 'Strong';
    return '';
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Password match validation
    if (name === 'password' || name === 'confirmPassword') {
      if (userType === 'buyer') {
        if ((name === 'password' && value !== formData.confirmPassword) || (name === 'confirmPassword' && value !== formData.password)) {
          setPasswordError('Passwords do not match');
        } else {
          setPasswordError('');
        }
      } else if (userType === 'seller') {
        if ((name === 'password' && value !== formData.confirmPassword) || (name === 'confirmPassword' && value !== formData.password)) {
          setPasswordError('Passwords do not match');
        } else {
          setPasswordError('');
        }
      }
    }
    // Password strength
    if (name === 'password') {
      setPasswordStrength(getPasswordStrength(value));
    }
    // Email format validation
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError('Invalid email format');
      } else {
        setEmailError('');
      }
    }
  };

  // Step 1: Choose user type
  if (step === 1) {
    return (
      <div className="min-h-screen w-screen flex bg-gradient-to-br from-blue-200 via-blue-300 to-yellow-100">
        <button 
          onClick={() => window.history.back()}
          className="absolute top-6 left-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition z-10"
        >
          <FiArrowLeft size={20} />
          <span>Back</span>
        </button>
        {/* Left Side */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
          <motion.div 
            className="w-full max-w-md flex flex-col items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src="/chiflogo.png" alt="Chifere Logo" className="w-24 h-24 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Sign Up</h1>
            <p className="text-gray-600 mb-8">Choose your account type to get started:</p>
            <div className="flex flex-col gap-6 w-full">
              <button
                className="w-full py-4 rounded-lg border-2 border-blue-600 text-blue-600 font-bold text-xl hover:bg-blue-50 transition flex items-center justify-center gap-3"
                onClick={() => { setUserType('buyer'); setStep(2); }}
              >
                <FiUser size={28} className="text-blue-600" />
                Sign up as Buyer
              </button>
              <button
                className="w-full py-4 rounded-lg border-2 border-yellow-400 text-yellow-700 font-bold text-xl hover:bg-yellow-50 transition flex items-center justify-center gap-3"
                onClick={() => { setUserType('seller'); setStep(2); }}
              >
                <FiShoppingCart size={28} className="text-yellow-600" />
                Sign up as Seller
              </button>
            </div>
          </motion.div>
        </div>
        {/* Right Side */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 relative overflow-hidden items-center justify-center">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-300 opacity-30 rounded-full filter blur-3xl z-0"></div>
          <motion.div 
            className="w-full h-full flex flex-col items-center justify-center z-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative flex flex-col items-center justify-center w-full h-full group">
              <img 
                src={shoppingGirl} 
                alt="Shopping Girl" 
                className="max-h-[70%] max-w-[70%] object-contain drop-shadow-2xl transition-transform transition-shadow duration-300 ease-in-out group-hover:scale-110 group-hover:drop-shadow-[0_8px_32px_rgba(59,130,246,0.5)] cursor-pointer" 
              />
              <p className="mt-8 text-white text-2xl font-semibold text-center drop-shadow-lg">Join Chifere and start your journey!</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Step 2: Registration form
  if (step === 2) {
    return (
      <div className="min-h-screen w-screen flex bg-gradient-to-br from-blue-200 via-blue-300 to-yellow-100">
        <button 
          onClick={() => { setStep(1); setUserType(null); }}
          className="absolute top-6 left-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition z-10"
        >
          <FiArrowLeft size={20} />
          <span>Back</span>
        </button>
        {/* Left Side */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
          <motion.div 
            className="w-full max-w-md flex flex-col items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src="/chiflogo.png" alt="Chifere Logo" className="w-24 h-24 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{userType === 'buyer' ? 'Buyer Registration' : 'Seller Registration'}</h1>
            <form
              className="space-y-6 w-full"
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                
                try {
                  const result = await signup(formData.email, formData.password, formData.firstName, userType);
                  if (result.success) {
                    showToast('Registration successful! Please verify your email.', 'success');
                    setStep(3);
                  } else {
                    showToast(result.error || 'Registration failed. Please try again.', 'error');
                  }
                } catch (error) {
                  showToast('An error occurred. Please try again.', 'error');
                } finally {
                  setLoading(false);
                }
              }}
            >
              {userType === 'buyer' ? (
                <>
                  <div className="flex gap-2">
                    <div className="w-1/2">
                      <label className="block text-gray-900 font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="First Name"
                        required
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-gray-900 font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-900 font-medium mb-2">Middle Name <span className="text-gray-400">(optional)</span></label>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Middle Name (optional)"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 font-medium mb-2">Contact Number</label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your contact number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                    {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-900 font-medium mb-2">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Create a password"
                      required
                    />
                    {formData.password && (
                      <div className="mt-1 text-sm">
                        <span className={
                          passwordStrength === 'Weak' ? 'text-red-500' :
                          passwordStrength === 'Medium' ? 'text-yellow-500' :
                          passwordStrength === 'Strong' ? 'text-green-600' : ''
                        }>
                          Password strength: {passwordStrength}
                        </span>
                      </div>
                    )}
                  </div>
                 <div>
                   <label className="block text-gray-900 font-medium mb-2">Confirm Password</label>
                   <input
                     type="password"
                     name="confirmPassword"
                     value={formData.confirmPassword}
                     onChange={handleInputChange}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="Confirm your password"
                     required
                   />
                   {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                 </div>
                 <div className="flex items-center mt-2">
                   <input
                     type="checkbox"
                     name="terms"
                     checked={formData.terms}
                     onChange={e => setFormData({ ...formData, terms: e.target.checked })}
                     className="mr-2"
                     required
                   />
                   <span className="text-gray-700 text-sm">I agree to the <a href="#" className="text-blue-600 underline">Terms and Agreement</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a></span>
                 </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-gray-900 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                    {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-900 font-medium mb-2">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Create a password"
                      required
                    />
                    {formData.password && (
                      <div className="mt-1 text-sm">
                        <span className={
                          passwordStrength === 'Weak' ? 'text-red-500' :
                          passwordStrength === 'Medium' ? 'text-yellow-500' :
                          passwordStrength === 'Strong' ? 'text-green-600' : ''
                        }>
                          Password strength: {passwordStrength}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-900 font-medium mb-2">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Confirm your password"
                      required
                    />
                    {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-900 font-medium mb-2">Store Name</label>
                    <input
                      type="text"
                      name="storeName"
                      value={formData.storeName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Enter your store name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 font-medium mb-2">Store Address</label>
                    <input
                      type="text"
                      name="storeAddress"
                      value={formData.storeAddress}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Enter your store address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 font-medium mb-2">Business Info</label>
                    <input
                      type="text"
                      name="businessInfo"
                      value={formData.businessInfo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Enter business information"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 font-medium mb-2">Contact Number</label>
                    <input
                      type="text"
                      name="sellerContact"
                      value={formData.sellerContact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Enter your contact number"
                      required
                    />
                  </div>
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={e => setFormData({ ...formData, terms: e.target.checked })}
                      className="mr-2"
                      required
                    />
                    <span className="text-gray-700 text-sm">I agree to the <a href="#" className="text-blue-600 underline">Terms and Agreement</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a></span>
                  </div>
                </>
              )}
              <button
                type="submit"
                disabled={!formData.terms || passwordError || emailError || passwordStrength === 'Weak' || loading}
                className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center space-x-2 ${userType === 'buyer' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-yellow-400 text-yellow-900 hover:bg-yellow-300'} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                ) : (
                  'Register'
                )}
              </button>
            </form>
          </motion.div>
        </div>
        {/* Right Side */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 relative overflow-hidden items-center justify-center">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-300 opacity-30 rounded-full filter blur-3xl z-0"></div>
          <motion.div 
            className="w-full h-full flex flex-col items-center justify-center z-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative flex flex-col items-center justify-center w-full h-full group">
              <img 
                src={shoppingGirl} 
                alt="Shopping Girl" 
                className="max-h-[70%] max-w-[70%] object-contain drop-shadow-2xl transition-transform transition-shadow duration-300 ease-in-out group-hover:scale-110 group-hover:drop-shadow-[0_8px_32px_rgba(59,130,246,0.5)] cursor-pointer" 
              />
              <p className="mt-8 text-white text-2xl font-semibold text-center drop-shadow-lg">{userType === 'buyer' ? 'Shop with confidence!' : 'Grow your business with Chifere!'}</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Step 3: Verification code
  if (step === 3) {
    return (
      <div className="min-h-screen w-screen flex bg-gradient-to-br from-blue-200 via-blue-300 to-yellow-100">
        <button 
          onClick={() => setStep(2)}
          className="absolute top-6 left-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition z-10"
        >
          <FiArrowLeft size={20} />
          <span>Back</span>
        </button>
        {/* Left Side */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
          <motion.div 
            className="w-full max-w-md flex flex-col items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src="/chiflogo.png" alt="Chifere Logo" className="w-24 h-24 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Verification</h1>
            <p className="text-gray-600 mb-6">A verification code has been sent to your email. Please enter it below:</p>
            <form
              className="space-y-6 w-full"
              onSubmit={e => {
                e.preventDefault();
                if (formData.code === '123456') {
                  setStep(4);
                  setError('');
                } else {
                  setError('Invalid code. Please try again.');
                }
              }}
            >
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center tracking-widest text-2xl"
                placeholder="Enter code"
                required
              />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Verify
              </button>
            </form>
          </motion.div>
        </div>
        {/* Right Side */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 relative overflow-hidden items-center justify-center">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-300 opacity-30 rounded-full filter blur-3xl z-0"></div>
          <motion.div 
            className="w-full h-full flex flex-col items-center justify-center z-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative flex flex-col items-center justify-center w-full h-full group">
              <img 
                src={shoppingGirl} 
                alt="Shopping Girl" 
                className="max-h-[70%] max-w-[70%] object-contain drop-shadow-2xl transition-transform transition-shadow duration-300 ease-in-out group-hover:scale-110 group-hover:drop-shadow-[0_8px_32px_rgba(59,130,246,0.5)] cursor-pointer" 
              />
              <p className="mt-8 text-white text-2xl font-semibold text-center drop-shadow-lg">Almost there!</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Step 4: Success message
  if (step === 4) {
    return (
      <div className="min-h-screen w-screen flex bg-gradient-to-br from-blue-200 via-blue-300 to-yellow-100">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
          <motion.div 
            className="w-full max-w-md flex flex-col items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src="/chiflogo.png" alt="Chifere Logo" className="w-24 h-24 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Congratulations!</h1>
            <p className="text-gray-600 mb-8 text-center">
              {userType === 'buyer'
                ? 'Your account has been successfully created.'
                : 'You can now start selling your items.'}
            </p>
            <button
              className="w-full py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
              onClick={() => window.location.href = '/login'}
            >
              Continue
            </button>
          </motion.div>
        </div>
        {/* Right Side */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 relative overflow-hidden items-center justify-center">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-300 opacity-30 rounded-full filter blur-3xl z-0"></div>
          <motion.div 
            className="w-full h-full flex flex-col items-center justify-center z-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative flex flex-col items-center justify-center w-full h-full group">
              <img 
                src={shoppingGirl} 
                alt="Shopping Girl" 
                className="max-h-[70%] max-w-[70%] object-contain drop-shadow-2xl transition-transform transition-shadow duration-300 ease-in-out group-hover:scale-110 group-hover:drop-shadow-[0_8px_32px_rgba(59,130,246,0.5)] cursor-pointer" 
              />
              <p className="mt-8 text-white text-2xl font-semibold text-center drop-shadow-lg">Welcome to Chifere!</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
};

export default Signup;
