import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeftIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import axios from 'axios';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/properties/${id}`); // 🔁 Replace with your backend API
        setProperty(res.data.data);
        console.log(res.data.data)
      } catch (err) {
        console.error('Failed to fetch property:', err);
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) return <div className="text-center p-8">Loading...</div>;

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const mapCenter = {
    lat: property.latitude || 40.7128,
    lng: property.longitude || -74.0060,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-emerald-600 hover:text-emerald-700"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Properties
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">

            {/* Image Gallery */}
            <div className="space-y-4">
              {property.images && property.images.length > 0 && (
                <>
                  <img
                    src={property.images[0]}
                    alt="Main"
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    {property.images.slice(1).map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Property ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-900">{property.price}</h1>
                <div className="flex space-x-4">
                  <button className="text-gray-400 hover:text-emerald-600">
                    <HeartIcon className="h-6 w-6" />
                  </button>
                  <button className="text-gray-400 hover:text-emerald-600">
                    <ShareIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <span className="text-lg">{property.bedrooms} beds</span>
                <span className="mx-2">•</span>
                <span className="text-lg">{property.bathrooms} baths</span>
                <span className="mx-2">•</span>
                <span className="text-lg">{property.sqft} sqft</span>
              </div>

              <p className="text-gray-600">{property.description}</p>

              {/* Features */}
              <div className="border-t border-b border-gray-200 py-6">
                <h3 className="text-xl font-semibold mb-4">Description</h3>
                <p className="text-gray-700">{property.description}</p>
              </div>


              {/* Contact Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Contact Agent</h3>

                <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                  <p><span className="font-medium">Name:</span> {property?.createdBy?.name || 'N/A'}</p>
                  <p><span className="font-medium">Email:</span> {property?.createdBy?.email || 'N/A'}</p>
                  <p><span className="font-medium">Phone:</span> {property?.createdBy.phone}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Map Section */}
          {/* <div className="p-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Location</h3>
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={14}
              >
                <Marker position={mapCenter} />
              </GoogleMap>
            </LoadScript>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
