import { api } from './api-core';

export interface IWorkshopForm{
    title: string
    description: string
    date: string
    video_link: string
    created_by: string
    is_public: string
    tags?: Tags[]
    resources?: Resource[]
}

export interface Resource {
    id?: number;
    title?: string;
    link?: string;
    description?: string;
    status?: string
    created_at?: string
    updated_at?: string
  }

export interface Tags {
    id?: number
    name?: string
    description?: string
    status?: string
    created_at?: string
    updated_at?: string
  }

export interface IWorkshop {
    status: boolean,
    code: string,
    data: {
        id: string
        title: string
        description: string
        date: string
        video_link: string
        created_by: string
        is_public: string
        created_at: string
        updated_at: string
        tags: Tags[]
        resources: Resource[]
    },
    total: number
 } 

 export interface IWorkshopInfo {
    status: boolean,
    code: string,
    data: {
        id?: string
        title?: string
        description?: string
        date?: string
        video_link?: string
        created_by?: string
        is_public?: string
        created_at?: string
        updated_at?: string
        tags?: Tags[]
        resources?: Resource[]
    }
 }

export const WorkshopApi = {
    getListWorkshop: () => {
        return api.get(process.env.API_GET_LIST_WORKSHOP as string).then((res) => {
            return res.data || [];
        }).catch((err) => {
            console.log(err);
            return [];
        });
    },
    getWorkshopById: (id: string) => {
        const url = `${process.env.API_GET_WORKSHOP_BY_ID}?id=${id}`;
        return api.get(url as string).then((res) => {
            return res.data || [];
        }).catch((err) => {
            console.log(err);
            return [];
        });
    },
    getListTag: () => {
        return api.get(process.env.API_GET_LIST_TAG as string).then((res) => {
            return res.data.data || [];
        }).catch((err) => {
            console.log(err);
            return [];
        });
    },
    changeStatusPublic: (data: {
        id: number,
        is_public: number
    }) => {
        const formData = new FormData();
        
        // Duyệt qua tất cả các trường trong data và thêm vào formData
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    // Xử lý trường hợp là mảng
                    value.forEach((item) => {
                        formData.append(`${key}[]`, item.toString());
                    });
                } else if (typeof value === "object" && !Array.isArray(value)) {
                    // Xử lý trường hợp là đối tượng (ví dụ: parent)
                    Object.entries(value).forEach(([subKey, subValue]) => {
                        if (subValue !== undefined && subValue !== null) {
                            // Sử dụng cú pháp đúng cho FormData
                            formData.append(`${key}[${subKey}]`, subValue.toString());
                        }
                    });
                } else {
                    // Xử lý các trường đơn
                    formData.append(key, value.toString());
                }
            }
        });
        const url = process.env.API_CHANGE_PUBLIC;

        return api
            .post(url as string, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => res.data)
            .catch((err) => {
                console.error("Error:", err);
                throw err; // Ném lỗi để xử lý ở nơi gọi hàm
            });
    },
    createWorkshop: (data: IWorkshopForm) => {
        const formData = new FormData();
        // Duyệt qua tất cả các trường trong data và thêm vào formData
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    value.forEach((item, index) => {
                        if (typeof item === "object") {
                            // Duyệt từng field của object trong mảng
                            Object.entries(item).forEach(([subKey, subValue]) => {
                                if (subValue !== undefined && subValue !== null) {
                                    formData.append(`${key}[${index}][${subKey}]`, subValue.toString());
                                }
                            });
                        } else {
                            formData.append(`${key}[${index}]`, item.toString());
                        }
                    });
                } else if (typeof value === "object") {
                    // Nếu là object, stringify toàn bộ (nếu cần)
                    formData.append(key, JSON.stringify(value));
                } else {
                    // Nếu là giá trị đơn giản, thêm vào bình thường
                    formData.append(key, value.toString());
                }
            }
        });
    
        const url = process.env.API_CREATE_WORKSHOP;
    
        return api
            .post(url as string, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => res.data)
            .catch((err) => {
                console.error("Error:", err);
                throw err; // Ném lỗi để xử lý ở nơi gọi hàm
            });
    },
    updateWorkshop: (data: { 
        id?: string
        title?: string
        description?: string
        date?: string
        video_link?: string
        created_by?: string
        tags?: Tags[]
        resources?: Resource[]
    }) => {
        const formData = new FormData();
    
        // Duyệt qua tất cả các trường trong data và thêm vào formData
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    value.forEach((item: any, index) => {
                        if (typeof item === "object") {
                            // Duyệt từng field của object trong mảng
                            Object.entries(item).forEach(([subKey, subValue]) => {
                                if (subValue !== undefined && subValue !== null) {
                                    formData.append(`${key}[${index}][${subKey}]`, subValue.toString());
                                }
                            });
                        } else {
                            formData.append(`${key}[${index}]`, item.toString());
                        }
                    });
                } else if (typeof value === "object") {
                    // Nếu là object, stringify toàn bộ (nếu cần)
                    formData.append(key, JSON.stringify(value));
                } else {
                    // Nếu là giá trị đơn giản, thêm vào bình thường
                    formData.append(key, value.toString());
                }
            }
        });
    
        const url = process.env.API_UPDATE_WORKSHOP;
    
        return api
            .post(url as string, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => res.data)
            .catch((err) => {
                console.error("Error in storePartner:", err);
                throw err; // Ném lỗi để xử lý ở nơi gọi hàm
            });
    },
    removeWorkshop: (data: { 
        id?: string
    }) => {
        const formData = new FormData();
    
        // Duyệt qua tất cả các trường trong data và thêm vào formData
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value.toString());
            }
        });
        console.log(formData)
        const url = process.env.API_REMOVE_WORKSHOP;
    
        return api
            .post(url as string, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => res.data)
            .catch((err) => {
                console.error("Error in storePartner:", err);
                throw err; // Ném lỗi để xử lý ở nơi gọi hàm
            });
    },
}