import api from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiRoutes";

export const getDeliverySettings = async () => {
  const response = await api.get(
    API_ROUTES.SETTINGS.DELIVERY
  );

  return response.data;
};

export const updateDeliverySettings =
  async (payload) => {
    const response = await api.patch(
      API_ROUTES.SETTINGS.DELIVERY,
      payload
    );

    return response.data;
  };