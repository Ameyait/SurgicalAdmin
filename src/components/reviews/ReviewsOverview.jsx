"use client";

import { Star, Flag } from "lucide-react";
import ReviewsCards from "./ReviewsCards";

export default function ReviewsHeaderAndStats({
    dashboard,
    reviews,
    loading,
    status,
    setStatus,
    handleApproveReview,
    handleRejectReview,
    handleFlagReview,
}) {
    const stats = [
        {
            title: "AVERAGE RATING",
            value: `${dashboard?.average_rating ?? 0} ★`,
            icon: <Star size={18} />,
            bg: "bg-[#F5E7C9]",
            iconColor: "text-[#F59E0B]",
        },
        {
            title: "TOTAL REVIEWS",
            value: dashboard?.total_reviews ?? 0,
            icon: <Star size={18} />,
            bg: "bg-[#DCE7F9]",
            iconColor: "text-[#2563EB]",
        },
        {
            title: "PENDING APPROVAL",
            value: dashboard?.pending_reviews ?? 0,
            icon: <Star size={18} />,
            bg: "bg-[#F5E7C9]",
            iconColor: "text-[#F59E0B]",
        },
        {
            title: "FLAGGED",
            value: dashboard?.flagged_reviews ?? 0,
            icon: <Flag size={18} />,
            bg: "bg-[#FBE4E4]",
            iconColor: "text-[#EF4444]",
        },
    ];

    return (
        <div className="p-4">
            <div className="mb-8">
                <h1 className="text-[20px] font-bold text-[#0F172A]">
                    Reviews
                </h1>

                <p className="mt-1 text-[13px] text-[#64748B]">
                    Moderate customer feedback
                </p>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-5">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="h-[80px] bg-white rounded-2xl border border-[#E2E8F0] px-4 flex items-center justify-between"
                    >
                        <div>
                            <p className="text-[12px] font-semibold text-[#64748B] uppercase">
                                {item.title}
                            </p>

                            <h2 className="mt-1 text-[20px] font-bold text-[#0F172A]">
                                {item.value}
                            </h2>
                        </div>

                        <div
                            className={`w-[35px] h-[35px] rounded-xl flex items-center justify-center ${item.bg}`}
                        >
                            <span className={item.iconColor}>
                                {item.icon}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mb-5">
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="h-[40px] px-4 rounded-xl border border-[#E2E8F0] bg-white text-[13px] text-[#475569] outline-none"
                >
                    <option value="">All Reviews</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            <ReviewsCards
                reviews={reviews}
                loading={loading}
                handleApproveReview={handleApproveReview}
                handleRejectReview={handleRejectReview}
                handleFlagReview={handleFlagReview}
            />
        </div>
    );
}