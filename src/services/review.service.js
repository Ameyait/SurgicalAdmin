import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiRoutes";

export const getReviewsDashboard = async () => {
    const response = await axiosInstance.get(
        API_ROUTES.REVIEWS.DASHBOARD
    );

    return response.data;
};

export const getReviews = async ({
    status = "",
    page = 1,
    pageSize = 20,
}) => {
    const response = await axiosInstance.get(
        API_ROUTES.REVIEWS.LIST,
        {
            params: {
                status,
                page,
                page_size: pageSize,
            },
        }
    );

    return response.data;
};

export const approveReview = async (id) => {
    const response = await axiosInstance.patch(
        API_ROUTES.REVIEWS.APPROVE(id),
        {
            admin_note: "",
        }
    );

    return response.data;
};

export const rejectReview = async (id) => {
    const response = await axiosInstance.patch(
        API_ROUTES.REVIEWS.REJECT(id),
        {
            admin_note: "",
        }
    );

    return response.data;
};

export const flagReview = async (id) => {
    const response = await axiosInstance.patch(
        API_ROUTES.REVIEWS.FLAG(id),
        {
            admin_note: "",
        }
    );

    return response.data;
};