import axios from 'axios';

// Portal API Base URL - khác với API chính
const PORTAL_API_BASE_URL = process.env.PORTAL_API_URL || 'https://apiems.microgem.io.vn';

// Tạo axios instance riêng cho Portal API
const portalApiClient = axios.create({
    baseURL: PORTAL_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds
});

// Interceptor để log requests
portalApiClient.interceptors.request.use(
    (config) => {
        console.log('Portal API Request:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor để handle responses và errors
portalApiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('Portal API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// ============================================
// TYPES & INTERFACES
// ============================================

export interface IPackageData {
    name: string;
    description: string;
    amount: number;
    timeStart: string;
    timeEnd: string;
    idPackage: number;
}

export interface IDiscountItem {
    packageId: number;
    name: string;
    quantity: number;
    amount: number;
    subtotal: number;
}

export interface IDiscountInfo {
    code: string;
    type: 'percent' | 'fixed';
    amount: number;
    discountAmount: number;
}

export interface IDiscountCheckData {
    items: IDiscountItem[];
    itemsTotal: number;
    discountAmount: number;
    totalAmount: number;
    discountInfo: IDiscountInfo;
}

export interface ICheckDiscountRequest {
    discountCode: string;
    items: {
        packageId: number;
        quantity: number;
    }[];
}

export interface ICreateOrderRequest {
    discountCode?: string;
    items: {
        packageId: number;
        quantity: number;
    }[];
}

export interface IOrderItem {
    packageId: string;
    name: string;
    quantity: number;
    amount: number;
}

export interface ICreateOrderData {
    idOrder: string;
    idStudent: string;
    items: IOrderItem[];
    discountCode?: string;
    discountAmount: number;
    totalAmount: number;
    currency: string;
    status: string;
    transactionId: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    itemsTotal: number;
    merchantId: string;
    payUrl: string;
}

export interface IPortalApiResponse<T = any> {
    status?: boolean;
    success?: boolean;
    code?: string;
    message?: string;
    data?: T;
}

// ============================================
// PORTAL API FUNCTIONS
// ============================================

export const portalApi = {
    // Package API
    package: {
        getById: async (idPackage: string | number, token: string): Promise<IPortalApiResponse<IPackageData>> => {
            try {
                const response = await portalApiClient.get(
                    `/portal/package/${idPackage}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                return response.data;
            } catch (error: any) {
                throw new Error(error.response?.data?.message || 'Không thể lấy thông tin gói');
            }
        },
    },

    // Order API
    order: {
        checkDiscountCode: async (data: ICheckDiscountRequest, token: string): Promise<IPortalApiResponse<IDiscountCheckData>> => {
            try {
                const response = await portalApiClient.post(
                    `/portal/order/checkDiscountCode`,
                    data,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                return response.data;
            } catch (error: any) {
                throw new Error(error.response?.data?.message || 'Mã giảm giá không hợp lệ');
            }
        },

        create: async (data: ICreateOrderRequest, token: string): Promise<IPortalApiResponse<ICreateOrderData>> => {
            try {
                const response = await portalApiClient.post(
                    `/portal/order/create`,
                    data,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                return response.data;
            } catch (error: any) {
                throw new Error(error.response?.data?.message || 'Không thể tạo đơn hàng');
            }
        },
    },
};

// Export default
export default portalApi;

