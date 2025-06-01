import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ roles }) => {
  console.log("i am in private route")
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page with current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // Redirect to home if role doesn't match
    return <Navigate to="/" replace />;
  }

  // Authorized access
  return <Outlet />;
};

export default PrivateRoute;