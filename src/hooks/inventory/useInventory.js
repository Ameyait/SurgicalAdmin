"use client";

import { useEffect, useState } from "react";
import { getInventory } from "@/services/inventory.service";

export default function useInventory() {
  const [summary, setSummary] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    try {
      setLoading(true);

      const response = await getInventory();

      setSummary(response?.data?.summary || {});
      setProducts(response?.data?.products || []);
    } catch (error) {
      console.error(
        "Inventory fetch error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return {
    summary,
    products,
    loading,
    refetchInventory: fetchInventory,
  };
}