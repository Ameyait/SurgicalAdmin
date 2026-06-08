"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function RevenueChart({
  data = [],
}) {
  const chartData = data.map(
    (item) => ({
      day: new Date(
        item.date
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      revenue: item.revenue,
    })
  );

  return (
    <div className="bg-white border border-slate-300 rounded-[20px] p-2 h-[430px] shadow-sm">
      <div className="flex items-start justify-between mt-2 ml-2 mb-5">
        <div>
          <h2 className="text-[15px] font-bold text-[#0F172A]">
            Revenue trend
          </h2>

          <p className="text-[12px] text-[#64748B]">
            Last 14 days
          </p>
        </div>

        <span className="text-[12px] text-[#64748B]">
          in ₹
        </span>
      </div>

      <ResponsiveContainer
        width="100%"
        height="85%"
      >
        <AreaChart data={chartData}>
          <defs>
            <linearGradient
              id="revenueGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#2563EB"
                stopOpacity={0.35}
              />

              <stop
                offset="100%"
                stopColor="#2563EB"
                stopOpacity={0.02}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#2563EB"
            strokeWidth={4}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}