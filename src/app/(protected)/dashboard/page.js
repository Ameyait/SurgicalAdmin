"use client";

import DashboardStats from "@/components/dashboard/DashboardStats";
import useDashboard from "@/hooks/dashboard/usedashboard";

export default function DashboardPage() {
  const {
    dashboard,
    loading,
  } = useDashboard();

  return (
    <main className="p-5">
      <h1 className="text-[20px] font-bold">
        Welcome back, Aarav 👋
      </h1>

      <p className="text-[13px] text-gray-500 mt-1">
        Here's how Surgical World is performing today.
      </p>

      <DashboardStats
        dashboard={dashboard}
        loading={loading}
      />
    </main>
  );
}