import { Link } from 'react-router-dom';
import { HomeIcon, HeartIcon, BellIcon, UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BuyerDashboard = () => {
  
  const dispatch = useDispatch();
const [favouriteProperties, setFavouriteProperties] = useState([]);

useEffect(() => {

  const fetchFavourites = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/properties/favourites`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
        setFavouriteProperties(res.data.data);
    } catch (error) {
      console.error('Failed to fetch favourites:', error.response?.data?.message || error.message);
    }
  };

  fetchFavourites();
}, [favouriteProperties]);


   const handleToggleFavourite = async (propertyId) => {
    try {
      console.log(propertyId)
      const token = localStorage.getItem("token");
      console.log(token)
    const res =   await axios.delete(
        `http://localhost:5000/api/properties/delete/favourite/${propertyId}`,
        
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res)

      // Remove property from UI
      setFavouriteProperties((prev) =>
        prev.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      console.error('Failed to toggle favourite:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Welcome Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back 
              </h1>
              <p className="text-gray-600">
                {favouriteProperties?.length} Here are your Favourite Properties
              </p>
            </div>

        

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                 Your Favourites Properties
                </h2>
               
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favouriteProperties?.map((property) => (
                  <div key={property._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="relative mb-4">
                        <img
                          src={property.images[0]}
                          alt="Property"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button className="absolute top-2 right-2 p-2 bg-white/90 rounded-full">
                        <HeartIcon onClick={()=>handleToggleFavourite(property._id)} className="h-6 w-6 text-red-500" />

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

           
          </div>

         
        </div>
      </div>

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