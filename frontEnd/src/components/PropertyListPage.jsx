import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../store/slices/propertySlice';
import { Link } from 'react-router-dom';
import { HomeIcon, HeartIcon } from '@heroicons/react/24/outline';

const PropertyListPage = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, errorMessage } = useSelector((state) => state.property);
  const properties = useSelector((state) => state.property?.properties || []);


  console.log(properties)
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20"> {/* Padding added here */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Available Properties</h1>
        </div>

        {isLoading && <p className="text-gray-600">Loading properties...</p>}
        {isError && <p className="text-red-500">Error: {errorMessage}</p>}
        {!isLoading && properties?.length === 0 && (
          <p className="text-gray-500 text-center text-lg">No properties available.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(properties) && properties.map((property) => (
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
    </div>
  );
};

export default PropertyListPage;
