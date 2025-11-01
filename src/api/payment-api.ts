import axios from 'axios';

// Payment API Base URL
const PAYMENT_API_BASE_URL = process.env.PAYMENT_API_URL;

// Payment Config - Environment specific
const PAYMENT_CONFIG = {
    apiKey: process.env.PAYMENT_API_KEY,
    secretKey: process.env.PAYMENT_SECRET_KEY,
    idPaymentMethod: process.env.PAYMENT_METHOD_ID,
};

// Tạo axios instance riêng cho Payment API
const paymentApiClient = axios.create({
    baseURL: PAYMENT_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': PAYMENT_CONFIG.apiKey,
    },
    timeout: 30000, // 30 seconds
});

// Interceptor để log requests
paymentApiClient.interceptors.request.use(
    (config) => {
        console.log('💳 Payment API Request:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor để handle responses và errors
paymentApiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('💳 Payment API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// ============================================
// TYPES & INTERFACES
// ============================================

export type TransactionStatus = 'pending' | 'success' | 'failed' | 'refunded' | 'expired' | 'cancelled';

export interface ITransactionItem {
    packageId: string;
    name: string;
    quantity: number;
    amount: number;
}

export interface ITransactionData {
    transactionId: string;
    orderId: string;
    merchantId: string;
    items: ITransactionItem[];
    totalAmount: number;
    discountAmount: number;
    currency: string;
    status: TransactionStatus;
    description: string;
    createdAt: string;
    expiredAt: string;
}

export interface IPaymentMethodConfig {
    name: string;
    code: string;
    bin: string;
    accountNumber: string;
    accountName: string;
}

export interface IPaymentDetails {
    typePM: string;
    amount: number;
    currency: string;
    description: string;
    qrUrl: string;
    config: IPaymentMethodConfig;
}

export interface IPaymentApiResponse<T = any> {
    code: number;
    message: string;
    data?: T;
}

// ============================================
// PAYMENT API FUNCTIONS
// ============================================

export const paymentApi = {
    // Get transaction info
    transaction: {
        getInfo: async (transactionId: string): Promise<IPaymentApiResponse<ITransactionData>> => {
            try {
                const response = await paymentApiClient.get(
                    `/payment/api/v1/transaction/${transactionId}`
                );
                return response.data;
            } catch (error: any) {
                throw new Error(error.response?.data?.message || 'Không thể lấy thông tin giao dịch');
            }
        },

        cancel: async (transactionId: string): Promise<IPaymentApiResponse> => {
            try {
                const response = await paymentApiClient.post(
                    `/payment/api/v1/transaction/cancel`,
                    {
                        transactionId: transactionId
                    }
                );
                return response.data;
            } catch (error: any) {
                throw new Error(error.response?.data?.message || 'Không thể hủy giao dịch');
            }
        },

        getPaymentDetails: async (transactionId: string): Promise<IPaymentApiResponse<IPaymentDetails>> => {
            try {
                const response = await paymentApiClient.post(
                    `/payment/api/v1/transaction/pay`,
                    {
                        idPaymentMethod: PAYMENT_CONFIG.idPaymentMethod,
                        transactionId: transactionId
                    }
                );
                return response.data;
            } catch (error: any) {
                throw new Error(error.response?.data?.message || 'Không thể lấy thông tin thanh toán');
            }
        },
    },
};

// Export config for use in components if needed
export { PAYMENT_CONFIG };

// Export default
export default paymentApi;

