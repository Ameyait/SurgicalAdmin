"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export default function EditProductModal({
    openEditModal,
    setOpenEditModal,
    selectedProduct,
    handleUpdateProduct,
}) {
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        brand: "",
        mrp: "",
        salePrice: "",
        stock: "",
        sku: "",
        image: "",
        imageFile: null,
        tags: "",
        status: "",

        bestseller: false,
        featured: false,
        doctorPick: false,
        newArrival: false,
    });
    const [saving, setSaving] = useState(false);
    useEffect(() => {
        if (!selectedProduct) return;

        setFormData({
            name: selectedProduct.name ?? "",
            description:
                selectedProduct.description ?? "",

            category:
                selectedProduct.category_name ?? "",

            brand:
                selectedProduct.brand ?? "",

            mrp:
                String(selectedProduct.mrp ?? ""),

            salePrice:
                String(
                    selectedProduct.sale_price ?? ""
                ),

            stock:
                String(
                    selectedProduct.stock_qty ?? ""
                ),

            sku:
                selectedProduct.sku ?? "",

            image:
                selectedProduct.thumbnail_url ?? "",

            imageFile: null,

            tags: "",

            status:
                Number(
                    selectedProduct.stock_qty ?? 0
                ) > 0
                    ? "Active"
                    : "Out of stock",

            bestseller:
                selectedProduct.is_bestseller ??
                false,

            featured:
                selectedProduct.is_featured ??
                false,

            doctorPick: false,

            newArrival:
                selectedProduct.is_new_arrival ??
                false,
        });
    }, [selectedProduct]);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChoose = () => {
        fileInputRef.current?.click();
    };

    const handleImageFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setFormData({
            ...formData,
            image: file.name,
            imageFile: file,
        });
    };

    const toggleSwitch = (field) => {
        setFormData({
            ...formData,
            [field]: !formData[field],
        });
    };
    const handleSubmit = async () => {
        try {
            setSaving(true);

            const response =
                await handleUpdateProduct(
                    selectedProduct.id,
                    {
                        category_id:
                            selectedProduct.category_id,

                        name: formData.name,

                        sku: formData.sku,

                        brand: formData.brand,

                        description:
                            formData.description,

                        short_description:
                            formData.description,

                        mrp: formData.mrp,

                        sale_price:
                            formData.salePrice,

                        stock_qty:
                            formData.stock,

                        manufacturer: "",

                        hsn_code: "",

                        is_featured:
                            formData.featured,

                        is_bestseller:
                            formData.bestseller,

                        is_new_arrival:
                            formData.newArrival,

                        images:
                            formData.imageFile
                                ? [
                                    formData.imageFile,
                                ]
                                : [],
                    }
                );

            alert(response.message);

            setOpenEditModal(false);
        } catch (error) {
            alert(
                error?.message ||
                error?.detail
            );
        } finally {
            setSaving(false);
        }
    };
    if (!openEditModal) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center p-6">
            <div className="relative w-full max-w-xl bg-white rounded-2xl max-h-[82vh] overflow-y-auto mt-14 p-8">
                <button
                    onClick={() => setOpenEditModal(false)}
                    className="absolute top-6 right-6 text-gray-500 hover:text-black"
                >
                    <X size={15} />
                </button>

                <h2 className="text-xl font-bold text-[#0f172a] mb-3">
                    Edit product
                </h2>

                <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                        <label className="text-sm font-semibold text-[#0f172a]">
                            Product name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name || ""}
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
                            value={formData.description || ""}
                            onChange={handleChange}
                            placeholder="Product information"
                            className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none resize-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#0f172a]">
                            Category
                        </label>

                        <select
                            name="category"
                            value={formData.category || ""}
                            onChange={handleChange}
                            className="w-full mt-2 h-9 border border-gray-300 rounded-xl px-4 text-sm outline-none"
                        >
                            <option>Respiratory</option>
                            <option>Diagnostics</option>
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
                            value={formData.brand || ""}
                            onChange={handleChange}
                            placeholder="Enter brand name"
                            className="w-full mt-2 h-9 border border-gray-300 rounded-xl px-4 text-sm outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#0f172a]">
                            MRP (1000)
                        </label>

                        <input
                            type="text"
                            name="mrp"
                            value={formData.mrp || ""}
                            onChange={handleChange}
                            className="w-full mt-2 h-9 border border-gray-300 rounded-xl px-4 text-sm outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#0f172a]">
                            Sale price (1500)
                        </label>

                        <input
                            type="text"
                            name="salePrice"
                            value={formData.salePrice || ""}
                            onChange={handleChange}
                            className="w-full mt-2 h-9 border border-gray-300 rounded-xl px-4 text-sm outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#0f172a]">
                            Stock
                        </label>

                        <input
                            type="text"
                            name="stock"
                            value={formData.stock || ""}
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
                            value={formData.sku || ""}
                            onChange={handleChange}
                            className="w-full mt-2 h-9 border border-gray-300 rounded-xl px-4 text-sm outline-none"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="text-sm font-semibold text-[#0f172a]">
                            choose image file
                        </label>

                        <div className="flex items-center gap-2 mt-2">
                            <input
                                type="text"
                                name="image"
                                value={formData.image || ""}
                                onChange={handleChange}
                                className="w-small h-9 border border-gray-300 rounded-xl px-4 text-sm outline-none"
                            />

                            <button
                                type="button"
                                onClick={handleImageChoose}
                                className="px-4 h-9 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium shadow-sm transition"
                            >
                                Choose
                            </button>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageFileChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    <div className="col-span-2">
                        <label className="text-sm font-semibold text-[#0f172a]">
                            Tags
                        </label>

                        <input
                            type="text"
                            name="tags"
                            value={formData.tags || ""}
                            onChange={handleChange}
                            placeholder="bp, monitor, omron"
                            className="w-full mt-2 h-9 border border-gray-300 rounded-xl px-4 text-sm outline-none"
                        />
                    </div>

                    <div className="flex items-end gap-4">
                        <div className="flex-1">
                            <label className="text-sm font-semibold text-[#0f172a]">
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status || ""}
                                onChange={handleChange}
                                className="w-full mt-2 h-10 border border-gray-300 rounded-xl px-4 text-sm outline-none"
                            >
                                <option>Active</option>
                                <option>Out of stock</option>
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
                        ["bestseller", "Bestseller"],
                        ["featured", "Featured"],
                        ["doctorPick", "Doctor pick"],
                        ["newArrival", "New arrival"],
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
                        onClick={() => setOpenEditModal(false)}
                        className="px-3 h-8 border border-gray-100 rounded-lg text-xs font-medium shadow-sm hover:bg-emerald-500 hover:text-white transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="px-5 h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium shadow-sm transition disabled:opacity-50"
                    >
                        {saving
                            ? "Updating..."
                            : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}
