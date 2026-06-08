"use client";

import {
    useCallback,
    useState,
} from "react";

import {
    getOrders,
    getOrderDetails,
    updateOrderStatus,
} from "@/services/order.service";

export default function useOrders() {
    const [orders, setOrders] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [
        selectedOrderDetails,
        setSelectedOrderDetails,
    ] = useState(null);

    const [
        detailsLoading,
        setDetailsLoading,
    ] = useState(false);

    const [pagination, setPagination] =
        useState({
            page: 1,
            page_size: 20,
            total: 0,
        });

    const fetchOrders = useCallback(
        async ({
            page = 1,
            page_size = 20,
            search = "",
            status = "",
            payment_status = "",
        } = {}) => {
            try {
                setLoading(true);

                const response =
                    await getOrders({
                        page,
                        page_size,
                        search,
                        status,
                        payment_status,
                    });

                const ordersData =
                    response?.data
                        ?.orders || [];

                setOrders(ordersData);

                setPagination({
                    page,
                    page_size,
                    total:
                        ordersData.length,
                });

                return response;
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const fetchOrderDetails =
        useCallback(
            async (orderId) => {
                try {
                    setDetailsLoading(
                        true
                    );

                    const response =
                        await getOrderDetails(
                            orderId
                        );

                    setSelectedOrderDetails(
                        response?.data ||
                            null
                    );

                    return response?.data;
                } catch (error) {
                    console.error(
                        error
                    );
                } finally {
                    setDetailsLoading(
                        false
                    );
                }
            },
            []
        );

    const handleUpdateOrderStatus =
        useCallback(
            async (
                orderId,
                status
            ) => {
                try {
                    // Update status
                    await updateOrderStatus(
                        orderId,
                        status
                    );

                    // Fetch latest order details
                    const latestOrder =
                        await getOrderDetails(
                            orderId
                        );

                    setSelectedOrderDetails(
                        latestOrder?.data ||
                            null
                    );

                    // Update order list
                    setOrders(
                        (prev) =>
                            prev.map(
                                (
                                    order
                                ) =>
                                    order.id ===
                                    orderId
                                        ? {
                                              ...order,
                                              status,
                                          }
                                        : order
                            )
                    );

                    return latestOrder;
                } catch (error) {
                    console.error(
                        error
                    );
                }
            },
            []
        );

    return {
        orders,
        loading,
        pagination,
        fetchOrders,

        selectedOrderDetails,
        detailsLoading,
        fetchOrderDetails,

        handleUpdateOrderStatus,
    };
}