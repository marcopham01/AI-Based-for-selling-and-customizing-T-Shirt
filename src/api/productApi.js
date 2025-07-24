import axiosInstance from './axiosInstance';

export const getProducts = async () => {
  return axiosInstance.get('/products/get');
};

export const getProductDetail = async (id) => {
  return axiosInstance.get(`/products/detail/${id}`);
};

export const createUserProduct = (formData) => {
  return axiosInstance.post('/products/usercreate', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getUserDesign = async () => {
  return axiosInstance.get('/products/getDesign');
};