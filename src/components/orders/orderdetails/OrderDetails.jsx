"use client";

import { useState } from "react";
import { X } from "lucide-react";

import CustomerSection from "./CustomerSection";
import ShippingAddressSection from "./ShippingAddressSection";
import ProductsSection from "./ProductsSection";
import PricingSection from "./PricingSection";
import DeliverySection from "./DeliverySection";
import TimelineSection from "./TimelineSection";
import ActionButtons from "./ActionButtons";
import InvoiceModal from "./InvoiceModal";

export default function OrderDetailsDrawer({
    open,
    setOpen,
    order,
    loading,
    handleUpdateOrderStatus,
}) {
    const [openInvoice, setOpenInvoice] =
        useState(false);

    const orderStatus =
        order?.status || "pending";

    const statusMap = {
        pending: 0,
        packed: 1,
        shipped: 2,
        out_for_delivery: 3,
        delivered: 4,
    };

    const currentStep =
        statusMap[orderStatus] ?? 0;

    const timelineSteps = [
        "Order placed",
        "Packed",
        "Shipped",
        "Out for delivery",
        "Delivered",
    ];

    const formatCurrency = (value) =>
        `₹${Number(
            value || 0
        ).toLocaleString("en-IN")}`;

    if (!open) return null;

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex">
                <div
                    className="flex-1 bg-black/75"
                    onClick={() =>
                        setOpen(false)
                    }
                />

                <div className="w-[520px] h-screen bg-white flex items-center justify-center">
                    Loading Order...
                </div>
            </div>
        );
    }

    if (!order) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 flex">
                {/* Overlay */}
                <div
                    onClick={() =>
                        setOpen(false)
                    }
                    className="flex-1 bg-black/75"
                />

                {/* Drawer */}
                <div className="relative w-[520px] max-w-full h-screen bg-[#f8fbff] overflow-y-auto">
                    {/* Close Button */}
                    <button
                        onClick={() =>
                            setOpen(false)
                        }
                        className="absolute top-4 right-4 h-4 w-4 rounded-full border-2 border-blue-400 bg-blue-50 text-blue-500 flex items-center justify-center"
                    >
                        <X size={18} />
                    </button>

                    {/* Header */}
                    <div className="bg-[#eef4ff] px-4 py-4 border-b border-slate-200">
                        <div className="flex items-start justify-between pr-10">
                            <div>
                                <h2 className="text-[15px] leading-none font-semibold text-[#020617]">
                                    Order{" "}
                                    {
                                        order.order_number
                                    }
                                </h2>

                                <p className="text-slate-500 mt-2 text-[12px]">
                                    {order.order_date
                                        ? new Date(
                                            order.order_date
                                        ).toLocaleDateString(
                                            "en-IN"
                                        )
                                        : "-"}
                                </p>
                            </div>

                            <span
                                className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-[12px] font-medium ${orderStatus ===
                                    "cancelled"
                                    ? "bg-red-100 text-red-500"
                                    : orderStatus ===
                                        "delivered"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-blue-100 text-blue-600"
                                    }`}
                            >
                                <span
                                    className={`h-2 w-2 rounded-full ${orderStatus ===
                                        "cancelled"
                                        ? "bg-red-500"
                                        : orderStatus ===
                                            "delivered"
                                            ? "bg-green-500"
                                            : "bg-blue-500"
                                        }`}
                                />

                                {orderStatus}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-4 py-4">
                        <CustomerSection
                            customer={order?.customer}
                        />

                        <ShippingAddressSection
                            address={
                                order?.shipping_address
                            }
                        />

                        <ProductsSection
                            items={order?.items || []}
                            formatCurrency={
                                formatCurrency
                            }
                        />

                        <PricingSection
                            pricing={{
                                subtotal:
                                    order?.pricing
                                        ?.subtotal,
                                shipping:
                                    order?.pricing
                                        ?.shipping,
                                gst:
                                    order?.pricing?.gst,
                                discount:
                                    order?.pricing
                                        ?.discount,
                                total:
                                    order?.pricing
                                        ?.grand_total,
                            }}
                            formatCurrency={
                                formatCurrency
                            }
                        />
                        <DeliverySection />

                        <TimelineSection
                            timelineSteps={
                                timelineSteps
                            }
                            currentStep={
                                currentStep
                            }
                            orderStatus={
                                orderStatus
                            }
                        />

                        <ActionButtons
                            order={order}
                            setOpenInvoice={
                                setOpenInvoice
                            }
                            handleUpdateOrderStatus={
                                handleUpdateOrderStatus
                            }
                        />
                    </div>
                </div>
            </div>

            {openInvoice && (
                <InvoiceModal
                    order={order}
                    setOpenInvoice={
                        setOpenInvoice
                    }
                />
            )}
        </>
    );
}