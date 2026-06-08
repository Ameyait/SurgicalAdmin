import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiRoutes";

export const getDashboard = async () => {
  const response = await axiosInstance.get(
    API_ROUTES.DASHBOARD.GET
  );

  return response.data;
};