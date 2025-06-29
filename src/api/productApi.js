import axiosInstance from './axiosInstance';

export const getProducts = async () => {
  return axiosInstance.get('/products/get');
};

export const getProductDetail = async (id) => {
  return axiosInstance.get(`/products/detail/${id}`);
};