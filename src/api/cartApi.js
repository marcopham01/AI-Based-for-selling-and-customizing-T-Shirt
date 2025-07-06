import axiosInstance from './axiosInstance';

// Lấy giỏ hàng
export const getCart = async () => {
  return axiosInstance.get('/cart/get');
};

// Thêm sản phẩm vào giỏ
export const addToCart = async ({ product_id, quantity, size }) => {
  return axiosInstance.post('/cart/create', { product_id, quantity, size });
};

// Cập nhật số lượng
export const updateCartItem = async ({ product_id, quantity, size }) => {
  return axiosInstance.put('/cart/update', { product_id, quantity, size });
};

// Xóa sản phẩm khỏi giỏ
export const removeFromCart = async ({ product_id, size }) => {
  return axiosInstance.delete('/cart/delete/item', { data: { product_id, size } });
};
