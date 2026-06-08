"use client";

import { X } from "lucide-react";

export default function InvoiceModal({
    order,
    setOpenInvoice,
}) {
    const formatCurrency = (value) =>
        `₹${Number(value || 0).toLocaleString(
            "en-IN"
        )}`;

    return (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-6">
            <div className="relative w-full max-w-[760px] max-h-[92vh] overflow-y-auto bg-white shadow-xl px-16 py-12 text-[#222]">
                {/* Close Button */}
                <button
                    onClick={() =>
                        setOpenInvoice(false)
                    }
                    className="absolute top-4 right-4 h-8 w-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-50"
                >
                    <X size={18} />
                </button>

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
                            Medical & Surgical Supplies
                        </p>

                        <h1 className="text-[42px] leading-none font-bold tracking-tight mt-4">
                            INVOICE
                        </h1>
                    </div>

                    <div className="text-right text-[13px] leading-5 text-slate-700">
                        <p>Surgical World</p>
                        <p>102, MG Road, Mumbai</p>
                        <p>Mumbai, Maharashtra</p>
                        <p>+91 9498888888</p>
                    </div>
                </div>

                {/* Invoice Details */}
                <div className="grid grid-cols-3 gap-8 mt-14">
                    <div>
                        <h3 className="text-[13px] font-semibold">
                            Billed To
                        </h3>

                        <div className="text-[13px] leading-5 mt-1 text-slate-700">
                            <p>
                                {order.customer?.name}
                            </p>

                            <p>
                                {
                                    order
                                        .shipping_address
                                        ?.address
                                }
                            </p>

                            <p>
                                {
                                    order.customer
                                        ?.email
                                }
                            </p>

                            <p>
                                {
                                    order
                                        .shipping_address
                                        ?.phone
                                }
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[13px] font-semibold">
                            Date Issued
                        </h3>

                        <p className="text-[13px] mt-1 text-slate-700">
                            {new Date().toLocaleDateString()}
                        </p>

                        <h3 className="text-[13px] font-semibold mt-8">
                            Invoice Number
                        </h3>

                        <p className="text-[13px] mt-1 text-slate-700">
                            INV-
                            {
                                order.order_number
                            }
                        </p>
                    </div>

                    <div className="text-right">
                        <h3 className="text-[13px] font-semibold">
                            Due Date
                        </h3>

                        <p className="text-[13px] mt-1 text-slate-700">
                            -
                        </p>

                        <h3 className="text-[13px] font-semibold mt-12">
                            Amount Due
                        </h3>

                        <p className="text-[14px] mt-1 font-semibold">
                            {formatCurrency(
                                order.pricing
                                    ?.grand_total
                            )}
                        </p>
                    </div>
                </div>

                {/* Products Table */}
                <div className="mt-14">
                    <div className="border-t-2 border-black"></div>

                    <div className="grid grid-cols-[1fr_120px_80px_120px] text-[12px] py-4">
                        <div>Description</div>

                        <div className="text-right">
                            Rate
                        </div>

                        <div className="text-center">
                            Qty
                        </div>

                        <div className="text-right">
                            Amount
                        </div>
                    </div>

                    {order.items?.map(
                        (product) => (
                            <div
                                key={
                                    product.product_id
                                }
                                className="grid grid-cols-[1fr_120px_80px_120px] text-[13px] py-2 text-slate-700"
                            >
                                <div>
                                    {
                                        product.product_name
                                    }
                                </div>

                                <div className="text-right">
                                    {formatCurrency(
                                        product.price
                                    )}
                                </div>

                                <div className="text-center">
                                    {
                                        product.quantity
                                    }
                                </div>

                                <div className="text-right">
                                    {formatCurrency(
                                        product.total
                                    )}
                                </div>
                            </div>
                        )
                    )}

                    <div className="grid grid-cols-[1fr_120px_80px_120px] text-[12px] py-4 text-slate-700">
                        <div></div>

                        <div className="text-right">
                            +Tax
                        </div>

                        <div></div>

                        <div></div>
                    </div>
                </div>

                {/* Summary */}
                <div className="flex justify-end mt-6">
                    <div className="w-[320px]">
                        <div className="flex justify-between text-[13px] py-2">
                            <span>
                                Subtotal
                            </span>

                            <span>
                                {formatCurrency(
                                    order
                                        .pricing
                                        ?.subtotal
                                )}
                            </span>
                        </div>

                        <div className="flex justify-between text-[13px] py-2">
                            <span>GST</span>

                            <span>
                                {formatCurrency(
                                    order
                                        .pricing
                                        ?.gst
                                )}
                            </span>
                        </div>

                        <div className="flex justify-between text-[13px] py-2 text-emerald-600">
                            <span>
                                Discount
                            </span>

                            <span>
                                -
                                {formatCurrency(
                                    order
                                        .pricing
                                        ?.discount
                                )}
                            </span>
                        </div>

                        <div className="border-t border-black mt-2"></div>

                        <div className="flex justify-between text-[13px] py-3">
                            <span>Total</span>

                            <span>
                                {formatCurrency(
                                    order
                                        .pricing
                                        ?.grand_total
                                )}
                            </span>
                        </div>

                        <div className="border-t-2 border-black"></div>

                        <div className="flex justify-between text-[13px] font-bold py-3">
                            <span>
                                Balance Due
                            </span>

                            <span>
                                {formatCurrency(
                                    order
                                        .pricing
                                        ?.grand_total
                                )}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Notes */}
                <div className="mt-20">
                    <h3 className="text-[13px] font-semibold">
                        Notes
                    </h3>

                    <p className="text-[13px] mt-1 text-slate-700">
                        Thank you for
                        choosing Surgical
                        World.
                    </p>

                    <h3 className="text-[13px] font-semibold mt-7">
                        Terms
                    </h3>

                    <p className="text-[13px] mt-1 text-slate-700">
                        Please pay the
                        total amount due
                        by the invoice due
                        date.
                    </p>
                </div>

                {/* Footer */}
                <div className="text-center text-[11px] text-slate-500 mt-28">
                    <p>Page 1 of 1</p>

                    <p className="text-blue-500 mt-1">
                        Made with Surgical
                        World
                    </p>
                </div>
            </div>
        </div>
    );
}