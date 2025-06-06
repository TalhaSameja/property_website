import { BuildingOfficeIcon, HeartIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import talhaImage from "./talha.jpg"

const AboutPage = () => {
  const teamMembers = [
    { name: 'Talha Yousuf', role: 'CEO & Founder' },

  ];

  const stats = [
    { label: 'Properties Listed', value: '1000+', icon: BuildingOfficeIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-emerald-900">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-50"
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
            alt="Real Estate Background"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Redefining Real Estate Experiences
            </h1>
            <p className="mt-6 text-xl text-emerald-100 max-w-3xl mx-auto">
              Where innovation meets exceptional service to create your perfect property journey
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 text-gray-600">
              <p>
                Founded in 2015, eproperty emerged from a simple vision: to transform real estate
                transactions into seamless, personalized experiences. What began as a small team
                of passionate professionals has grown into a market-leading platform serving
                thousands of clients nationwide.
              </p>
              <p>
                We combine cutting-edge technology with deep market knowledge to empower both
                buyers and sellers. Our innovative approach has redefined industry standards,
                earning numerous awards and the trust of our valued clients.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d"
              alt="Office Space"
              className="rounded-xl object-cover h-64 w-full"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm text-center">
                <stat.icon className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <img
                src={talhaImage}
                alt={member.name}
                className="w-full h-64 object-contain rounded-3xl"
              />

              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-emerald-600 mt-2">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default AboutPage;