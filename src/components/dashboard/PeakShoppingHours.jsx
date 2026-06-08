"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function PeakShoppingHours({
  data = [],
}) {
  const chartData = data.map(
    (item) => ({
      hour: item.hour,
      orders: item.orders_count,
    })
  );

  return (
    <div className="bg-white border border-slate-300 rounded-[20px] p-2 h-[400px] shadow-sm">
      <h2 className="text-[14px] ml-3 mt-3 font-bold text-[#0F172A]">
        Peak shopping hours
      </h2>

      <p className="text-[12px] ml-3 text-[#64748B] mt-1">
        Orders by hour (today)
      </p>

      <div className="h-[320px] mt-5">
        <ResponsiveContainer
          width="90%"
          height="90%"
        >
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="hour"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              tick={{ fontSize: 12 }}
            />

            <Tooltip />

            <Bar
              dataKey="orders"
              fill="#2563EB"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}