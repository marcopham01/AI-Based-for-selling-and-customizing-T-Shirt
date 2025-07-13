import axiosInstance from './axiosInstance';

// User Management APIs - Chỉ có thể xem danh sách
export const getAllUsers = () => {
  return axiosInstance.get('/users/get');
};

// Product Management APIs
export const getAllProducts = () => {
  return axiosInstance.get('/products/get');
};

export const createProduct = (productData) => {
  return axiosInstance.post('/products/create', productData);
};

export const updateProduct = (productId, productData) => {
  return axiosInstance.put(`/products/update/${productId}`, productData);
};

export const deleteProduct = (productId) => {
  return axiosInstance.delete(`/products/delete/${productId}`);
};

export const getProductDetail = (productId) => {
  return axiosInstance.get(`/products/detail/${productId}`);
}; 