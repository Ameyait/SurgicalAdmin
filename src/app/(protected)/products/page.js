"use client";

import { useState } from "react";

import Products from "@/components/products/AllProducts";

import useProducts from "@/hooks/products/useProducts";
import useCategories from "@/hooks/categories/useCategories";

export default function ProductsPage() {
    const {
        products,
        loading,
        fetchProducts,
        handleDeleteProduct,
        handleUpdateProduct,
    } = useProducts();

    const { categoriesData } =
        useCategories();

    const [openModal, setOpenModal] =
        useState(false);

    const [openEditModal, setOpenEditModal] =
        useState(false);

    const [openDeleteModal, setOpenDeleteModal] =
        useState(false);

    const [selectedProduct, setSelectedProduct] =
        useState(null);

    return (
        <Products
            products={products}
            categories={categoriesData}
            loading={loading}
            fetchProducts={fetchProducts}
            handleDeleteProduct={handleDeleteProduct}
            handleUpdateProduct={handleUpdateProduct}
            openModal={openModal}
            setOpenModal={setOpenModal}
            openEditModal={openEditModal}
            setOpenEditModal={setOpenEditModal}
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
        />
    );
}