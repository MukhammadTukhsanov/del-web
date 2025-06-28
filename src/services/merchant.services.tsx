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

export async function getMerchantInformationService(merchantId: string) {
  try {
    const response = await axiosInstance.get(`/merchants/${merchantId}`);
    return response.data;
  } catch (error) {
    console.error('Get merchant products error:', error);
    throw error;
  }
}

export async function getMerchantProductsService(merchantId: string) {
  try {
    const response = await axiosInstance.get(`/merchants/${merchantId}/products`);
    return response.data;
  } catch (error) {
    console.error('Get merchant products error:', error);
    throw error;
  }
}
