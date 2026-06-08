"use client";

import { useEffect, useState } from "react";

import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "@/services/product.service";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts({
        page: 1,
        page_size: 20,
        category_id:
          "9ec521df-04ee-4cdc-b474-557a6afbad72",
      });

      setProducts(response?.data || []);
    } catch (error) {
      console.error(
        "Fetch Products Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (
    productId
  ) => {
    try {
      setLoading(true);

      const response =
        await deleteProduct(productId);

      await fetchProducts();

      return response;
    } catch (error) {
      console.error(
        "Delete Product Error:",
        error
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (
    productId,
    payload
  ) => {
    try {
      setLoading(true);

      const response =
        await updateProduct(
          productId,
          payload
        );

      await fetchProducts();

      return response;
    } catch (error) {
      console.error(
        "Update Product Error:",
        error
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    fetchProducts,
    handleDeleteProduct,
    handleUpdateProduct,
  };
}