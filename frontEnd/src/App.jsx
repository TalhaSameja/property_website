import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './components/HomePage';
import SignupPage from './components/SignupPage';
import SigninPage from './components/SigninPage';
import BuyerDashboard from './components/BuyerDashboard';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import SellerDashboard from './components/SellerDashboard';
import AddPropertyPage from './components/AddPropertyPage';

import PropertyListPage from './components/PropertyListPage';
import PropertyDetailPage from './components/PropertyDetailPage';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from './store/slices/authSlice';
import { useEffect } from 'react';

// Add these routes

function App() {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);
  if(loading) return  <div className="text-center mt-20">Loading...</div>
  return (
    <>
    <Router>
    <Navbar className="fixed top-0 left-0 w-full z-50"/>
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<SigninPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/properties" element={<PropertyListPage />} />
        <Route path="/properties/:id" element={<PropertyDetailPage />} />
        {/* Protected Routes */}
        <Route element={<PrivateRoute roles={['buyer']} />}>
          <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
        </Route>

        <Route element={<PrivateRoute roles={['seller']} />}>
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
        </Route>
        
        <Route element={<PrivateRoute roles={['seller']} />}>
          <Route path="/add-property" element={<AddPropertyPage />} />
        </Route>
      </Routes>
      </main>
    </Router>
    </>
  );
}

export default App;