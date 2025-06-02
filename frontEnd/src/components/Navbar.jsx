import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BuildingOfficeIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { logout } from '../store/slices/authSlice.js';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  const commonLinks = (
    <>
      <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({ isActive }) =>
        `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-600'}`
      }>
        Home
      </NavLink>
      <NavLink to="/properties" onClick={() => setIsMenuOpen(false)} className={({ isActive }) =>
        `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-600'}`
      }>
        Properties
      </NavLink>
      <NavLink to="/about" onClick={() => setIsMenuOpen(false)} className={({ isActive }) =>
        `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-600'}`
      }>
        About
      </NavLink>
      <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className={({ isActive }) =>
        `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-600'}`
      }>
        Contact
      </NavLink>

      {isAuthenticated && user?.role === 'buyer' && (
        <NavLink to="/buyer/dashboard" onClick={() => setIsMenuOpen(false)} className={({ isActive }) =>
          `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-600'}`
        }>
          Buyer Dashboard
        </NavLink>
      )}
      {isAuthenticated && user?.role === 'seller' && (
        <NavLink to="/seller/dashboard" onClick={() => setIsMenuOpen(false)} className={({ isActive }) =>
          `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-600'}`
        }>
          Seller Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BuildingOfficeIcon className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">eProperty</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {commonLinks}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700 font-semibold">Hi, {user?.name || user?.email}</span>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="text-gray-600 hover:text-emerald-600 font-medium">
                  Sign In
                </NavLink>
                <NavLink to="/signup" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-700" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow-md">
          {commonLinks}
          <div className="mt-4 border-t pt-4 space-y-2">
            {isAuthenticated ? (
              <>
                <p className="text-gray-700 font-semibold">Hi, {user?.name || user?.email}</p>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className="block text-gray-600 hover:text-emerald-600 font-medium">
                  Sign In
                </NavLink>
                <NavLink to="/signup" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
