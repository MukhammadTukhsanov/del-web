import axiosInstance from '@/axiosInstance';

export async function getMerchantsService() {
  try {
    const response = await axiosInstance.get('/merchants');
    return response.data;
  } catch (error) {
    console.error('Get merchants error:', error);
    throw error;
  }
}

