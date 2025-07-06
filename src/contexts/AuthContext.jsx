import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProfile, updateProfile as updateProfileApi } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        })
        .catch(() => {
          setUser(null);
          setIsAuthenticated(false);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = (userData) => {
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
      })
      .catch(() => {
        setUser(null);
        setIsAuthenticated(false);
      });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateUser = async (newUserData) => {
    try {
      // Map lại key cho đúng backend
      const payload = {
        ...newUserData,
        fullname: newUserData.name,
        phonenumber: newUserData.phone,
      };
      await updateProfileApi(payload);
      // Sau khi update thành công, lấy lại profile mới nhất
      const res = await getProfile();
      const apiUser = res.data.data;
      setUser({
        ...apiUser,
        name: apiUser.fullname,
        phone: apiUser.phonenumber,
      });
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
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