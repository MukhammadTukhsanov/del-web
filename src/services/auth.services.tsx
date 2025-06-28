import axiosInstance from '@/axiosInstance';

export async function otpSendService(phone: string) {
  try {
    const response = await axiosInstance.post('/auth/send-otp', {
      phone,
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function verifyOtpService(phone: string, otp: string) {
  try {
    const response = await axiosInstance.post('/auth/verify-otp', {
      phone,
      otp,
    });
    return response.data;
  } catch (error) {
    console.error('OTP confirmation error:', error);
    throw error;
  }
}

export async function refreshTokenService() {
  try {
    const response = await axiosInstance.post('/auth/refresh-token');
    return response.data;
  } catch (error) {
    console.error('Refresh token error:', error);
    throw error;
  }
}

export async function getCurrentUserService() {
  try {
    const response = await axiosInstance.get('/auth/current-user');
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
}

export async function updateUserService(userData: { name: string }) {
  try {
    const response = await axiosInstance.put('/auth/current-user', userData);
    return response.data;
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
}
