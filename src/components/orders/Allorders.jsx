"use client";

import { useState, useRef, useEffect } from "react";

import { Search, Download, Plus, Truck, CheckCircle, Package, IndianRupee, MoreVertical, Filter, ChevronDown, Check, } from "lucide-react";
export default function AllOrders({
    orders,
    loading,
    search,
    setSearch,
    deliveryFilter,
    setDeliveryFilter,
    paymentFilter,
    setPaymentFilter,
    onOrderClick,
}) {

    const [showDeliveryDropdown, setShowDeliveryDropdown] =
        useState(false);

    const [showPaymentDropdown, setShowPaymentDropdown] =
        useState(false);

    const deliveryRef = useRef(null);
    const paymentRef = useRef(null);

    const deliveryOptions = [
        "All deliveries",
        "Pending",
        "Packed",
        "Shipped",
        "Out for delivery",
        "Delivered",
        "Cancelled",
    ];

    const paymentOptions = [
        "All payments",
        "Paid",
        "Pending",
        "Failed",
        "Refunded",
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                deliveryRef.current &&
                !deliveryRef.current.contains(event.target)
            ) {
                setShowDeliveryDropdown(false);
            }

            if (
                paymentRef.current &&
                !paymentRef.current.contains(event.target)
            ) {
                setShowPaymentDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Orders
                    </h1>

                    <p className="text-sm text-slate-500 mt-2">
                        28 total orders · 5 showing
                    </p>
                </div>

                {/* <div className="flex gap-3">
                    <button className="h-10 px-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center gap-2 text-sm font-medium hover:bg-slate-50">
                        <Download size={16} />
                        Export CSV
                    </button> */}

                    {/* <button className="h-10 px-4 bg-emerald-500 text-white rounded-xl shadow-md flex items-center gap-2 text-sm font-medium hover:bg-emerald-600">
                        <Plus size={16} />
                        New Order
                    </button> */}
                {/* </div> */}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-5 mb-6">
                <div className="h-[110px] bg-white border border-slate-200 rounded-2xl p-5 flex justify-between">
                    <div>
                        <p className="text-[11px] uppercase font-semibold text-slate-500">
                            Revenue
                        </p>

                        <h2 className="text-[20px] font-bold text-slate-900 mt-1">
                            ₹55.4k
                        </h2>

                        <p className="mt-3 text-xs text-slate-500">
                            <span className="text-emerald-500 font-semibold">
                                ↑ +12%
                            </span>{" "}
                            vs yesterday
                        </p>
                    </div>

                    <div className="w-9 h-9 rounded-2xl bg-blue-100 flex items-center justify-center">
                        <IndianRupee
                            className="text-blue-600"
                            size={18}
                        />
                    </div>
                </div>

                <div className="h-[110px] bg-white border border-slate-200 rounded-2xl p-5 flex justify-between">
                    <div>
                        <p className="text-[11px] uppercase font-semibold text-slate-500">
                            Pending
                        </p>

                        <h2 className="text-[20px] font-bold mt-1">
                            3
                        </h2>
                    </div>

                    <div className="w-9 h-9 rounded-2xl bg-orange-100 flex items-center justify-center">
                        <Package
                            className="text-orange-500"
                            size={18}
                        />
                    </div>
                </div>

                <div className="h-[110px] bg-white border border-slate-200 rounded-2xl p-5 flex justify-between">
                    <div>
                        <p className="text-[11px] uppercase font-semibold text-slate-500">
                            In Transit
                        </p>

                        <h2 className="text-[20px] font-bold mt-1">
                            8
                        </h2>
                    </div>

                    <div className="w-9 h-9 rounded-2xl bg-blue-100 flex items-center justify-center">
                        <Truck
                            className="text-blue-500"
                            size={18}
                        />
                    </div>
                </div>

                <div className="h-[110px] bg-white border border-slate-200 rounded-2xl p-5 flex justify-between">
                    <div>
                        <p className="text-[11px] uppercase font-semibold text-slate-500">
                            Delivered
                        </p>

                        <h2 className="text-[20px] font-bold mt-1">
                            8
                        </h2>
                    </div>

                    <div className="w-9 h-9 rounded-2xl bg-green-100 flex items-center justify-center">
                        <CheckCircle
                            className="text-green-500"
                            size={18}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <div className="p-2.5 flex items-center gap-3 border-b border-slate-200">
                    <div className="relative flex-1">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            size={16}
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search order, customer, phone..."
                            className="w-full h-9 pl-9 pr-4 border border-slate-200 rounded-xl text-sm outline-none"
                        />
                    </div>

                    <div ref={deliveryRef} className="relative">
                        <button
                            onClick={() => {
                                setShowDeliveryDropdown(!showDeliveryDropdown);
                                setShowPaymentDropdown(false);
                            }}
                            className="h-9 min-w-[180px] px-4 border border-slate-200 rounded-xl flex items-center justify-between text-sm bg-white"
                        >
                            {deliveryFilter}
                            <ChevronDown size={16} />
                        </button>

                        {showDeliveryDropdown && (
                            <div className="absolute top-14 left-0 w-full bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2">
                                {deliveryOptions.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => {
                                            setDeliveryFilter(option);
                                            setShowDeliveryDropdown(false);
                                        }}
                                        className={`w-full px-2 py-1 rounded-xl text-sm text-left flex items-center justify-between ${deliveryFilter === option
                                            ? "bg-green-500 text-white"
                                            : "hover:bg-slate-50"
                                            }`}
                                    >
                                        {option}
                                        {deliveryFilter === option && <Check size={18} />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div ref={paymentRef} className="relative">
                        <button
                            onClick={() => {
                                setShowPaymentDropdown(!showPaymentDropdown);
                                setShowDeliveryDropdown(false);
                            }}
                            className="h-9 min-w-[180px] px-4 border border-slate-200 rounded-xl flex items-center justify-between text-sm bg-white"
                        >
                            {paymentFilter}
                            <ChevronDown size={16} />
                        </button>

                        {showPaymentDropdown && (
                            <div className="absolute top-14 left-0 w-full bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2">
                                {paymentOptions.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => {
                                            setPaymentFilter(option);

                                            setShowPaymentDropdown(false);
                                        }}
                                        className={`w-full px-2 py-1 rounded-xl text-sm text-left flex items-center justify-between ${paymentFilter === option
                                            ? "bg-green-500 text-white"
                                            : "hover:bg-slate-50"
                                            }`}
                                    >
                                        {option}
                                        {paymentFilter === option && <Check size={18} />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* <button className="h-11 px-4 border border-slate-200 rounded-xl flex items-center gap-2 text-sm font-medium">
                        <Filter size={16} />
                        More filters
                    </button> */}
                </div>

                <table className="w-full">
                    <thead>
                        <tr className="h-9 bg-slate-100 border-b border-slate-200 text-xs uppercase text-slate-500">
                            <th className="px-6 text-left">Order ID</th>
                            <th className="text-left">Customer</th>
                            <th className="text-left">Items</th>
                            <th className="text-left">Amount</th>
                            <th className="text-left">Payment</th>
                            <th className="text-left">Delivery</th>
                            <th className="text-left">Date</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="text-center py-10 text-slate-500"
                                >
                                    Loading orders...
                                </td>
                            </tr>
                        ) : orders?.length > 0 ? (
                            orders.map((order) => (
                                <tr
                                    key={order.id}
                                    onClick={() => onOrderClick(order)}
                                    className="h-[55px] border-b border-slate-200 hover:bg-slate-50 cursor-pointer"
                                >
                                    <td className="px-6">
                                        <span className="text-blue-600 text-xs font-semibold">
                                            {order.order_number}
                                        </span>
                                    </td>

                                    <td>
                                        <h4 className="text-sm font-semibold">
                                            {order.customer_name}
                                        </h4>
                                        {/* <p className="text-sm text-slate-500">
                                            {order.customer_phone}
                                        </p> */}
                                    </td>

                                    <td className="text-xs text-slate-500">
                                        {order.items_count} items
                                    </td>

                                    <td className="text-sm font-semibold">
                                        ₹{Number(order.amount).toLocaleString()}
                                    </td>

                                    <td>
                                        <span
                                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${order.payment_status === "paid"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-yellow-100 text-yellow-600"
                                                }`}
                                        >
                                            <span
                                                className={`h-2 w-2 rounded-full ${order.payment_status === "paid"
                                                    ? "bg-green-500"
                                                    : "bg-yellow-500"
                                                    }`}
                                            />
                                            {order.payment_status}
                                        </span>
                                    </td>

                                    <td>
                                        <span
                                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${order.status === "delivered"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            <span
                                                className={`h-2 w-2 rounded-full ${order.status === "delivered"
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                                    }`}
                                            />
                                            {order.status}
                                        </span>
                                    </td>

                                    <td className="text-xs text-slate-500">
                                        {new Date(order.order_date).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "2-digit",
                                                month: "short",
                                            }
                                        )}
                                    </td>

                                    <td className="text-center">
                                        <button onClick={(e) => e.stopPropagation()}>
                                            <MoreVertical size={15} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="text-center py-10 text-slate-500"
                                >
                                    No orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


