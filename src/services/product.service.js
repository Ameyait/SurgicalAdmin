import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiRoutes";

export const getProducts = async ({
  page = 1,
  page_size = 20,
  search = "",
  category_id = "",
}) => {
  try {
    const response = await axiosInstance.get(
      API_ROUTES.PRODUCTS.LIST,
      {
        params: {
          page,
          page_size,
          search: search || undefined,
          category_id: category_id || undefined,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Failed to fetch products",
      }
    );
  }
};

export const createProduct = async (payload) => {
  try {
    const formData = new FormData();

    formData.append("category_id", payload.category_id);
    formData.append("name", payload.name);
    formData.append("sku", payload.sku);
    formData.append("brand", payload.brand || "");
    formData.append("description", payload.description || "");
    formData.append(
      "short_description",
      payload.short_description || ""
    );

    formData.append("mrp", String(payload.mrp));
    formData.append(
      "sale_price",
      String(payload.sale_price)
    );

    formData.append(
      "stock_qty",
      String(payload.stock_qty)
    );

    formData.append(
      "manufacturer",
      payload.manufacturer || ""
    );

    formData.append(
      "hsn_code",
      payload.hsn_code || ""
    );

    formData.append(
      "is_featured",
      String(payload.is_featured)
    );

    formData.append(
      "is_bestseller",
      String(payload.is_bestseller)
    );

    formData.append(
      "is_new_arrival",
      String(payload.is_new_arrival)
    );

    // Image file upload
    if (
      payload.images &&
      payload.images.length > 0
    ) {
      payload.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    const response = await axiosInstance.post(
      API_ROUTES.PRODUCTS.CREATE,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Create Product Error:",
      error?.response?.data
    );

    throw (
      error?.response?.data || {
        message: "Failed to create product",
      }
    );
  }
};
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(
      API_ROUTES.PRODUCTS.DELETE(id)
    );

    return response.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Failed to delete product",
      }
    );
  }
};
export const updateProduct = async (
  productId,
  payload
) => {
  try {
    const formData = new FormData();

    formData.append(
      "category_id",
      payload.category_id
    );

    formData.append("name", payload.name);
    formData.append("sku", payload.sku);
    formData.append("brand", payload.brand || "");

    formData.append(
      "description",
      payload.description || ""
    );

    formData.append(
      "short_description",
      payload.short_description || ""
    );

    formData.append(
      "mrp",
      String(payload.mrp)
    );

    formData.append(
      "sale_price",
      String(payload.sale_price)
    );

    formData.append(
      "stock_qty",
      String(payload.stock_qty)
    );

    formData.append(
      "manufacturer",
      payload.manufacturer || ""
    );

    formData.append(
      "hsn_code",
      payload.hsn_code || ""
    );

    formData.append(
      "is_featured",
      String(payload.is_featured)
    );

    formData.append(
      "is_bestseller",
      String(payload.is_bestseller)
    );

    formData.append(
      "is_new_arrival",
      String(payload.is_new_arrival)
    );

    if (payload.images?.length) {
      payload.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    const response = await axiosInstance.put(
      API_ROUTES.PRODUCTS.UPDATE(productId),
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Failed to update product",
      }
    );
  }
};