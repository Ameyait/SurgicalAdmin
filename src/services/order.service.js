import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiRoutes";

export const getOrders = async ({
    page = 1,
    page_size = 20,
    search = "",
    status = "",
    payment_status = "",
}) => {
    const response = await axiosInstance.get(
        API_ROUTES.ORDERS.LIST,
        {
            params: {
                page,
                page_size,
                search: search || undefined,
                status:
                    status &&
                    status !==
                        "All deliveries"
                        ? status.toLowerCase()
                        : undefined,
                payment_status:
                    payment_status &&
                    payment_status !==
                        "All payments"
                        ? payment_status.toLowerCase()
                        : undefined,
            },
        }
    );

    return response.data;
};

export const getOrderDetails =
    async (orderId) => {
        const response =
            await axiosInstance.get(
                API_ROUTES.ORDERS.DETAILS(
                    orderId
                )
            );

        return response.data;
    };

export const updateOrderStatus =
    async (orderId, status) => {
        const response =
            await axiosInstance.patch(
                API_ROUTES.ORDERS.UPDATE_STATUS(
                    orderId
                ),
                {
                    status,
                }
            );

        return response.data;
    };