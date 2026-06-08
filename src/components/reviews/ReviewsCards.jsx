"use client";

import { useEffect, useState } from "react";
import {
  Check,
  X,
  Flag,
  Star,
} from "lucide-react";

export default function ReviewsData({
  reviews = [],
  loading,
  handleApproveReview,
  handleRejectReview,
  handleFlagReview,
}) {
  const [reviewsData, setReviewsData] =
    useState([]);

  useEffect(() => {
    setReviewsData(reviews);
  }, [reviews]);

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {reviewsData.map((item) => (
        <div
          key={item.id}
          className="bg-white border border-[#E2E8F0] rounded-[30px] p-5"
        >
          <div className="flex justify-between">
            <div>
              <h3 className="text-[15px] font-semibold text-[#1E293B]">
                {item.product_name}
              </h3>

              <p className="mt-1 text-[12px] text-[#64748B]">
                by {item.user_name} ·{" "}
                {new Date(
                  item.created_at
                ).toLocaleDateString()}
              </p>
            </div>

            <span
              className={`px-5 h-[28px] rounded-full text-[12px] font-semibold flex items-center gap-2 ${
                item.status === "approved"
                  ? "bg-[#DCFCE7] text-[#22C55E]"
                  : item.status === "rejected"
                  ? "bg-[#FEE2E2] text-[#EF4444]"
                  : "bg-[#FEF3C7] text-[#F59E0B]"
              }`}
            >
              ● {item.status}
            </span>
          </div>

          <div className="flex items-center gap-1 mt-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={17}
                  fill={
                    i < item.rating
                      ? "#F59E0B"
                      : "none"
                  }
                  color={
                    i < item.rating
                      ? "#F59E0B"
                      : "#CBD5E1"
                  }
                />
              ))}
            </div>

            <span className="ml-2 px-2 py-1 rounded-full bg-[#F1F5F9] text-[10px] font-semibold text-[#64748B]">
              {item.verified_purchase
                ? "VERIFIED"
                : "UNVERIFIED"}
            </span>
          </div>

          <p className="mt-2 text-[12px] text-[#64748B] leading-8">
            {item.review_text}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={async () => {
                try {
                  await handleApproveReview(
                    item.id
                  );
                } catch (error) {
                  console.error(error);
                }
              }}
              className={`h-[30px] px-4 rounded-[14px] border border-[#E2E8F0] shadow-sm flex items-center gap-3 text-[12px] font-medium ${
                item.status === "approved"
                  ? "bg-[#DCFCE7] text-[#22C55E]"
                  : ""
              }`}
            >
              <Check size={15} />
              {item.status === "approved"
                ? "Approved"
                : "Approve"}
            </button>

            <button
              onClick={async () => {
                try {
                  await handleRejectReview(
                    item.id
                  );
                } catch (error) {
                  console.error(error);
                }
              }}
              className={`h-[30px] px-4 rounded-[14px] border border-[#E2E8F0] shadow-sm flex items-center gap-3 text-[12px] font-medium ${
                item.status === "rejected"
                  ? "bg-[#FEE2E2] text-[#EF4444]"
                  : "text-red-500"
              }`}
            >
              <X size={15} />
              {item.status === "rejected"
                ? "Rejected"
                : "Reject"}
            </button>

            <button
              onClick={async () => {
                try {
                  await handleFlagReview(
                    item.id
                  );
                } catch (error) {
                  console.error(error);
                }
              }}
              className={`flex items-center gap-3 text-[12px] font-medium ${
                item.flagged
                  ? "text-[#EF4444]"
                  : "text-[#1E293B]"
              }`}
            >
              <Flag size={15} />
              Flag
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}