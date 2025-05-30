import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './components/HomePage';
import SignupPage from './components/SignupPage';
import SigninPage from './components/SigninPage';
import BuyerDashboard from './components/BuyerDashboard';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import SellerDashboard from './components/SellerDashboard';
import AdminDashboard from './components/AdminDashboard';
import AddPropertyPage from './components/AddPropertyPage';

import PropertyListPage from './components/PropertyListPage';
import PropertyDetailPage from './components/PropertyDetailPage';

// Add these routes

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<SigninPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/properties" element={<PropertyListPage />} />
        <Route path="/properties/:id" element={<PropertyDetailPage />} />
        {/* Protected Routes */}
        <Route element={<PrivateRoute roles={['buyer']} />}>
          <Route path="/dashboard" element={<BuyerDashboard />} />
        </Route>

        <Route element={<PrivateRoute roles={['seller']} />}>
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
        </Route>
        <Route element={<PrivateRoute roles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route element={<PrivateRoute roles={['seller']} />}>
          <Route path="/add-property" element={<AddPropertyPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;