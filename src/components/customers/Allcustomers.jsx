"use client";
 
import {
  Users,
  Crown,
  TrendingUp,
  ArrowUpRight,
  Download,
} from "lucide-react";
 
export default function CustomerStats({
  summary,
}) {
  return (
    <div className="mb-5 mt-4">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[23px] font-bold text-slate-900 ml-4">
            Customers
          </h1>
 
          <p className="mt-1 text-[12px] text-slate-500 ml-4">
            {summary?.total_customers || 0} customers {" "}
          </p>
        </div>
      </div>
 
      <div className="grid grid-cols-4 gap-4 ml-2 mr-2">
        <div className="bg-white border border-slate-200 rounded-2xl h-[90px] shadow-sm px-6 py-5 flex justify-between">
          <div>
            <p className="text-[12px] font-semibold uppercase text-slate-500">
              Total Customers
            </p>
 
            <h2 className="text-[20px] font-bold text-slate-900 mt-2">
              {summary?.total_customers || 0}
            </h2>
          </div>
 
          <div className="h-9 w-9 rounded-2xl bg-blue-100 flex items-center justify-center">
            <Users size={15} className="text-blue-600" />
          </div>
        </div>
 
        <div className="bg-white border border-slate-200 rounded-2xl h-[90px] shadow-sm px-6 py-5 flex justify-between">
          <div>
            <p className="text-[12px] font-semibold uppercase text-slate-500">
              VIP Customers
            </p>
 
            <h2 className="text-[20px] font-bold text-slate-900 mt-2">
              {summary?.vip_customers || 0}
            </h2>
          </div>
 
          <div className="h-9 w-9 rounded-2xl bg-orange-100 flex items-center justify-center">
            <Crown size={15} className="text-orange-500" />
          </div>
        </div>
 
        <div className="bg-white border border-slate-200 rounded-2xl h-[90px] shadow-sm px-6 py-5 flex justify-between">
          <div>
            <p className="text-[12px] font-semibold uppercase text-slate-500">
              Avg Order Value
            </p>
 
            <h2 className="text-[20px] font-bold text-slate-900 mt-2">
              ₹{summary?.avg_order_value?.toLocaleString() || 0}
            </h2>
          </div>
 
          <div className="h-9 w-9 rounded-2xl bg-green-100 flex items-center justify-center">
            <TrendingUp size={15} className="text-green-500" />
          </div>
        </div>
 
        <div className="bg-white border border-slate-200 rounded-2xl h-[90px] shadow-sm px-6 py-5 flex justify-between">
          <div>
            <p className="text-[12px] font-semibold uppercase text-slate-500">
              Repeat Rate
            </p>
 
            <h2 className="text-[20px] font-bold text-slate-900 mt-2">
              {summary?.repeat_rate || 0}%
            </h2>
          </div>
 
          <div className="h-9 w-9 rounded-2xl bg-blue-100 flex items-center justify-center">
            <ArrowUpRight
              size={15}
              className="text-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}