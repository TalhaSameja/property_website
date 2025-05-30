import { Link } from 'react-router-dom';
import { HomeIcon, HeartIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const PropertyListPage = () => {
  // Mock data - replace with API data
  const properties = [
    { id: 1, price: "$599,000", beds: 3, baths: 2, sqft: 1800, location: "Downtown" },
    { id: 2, price: "$799,000", beds: 4, baths: 3, sqft: 2500, location: "Suburbs" },
    { id: 3, price: "$1,299,000", beds: 3, baths: 3, sqft: 3200, location: "Lakeside" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Available Properties</h1>
          {/* Add search/filter components here */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Link 
              to={`/properties/${property.id}`} 
              key={property.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="relative mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf"
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
    </div>
  );
};

export default PropertyListPage;