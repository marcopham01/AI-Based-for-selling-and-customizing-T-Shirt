import axiosInstance from './axiosInstance';

export const createOrder = async (orderData) => {
  const res = await axiosInstance.post('/order/create', orderData);
  return res.data; // trả về { success, order, paymentLink }
};

export const getOrders = async () => {
  return axiosInstance.get('/order/get');
};

export const updateOrderStatus = async (orderCode, status) => {
  return axiosInstance.post('/order/update-status', { orderCode, status });
};

export const updateOrderPaymentStatus = async ({ status, orderCode, cancel }) => {
  return axiosInstance.post('/order/update-payment', { status, orderCode, cancel });
}; 