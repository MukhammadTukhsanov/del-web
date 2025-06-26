import axiosInstance from '@/axiosInstance';

export async function getUserInfo() {
  try {
    const token = localStorage.getItem('auth_token');
    console.log('token: ', token);
    const response = await axiosInstance.get('/auth/current-user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting user info:', error);
    throw error;
  }
}
