"use client";

import Reviews from "@/components/reviews/ReviewsOverview";
import useReviews from "@/hooks/reviews/useReviews";

export default function ReviewsPage() {
  const {
    dashboard,
    reviews,
    loading,
    message,

    status,
    setStatus,

    page,
    setPage,

    handleApproveReview,
    handleRejectReview,
    handleFlagReview,
  } = useReviews();

  return (
    <Reviews
      dashboard={dashboard}
      reviews={reviews}
      loading={loading}
      message={message}
      status={status}
      setStatus={setStatus}
      page={page}
      setPage={setPage}
      handleApproveReview={
        handleApproveReview
      }
      handleRejectReview={
        handleRejectReview
      }
      handleFlagReview={
        handleFlagReview
      }
    />
  );
}