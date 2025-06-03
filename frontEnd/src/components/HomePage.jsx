import { Link, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  HeartIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProperties } from '../store/slices/propertySlice';
import axios from 'axios';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { properties } = useSelector((state) => state.property);

  // 1) Correct array destructuring for useState:
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // 2) Fetch all properties once on mount:
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  // 3) Whenever `properties` from the store changes, initialize `featuredProperties`:
  useEffect(() => {
    setFeaturedProperties(properties);
  }, [properties]);

  const handleSearch = async () => {
  const min = parseInt(minPrice, 10) || 1000;
  const max = parseInt(maxPrice, 10) || 10000000;
  const token = localStorage.getItem('token');

  try {
    const res = await axios.post(
      'http://localhost:5000/api/properties/search',
      { min, max },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setFeaturedProperties(res.data.data);
  } catch (error) {
    console.error('Search error:', error.response?.data?.message || error.message);
  }
};


  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero / Search Bar */}
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

            <div className="mt-12 max-w-2xl mx-auto bg-white rounded-lg p-4 shadow-xl">
              <div className="flex gap-4 justify-center">
                <input
                  type="number"
                  min={0}
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value.replace(/\D/, ''))}
                  className="w-1/2 px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="number"
                  min={0}
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value.replace(/\D/, ''))}
                  className="w-1/2 px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                onClick={handleSearch}
                className="mt-4 w-full bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* If no results, show a message */}
      {featuredProperties?.length === 0 && (
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          No properties available in this range
        </h2>
      )}

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
                    src={
                      property.images && property.images.length > 0
                        ? property.images[0]
                        : 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf'
                    }
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
                    {property.bedrooms} beds • {property.bathrooms} baths • {property.sqft} sqft
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
              <h3 className="text-lg font-semibold mb-4">eProperty</h3>
              <p className="text-gray-400">
                Your trusted partner in finding and managing premium real estate properties.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate('/about')}
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 eProperty. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
};

export default HomePage;
