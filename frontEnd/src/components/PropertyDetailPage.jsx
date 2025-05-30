import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, HeartIcon, ShareIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - replace with API call
  const property = {
    id: 1,
    price: "$599,000",
    beds: 3,
    baths: 2,
    sqft: 1800,
    location: "Downtown",
    description: "Stunning modern apartment with panoramic city views. Features open floor plan, high-end finishes, and smart home technology.",
    features: ["Hardwood floors", "Central A/C", "Balcony", "Parking included"],
    images: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
    ]
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 40.7128,
    lng: -74.0060
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
          {/* Image Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="space-y-4">
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
                <span className="text-lg">{property.beds} beds</span>
                <span className="mx-2">•</span>
                <span className="text-lg">{property.baths} baths</span>
                <span className="mx-2">•</span>
                <span className="text-lg">{property.sqft} sqft</span>
              </div>

              <p className="text-gray-600">{property.description}</p>

              <div className="border-t border-b border-gray-200 py-6">
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-emerald-600 mr-2">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Contact Agent</h3>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <textarea
                  placeholder="Message"
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg"
                ></textarea>
                <button className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700">
                  Send Message
                </button>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="p-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Location</h3>
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={14}
              >
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;