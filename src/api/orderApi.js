import axiosInstance from './axiosInstance';

export const createOrder = async (orderData) => {
  const res = await axiosInstance.post('/order/create', orderData);
  return res.data; // trả về { success, order, paymentLink }
};

export const getOrders = async () => {
  return axiosInstance.get('/order/get');
}; 