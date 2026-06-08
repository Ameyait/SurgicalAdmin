"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function OrdersPieChart({
  data = [],
}) {
  const colors = [
    "#2563EB",
    "#22C55E",
    "#F59E0B",
    "#7C3AED",
    "#EF4444",
    "#0EA5E9",
  ];

  const chartData = data.map(
    (item, index) => ({
      name: item.category_name,
      value: item.percentage,
      color:
        colors[index % colors.length],
    })
  );

  return (
    <div className="bg-white border border-slate-300 rounded-[28px] p-4 h-[430px] shadow-sm">
      <div>
        <h2 className="text-[13px] font-bold text-[#0F172A]">
          Orders by category
        </h2>

        <p className="text-[10px] text-[#64748B]">
          Share of orders this month
        </p>
      </div>

      <div className="h-[200px] mt-4">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={50}
              outerRadius={80}
              dataKey="value"
              paddingAngle={2}
            >
              {chartData.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                  />
                )
              )}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-y-4 mt-4">
        {chartData.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor:
                    item.color,
                }}
              />

              <span className="text-[12px] text-[#334155]">
                {item.name}
              </span>
            </div>

            <span className="text-[10px] mr-3 text-[#64748B]">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}