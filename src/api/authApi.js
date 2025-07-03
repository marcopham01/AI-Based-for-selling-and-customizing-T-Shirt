import axiosInstance from './axiosInstance';

export const registerUser = (userData) => {
  return axiosInstance.post('/users/create', userData);
};

export const loginUser = (userData) => {
  return axiosInstance.post('/users/login', userData);
};

export const getProfile = () => {
  return axiosInstance.get('/users/profile');
};

export const updateProfile = (profileData) => {
  return axiosInstance.put('/users/update/profile', profileData);
};
