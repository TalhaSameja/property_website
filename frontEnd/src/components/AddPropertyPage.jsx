import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeIcon, PhotoIcon, MapPinIcon, WalletIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import axios from "axios"
const AddPropertyPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    propertyType: 'House',
    bedrooms: 1,
    bathrooms: 1,
    sqft: '',
    address: ''
  });

  const propertyTypes = ['House', 'Apartment', 'Condo', 'Townhouse', 'Land'];


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]); // Store File objects directly
  };

  const handleMapClick = (e) => {
    setLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('propertyType', formData.propertyType);
    form.append('bedrooms', formData.bedrooms);
    form.append('bathrooms', formData.bathrooms);
    form.append('sqft', formData.sqft);
    form.append('address', formData.address);
    // form.append('location', JSON.stringify(location));

    images.forEach((image) => {
      form.append('images', image); // This will now work
    });

    try {
      console.log("in response");

      const token = localStorage.getItem("token");

      const response = await axios.post(
        'http://localhost:5000/api/properties/add-new',
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response) {
        navigate('/seller/dashboard');
      }

    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // Add your submission logic here
  //   try {
  //     const propertyData = {
  //       ...formData,
  //       location,
  //       images
  //     };
  //     // await axios.post('/api/properties', propertyData);
  //     navigate('/seller-dashboard');
  //   } catch (error) {
  //     console.error('Submission error:', error);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">List New Property</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="4"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <WalletIcon className="h-5 w-5 inline-block mr-1" />
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <HomeIcon className="h-5 w-5 inline-block mr-1" />
                      Property Type
                    </label>
                    <select
                      name="propertyType"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500"
                      onChange={handleInputChange}
                      value={formData.propertyType}
                    >
                      {propertyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Square Feet
                    </label>
                    <input
                      type="number"
                      name="sqft"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700"
                >
                  Next: Add Details
                </button>
              </div>
            )}

            {/* Step 2: Property Details */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      name="bedrooms"
                      min="1"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      name="bathrooms"
                      min="1"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>



                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-2 text-gray-600 hover:text-emerald-600"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
                  >
                    Next: Location & Photos
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Location & Photos */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPinIcon className="h-5 w-5 inline-block mr-1" />
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="h-96 rounded-lg overflow-hidden">
                  <LoadScript googleMapsApiKey="AIzaSyA7zzRuUdiAEq66jm9C6e_37a4GYbMnFNs">
                    <GoogleMap
                      mapContainerStyle={{ width: '100%', height: '100%' }}
                      center={location}
                      zoom={14}
                      onClick={handleMapClick}
                    >
                      <Marker position={location} />
                    </GoogleMap>
                  </LoadScript>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <PhotoIcon className="h-5 w-5 inline-block mr-1" />
                    Property Photos
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer text-emerald-600 hover:text-emerald-700"
                    >
                      Click to upload or drag and drop
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      Up to 5 photos (JPEG, PNG)
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {images.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Property ${index + 1}`}
                          className="h-32 w-full object-cover rounded-lg"
                        />
                      </div>
                    ))}

                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2 text-gray-600 hover:text-emerald-600"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
                  >
                    List Property
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyPage;