"use client";
 
import { useState } from "react";
import { X } from "lucide-react";
import { createCoupon } from "@/services/coupon.service";
 
export default function CreateCouponModal(props) {
  const { closeModal, onSuccess } = props;
 
  const [isActive, setIsActive] = useState(true);
 
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    description: "",
    coupon_type: "percentage",
    discount_value: 10,
    minimum_order_amount: 499,
    max_discount_amount: 500,
    usage_limit: 100,
    valid_until: "",
  });
 
  const [loading, setLoading] = useState(false);
 
  const [errors, setErrors] = useState({
    code: "",
    title: "",
    description: "",
    valid_until: "",
  });
 
  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
 
    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };
 
  const handleCreate = async () => {
    const newErrors = {
      code: "",
      title: "",
      description: "",
      valid_until: "",
    };
 
    let hasError = false;
 
    if (!formData.code.trim()) {
      newErrors.code =
        "Please enter coupon code";
      hasError = true;
    }
 
    if (!formData.title.trim()) {
      newErrors.title =
        "Please enter title";
      hasError = true;
    }
 
    if (!formData.description.trim()) {
      newErrors.description =
        "Please enter description";
      hasError = true;
    }
 
    if (!formData.valid_until) {
      newErrors.valid_until =
        "Please select expiry date";
      hasError = true;
    }
 
    setErrors(newErrors);
 
    if (hasError) return;
 
    try {
      setLoading(true);
 
      const payload = {
        code: formData.code,
        title: formData.title,
        description: formData.description,
 
        coupon_type: formData.coupon_type,
 
        discount_value: Number(
          formData.discount_value
        ),
 
        max_discount_amount: Number(
          formData.max_discount_amount
        ),
 
        minimum_order_amount: Number(
          formData.minimum_order_amount
        ),
 
        usage_limit: Number(
          formData.usage_limit
        ),
 
        is_first_order_only: false,
 
        valid_from: new Date().toISOString(),
 
        valid_until: new Date(
          formData.valid_until
        ).toISOString(),
 
        product_ids: [],
        category_ids: [],
      };
 
      await createCoupon(payload);
 
      if (typeof onSuccess === "function") {
        await onSuccess();
      }
 
      if (typeof closeModal === "function") {
        closeModal();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[500px] max-h-[85vh] overflow-y-auto rounded-[22px] bg-white px-5 py-4 shadow-[0_20px_70px_rgba(0,0,0,0.30)]">
 
        <button
          onClick={() => closeModal?.()}
          className="absolute right-5 top-5 text-[#6b7280] transition hover:text-black"
        >
          <X size={22} />
        </button>
 
        <h2 className="mb-4 text-[20px] font-bold text-[#111827]">
          Create coupon
        </h2>
                <div>
          <label className="mb-2 block text-[14px] font-semibold text-[#111827]">
            Coupon code
          </label>
 
          <input
            type="text"
            placeholder="Enter coupon code"
            value={formData.code}
            onChange={(e) =>
              handleChange("code", e.target.value)
            }
            className="h-[46px] w-full rounded-[14px] border-2 border-[#2563eb] bg-[#f8fafc] px-4 text-[15px] outline-none shadow-sm"
          />
 
          {errors.code && (
            <p className="mt-1 text-xs text-red-500">
              {errors.code}
            </p>
          )}
        </div>
 
        <div className="mt-4">
          <label className="mb-2 block text-[14px] font-semibold text-[#111827]">
            Title
          </label>
 
          <input
            type="text"
            placeholder="Enter title"
            value={formData.title}
            onChange={(e) =>
              handleChange("title", e.target.value)
            }
            className="h-[46px] w-full rounded-[14px] border border-[#e5e7eb] bg-[#f9fafb] px-4 text-[15px] outline-none shadow-sm"
          />
 
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">
              {errors.title}
            </p>
          )}
        </div>
 
        <div className="mt-4">
          <label className="mb-2 block text-[14px] font-semibold text-[#111827]">
            Description
          </label>
 
          <textarea
            rows={3}
            placeholder="Enter Coupon description"
            value={formData.description}
            onChange={(e) =>
              handleChange(
                "description",
                e.target.value
              )
            }
            className="w-full h-20 rounded-[14px] border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-[15px] outline-none shadow-sm resize-none"
          />
 
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">
              {errors.description}
            </p>
          )}
        </div>
 
        <div className="mt-4 grid grid-cols-2 gap-4">
 
          <div>
            <label className="mb-2 block text-[14px] font-semibold text-[#111827]">
              Type
            </label>
 
            <select
              value={formData.coupon_type}
              onChange={(e) =>
                handleChange(
                  "coupon_type",
                  e.target.value
                )
              }
              className="h-[46px] w-full rounded-[14px] border border-[#e5e7eb] bg-[#f9fafb] px-4 text-[15px] outline-none shadow-sm"
            >
              <option value="percentage">
                Percentage
              </option>
 
              <option value="flat">
                Flat Discount
              </option>
 
              <option value="free_shipping">
                Free Shipping
              </option>
            </select>
          </div>
 
          <div>
            <label className="mb-2 block text-[14px] font-semibold text-[#111827]">
              % off
            </label>
 
            <input
              type="number"
              value={formData.discount_value}
              onChange={(e) =>
                handleChange(
                  "discount_value",
                  e.target.value
                )
              }
              className="h-[46px] w-full rounded-[14px] border border-[#e5e7eb] bg-[#f9fafb] px-4 text-[15px] outline-none shadow-sm"
            />
          </div>
 
        </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
 
          <div>
            <label className="mb-2 block text-[14px] font-semibold text-[#111827]">
              Min order (₹)
            </label>
 
            <input
              type="number"
              value={formData.minimum_order_amount}
              onChange={(e) =>
                handleChange(
                  "minimum_order_amount",
                  e.target.value
                )
              }
              className="h-[46px] w-full rounded-[14px] border border-[#e5e7eb] bg-[#f9fafb] px-4 text-[15px] outline-none shadow-sm"
            />
          </div>
 
          <div>
            <label className="mb-2 block text-[14px] font-semibold text-[#111827]">
              Max discount (₹)
            </label>
 
            <input
              type="number"
              value={formData.max_discount_amount}
              onChange={(e) =>
                handleChange(
                  "max_discount_amount",
                  e.target.value
                )
              }
              className="h-[46px] w-full rounded-[14px] border border-[#e5e7eb] bg-[#f9fafb] px-4 text-[15px] outline-none shadow-sm"
            />
          </div>
 
        </div>
 
        <div className="mt-4 grid grid-cols-2 gap-4">
 
          <div>
            <label className="mb-2 block text-[14px] font-semibold text-[#111827]">
              Usage limit
            </label>
 
            <input
              type="number"
              value={formData.usage_limit}
              onChange={(e) =>
                handleChange(
                  "usage_limit",
                  e.target.value
                )
              }
              className="h-[46px] w-full rounded-[14px] border border-[#e5e7eb] bg-[#f9fafb] px-4 text-[15px] outline-none shadow-sm"
            />
          </div>
 
          <div>
            <label className="mb-2 block text-[14px] font-semibold text-[#111827]">
              Expiry
            </label>
 
            <input
              type="date"
              value={formData.valid_until}
              onChange={(e) =>
                handleChange(
                  "valid_until",
                  e.target.value
                )
              }
              className="h-[46px] w-full rounded-[14px] border border-[#e5e7eb] bg-[#f9fafb] px-4 text-[15px] outline-none shadow-sm"
            />
 
            {errors.valid_until && (
              <p className="mt-1 text-xs text-red-500">
                {errors.valid_until}
              </p>
            )}
          </div>
 
        </div>
 
        <div className="mt-5 flex justify-end gap-3">
 
          <button
            onClick={() => closeModal?.()}
            className="h-[44px] rounded-[14px] border border-[#e5e7eb] bg-white px-6 text-[15px] font-semibold"
          >
            Cancel
          </button>
 
          <button
            onClick={handleCreate}
            disabled={loading}
            className="h-[44px] rounded-[14px] bg-[#22c55e] px-6 text-[15px] font-semibold text-white"
          >
            {loading ? "Creating..." : "Create"}
          </button>
 
        </div>
 
      </div>
    </div>
  );
}