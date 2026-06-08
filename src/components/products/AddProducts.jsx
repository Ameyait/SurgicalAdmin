"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { createProduct } from "@/services/product.service";

export default function AddProductModal({
    openModal,
    setOpenModal,
    fetchProducts,
}) {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        category_id:
            "9ec521df-04ee-4cdc-b474-557a6afbad72",

        name: "",
        description: "",
        short_description: "",
        brand: "",
        mrp: "",
        sale_price: "",
        stock_qty: "",
        sku: "",
        manufacturer: "",
        hsn_code: "",
        image_file: null,

        is_featured: false,
        is_bestseller: false,
        is_new_arrival: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            image_file: e.target.files[0] || null,
        }));
    };

    const toggleSwitch = (field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            await createProduct({
                category_id: formData.category_id,
                name: formData.name,
                sku: formData.sku,
                brand: formData.brand,
                description: formData.description,
                short_description:
                    formData.short_description,

                mrp: Number(formData.mrp),
                sale_price: Number(formData.sale_price),
                stock_qty: Number(formData.stock_qty),

                manufacturer:
                    formData.manufacturer,

                hsn_code: formData.hsn_code,

                is_featured:
                    formData.is_featured,

                is_bestseller:
                    formData.is_bestseller,

                is_new_arrival:
                    formData.is_new_arrival,

                images: formData.image_file
                    ? [formData.image_file]
                    : [],
            });

            await fetchProducts?.();

            setOpenModal(false);

            setFormData({
                category_id:
                    "9ec521df-04ee-4cdc-b474-557a6afbad72",

                name: "",
                description: "",
                short_description: "",
                brand: "",
                mrp: "",
                sale_price: "",
                stock_qty: "",
                sku: "",
                manufacturer: "",
                hsn_code: "",
                image_file: null,

                is_featured: false,
                is_bestseller: false,
                is_new_arrival: false,
            });

            alert("Product created successfully");
        } catch (error) {
            console.error(error);

            alert(
                error?.message ||
                "Failed to create product"
            );
        } finally {
            setLoading(false);
        }
    };

    if (!openModal) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center p-6">
            <div className="relative w-full max-w-xl bg-white rounded-2xl max-h-[82vh] overflow-y-auto mt-14 p-8">
                <button
                    onClick={() => setOpenModal(false)}
                    className="absolute top-6 right-6 text-gray-500 hover:text-black"
                >
                    <X size={15} />
                </button>

                <h2 className="text-xl font-bold text-[#0f172a] mb-3">
                    Add new product
                </h2>

                <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                        <label className="text-sm font-semibold text-[#0f172a]">
                            Product name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter Product Name"
                            className="w-full mt-2 h-12 border border-gray-300 rounded-xl px-4 text-sm outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="text-sm font-semibold text-[#0f172a]">
                            Description
                        </label>

                        <textarea
                            rows={2}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Product information"
                            className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none resize-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#0f172a]">
                            Category
                        </label>

                        <select className="w-full mt-2 h-9 border border-gray-300 rounded-xl px-4 text-sm outline-none">
                            <option>🩺 Diagnostics</option>
                            <option>Respiratory</option>
                            <option>Healthcare</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#0f172a]">
                            Brand
                        </label>

                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            placeholder="Enter brand name"
                            className="w-full mt-2 h-9 border border-gray-300 rounded-xl px-4 text-sm outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#0f172a]">
                            MRP (₹)
                        </label>

                        <input
                            type="number"
                            name="mrp"
                            value={formData.mrp}
                            onChange={handleChange}
                            className="w-full mt-2 h-9 border border-gray-300 rounded-xl px-4 text-sm outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#0f172a]">
                            Sale price (₹)
                        </label>

                        <input
                            type="number"
                            name="sale_price"
                            value={formData.sale_price}
                            onChange={handleChange}
                            className="w-full mt-2 h-9 border border-gray-300 rounded-xl px-4 text-sm outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#0f172a]">
                            Stock
                        </label>

                        <input
                            type="number"
                            name="stock_qty"
                            value={formData.stock_qty}
                            onChange={handleChange}
                            className="w-full mt-2 h-9 border border-gray-300 rounded-xl px-4 text-sm outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#0f172a]">
                            SKU
                        </label>

                        <input
                            type="text"
                            name="sku"
                            value={formData.sku}
                            onChange={handleChange}
                            className="w-full mt-2 h-9 border border-gray-300 rounded-xl px-4 text-sm outline-none"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="text-sm font-semibold text-[#0f172a]">
                            Product Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full mt-2 h-9 border border-gray-300 rounded-xl px-4 text-sm outline-none"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="text-sm font-semibold text-[#0f172a]">
                            Tags (comma separated)
                        </label>

                        <input
                            type="text"
                            placeholder="bp, monitor, omron"
                            className="w-full mt-2 h-9 border border-gray-300 rounded-xl px-4 text-sm outline-none"
                        />
                    </div>

                    <div className="flex items-end gap-4">
                        <div className="flex-1">
                            <label className="text-sm font-semibold text-[#0f172a]">
                                Status
                            </label>

                            <select className="w-full mt-2 h-10 border border-gray-300 rounded-xl px-4 text-sm outline-none">
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>

                        <div className="pb-1 text-xs text-gray-500">
                            Discount: 0%
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-8">
                    {[
                        ["is_bestseller", "Bestseller"],
                        ["is_featured", "Featured"],
                        ["is_new_arrival", "New arrival"],
                    ].map(([key, label]) => (
                        <div
                            key={key}
                            className="flex items-center gap-1 bg-[#f8fafc] px-2 py-2 rounded-xl"
                        >
                            <span className="text-xs text-[#0f172a]">
                                {label}
                            </span>

                            <button
                                type="button"
                                onClick={() => toggleSwitch(key)}
                                className={`w-10 h-5 rounded-full relative transition-all ${formData[key]
                                    ? "bg-blue-500"
                                    : "bg-gray-300"
                                    }`}
                            >
                                <span
                                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${formData[key]
                                        ? "left-5"
                                        : "left-0.5"
                                        }`}
                                />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-3 mt-8">
                    <button
                        onClick={() => setOpenModal(false)}
                        className="px-3 h-8 border border-gray-100 rounded-lg text-xs font-medium shadow-sm hover:bg-emerald-500 hover:text-white transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-5 h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium shadow-sm transition disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Add product"}
                    </button>
                </div>
            </div>
        </div>
    );
}