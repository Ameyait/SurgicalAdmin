import {
    Package,
    Truck,
    CheckCircle,
    XCircle,
    FileText,
    MessageCircle,
} from "lucide-react";

import toast from "react-hot-toast";

export default function ActionButtons({
    order,
    setOpenInvoice,
    handleUpdateOrderStatus,
}) {
    const updateStatus = async (
        status,
        message
    ) => {
        try {
            await handleUpdateOrderStatus(
                order.id,
                status
            );

            toast.success(message);
        } catch (error) {
            toast.error(
                "Failed to update order status"
            );
        }
    };

    return (
        <div className="grid grid-cols-2 gap-3 pb-8">
            <button
                onClick={() =>
                    updateStatus(
                        "packed",
                        "Order marked as packed"
                    )
                }
                disabled={
                    order.status !==
                    "pending"
                }
                className="h-9 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center gap-3 text-[10px] font-semibold disabled:opacity-50"
            >
                <Package size={19} />
                Mark packed
            </button>

            <button
                onClick={() =>
                    updateStatus(
                        "shipped",
                        "Order marked as shipped"
                    )
                }
                disabled={
                    order.status !==
                    "packed"
                }
                className="h-9 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center gap-3 text-[10px] font-semibold disabled:opacity-50"
            >
                <Truck size={19} />
                Mark shipped
            </button>

            <button
                onClick={() =>
                    updateStatus(
                        "delivered",
                        "Order marked as delivered"
                    )
                }
                disabled={
                    order.status !==
                    "shipped"
                }
                className="h-9 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center gap-3 text-[10px] font-semibold disabled:opacity-50"
            >
                <CheckCircle size={19} />
                Delivered
            </button>

            <button
                onClick={() =>
                    updateStatus(
                        "cancelled",
                        "Order cancelled successfully"
                    )
                }
                disabled={
                    order.status ===
                        "cancelled" ||
                    order.status ===
                        "delivered"
                }
                className="h-9 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center gap-3 text-[10px] font-semibold text-red-500 disabled:opacity-50"
            >
                <XCircle size={19} />
                Cancel
            </button>

            <button
                onClick={() =>
                    setOpenInvoice(true)
                }
                className="h-9 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center gap-3 text-[10px] font-semibold"
            >
                <FileText size={19} />
                Invoice
            </button>

            {/* <button className="h-9 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center gap-3 text-[10px] font-semibold">
                <MessageCircle size={19} />
                WhatsApp
            </button> */}
        </div>
    );
}