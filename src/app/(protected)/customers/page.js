"use client";

import { useState } from "react";

import Customers from "../../../components/customers/Allcustomers";
import CustomersTable from "../../../components/customers/CustomerTable";
import CustomerDetailsDrawer from "../../../components/customers/CustomerDetails";

import useCustomers from "@/hooks/customers/useCustomers";

export default function CustomersPage() {
  const [search, setSearch] = useState("");

  const [page] = useState(1);
  const [pageSize] = useState(20);

  const {
    customers,
    summary,
    loading,

    selectedCustomer,
    fetchCustomerDetails,
    clearSelectedCustomer,
  } = useCustomers(
    page,
    pageSize,
    search
  );

  return (
    <div className="space-y-6">
      <Customers summary={summary} />

      <CustomersTable
        customers={customers}
        search={search}
        setSearch={setSearch}
        loading={loading}
        onCustomerClick={(customer) =>
          fetchCustomerDetails(
            customer.id
          )
        }
      />

      <CustomerDetailsDrawer
        customer={selectedCustomer}
        onClose={clearSelectedCustomer}
      />
    </div>
  );
}