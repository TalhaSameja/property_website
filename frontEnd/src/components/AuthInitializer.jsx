import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from '../store/slices/authSlice';

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return children;
};

export default AuthInitializer;