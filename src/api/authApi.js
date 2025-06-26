import axiosInstance from './axiosInstance';

export const registerUser = (userData) => {
  return axiosInstance.post('/users/create', userData);
};

export const loginUser = (userData) => {
  return axiosInstance.post('/users/login', userData);
};
