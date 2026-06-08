import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiRoutes";

export const getCustomers = async ({
  page = 1,
  page_size = 20,
  search = "",
}) => {
  const response = await axiosInstance.get(
    API_ROUTES.CUSTOMERS.LIST,
    {
      params: {
        page,
        page_size,
        search,
      },
    }
  );

  return response.data;
};

export const getCustomerDetails = async (
  customerId
) => {
  try {
    const response = await axiosInstance.get(
      API_ROUTES.CUSTOMERS.DETAILS(
        customerId
      )
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};