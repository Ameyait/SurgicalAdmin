"use client";

import { useEffect, useState } from "react";
import {
  getDeliverySettings,
  updateDeliverySettings,
} from "@/services/setting.service";

export default function useSettings() {
  const [settings, setSettings] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const fetchSettings = async () => {
    try {
      setLoading(true);

      const response =
        await getDeliverySettings();

      setSettings(response?.data || null);
    } catch (error) {
      console.error(
        "Failed to fetch delivery settings",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSettings =
    async (payload) => {
      try {
        setLoading(true);

        const response =
          await updateDeliverySettings(
            payload
          );

        await fetchSettings();

        return response;
      } catch (error) {
        console.error(
          "Failed to update settings",
          error
        );

        throw error;
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    fetchSettings,
    handleUpdateSettings,
  };
}