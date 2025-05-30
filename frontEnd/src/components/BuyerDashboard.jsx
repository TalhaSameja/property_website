import { Link } from 'react-router-dom';
import { HomeIcon, HeartIcon, BellIcon, UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const BuyerDashboard = () => {
  // Mock data - replace with actual data from your API
  const recommendedProperties = [
    { id: 1, price: '$599,000', beds: 3, baths: 2, sqft: 1800, location: 'Downtown', saved: true },
    { id: 2, price: '$799,000', beds: 4, baths: 3, sqft: 2500, location: 'Suburbs', saved: false },
    { id: 3, price: '$1,299,000', beds: 3, baths: 3, sqft: 3200, location: 'Lakeside', saved: true },
  ];

  const savedSearches = [
    { id: 1, location: 'Downtown', minPrice: '$500k', maxPrice: '$800k', beds: 3 },
    { id: 2, location: 'Suburbs', minPrice: '$400k', maxPrice: '$600k', beds: 4 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-emerald-600">
                EstatePro
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-emerald-600">
                <BellIcon className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-emerald-600">
                <UserCircleIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Welcome Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back, Alex!
              </h1>
              <p className="text-gray-600">
                {recommendedProperties.length} new properties match your preferences
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <div className="flex items-center gap-4">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties by location, price, or features"
                  className="flex-1 border-0 focus:ring-0"
                />
                <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700">
                  Search
                </button>
              </div>
            </div>

            {/* Recommended Properties */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recommended for You
                </h2>
                <Link to="/properties" className="text-emerald-600 hover:text-emerald-700">
                  See all
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedProperties.map((property) => (
                  <div key={property.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="relative mb-4">
                        <img
                          src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf"
                          alt="Property"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button className="absolute top-2 right-2 p-2 bg-white/90 rounded-full">
                          <HeartIcon className={`h-6 w-6 ${property.saved ? 'text-red-500' : 'text-gray-400'}`} />
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
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Searches */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Saved Searches
              </h2>
              <div className="space-y-4">
                {savedSearches.map((search) => (
                  <div key={search.id} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{search.location}</h3>
                        <p className="text-sm text-gray-600">
                          {search.minPrice} - {search.maxPrice} • {search.beds}+ beds
                        </p>
                      </div>
                      <button className="text-emerald-600 hover:text-emerald-700">
                        Search Again
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Filters
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg px-4 py-2">
                    <option>Any Price</option>
                    <option>$300k - $500k</option>
                    <option>$500k - $800k</option>
                    <option>$800k+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg px-4 py-2">
                    <option>Any</option>
                    <option>1+</option>
                    <option>2+</option>
                    <option>3+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg px-4 py-2">
                    <option>All Types</option>
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Condo</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 w-full bg-white border-t border-gray-200">
        <div className="flex justify-around p-4">
          <button className="text-emerald-600">
            <HomeIcon className="h-6 w-6" />
          </button>
          <button className="text-gray-600">
            <HeartIcon className="h-6 w-6" />
          </button>
          <button className="text-gray-600">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
          <button className="text-gray-600">
            <UserCircleIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;