"use client";

import { useEffect, useState } from "react";
import AllOrders from "@/components/orders/Allorders";
import OrderDetailsDrawer from "@/components/orders/orderdetails/OrderDetails";
import useOrders from "@/hooks/orders/useOrders";

export default function OrdersPage() {
    const {
        orders,
        loading,
        fetchOrders,

        selectedOrderDetails,
        detailsLoading,
        fetchOrderDetails,

        handleUpdateOrderStatus,
    } = useOrders();

    const [search, setSearch] = useState("");

    const [deliveryFilter, setDeliveryFilter] =
        useState("All deliveries");

    const [paymentFilter, setPaymentFilter] =
        useState("All payments");

    const [openOrderDetails, setOpenOrderDetails] =
        useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchOrders({
                page: 1,
                page_size: 20,
                search,
                status: deliveryFilter,
                payment_status: paymentFilter,
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [
        search,
        deliveryFilter,
        paymentFilter,
        fetchOrders,
    ]);

    const handleOpenOrderDetails = async (
        order
    ) => {
        setOpenOrderDetails(true);

        await fetchOrderDetails(order.id);
    };

    return (
        <>
            <AllOrders
                orders={orders}
                loading={loading}
                search={search}
                setSearch={setSearch}
                deliveryFilter={deliveryFilter}
                setDeliveryFilter={setDeliveryFilter}
                paymentFilter={paymentFilter}
                setPaymentFilter={setPaymentFilter}
                onOrderClick={handleOpenOrderDetails}
            />

            <OrderDetailsDrawer
                open={openOrderDetails}
                setOpen={setOpenOrderDetails}
                order={selectedOrderDetails}
                loading={detailsLoading}
                handleUpdateOrderStatus={
                    handleUpdateOrderStatus
                }
            />
        </>
    );
}