import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeIcon, KeyIcon, PhoneIcon } from '@heroicons/react/24/outline';
import axios from "axios"

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [selectedRole, setSelectedRole] = useState('buyer');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [passwordError, setPasswordError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear password error when user types
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }

    // Clear specific field error
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Check required fields
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone is required';

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    // Phone validation (10 digits)
    if (formData.phone && !/^\d{11}$/.test(formData.phone)) {
      errors.phone = 'Phone must be 11 digits';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      setPasswordError('Passwords do not match');
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) return;

    const { firstName, lastName, email, password, phone } = formData;

    const userPayload = {
      name: `${firstName} ${lastName}`,
      email,
      password,
      phone,
      role: selectedRole,
    };
    console.log(userPayload)
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", userPayload, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("Registration successful:", response.data);
      setShowOtp(true);
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      // Handle specific errors from backend
      if (error.response.status = 400) {
        setFormErrors({ email: 'Email already registered' });
      }
    }
  };
  

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };
  const handleVerifyOtp = async () => {
  try {
    const payload = {
      otp:otp.join(""),
      email: formData.email
    }
    console.log(otp);

    const response = await axios.post('http://localhost:5000/api/users/verify-otp',payload,{
        headers: {
          'Content-Type': 'application/json',
   } });

    if (response.data.success) {
      navigate('/login')
      alert("OTP Verified!");
    } else {
      alert("Invalid OTP.");
    }
  } catch (error) {
    console.error("Verification failed:", error);
    alert("Something went wrong!");
  }
};

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80"
          alt="Real Estate Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-4 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 sm:p-12 lg:p-16 border border-white/20">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Find Your Dream Home
            </h1>
            <p className="text-gray-600 text-lg">
              Join thousands of buyers and sellers in our community
            </p>
          </div>

          <div className="flex gap-6 mb-10">
            <button
              type="button"
              onClick={() => handleRoleSelect('buyer')}
              className={`flex-1 p-6 rounded-xl transition-all duration-300 ${selectedRole === 'buyer'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white/90 text-gray-600 hover:bg-white/100'
                }`}
            >
              <HomeIcon className="w-8 h-8 mx-auto mb-3" />
              <span className="text-lg font-semibold">I'm a Buyer</span>
              <p className="text-sm mt-2">Find your perfect property</p>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('seller')}
              className={`flex-1 p-6 rounded-xl transition-all duration-300 ${selectedRole === 'seller'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white/90 text-gray-600 hover:bg-white/100'
                }`}
            >
              <KeyIcon className="w-8 h-8 mx-auto mb-3" />
              <span className="text-lg font-semibold">I'm a Seller</span>
              <p className="text-sm mt-2">List your properties</p>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  name="firstName"
                  placeholder="First Name"
                  className={`w-full px-5 py-3 rounded-lg border ${formErrors.firstName ? 'border-red-500' : 'border-gray-200'
                    } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  onChange={handleInputChange}
                />
                {formErrors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
                )}
              </div>
              <div>
                <input
                  name="lastName"
                  placeholder="Last Name"
                  className={`w-full px-5 py-3 rounded-lg border ${formErrors.lastName ? 'border-red-500' : 'border-gray-200'
                    } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  onChange={handleInputChange}
                />
                {formErrors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                className={`w-full px-5 py-3 rounded-lg border ${formErrors.email ? 'border-red-500' : 'border-gray-200'
                  } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                onChange={handleInputChange}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>

            {/* Phone Number Field */}
            <div>
              <div className="relative">
                <PhoneIcon className="h-5 w-5 absolute left-3 top-4 text-gray-400" />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number (11 digits)"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${formErrors.phone ? 'border-red-500' : 'border-gray-200'
                    } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  onChange={handleInputChange}
                />
              </div>
              {formErrors.phone && (
                <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className={`w-full px-5 py-3 rounded-lg border ${formErrors.password ? 'border-red-500' : 'border-gray-200'
                    } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  onChange={handleInputChange}
                />
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                )}
              </div>
              <div>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className={`w-full px-5 py-3 rounded-lg border ${passwordError ? 'border-red-500' : 'border-gray-200'
                    } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  onChange={handleInputChange}
                />
                {(passwordError || formErrors.confirmPassword) && (
                  <p className="mt-1 text-sm text-red-600">
                    {passwordError || formErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow-md transition-all duration-300 transform hover:scale-[1.02]"
            >
              Get Started
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={handleLoginRedirect}
              className="text-emerald-600 hover:text-emerald-700 font-medium underline underline-offset-4"
            >
              Already have an account? Sign in here
            </button>
          </div>
        </div>
      </div>

      {/* OTP Verification Section */}
      {showOtp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Verify Your Email</h3>
              <p className="mt-2 text-gray-600">
                We've sent a code to <span className="font-semibold">{formData.email}</span>
              </p>

            </div>

            <div className="flex justify-center gap-3 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  className="w-14 h-14 text-2xl text-center border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono"
                  value={digit}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d?$/.test(val)) {  // Only allow one digit (0-9)
                      handleOtpChange(index, val);
                    }
                  }}
                />
              ))}
            </div>


            <button onClick={handleVerifyOtp} className="w-full py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
              Verify & Continue
            </button>


          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPage;