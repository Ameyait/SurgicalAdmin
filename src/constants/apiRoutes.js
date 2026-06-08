export const API_ROUTES = {
    AUTH: {
        LOGIN: "/auth/admin/login",
    },

    CATEGORIES: {
        LIST: "/admin/categories",
        DELETE: (id) => `/admin/categories/${id}`,
        MASTER: "/admin/category-master",
    },

    COUPONS: {
        LIST: "/admin/coupons",
        CREATE: "/admin/coupons",
        UPDATE: (id) => `/admin/coupons/${id}`,
        STATUS: (id) => `/admin/coupons/${id}/status`,
        DELETE: (id) => `/admin/coupons/${id}`
    },
    PRODUCTS: {
        LIST: "/admin/products",
        CREATE: "/admin/products",
        UPDATE: (id) => `/admin/products/${id}`,
        DELETE: (id) => `/admin/products/${id}`,
    },
    ORDERS: {
        LIST: "/admin/orders",
        DETAILS: (id) => `/admin/orders/${id}`,
        UPDATE_STATUS: (id) => `/admin/orders/${id}/status`,
    },
    CUSTOMERS: {
        LIST: "/admin/customers",
        DETAILS: (id) => `/admin/customers/${id}`,
    },
    REVIEWS: {
        DASHBOARD: "/admin/reviews/dashboard",
        LIST: "/admin/reviews",
        APPROVE: (id) => `/admin/reviews/${id}/approve`,
        REJECT: (id) => `/admin/reviews/${id}/reject`,
        FLAG: (id) => `/admin/reviews/${id}/flag`,
    },
    INVENTORY: {
        LIST: "/admin/inventory",
    },
    SETTINGS: {
        DELIVERY: "/admin/settings/delivery",
    },
    DASHBOARD: {
        GET: "/admin/dashboard",
    },
};