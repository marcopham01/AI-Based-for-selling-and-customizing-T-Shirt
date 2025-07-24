import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProfile, updateProfile as updateProfileApi } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  // Load user from API khi app mount nếu có token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getProfile()
        .then(res => {
          const apiUser = res.data.data;
          setUser({
            ...apiUser,
            name: apiUser.fullname,
            phone: apiUser.phonenumber,
          });
          setIsAuthenticated(true);
          // Xác định role từ backend response
          setUserRole(apiUser.role || 'customer');
        })
        .catch(() => {
          setUser(null);
          setIsAuthenticated(false);
          setUserRole(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    // Sau khi login thành công, gọi API lấy profile
    getProfile()
      .then(res => {
        const apiUser = res.data.data;
        setUser({
          ...apiUser,
          name: apiUser.fullname,
          phone: apiUser.phonenumber,
        });
        setUserRole(apiUser.role || 'customer');
      })
      .catch(() => {
        setUser(null);
        setIsAuthenticated(false);
        setUserRole(null);
      });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateUser = async (newUserData) => {
    try {
      // Map lại key cho đúng backend
      const payload = {
        ...newUserData,
        fullname: newUserData.name,
        email: newUserData.email,
        phonenumber: newUserData.phone,
        address: newUserData.address,
      };
      await updateProfileApi(payload);
      // Sau khi update thành công, lấy lại profile mới nhất
      const res = await getProfile();
      const apiUser = res.data.data;
      setUser({
        ...apiUser,
        name: apiUser.fullname,
        email: apiUser.email,
        phone: apiUser.phonenumber,
        address: apiUser.address,
      });
      setUserRole(apiUser.role || 'customer');
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
      setUserRole(null);
    }
  };

  // Kiểm tra xem user có phải admin không
  const isAdmin = () => {
    return userRole === 'admin';
  };

  // Kiểm tra xem user có phải customer không
  const isCustomer = () => {
    return userRole === 'customer';
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    userRole,
    isAdmin,
    isCustomer,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 