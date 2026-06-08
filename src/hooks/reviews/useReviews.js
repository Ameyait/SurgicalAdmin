"use client";

import { useEffect, useState } from "react";

import {
  getReviewsDashboard,
  getReviews,
  approveReview,
  rejectReview,
  flagReview,
} from "@/services/review.service";

export default function useReviews() {
  const [dashboard, setDashboard] = useState(null);

  const [reviews, setReviews] = useState([]);

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const [pageSize] = useState(20);

  const [pagination, setPagination] = useState(null);

  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");

  const fetchDashboard = async () => {
    try {
      const response =
        await getReviewsDashboard();

      setDashboard(response?.data || null);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const response = await getReviews({
        status,
        page,
        pageSize,
      });

      setReviews(response?.data || []);

      setPagination(
        response?.pagination || null
      );
    } catch (error) {
      console.error(
        "Reviews fetch failed",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApproveReview = async (id) => {
    try {
      const response =
        await approveReview(id);

      await fetchReviews();
      await fetchDashboard();

      setMessage(response?.message || "");

      return response?.message;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to approve review";

      setMessage(errorMessage);

      throw errorMessage;
    }
  };

  const handleRejectReview = async (id) => {
    try {
      const response =
        await rejectReview(id);

      await fetchReviews();
      await fetchDashboard();

      setMessage(response?.message || "");

      return response?.message;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to reject review";

      setMessage(errorMessage);

      throw errorMessage;
    }
  };

  const handleFlagReview = async (id) => {
    try {
      const response =
        await flagReview(id);

      await fetchReviews();
      await fetchDashboard();

      setMessage(response?.message || "");

      return response?.message;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to flag review";

      setMessage(errorMessage);

      throw errorMessage;
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [status, page]);

  return {
    dashboard,
    reviews,
    pagination,
    loading,
    message,

    status,
    setStatus,

    page,
    setPage,

    refreshReviews: fetchReviews,

    handleApproveReview,
    handleRejectReview,
    handleFlagReview,
  };
}