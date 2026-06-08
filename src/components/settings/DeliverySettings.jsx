"use client";

import { useEffect, useState } from "react";

export default function DeliverySettings({
  settings,
  loading,
  handleUpdateSettings,
}) {
  const [deliveryCharge, setDeliveryCharge] =
    useState(79);

  const [codFee, setCodFee] =
    useState(29);

  const [freeShipping, setFreeShipping] =
    useState(true);

  const [isEditing, setIsEditing] =
    useState(false);

  useEffect(() => {
    if (settings) {
      setDeliveryCharge(
        Number(settings.delivery_charge)
      );

      setCodFee(
        Number(settings.cod_charge)
      );

      setFreeShipping(
        Number(
          settings.free_shipping_threshold
        ) > 0
      );
    }
  }, [settings]);

  const handleUpdate = async () => {
    try {
      const payload = {
        delivery_charge:
          deliveryCharge,

        cod_charge: codFee,

        free_shipping_threshold:
          freeShipping ? 999 : 0,
      };

      await handleUpdateSettings(
        payload
      );

      setIsEditing(false);
    } catch (error) {
      console.error(
        "Update failed",
        error
      );
    }
  };

  return (
    <div className="p-4">
      <div className="mb-8">
        <h1 className="text-[25px] font-bold text-[#0F172A]">
          Settings
        </h1>

        <p className="mt-1 text-[14px] text-[#64748B]">
          Manage your delivery options and fees
        </p>
      </div>

      <div className="mb-4">
        <button className="bg-[#2563EB] text-white text-[13px] font-medium px-5 py-2 rounded-xl shadow-sm">
          Delivery
        </button>
      </div>

      <div className="w-full max-w-[500px] bg-white border border-[#E2E8F0] rounded-[18px] p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-[#0F172A] mb-1">
              Default delivery charge
            </label>

            <input
              type="number"
              disabled={!isEditing}
              value={deliveryCharge}
              onChange={(e) =>
                setDeliveryCharge(
                  Number(e.target.value)
                )
              }
              className="w-full h-[38px] px-3 text-[14px] border border-[#CBD5E1] rounded-xl shadow-sm outline-none focus:border-[#2563EB]"
            />

            <p className="mt-1 text-[11px] text-[#64748B]">
              Waived above ₹999
            </p>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#0F172A] mb-1">
              COD handling fee
            </label>

            <input
              type="number"
              disabled={!isEditing}
              value={codFee}
              onChange={(e) =>
                setCodFee(
                  Number(e.target.value)
                )
              }
              className="w-full h-[38px] px-3 text-[14px] border border-[#CBD5E1] rounded-xl shadow-sm outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        <div className="mt-4 bg-[#F8FAFC] rounded-[16px] px-4 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-semibold text-[#0F172A]">
              Free shipping over ₹999
            </h3>

            <p className="text-[11px] text-[#64748B] mt-1">
              Auto-applied at checkout
            </p>
          </div>

          <button
            disabled={!isEditing}
            onClick={() =>
              setFreeShipping(
                !freeShipping
              )
            }
            className={`relative w-[46px] h-[26px] rounded-full transition-all duration-300 ${
              freeShipping
                ? "bg-[#2563EB]"
                : "bg-[#CBD5E1]"
            }`}
          >
            <span
              className={`absolute top-[3px] w-[20px] h-[20px] bg-white rounded-full transition-all duration-300 ${
                freeShipping
                  ? "right-[3px]"
                  : "left-[3px]"
              }`}
            />
          </button>
        </div>

        <div className="mt-4 flex justify-end">
          {!isEditing ? (
            <button
              onClick={() =>
                setIsEditing(true)
              }
              className="bg-[#2563EB] text-white text-[13px] font-medium px-5 py-2 rounded-xl shadow-sm"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-[#22C55E] text-white text-[13px] font-medium px-5 py-2 rounded-xl shadow-sm"
            >
              {loading
                ? "Updating..."
                : "Update"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}