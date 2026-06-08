"use client";

import Allcoupons from "@/components/coupons/Allcoupons";
import useCoupons from "@/hooks/coupons/useCoupons";

export default function CouponsPage() {
  const {
    coupons,
    loading,
    fetchCoupons,
  } = useCoupons();

  return (
    <Allcoupons
      coupons={coupons}
      loading={loading}
      fetchCoupons={fetchCoupons}
    />
  );
}