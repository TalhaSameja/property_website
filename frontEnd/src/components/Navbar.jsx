import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { logout } from '../store/slices/authSlice.js';

function Navbar() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <BuildingOfficeIcon className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">EstatePro</span>
          </NavLink>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-600'}`
            }>
              Home
            </NavLink>
            <NavLink to="/properties" className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-600'}`
            }>
              Properties
            </NavLink>
            <NavLink to="/about" className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-600'}`
            }>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-600'}`
            }>
              Contact
            </NavLink>

            {/* Conditional Dashboard Link */}
            {isAuthenticated && user?.role === 'buyer' && (
              <NavLink to="/buyer/dashboard" className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-600'}`
              }>
                Buyer Dashboard
              </NavLink>
            )}
            {isAuthenticated && user?.role === 'seller' && (
              <NavLink to="/seller/dashboard" className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-600'}`
              }>
                Seller Dashboard
              </NavLink>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700 font-semibold">Welcome, {user?.name || user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="px-4 py-2 text-gray-600 hover:text-emerald-600 font-medium">
                  Sign In
                </NavLink>
                <NavLink to="/signup" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
