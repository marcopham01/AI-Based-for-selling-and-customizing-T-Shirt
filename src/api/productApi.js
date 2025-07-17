import axiosInstance from './axiosInstance';

export const getProducts = async () => {
  return axiosInstance.get('/products/get');
};

export const getProductDetail = async (id) => {
  return axiosInstance.get(`/products/detail/${id}`);
};

export const createUserProduct = async (productData) => {
  return axiosInstance.post('/products/usercreate', productData);
};

export const getUserDesign = async () => {
  return axiosInstance.get('/products/getDesign');
};