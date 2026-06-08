"use client";

import {
  IndianRupee,
  ShoppingCart,
  Truck,
  Users,
  TrendingUp,
  RefreshCcw,
} from "lucide-react";

import RevenueChart from "./RevenueChart";
import OrdersPieChart from "./OrdersPieChart";
import PeakShoppingHours from "./PeakShoppingHours";
import TopSellingProducts from "./TopSellingProducts";
import RecentOrders from "./RecentOrders";
import AbandonedCarts from "./AbandonedCarts";

export default function DashboardStats({
  dashboard,
  loading,
}) {
  const summary =
    dashboard?.summary || {};

  const stats = [
    {
      title: "TOTAL REVENUE",
      value: `₹${(
        summary.total_revenue || 0
      ).toLocaleString("en-IN")}`,
      change: "+0%",
      icon: <IndianRupee size={15} />,
      iconBg: "bg-[#DCE7F9]",
      iconColor: "text-[#2563EB]",
      positive: true,
    },
    {
      title: "ORDERS TODAY",
      value: summary.orders_today || 0,
      change: "+0%",
      icon: <ShoppingCart size={15} />,
      iconBg: "bg-[#DCFCE7]",
      iconColor: "text-[#22C55E]",
      positive: true,
    },
    {
      title: "PENDING DELIVERIES",
      value:
        summary.pending_deliveries || 0,
      change: "+0%",
      icon: <Truck size={15} />,
      iconBg: "bg-[#FEF3C7]",
      iconColor: "text-[#F59E0B]",
      positive: true,
    },
    {
      title: "TOTAL CUSTOMERS",
      value:
        summary.total_customers || 0,
      change: "+0%",
      icon: <Users size={15} />,
      iconBg: "bg-[#DCE7F9]",
      iconColor: "text-[#2563EB]",
      positive: true,
    },
    {
      title: "CONVERSION RATE",
      value: `${
        summary.conversion_rate || 0
      }%`,
      change: "+0%",
      icon: <TrendingUp size={15} />,
      iconBg: "bg-[#DCFCE7]",
      iconColor: "text-[#22C55E]",
      positive: true,
    },
    {
      title: "RETURNING CUSTOMERS",
      value: `${
        summary.returning_customers_percentage ||
        0
      }%`,
      change: "+0%",
      icon: <RefreshCcw size={15} />,
      iconBg: "bg-[#DCE7F9]",
      iconColor: "text-[#2563EB]",
      positive: true,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-6 gap-2 mt-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-[#E2E8F0] rounded-xl p-3 h-[180px] shadow-md"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xs font-semibold text-[#64748B] leading-8 max-w-[120px]">
                {item.title}
              </h3>

              <div
                className={`w-[40px] h-[40px] rounded-xl flex items-center justify-center ${item.iconBg}`}
              >
                <span className={item.iconColor}>
                  {item.icon}
                </span>
              </div>
            </div>

            <h2 className="mt-2 text-lg font-bold text-[#0F172A] leading-none">
              {item.value}
            </h2>

            <div className="mt-3 flex items-center gap-2">
              <span
                className={`text-sm ${
                  item.positive
                    ? "text-[#22C55E]"
                    : "text-[#EF4444]"
                }`}
              >
                {item.positive ? "↑" : "↓"}
              </span>

              <span
                className={`text-sm font-semibold ${
                  item.positive
                    ? "text-[#22C55E]"
                    : "text-[#EF4444]"
                }`}
              >
                {item.change}
              </span>

              <span className="text-sm text-[#64748B]">
                vs yesterday
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-6 mt-8">
        <RevenueChart
          data={
            dashboard?.revenue_trend || []
          }
        />

        <OrdersPieChart
          data={
            dashboard?.orders_by_category ||
            []
          }
        />
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-6 mt-6">
        <PeakShoppingHours
          data={
            dashboard?.peak_shopping_hours ||
            []
          }
        />

        <TopSellingProducts
          products={
            dashboard?.top_selling_products ||
            []
          }
        />
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-6 mt-6">
        <RecentOrders
          orders={
            dashboard?.recent_orders || []
          }
        />

        <AbandonedCarts
          carts={
            dashboard?.abandoned_carts || []
          }
        />
      </div>
    </>
  );
}