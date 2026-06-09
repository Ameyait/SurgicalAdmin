"use client";
 
import { useEffect, useState } from "react";
import CreateCouponModal from "@/components/coupons/CreateCoupons";
import EditCouponModal from "@/components/coupons/EditCoupons";
import DeleteCouponModal from "@/components/coupons/DeleteCoupons";
 
import {
    Plus,
    Copy,
    Pencil,
    Trash2,
    Ticket,
} from "lucide-react";
 
import { updateCouponStatus } from "@/services/coupon.service";
 
export default function Allcoupons({
    coupons,
    loading,
    fetchCoupons,
}) {
    const [couponData, setCouponData] = useState([]);
 
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
 
    const [selectedCoupon, setSelectedCoupon] = useState(null);
 
    useEffect(() => {
        setCouponData(coupons || []);
    }, [coupons]);
 
    const handleToggle = async (coupon) => {
        const previousState = coupon.is_active;
 
        try {
            setCouponData((prev) =>
                prev.map((item) =>
                    item.id === coupon.id
                        ? {
                              ...item,
                              is_active: !previousState,
                          }
                        : item
                )
            );
 
            await updateCouponStatus(
                coupon.id,
                !previousState
            );
 
            await fetchCoupons();
        } catch (error) {
            setCouponData((prev) =>
                prev.map((item) =>
                    item.id === coupon.id
                        ? {
                              ...item,
                              is_active: previousState,
                          }
                        : item
                )
            );
 
         
        }
    };
 
    if (loading) {
        return (
            <div className="p-6">
                <p>Loading coupons...</p>
            </div>
        );
    }
 
    return (
        <>
            {/* CREATE MODAL */}
            {openCreateModal && (
                <CreateCouponModal
                    closeModal={() =>
                        setOpenCreateModal(false)
                    }
                    onSuccess={fetchCoupons}
                />
            )}
 
            {/* EDIT MODAL */}
            {openEditModal && (
                <EditCouponModal
                    coupon={selectedCoupon}
                    onSuccess={fetchCoupons}
                    closeModal={() => {
                        setOpenEditModal(false);
                        setSelectedCoupon(null);
                    }}
                />
            )}
 
            {/* DELETE MODAL */}
            {openDeleteModal && (
                <DeleteCouponModal
                    coupon={selectedCoupon}
                    onSuccess={fetchCoupons}
                    closeModal={() => {
                        setOpenDeleteModal(false);
                        setSelectedCoupon(null);
                    }}
                />
            )}
 
            <div className="p-6">
 
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
 
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Coupons
                        </h1>
 
                        <p className="text-slate-500 mt-1 text-sm">
                            {couponData.length} coupons ·{" "}
                            {
                                couponData.filter(
                                    (c) => c.is_active
                                ).length
                            }{" "}
                            active
                        </p>
                    </div>
 
                    <button
                        onClick={() =>
                            setOpenCreateModal(true)
                        }
                        className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md"
                    >
                        <Plus size={16} />
                        Create coupon
                    </button>
 
                </div>
 
                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
 
                    {couponData?.map((coupon) => (
 
                        <div
                            key={coupon.id}
                            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-[270px] relative overflow-hidden"
                        >
 
                            <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600" />
 
                            {/* Top */}
                            <div className="flex items-center justify-between mb-3">
 
                                <div className="flex items-center gap-2">
 
                                    <Ticket
                                        className="text-blue-600"
                                        size={16}
                                    />
 
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            coupon.is_active
                                                ? "bg-green-100 text-green-600"
                                                : "bg-slate-100 text-slate-500"
                                        }`}
                                    >
                                        ●{" "}
                                        {coupon.is_active
                                            ? "active"
                                            : "expired"}
                                    </span>
 
                                </div>
 
                                <div className="flex items-center gap-2 text-slate-500">
 
                                    <Copy
                                        size={14}
                                        className="cursor-pointer"
                                    />
 
                                    <Pencil
                                        size={14}
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setSelectedCoupon(coupon);
                                            setOpenEditModal(true);
                                        }}
                                    />
                                                                        <Trash2
                                        size={14}
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setSelectedCoupon(coupon);
                                            setOpenDeleteModal(true);
                                        }}
                                    />
 
                                </div>
 
                            </div>
 
                            {/* Coupon Code */}
                            <h2 className="text-xl font-bold tracking-wider text-blue-500 mb-1">
                                {coupon.code}
                            </h2>
 
                            {/* Title */}
                            <p className="text-slate-700 text-sm font-medium mb-1">
                                {coupon.title}
                            </p>
 
                            <p className="text-slate-500 text-xs mb-3">
                                {coupon.description}
                            </p>
 
                            {/* Usage */}
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
 
                                <span>
                                    {coupon.used_count || 0} /{" "}
                                    {coupon.usage_limit}
                                </span>
 
                                <span>
                                    {coupon.usage_limit
                                        ? Math.round(
                                              ((coupon.used_count || 0) /
                                                  coupon.usage_limit) *
                                                  100
                                          )
                                        : 0}
                                    %
                                </span>
 
                            </div>
 
                            <div className="w-full bg-slate-100 h-2 rounded-full mb-3">
 
                                <div
                                    className="bg-green-500 h-2 rounded-full"
                                    style={{
                                        width: `${
                                            coupon.usage_limit
                                                ? ((coupon.used_count || 0) /
                                                      coupon.usage_limit) *
                                                  100
                                                : 0
                                        }%`,
                                    }}
                                />
 
                            </div>
 
                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-2 mb-3">
 
                                <div className="bg-slate-50 rounded-lg p-2 text-center">
                                    <h3 className="font-bold text-sm">
                                        ₹{coupon.discount_value}
                                    </h3>
 
                                    <p className="text-[9px] text-slate-500">
                                        REVENUE
                                    </p>
                                </div>
 
                                <div className="bg-slate-50 rounded-lg p-2 text-center">
                                    <h3 className="font-bold text-sm">
                                        {coupon.discount_value}%
                                    </h3>
 
                                    <p className="text-[9px] text-slate-500">
                                        CONV.
                                    </p>
                                </div>
 
                                <div className="bg-slate-50 rounded-lg p-2 text-center">
                                    <h3 className="font-bold text-sm">
                                        {coupon.usage_limit}
                                    </h3>
 
                                    <p className="text-[9px] text-slate-500">
                                        ACTIVE
                                    </p>
                                </div>
 
                            </div>
 
                            {/* Footer */}
                            <div className="flex items-center justify-between">
 
                                <p className="text-xs text-slate-500">
                                    Expires{" "}
                                    {coupon.valid_until
                                        ? new Date(
                                              coupon.valid_until
                                          ).toLocaleDateString()
                                        : "-"}
                                </p>
 
                                <button
                                    onClick={() =>
                                        handleToggle(coupon)
                                    }
                                    className={`w-8 h-5 rounded-full relative transition-all duration-300 ${
                                        coupon.is_active
                                            ? "bg-blue-600"
                                            : "bg-slate-300"
                                    }`}
                                >
                                    <span
                                        className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${
                                            coupon.is_active
                                                ? "right-1"
                                                : "left-1"
                                        }`}
                                    />
                                </button>
 
                            </div>
 
                        </div>
 
                    ))}
 
                </div>
 
            </div>
 
        </>
    );
}