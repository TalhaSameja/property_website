import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, PlusIcon, PencilIcon, ChartBarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const SellerDashboard = () => {
  // Mock data - replace with actual data from API
  const [listings, setListings] = useState([
    { id: 1, title: "Modern Downtown Apartment", price: "$599,000", status: "Active", views: 245, inquiries: 12 },
    { id: 2, title: "Suburban Family Home", price: "$799,000", status: "Pending", views: 168, inquiries: 8 },
    { id: 3, title: "Luxury Penthouse", price: "$1,299,000", status: "Draft", views: 45, inquiries: 3 },
  ]);

  const stats = [
    { label: "Active Listings", value: 5, icon: HomeIcon },
    { label: "Total Earnings", value: "$52,400", icon: CurrencyDollarIcon },
    { label: "Monthly Views", value: "2.1k", icon: ChartBarIcon },
    { label: "Response Rate", value: "98%", icon: PencilIcon },
  ];

  const handleDeleteListing = (id) => {
    setListings(listings.filter(listing => listing.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-xl font-bold text-emerald-600">
              EstatePro Seller
            </Link>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-emerald-600">
                <ChartBarIcon className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-emerald-600">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80" 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center">
                <stat.icon className="h-12 w-12 text-emerald-600 mr-4" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Your Listings</h2>
          <Link
            to="/add-property"
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add New Property
          </Link>
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inquiries</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {listings.map((listing) => (
                <tr key={listing.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{listing.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      listing.status === 'Active' ? 'bg-green-100 text-green-800' :
                      listing.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listing.views}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listing.inquiries}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-emerald-600 hover:text-emerald-900 mr-4">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteListing(listing.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Performance Chart (Placeholder) */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            Chart Area - Integrate your favorite charting library
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
            <PlusIcon className="h-6 w-6" />
          </button>
          <button className="text-gray-600">
            <ChartBarIcon className="h-6 w-6" />
          </button>
          <button className="text-gray-600">
            <img 
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80" 
              className="h-6 w-6 rounded-full"
              alt="Profile"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;