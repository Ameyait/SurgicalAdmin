import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiRoutes";

export const loginAdmin = async (payload) => {
  const response = await axiosInstance.post(
    API_ROUTES.AUTH.LOGIN,
    payload
  );

  return response.data;
};