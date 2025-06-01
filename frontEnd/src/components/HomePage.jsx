import { Link } from 'react-router-dom';

import { HomeIcon, BuildingOfficeIcon, HeartIcon, UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from 'react';
import { fetchProperties } from '../store/slices/propertySlice';
const HomePage = () => {
  const {properties} = useSelector(state=> state.property)
  const featuredProperties = properties || [];
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchProperties());
  }, [dispatch]);
 
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
     

      {/* Hero Section */}
      <div className="relative pt-16 pb-32">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
            alt="Property background"
          />
          <div className="absolute inset-0 bg-emerald-900/60" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Find Your Perfect Home
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-emerald-100">
              Discover your dream property from our premium collection of residences
            </p>
            
            {/* Search Bar */}
            <div className="mt-12 max-w-2xl mx-auto bg-white rounded-lg p-2 shadow-xl">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by location or property name"
                    className="w-full pl-10 pr-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <select className="rounded-md border-0 bg-gray-100 py-3 px-4 focus:ring-2 focus:ring-emerald-500">
                  <option>Price Range</option>
                  <option>Rs:100k - Rs:300k</option>
                  <option>Rs:300k - Rs:500k</option>
                  <option>Rs:500k+</option>
                </select>
                <button className="bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {featuredProperties.length === 0 && <h2 className="text-3xl font-bold text-gray-900 mb-8">No properties Available</h2>}
        
      {/* Featured Properties */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
             <Link
                          to={`/properties/${property._id}`}
                          key={property._id}
                          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="p-4">
                            <div className="relative mb-4">
                              <img
                                src={property.images && property.images.length > 0 ? property.images[0] : "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf"}
                                alt="Property"
                                className="w-full h-48 object-cover rounded-lg"
                              />
            
                              <button className="absolute top-2 right-2 p-2 bg-white/90 rounded-full">
                                <HeartIcon className="h-6 w-6 text-gray-400 hover:text-red-500" />
                              </button>
                            </div>
            
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold text-gray-900">{property.price}</h3>
                              <div className="flex items-center text-sm text-gray-600">
                                <HomeIcon className="h-5 w-5 mr-2" />
                                {property.beds} beds • {property.baths} baths • {property.sqft} sqft
                              </div>
                              <p className="text-sm text-gray-600">{property.location}</p>
                              <button className="w-full mt-4 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700">
                                View Details
                              </button>
                            </div>
                          </div>
                        </Link>
          ))}
        </div>
      </div>

      {/* Quote Section */}
      <div className="bg-emerald-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl font-medium text-gray-900">
            “Home is where our story begins. Let us help you write the perfect first chapter.”
          </blockquote>
          <div className="mt-4 text-emerald-600 font-medium">- EstatePro Team</div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">EstatePro</h3>
              <p className="text-gray-400">
                Your trusted partner in finding and managing premium real estate properties.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 EstatePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;