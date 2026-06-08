"use client";

import { useEffect, useState } from "react";
import { getDashboard } from "@/services/dashboard.service";

export default function useDashboard() {
  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response =
        await getDashboard();

      if (response?.success) {
        setDashboard(response.data);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    dashboard,
    loading,
    error,
    fetchDashboard,
  };
}