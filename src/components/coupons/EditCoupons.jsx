"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { updateCoupon } from "@/services/coupon.service";

export default function EditCouponModal({
  coupon,
  closeModal,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount_value: "",
    max_discount_amount: "",
    minimum_order_amount: "",
    usage_limit: "",
    is_active: true,
    is_first_order_only: false,
    valid_until: "",
  });

  useEffect(() => {
    if (coupon) {
      setFormData({
        title: coupon.title || coupon.code || "",
        description: coupon.description || "",
        discount_value: coupon.discount_value || "",
        max_discount_amount:
          coupon.max_discount_amount || "",
        minimum_order_amount:
          coupon.minimum_order_amount || "",
        usage_limit: coupon.usage_limit || "",
        is_active: coupon.is_active ?? true,
        is_first_order_only:
          coupon.is_first_order_only ?? false,
        valid_until: coupon.valid_until
          ? new Date(coupon.valid_until)
              .toISOString()
              .split("T")[0]
          : "",
      });
    }
  }, [coupon]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const payload = {
        title: formData.title,
        description: formData.description,
        discount_value: Number(
          formData.discount_value
        ),
        max_discount_amount: Number(
          formData.max_discount_amount
        ),
        minimum_order_amount: Number(
          formData.minimum_order_amount
        ),
        usage_limit: Number(formData.usage_limit),
        is_active: formData.is_active,
        is_first_order_only:
          formData.is_first_order_only,
        valid_until: formData.valid_until
          ? new Date(
              formData.valid_until
            ).toISOString()
          : null,
      };

      await updateCoupon(coupon.id, payload);

      onSuccess?.();

      closeModal();
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to update coupon"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[500px] max-h-[85vh] overflow-y-auto rounded-[22px] bg-white px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.30)]">

        <button
          onClick={closeModal}
          className="absolute right-5 top-5 text-[#6b7280] transition hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="mb-4 text-[18px] font-bold text-[#111827]">
          Edit coupon
        </h2>

        <div>
          <label className="mb-1.5 block text-[14px] font-semibold text-[#111827]">
            Coupon code
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="h-[46px] w-full rounded-[14px] border-2 border-[#2563eb] bg-[#f8fafc] px-4 text-[16px] text-[#111827] outline-none shadow-sm"
          />
        </div>

        <div className="mt-4">
          <label className="mb-1.5 block text-[14px] font-semibold text-[#111827]">
            Description
          </label>

          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="h-[46px] w-full rounded-[14px] border border-[#e5e7eb] bg-[#f9fafb] px-4"
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-[14px] font-semibold text-[#111827]">
              % off
            </label>

            <input
              type="number"
              name="discount_value"
              value={formData.discount_value}
              onChange={handleChange}
              className="h-[46px] w-full rounded-[14px] border border-[#e5e7eb] bg-[#f9fafb] px-4"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[14px] font-semibold text-[#111827]">
              Max discount (₹)
            </label>

            <input
              type="number"
              name="max_discount_amount"
              value={formData.max_discount_amount}
              onChange={handleChange}
              className="h-[46px] w-full rounded-[14px] border border-[#e5e7eb] bg-[#f9fafb] px-4"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-[14px] font-semibold text-[#111827]">
              Min order (₹)
            </label>

            <input
              type="number"
              name="minimum_order_amount"
              value={formData.minimum_order_amount}
              onChange={handleChange}
              className="h-[46px] w-full rounded-[14px] border border-[#e5e7eb] bg-[#f9fafb] px-4"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[14px] font-semibold text-[#111827]">
              Usage limit
            </label>

            <input
              type="number"
              name="usage_limit"
              value={formData.usage_limit}
              onChange={handleChange}
              className="h-[46px] w-full rounded-[14px] border border-[#e5e7eb] bg-[#f9fafb] px-4"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-1.5 block text-[14px] font-semibold text-[#111827]">
            Expiry
          </label>

          <input
            type="date"
            name="valid_until"
            value={formData.valid_until}
            onChange={handleChange}
            className="h-[46px] w-full rounded-[14px] border border-[#e5e7eb] bg-[#f9fafb] px-4"
          />
        </div>

        <div className="mt-4 flex items-center justify-between rounded-[14px] bg-[#f8fafc] px-4 py-4">
          <span className="text-[15px] font-medium text-[#111827]">
            Active
          </span>

          <button
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                is_active: !prev.is_active,
              }))
            }
            className={`flex h-[28px] w-[52px] items-center rounded-full px-1 transition-all duration-300 ${
              formData.is_active
                ? "bg-[#2563eb]"
                : "bg-[#d1d5db]"
            }`}
          >
            <div
              className={`h-[20px] w-[20px] rounded-full bg-white shadow-sm transition-all duration-300 ${
                formData.is_active
                  ? "ml-auto"
                  : "ml-0"
              }`}
            />
          </button>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="h-[44px] rounded-[14px] border border-[#e5e7eb] bg-white px-6 text-[15px] font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="h-[44px] rounded-[14px] bg-[#22c55e] px-6 text-[15px] font-semibold text-white"
          >
            {loading ? "Updating..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}