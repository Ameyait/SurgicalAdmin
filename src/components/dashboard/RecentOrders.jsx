"use client";

export default function RecentOrders({
  orders = [],
}) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-[#DCFCE7] text-[#22C55E]";

      case "shipped":
      case "out for delivery":
        return "bg-[#DBEAFE] text-[#2563EB]";

      case "pending":
      case "packed":
        return "bg-[#FEF3C7] text-[#F59E0B]";

      default:
        return "bg-[#E2E8F0] text-[#64748B]";
    }
  };

  return (
    <div className="bg-white border border-slate-300 rounded-[24px] p-5 h-full shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[15px] font-bold text-[#0F172A]">
          Recent orders
        </h2>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-[#E2E8F0]">
            <th className="text-left text-[#64748B] text-[12px] pb-4">
              ORDER
            </th>

            <th className="text-left text-[#64748B] text-[12px] pb-4">
              CUSTOMER
            </th>

            <th className="text-left text-[#64748B] text-[12px] pb-4">
              AMOUNT
            </th>

            <th className="text-left text-[#64748B] text-[12px] pb-4">
              STATUS
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((item, index) => (
            <tr
              key={index}
              className="border-b border-[#E2E8F0] last:border-none"
            >
              <td className="py-2 font-semibold text-[12px] text-[#2563EB]">
                {item.order_number}
              </td>

              <td className="py-2 text-[12px] text-[#0F172A]">
                {item.customer_name}
              </td>

              <td className="py-2 font-semibold text-[12px] text-[#0F172A]">
                ₹
                {item.amount?.toLocaleString(
                  "en-IN"
                )}
              </td>

              <td className="py-2">
                <span
                  className={`px-4 py-2 rounded-full text-[11px] font-medium ${getStatusColor(
                    item.status
                  )}`}
                >
                  ● {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}