"use client";

import { useEffect, useState } from "react";
import {
  getCustomers,
  getCustomerDetails,
} from "@/services/customer.service";

export default function useCustomers(
  page,
  pageSize,
  search
) {
  const [customers, setCustomers] = useState([]);
  const [summary, setSummary] = useState(null);
  const [pagination, setPagination] = useState(null);

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] =
    useState(false);

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const response = await getCustomers({
        page,
        page_size: pageSize,
        search,
      });

      setCustomers(response?.data?.customers || []);
      setSummary(response?.data?.summary || {});
      setPagination(
        response?.data?.pagination || {}
      );
    } catch (error) {
      console.error(
        "Customers API Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerDetails = async (
    customerId
  ) => {
    try {
      setDetailsLoading(true);

      const response =
        await getCustomerDetails(
          customerId
        );

      setSelectedCustomer(
        response?.data || null
      );
    } catch (error) {
      console.error(
        "Customer Details Error:",
        error
      );
    } finally {
      setDetailsLoading(false);
    }
  };

  const clearSelectedCustomer = () => {
    setSelectedCustomer(null);
  };

  useEffect(() => {
    fetchCustomers();
  }, [page, pageSize, search]);

  return {
    customers,
    summary,
    pagination,
    loading,

    selectedCustomer,
    detailsLoading,
    fetchCustomerDetails,
    clearSelectedCustomer,

    refetch: fetchCustomers,
  };
}