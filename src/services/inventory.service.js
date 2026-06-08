import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiRoutes";

export const getInventory = async () => {
  const response = await axiosInstance.get(
    API_ROUTES.INVENTORY.LIST
  );

  return response.data;
};