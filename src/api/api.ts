import axios from 'axios';

// Cấu hình base URL từ environment variables
const API_BASE_URL = `https://${process.env.API_HOST}`;

// Tạo axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds
});

// Interceptor để log requests (optional)
apiClient.interceptors.request.use(
    (config) => {
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor để handle responses và errors
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// ============================================
// TYPES & INTERFACES
// ============================================

export interface IContactForm {
    name: string;
    phone: string;
    email: string;
    timeSlot: string;
    message: string;
}

export interface IApiResponse<T = any> {
    status: boolean;
    code?: string;
    message?: string;
    data?: T;
}

// ============================================
// API FUNCTIONS
// ============================================

export const api = {
    // Contact API
    contact: {
        create: async (data: IContactForm): Promise<IApiResponse> => {
            try {
                const response = await apiClient.post(
                    process.env.API_CONTACT_CREATE || '/api/fe/contact/create-new',
                    data
                );
                return response.data;
            } catch (error: any) {
                throw new Error(error.response?.data?.message || 'Không thể gửi thông tin liên hệ');
            }
        },
    },

    // SSO API
    sso: {
        verifySession: async (sessionId: string): Promise<IApiResponse> => {
            try {
                const response = await apiClient.get(
                    `/api/sso/session/${sessionId}`
                );
                return response.data;
            } catch (error: any) {
                throw new Error(error.response?.data?.message || 'Không thể xác thực phiên đăng nhập');
            }
        },
    },

    // Có thể thêm các API khác ở đây
    // workshop: { ... },
    // user: { ... },
};

// Export default
export default api;

