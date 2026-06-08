"use client";

import Inventory from "@/components/inventory/InventoryOverview";
import useInventory from "@/hooks/inventory/useInventory";

export default function InventoryPage() {
  const {
    summary,
    products,
    loading,
  } = useInventory();

  return (
    <Inventory
      summary={summary}
      products={products}
      loading={loading}
    />
  );
}