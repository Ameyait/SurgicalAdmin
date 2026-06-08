"use client";
import { useState } from "react";

import {
    Search,
    Upload,
    Download,
    Plus,
    Eye,
    Pencil,
    Copy,
    Trash2,
} from "lucide-react";

import AddProductModal from "./AddProducts";
import EditProductModal from "./EditProducts";
import DeleteProductModal from "./DeleteProducts";

export default function ProductsPage({
    products = [],
    loading = false,
    fetchProducts,
    handleDeleteProduct,
    handleUpdateProduct,

    openModal,
    setOpenModal,

    openEditModal,
    setOpenEditModal,

    openDeleteModal,
    setOpenDeleteModal,

    selectedProduct,
    setSelectedProduct,
}) {
    const [view, setView] = useState("grid");

    return (
        <div className="p-4 bg-[#f8fafc] min-h-screen">
            {/* HEADER */}
            <div className="flex items-start justify-between mb-5">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Products
                    </h1>

                    <p className="text-slate-500 text-sm mt-1">
                        {products.length} products in catalog
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-2 py-2 bg-white border rounded-xl shadow-sm hover:bg-gray-50">
                        <Upload size={15} />
                        <span className="font-medium text-xs">
                            Import CSV
                        </span>
                    </button>

                    <button className="flex items-center gap-2 px-2 py-2 bg-white border rounded-xl shadow-sm hover:bg-gray-50">
                        <Download size={15} />
                        <span className="font-medium text-xs">
                            Export
                        </span>
                    </button>

                    <button
                        onClick={() => setOpenModal(true)}
                        className="flex items-center gap-1 px-4 py-2 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-600"
                    >
                        <Plus size={15} />
                        <span className="font-semibold text-xs">
                            Add Product
                        </span>
                    </button>
                </div>
            </div>

            {/* SEARCH + TOGGLE */}
            <div className="bg-white border rounded-2xl p-3 mb-5">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1 bg-[#f8fafc] rounded-lg px-3 py-2 max-w-[650px]">
                        <Search className="text-slate-400" size={17} />

                        <input
                            type="text"
                            placeholder="Search by name, brand, SKU"
                            className="w-full bg-transparent outline-none text-[13px] placeholder:text-slate-400"
                        />
                    </div>

                    <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1">
                        <button
                            onClick={() => setView("grid")}
                            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${view === "grid"
                                ? "bg-white border border-black text-black"
                                : "text-slate-500"
                                }`}
                        >
                            Grid
                        </button>

                        <button
                            onClick={() => setView("table")}
                            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${view === "table"
                                ? "bg-white border border-black text-black"
                                : "text-slate-500"
                                }`}
                        >
                            Table
                        </button>
                    </div>
                </div>
            </div>

            {/* LOADING */}
            {loading && (
                <div className="bg-white border rounded-xl p-10 text-center">
                    Loading products...
                </div>
            )}

            {!loading && view === "grid" && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group bg-white rounded-[22px] overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all"
                        >
                            <div className="relative">
                                <img
                                    src={
                                        product.thumbnail_url ||
                                        "/images/no-image.png"
                                    }
                                    alt={product.name}
                                    className="w-full h-[200px] object-cover"
                                />

                                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                                    {product.is_bestseller && (
                                        <span className="bg-orange-400 text-white text-[10px] font-semibold px-3 py-1.5 rounded-full">
                                            Bestseller
                                        </span>
                                    )}

                                    {product.is_new_arrival && (
                                        <span className="bg-blue-500 text-white text-[10px] font-semibold px-3 py-1.5 rounded-full">
                                            ✨ New
                                        </span>
                                    )}
                                </div>

                                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    <button className="w-6 h-6 rounded-lg bg-white shadow-md flex items-center justify-center hover:bg-gray-100 hover:scale-110 transition-all">
                                        <Eye size={14} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setOpenEditModal(true);
                                        }}
                                        className="w-6 h-6 rounded-lg bg-white shadow-md flex items-center justify-center hover:bg-gray-100 hover:scale-110 transition-all"
                                    >
                                        <Pencil size={14} />
                                    </button>

                                    {/* <button className="w-6 h-6 rounded-lg bg-white shadow-md flex items-center justify-center hover:bg-gray-100">
                                        <Copy size={14} />
                                    </button> */}

                                    <button
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setOpenDeleteModal(true);
                                        }}
                                        className="w-6 h-6 rounded-lg bg-white shadow-md flex items-center justify-center text-red-500 hover:bg-red-50"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-4">
                                <p className="uppercase text-gray-400 text-[9px] font-medium tracking-wide">
                                    {product.brand}
                                </p>

                                <h2 className="text-xs font-bold text-[#0f172a] mt-1 leading-snug">
                                    {product.name}
                                </h2>

                                <div className="flex items-center gap-2 mt-4">
                                    <span className="text-yellow-500 text-sm">
                                        ★
                                    </span>

                                    <span className="text-gray-500 text-[11px]">
                                        {product.rating} ·{" "}
                                        {product.review_count} reviews
                                    </span>
                                </div>

                                <div className="flex items-end justify-between mt-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[14px] font-bold text-[#0f172a]">
                                            ₹{product.sale_price}
                                        </span>

                                        <span className="text-gray-400 line-through text-xs">
                                            ₹{product.mrp}
                                        </span>
                                    </div>

                                    <span className="text-orange-500 font-semibold text-xs">
                                        {product.stock_qty} in stock
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && view === "table" && (
                <div className="bg-white border rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[#f8fafc] border-b">
                                <th className="text-left px-4 py-3 text-slate-600 font-semibold text-[11px]">
                                    PRODUCT
                                </th>

                                <th className="text-left px-4 py-3 text-slate-600 font-semibold text-[11px]">
                                    SKU
                                </th>

                                <th className="text-left px-4 py-3 text-slate-600 font-semibold text-[11px]">
                                    CATEGORY
                                </th>

                                <th className="text-left px-4 py-3 text-slate-600 font-semibold text-[11px]">
                                    PRICE
                                </th>

                                <th className="text-left px-4 py-3 text-slate-600 font-semibold text-[11px]">
                                    STOCK
                                </th>

                                <th className="text-left px-4 py-3 text-slate-600 font-semibold text-[11px]">
                                    STATUS
                                </th>

                                <th className="text-center px-4 py-3 text-slate-600 font-semibold text-[11px]">
                                    ACTIONS
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b last:border-b-0 hover:bg-gray-50 h-[72px]"
                                >
                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={
                                                    product.thumbnail_url ||
                                                    "/images/no-image.png"
                                                }
                                                alt={product.name}
                                                className="w-10 h-10 rounded-lg object-cover"
                                            />

                                            <div>
                                                <h3 className="font-semibold text-[12px] text-slate-900 leading-tight">
                                                    {product.name}
                                                </h3>

                                                <p className="text-slate-500 text-[11px] mt-0.5">
                                                    {product.brand}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-2 text-[12px]">
                                        {product.sku}
                                    </td>

                                    <td className="px-4 py-2 text-[12px] text-slate-600">
                                        {product.category_name}
                                    </td>

                                    <td className="px-4 py-2 text-[12px] font-semibold">
                                        ₹{product.sale_price}
                                    </td>

                                    <td className="px-4 py-2 text-[12px]">
                                        {product.stock_qty}
                                    </td>

                                    <td className="px-4 py-2">
                                        {product.stock_qty > 0 ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-600 text-[10px]">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                In Stock
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-500 text-[10px]">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                                Out Of Stock
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-4 py-2">
                                        <div className="flex items-center justify-center gap-3">
                                            <button>
                                                <Eye size={15} />
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setSelectedProduct(product);
                                                    setOpenEditModal(true);
                                                }}
                                            >
                                                <Pencil size={15} />
                                            </button>

                                            {/* <button>
                                                <Copy size={15} />
                                            </button> */}

                                            <button
                                                onClick={() => {
                                                    setSelectedProduct(product);
                                                    setOpenDeleteModal(true);
                                                }}
                                                className="text-red-500"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <AddProductModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                fetchProducts={fetchProducts}
            />

            <EditProductModal
                openEditModal={openEditModal}
                setOpenEditModal={setOpenEditModal}
                selectedProduct={selectedProduct}
                handleUpdateProduct={handleUpdateProduct}
            />
            <DeleteProductModal
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
                product={selectedProduct}
                handleDeleteProduct={handleDeleteProduct}
            />
        </div>
    );
}