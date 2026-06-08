"use client";

import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { deleteCoupon } from "@/services/coupon.service";

export default function DeleteCouponModal({
  coupon,
  closeModal,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteCoupon(coupon.id);

      onSuccess?.();

      closeModal();
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to delete coupon"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[400px] rounded-[22px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.30)]">
        <button
          onClick={closeModal}
          className="absolute right-5 top-5 text-[#6b7280] hover:text-black transition"
        >
          <X size={22} />
        </button>

        <div className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-red-50">
          <Trash2
            size={28}
            className="text-red-300"
          />
        </div>

        <h2 className="mt-5 text-center text-[22px] font-bold text-[#111827]">
          Delete Coupon?
        </h2>

        <p className="mt-2 text-center text-[15px] leading-6 text-slate-500">
          Are you sure you want to delete this coupon?
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={closeModal}
            disabled={loading}
            className="h-[44px] rounded-[14px] border border-[#e5e7eb] bg-white px-6 text-[15px] font-semibold text-[#111827] shadow-sm transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="h-[44px] rounded-[14px] bg-red-500 px-6 text-[15px] font-semibold text-white shadow-lg shadow-red-200 transition-all hover:bg-red-600"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}