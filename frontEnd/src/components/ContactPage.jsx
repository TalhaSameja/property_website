import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-emerald-900">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-50"
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd"
            alt="Contact Background"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Let's Connect
            </h1>
            <p className="mt-6 text-xl text-emerald-100 max-w-3xl mx-auto">
              Our team is ready to assist you with all your real estate needs. 
              Reach out anytime - we're here to help!
            </p>
          </div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Details</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPinIcon className="h-6 w-6 text-emerald-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Office Address</h3>
                    <p className="text-gray-600 mt-1">
                      Umer Block <br/>
                      Allama Iqbat Town<br/>
                      Lahore
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <PhoneIcon className="h-6 w-6 text-emerald-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone Numbers</h3>
                    <p className="text-gray-600 mt-1">
                      Main: 03034324206<br/>
                      Support: 03291722991
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <EnvelopeIcon className="h-6 w-6 text-emerald-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Addresses</h3>
                    <p className="text-gray-600 mt-1">
                      General: talha.samej@gmail.com<br/>
                      Support: help@eproperty.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <ClockIcon className="h-6 w-6 text-emerald-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Office Hours</h3>
                    <p className="text-gray-600 mt-1">
                      Mon-Fri: 9 AM - 7 PM<br/>
                      Saturday: closed<br/>
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

           
          </div>

          {/* Contact Form & Map */}
          
        </div>
      </div>
    </div>
  );
};

export default ContactPage;