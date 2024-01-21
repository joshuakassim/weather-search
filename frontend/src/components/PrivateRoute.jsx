import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Defines private route for conditional rendering of screens
const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
