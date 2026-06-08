"use client";

import {
    X,
    Phone,
    Mail,
    MessageCircle,
    Ban,
} from "lucide-react";

export default function CustomerDetailsDrawer({
    customer,
    onClose,
}) {
    if (!customer) return null;

    return (
        <>
            <div
                onClick={onClose}
                className="fixed inset-0 bg-black/50 z-40"
            />

            <div className="fixed top-0 right-0 h-screen w-[500px] bg-white z-50 overflow-y-auto shadow-2xl">
                <div className="p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[16px] font-semibold">
                            {customer.name}
                        </h2>

                        <button
                            onClick={onClose}
                            className="h-8 w-8 rounded-full border border-slate-300 flex items-center justify-center"
                        >
                            <X size={14} />
                        </button>
                    </div>

                    {/* Profile */}
                    <div className="bg-slate-50 rounded-[14px] p-3 flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center text-[14px] font-bold">
                            {customer.name
                                ?.split(" ")
                                ?.map((word) => word[0])
                                ?.join("")
                                ?.slice(0, 2)
                                ?.toUpperCase()}
                        </div>

                        <div>
                            <h3 className="text-[14px] font-semibold">
                                {customer.name}
                            </h3>

                            <p className="text-[11px] text-slate-500">
                                {customer.email}
                            </p>

                            <p className="text-[11px] text-slate-500">
                                {customer.phone} ·{" "}
                                {customer.address?.city || "-"}
                            </p>

                            <p className="text-[11px] text-slate-500">
                                Joined{" "}
                                {customer.joined_at
                                    ? new Date(
                                          customer.joined_at
                                      ).toLocaleDateString(
                                          "en-GB"
                                      )
                                    : "-"}
                            </p>
                        </div>
                    </div>

                    {/* Address */}
                    <p className="mt-4 text-[11px] text-slate-500">
                        📍{" "}
                        {customer.address?.address ||
                            "-"}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-2 mt-4">
                        <div className="bg-slate-50 rounded-[14px] p-2 text-center">
                            <h3 className="text-[16px] font-bold">
                                {customer.statistics
                                    ?.orders || 0}
                            </h3>

                            <p className="text-[9px] text-slate-500">
                                ORDERS
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-[14px] p-2 text-center">
                            <h3 className="text-[16px] font-bold">
                                ₹
                                {customer.statistics
                                    ?.spent || 0}
                            </h3>

                            <p className="text-[9px] text-slate-500">
                                SPENT
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-[14px] p-2 text-center">
                            <h3 className="text-[16px] font-bold">
                                {customer.statistics
                                    ?.aov || 0}
                            </h3>

                            <p className="text-[9px] text-slate-500">
                                AOV
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-[14px] p-2 text-center">
                            <h3 className="text-[16px] font-bold">
                                {customer.statistics
                                    ?.wishlist || 0}
                            </h3>

                            <p className="text-[9px] text-slate-500">
                                WISHLIST
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-4 gap-2 mt-4">
                        <button className="h-8 rounded-lg border border-slate-200 flex items-center justify-center">
                            <Phone size={14} />
                        </button>

                        <button className="h-8 rounded-lg border border-slate-200 flex items-center justify-center">
                            <Mail size={14} />
                        </button>

                        <button className="h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                            <MessageCircle size={14} />
                        </button>

                        <button className="h-8 rounded-lg bg-red-500 text-white flex items-center justify-center">
                            <Ban size={14} />
                        </button>
                    </div>

                    {/* Order History */}
                    <h3 className="mt-6 text-[10px] font-semibold uppercase text-slate-500">
                        Order History
                    </h3>

                    <div className="mt-2 border border-slate-200 rounded-[14px] overflow-hidden">
                        <div className="grid grid-cols-4 px-3 py-2 text-[10px] font-semibold border-b">
                            <div>ORDER</div>
                            <div>DATE</div>
                            <div>AMOUNT</div>
                            <div>STATUS</div>
                        </div>

                        {customer.orders_history
                            ?.length > 0 ? (
                            customer.orders_history.map(
                                (
                                    order,
                                    index
                                ) => (
                                    <div
                                        key={
                                            index
                                        }
                                        className="grid grid-cols-4 px-3 py-3 text-[11px] border-b"
                                    >
                                        <div>
                                            {
                                                order.order_number
                                            }
                                        </div>

                                        <div>
                                            {
                                                order.date
                                            }
                                        </div>

                                        <div>
                                            ₹
                                            {
                                                order.amount
                                            }
                                        </div>

                                        <div>
                                            {
                                                order.status
                                            }
                                        </div>
                                    </div>
                                )
                            )
                        ) : (
                            <div className="h-12 flex items-center justify-center text-[11px] text-slate-400">
                                No orders yet
                            </div>
                        )}
                    </div>

                    {/* Timeline */}
                    <h3 className="mt-6 text-[10px] font-semibold uppercase text-slate-500">
                        Activity Timeline
                    </h3>

                    <div className="mt-3 space-y-3">
                        {customer.activity_timeline
                            ?.length > 0 ? (
                            customer.activity_timeline.map(
                                (
                                    activity,
                                    index
                                ) => (
                                    <div
                                        key={
                                            index
                                        }
                                        className="flex items-center gap-2"
                                    >
                                        <div className="h-3 w-3 rounded-full bg-blue-500" />

                                        <p className="text-[12px]">
                                            {
                                                activity.title
                                            }
                                        </p>
                                    </div>
                                )
                            )
                        ) : (
                            <>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full border border-slate-300" />
                                    <p className="text-[12px]">
                                        No
                                        activity
                                        found
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}