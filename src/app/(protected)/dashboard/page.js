"use client";

import { useEffect, useState } from "react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import useDashboard from "@/hooks/dashboard/usedashboard";
import { getStorage } from "@/utils/storage";

export default function DashboardPage() {
  const { dashboard, loading } = useDashboard();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const adminUser = getStorage("adminUser");
    setUser(adminUser);
  }, []);

  return (
    <main className="p-5">
      <h1 className="text-[20px] font-bold">
        Welcome back, {user?.full_name || user?.name || "Admin"} 👋
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