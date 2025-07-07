import axiosInstance from './axiosInstance';

export const generateImage = async (prompt) => {
  try {
    const response = await axiosInstance.post('/chat/create', { prompt }, {
      responseType: 'blob' // Để nhận image buffer
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
