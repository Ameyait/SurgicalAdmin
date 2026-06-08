import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiRoutes";

export const getCoupons = async () => {
    try {
        const response = await axiosInstance.get(
            API_ROUTES.COUPONS.LIST
        );

        return response.data;
    } catch (error) {
        console.error("Get Coupons Error:", error);
        throw error;
    }
};

export const createCoupon = async (data) => {
    try {
        const response = await axiosInstance.post(
            API_ROUTES.COUPONS.CREATE,
            data
        );

        return response.data;
    } catch (error) {
        console.error("Create Coupon Error:", error);
        throw error;
    }
};

export const updateCoupon = async (id, data) => {
    try {
        const response = await axiosInstance.put(
            API_ROUTES.COUPONS.UPDATE(id),
            data
        );

        return response.data;
    } catch (error) {
        throw error;
    }
};

// NEW API
export const updateCouponStatus = async (
    couponId,
    is_active
) => {
    try {
        const response = await axiosInstance.patch(
            API_ROUTES.COUPONS.STATUS(couponId),
            {
                is_active,
            }
        );

        return response.data;
    } catch (error) {
        throw error;
    }
};
export const deleteCoupon = async (couponId) => {
    try {
        const response = await axiosInstance.delete(
            API_ROUTES.COUPONS.DELETE(couponId)
        );

        return response.data;
    } catch (error) {
        console.error("Delete Coupon Error:", error);
        throw error;
    }
};