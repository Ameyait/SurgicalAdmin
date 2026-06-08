"use client";

export default function AbandonedCarts({
  carts = [],
}) {
  return (
    <div className="bg-white border border-slate-300 rounded-[24px] p-3 h-full shadow-md">
      <h2 className="text-[14px] mt-3 font-bold text-[#0F172A]">
        Abandoned carts
      </h2>

      <p className="text-[11px] text-[#64748B] mt-1 mb-6">
        Recover lost revenue
      </p>

      <div className="space-y-3">
        {carts.map((item, index) => (
          <div
            key={index}
            className="bg-[#F8FAFC] rounded-[18px] p-2 flex items-center justify-between"
          >
            <div>
              <h3 className="text-[12px] font-semibold text-[#0F172A]">
                {item.customer_name}
              </h3>

              <p className="text-[11px] text-[#64748B]">
                {item.items_count} items · ₹
                {item.cart_value?.toLocaleString(
                  "en-IN"
                )}
              </p>
            </div>

            <button className="h-[32px] px-4 rounded-xl border border-[#E2E8F0] bg-white text-[12px] font-semibold text-[#0F172A] shadow-sm">
              Remind
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}