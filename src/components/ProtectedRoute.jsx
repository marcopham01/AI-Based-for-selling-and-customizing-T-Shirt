import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Component bảo vệ route cho admin
export const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Component bảo vệ route cho customer
export const CustomerRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Component chặn admin truy cập các route user
export const NotAdminRoute = ({ children }) => {
  const { isAdmin, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (isAdmin()) return <Navigate to="/admin" replace />;
  return children;
}; 