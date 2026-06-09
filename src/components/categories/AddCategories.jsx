"use client";
 
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {
    getCategoryMaster,
    createCategory,
} from "@/services/category.service";
 
export default function AddCategoreModal({ closeModal }) {
    const [categoryMaster, setCategoryMaster] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
 
    const [featured, setFeatured] = useState(false);
    const [isActive, setIsActive] = useState(true);
 
    useEffect(() => {
        const fetchCategoryMaster = async () => {
            try {
                const response = await getCategoryMaster();
 
                if (response?.success) {
                    setCategoryMaster(response.data || []);
                }
            } catch (error) {
                console.log("Category Master Error:", error);
            }
        };
 
        fetchCategoryMaster();
    }, []);
 
    const handleSave = async () => {
        try {
            setLoading(true);
            setError("");
 
            const payload = {
                name: selectedCategory,
                description,
                parent_id: null,
                is_active: isActive,
                image_url: imageUrl || null,
            };
 
            const response = await createCategory(payload);
 
            if (response?.success) {
                closeModal();
                window.location.reload();
            }
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                err?.response?.data?.detail ||
                ""
            );
        } finally {
            setLoading(false);
        }
    };
 
    return (
        <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="relative w-full max-w-[500px] max-h-[85vh] overflow-y-auto rounded-[28px] bg-white p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
 
                    <button
                        onClick={closeModal}
                        className="absolute right-6 top-6 text-[#6b7280] transition hover:text-black"
                    >
                        <X size={20} />
                    </button>
 
                    <h2 className="mb-6 text-[20px] font-bold text-[#111827]">
                        Add new category
                    </h2>
 
                    <div>
                        <label className="mb-2 block text-[13px] font-semibold text-[#111827]">
                            Category name
                        </label>
 
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="h-[48px] w-full rounded-[16px] border border-[#e5e7eb] bg-[#f9fafb] px-5 text-[14px] text-[#111827] outline-none shadow-sm focus:border-[#2563eb]"
                        >
                            <option value="">
                                Select category
                            </option>
 
                            {categoryMaster.map((category, index) => (
                                <option
                                    key={index}
                                    value={category.name}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
 
                    <div className="mt-5">
                        <label className="mb-2 block text-[13px] font-semibold text-[#111827]">
                            Description
                        </label>
 
                        <textarea
                            rows={2}
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            placeholder="What's inside this category"
                            className="w-full resize-none rounded-[18px] border border-[#e5e7eb] bg-[#f9fafb] px-5 py-4 text-[14px] text-[#111827] outline-none shadow-sm focus:border-[#2563eb]"
                        />
                    </div>
 
                    <div className="mt-5 grid grid-cols-2 gap-4">
 
                        {/* Featured Toggle */}
                        {/* <div className="flex items-center justify-between rounded-[18px] bg-[#f8fafc] px-5 py-4">
                            <span className="text-[13px] font-medium text-[#111827]">
                                Featured on home
                            </span>
 
                            <button
                                type="button"
                                onClick={() => setFeatured(!featured)}
                                className={`flex h-[25px] w-[48px] items-center rounded-full px-1 transition-all ${
                                    featured
                                        ? "bg-[#2563eb]"
                                        : "bg-[#e5e7eb]"
                                }`}
                            >
                                <div
                                    className={`h-[22px] w-[22px] rounded-full bg-white shadow-sm transition-all ${
                                        featured ? "ml-auto" : ""
                                    }`}
                                />
                            </button>
                        </div> */}
 
                        {/* Active Toggle */}
                        <div className="flex items-center justify-between rounded-[18px] bg-[#f8fafc] px-5 py-4">
                            <span className="text-[13px] font-medium text-[#111827]">
                                Active
                            </span>
 
                            <button
                                type="button"
                                onClick={() => setIsActive(!isActive)}
                                className={`flex h-[25px] w-[48px] items-center rounded-full px-1 transition-all ${
                                    isActive
                                        ? "bg-[#2563eb]"
                                        : "bg-[#e5e7eb]"
                                }`}
                            >
                                <div
                                    className={`h-[22px] w-[22px] rounded-full bg-white shadow-sm transition-all ${
                                        isActive ? "ml-auto" : ""
                                    }`}
                                />
                            </button>
                        </div>
 
                    </div>
 
                    {error && (
                        <p className="mt-4 text-sm text-red-500">
                            {error}
                        </p>
                    )}
 
                    <div className="mt-6 flex justify-end gap-4">
 
                        <button
                            onClick={closeModal}
                            className="h-[40px] rounded-[10px] border border-[#e5e7eb] bg-white px-8 text-[12px] font-semibold text-[#111827] shadow-sm transition hover:bg-gray-50"
                        >
                            Cancel
                        </button>
 
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="h-[40px] rounded-[10px] bg-[#22c55e] px-5 text-[12px] font-semibold text-white shadow-lg shadow-green-200 transition-all hover:bg-[#16a34a] disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save category"}
                        </button>
 
                    </div>
                </div>
            </div>
        </div>
    );
}