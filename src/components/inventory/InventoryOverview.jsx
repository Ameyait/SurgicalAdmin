"use client";

import {
  Package,
  TriangleAlert,
  PackageX,
  RotateCcw,
} from "lucide-react";

export default function InventoryOverview({
  summary,
  products,
  loading,
}) {
  const stats = [
    {
      title: "UNITS IN STOCK",
      value: summary?.units_in_stock ?? 0,
      icon: <Package size={17} />,
      bg: "bg-[#DCE7F9]",
      iconColor: "text-[#2563EB]",
    },
    {
      title: "LOW STOCK",
      value: summary?.low_stock ?? 0,
      icon: <TriangleAlert size={17} />,
      bg: "bg-[#F5E7C9]",
      iconColor: "text-[#F59E0B]",
    },
    {
      title: "OUT OF STOCK",
      value: summary?.out_of_stock ?? 0,
      icon: <PackageX size={17} />,
      bg: "bg-[#FBE4E4]",
      iconColor: "text-[#EF4444]",
    },
    {
      title: "STOCK MOVEMENTS",
      value: `${summary?.stock_movements_today ?? 0} today`,
      icon: <RotateCcw size={17} />,
      bg: "bg-[#DCFCE7]",
      iconColor: "text-[#22C55E]",
    },
  ];

  return (
    <div className="p-5">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[25px] font-bold text-[#0F172A]">
          Inventory
        </h1>

        <p className="mt-1 text-[14px] text-[#64748B]">
          Live stock levels across the warehouse
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="h-[90px] bg-white rounded-2xl border border-[#E2E8F0] px-5 flex items-center justify-between"
          >
            <div>
              <p className="text-[12px] font-semibold text-[#64748B] uppercase">
                {item.title}
              </p>

              <h2 className="mt-1 text-[20px] font-bold text-[#0F172A]">
                {item.value}
              </h2>
            </div>

            <div
              className={`w-[35px] h-[35px] rounded-xl flex items-center justify-center ${item.bg}`}
            >
              <span className={item.iconColor}>
                {item.icon}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
        <div className="grid grid-cols-5 px-3 py-3 border-b border-[#E2E8F0] bg-[#FAFAFA]">
          <div className="text-xs ml-2 font-semibold text-[#64748B]">
            PRODUCT
          </div>

          <div className="text-xs ml-8 font-semibold text-[#64748B]">
            SKU
          </div>

          <div className="text-xs mr-10 font-semibold text-[#64748B]">
            WAREHOUSE QTY
          </div>

          <div className="text-xs font-semibold text-[#64748B]">
            STATUS
          </div>

          <div className="text-xs font-semibold text-[#64748B]">
            STOCK BAR
          </div>
        </div>

        {loading ? (
          <div className="p-6 text-center">
            Loading...
          </div>
        ) : (
          products.map((item) => (
            <div
              key={item.product_id}
              className="grid grid-cols-5 px-4 py-4 border-b border-[#E2E8F0] items-center"
            >
              <div className="text-xs font-semibold text-[#0F172A]">
                {item.product_name}
              </div>

              <div className="text-xs font-medium ml-7 text-[#0F172A]">
                {item.sku}
              </div>

              <div className="text-xs font-semibold ml-3 text-[#0F172A]">
                {item.stock_qty}
              </div>

              <div
                className={`text-xs font-medium ${
                  item.status === "out_of_stock"
                    ? "text-red-500"
                    : item.status === "low"
                    ? "text-[#22C55E]"
                    : "text-[#22C55E]"
                }`}
              >
                {item.status}
              </div>

              <div>
                <div className="w-full h-[6px] bg-[#EEF2F7] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      item.status === "out_of_stock"
                        ? "bg-red-500"
                        : "bg-[#22C55E]"
                    }`}
                    style={{
                      width: `${Math.max(
                        0,
                        item.stock_percentage
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}