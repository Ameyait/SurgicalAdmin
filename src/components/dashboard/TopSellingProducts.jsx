"use client";

export default function TopSellingProducts({
  products = [],
}) {
  return (
    <div className="bg-white border border-slate-300 rounded-[20px] p-2 h-[400px] shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-[13px] ml-2 mt-2 font-bold text-[#0F172A]">
            Top selling products
          </h2>

          <p className="text-[12px] ml-3 text-[#64748B]">
            Last 30 days
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {products.map(
          (item, index) => (
            <div
              key={item.product_id}
              className="flex justify-between items-center"
            >
              <div className="flex gap-4">
                <div className="w-[35px] ml-2 h-[35px] rounded-[14px] bg-[#DCE7F9] flex items-center justify-center text-[#2563EB] font-bold">
                  {index + 1}
                </div>

                <div>
                  <h3 className="text-[13px] font-semibold text-[#0F172A]">
                    {item.product_name}
                  </h3>

                  <p className="text-[10px] text-[#64748B]">
                    Product
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[13px] font-semibold text-[#0F172A]">
                  {item.total_sold} sold
                </p>

                <p className="text-[12px] text-[#64748B]">
                  ₹
                  {item.revenue?.toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}