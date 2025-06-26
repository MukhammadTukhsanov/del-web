// Post

import axiosInstance from "@/axiosInstance";

export async function loginService(email: string, password: string) {
    try {
        const response = await axiosInstance.post('/auth/login', {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}
