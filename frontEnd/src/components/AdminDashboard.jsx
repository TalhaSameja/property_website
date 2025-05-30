import { useState } from 'react';
import { ShieldCheckIcon, UserGroupIcon, HomeIcon, ChartBarIcon, DocumentMagnifyingGlassIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  // Mock data - replace with actual data from API
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "buyer", joined: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "seller", joined: "2024-02-20" },
    { id: 3, name: "Admin User", email: "admin@example.com", role: "admin", joined: "2023-12-01" },
  ]);

  const stats = [
    { label: "Total Users", value: "2,548", icon: UserGroupIcon },
    { label: "Total Properties", value: "10,432", icon: HomeIcon },
    { label: "Monthly Revenue", value: "$152,400", icon: ChartBarIcon },
    { label: "Pending Approvals", value: "23", icon: DocumentMagnifyingGlassIcon },
  ];

  const recentActivities = [
    { id: 1, type: "user", action: "New user registration", time: "5 min ago" },
    { id: 2, type: "property", action: "New property listing added", time: "2 hours ago" },
    { id: 3, type: "payment", action: "Subscription payment received", time: "1 day ago" },
  ];

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <ShieldCheckIcon className="h-8 w-8 text-emerald-400 mr-2" />
              <span className="text-xl font-bold">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-300 hover:text-white">
                <ChartBarIcon className="h-6 w-6" />
              </button>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" 
                  alt="Admin" 
                  className="h-8 w-8 rounded-full cursor-pointer"
                />
                {/* Dropdown menu would go here */}
              </div>
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Users Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                            user.role === 'seller' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button className="text-emerald-600 hover:text-emerald-900">
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <div className={`h-2 w-2 mt-2 mr-3 rounded-full ${
                      activity.type === 'user' ? 'bg-emerald-500' :
                      activity.type === 'property' ? 'bg-blue-500' :
                      'bg-purple-500'
                    }`} />
                    <div>
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Verify New Properties
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Review Reported Content
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Manage Site Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-green-100 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-800">99.9%</div>
              <div className="text-sm text-green-700">Uptime</div>
            </div>
            <div className="p-4 bg-blue-100 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-800">2.3s</div>
              <div className="text-sm text-blue-700">Avg. Response</div>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-800">4</div>
              <div className="text-sm text-yellow-700">Active Alerts</div>
            </div>
            <div className="p-4 bg-purple-100 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-800">1.2M</div>
              <div className="text-sm text-purple-700">Monthly Visits</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 w-full bg-white border-t border-gray-200">
        <div className="flex justify-around p-4">
          <button className="text-gray-600">
            <UserGroupIcon className="h-6 w-6" />
          </button>
          <button className="text-gray-600">
            <HomeIcon className="h-6 w-6" />
          </button>
          <button className="text-gray-600">
            <ChartBarIcon className="h-6 w-6" />
          </button>
          <button className="text-gray-600">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" 
              className="h-6 w-6 rounded-full"
              alt="Admin"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;