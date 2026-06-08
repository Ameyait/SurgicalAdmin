"use client";

import { useState } from "react";
import {
  Search,
  Plus,
} from "lucide-react";

export default function CustomersTable({
  customers = [],
  search,
  setSearch,
  onCustomerClick,
}) {
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-GB"
    );
  };

  const getInitials = (name) => {
    if (!name) return "?";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="bg-white rounded-[24px] ml-2 mr-2 border border-slate-200 overflow-hidden">
      {/* FILTERS */}
      <div className="p-3 flex gap-4 border-b border-slate-200  ">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 "
            size={18}
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search customers"
            className="w-[550px] h-11 rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none shadow-sm"
          />
        </div>
      </div>

      {/* TABLE */}
      <table className="w-full">
        <thead>
          <tr className="h-10 border-b border-slate-200 bg-slate-50 text-slate-500 uppercase text-xs">
            <th className="text-left px-6">
              Customer
            </th>
            <th className="text-left">City</th>
            <th className="text-left">Orders</th>
            <th className="text-left">Spent</th>
            <th className="text-left">Status</th>
            <th className="text-left">
              Last Order
            </th>
          </tr>
        </thead>

        <tbody>
          {customers?.map((customer) => (
            <tr
              key={customer.id}
              onClick={() =>
                onCustomerClick(customer)
              }
              className="h-14 border-b border-slate-200 cursor-pointer"
            >
              <td className="px-6">
                <div className="flex items-center gap-4">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold">
                    {getInitials(customer.name)}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">
                      {customer.name}
                    </h3>

                    <p className="text-xs text-slate-500">
                      {customer.email}
                    </p>
                  </div>
                </div>
              </td>

              <td className="text-sm">
                {customer.city || "-"}
              </td>

              <td className="text-sm">
                {customer.orders}
              </td>

              <td className="text-sm font-semibold">
                ₹
                {Number(
                  customer.spent || 0
                ).toLocaleString()}
              </td>

              <td>
                {customer.status === "vip" ? (
                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-500 text-xs">
                    ● vip
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs">
                    ● {customer.status}
                  </span>
                )}
              </td>

              <td className="text-sm">
                {formatDate(
                  customer.last_order
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* FLOAT BUTTON */}
      <button className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl hover:bg-emerald-600">
        <Plus size={22} />
      </button>
    </div>
  );
}