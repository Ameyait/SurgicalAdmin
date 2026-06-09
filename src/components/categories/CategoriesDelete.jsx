"use client";
 
import toast from "react-hot-toast";
import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { deleteCategory } from "@/services/category.service";
 
export default function DeleteCategoryModal({
    closeModal,
    categoryId,
}) {
    const [loading, setLoading] = useState(false);
 
    const handleDelete = async () => {
        try {
            setLoading(true);
 
            const response = await deleteCategory(categoryId);
 
            toast.success(response.message); // Backend message
 
            closeModal();
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to delete category"
            );
        } finally {
            setLoading(false);
        }
    };
 
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-[420px] rounded-[28px] bg-white p-8 shadow-2xl">
 
                <button
                    onClick={closeModal}
                    className="absolute top-6 right-6 text-gray-500 hover:text-black"
                >
                    <X size={20} />
                </button>
 
                <h2 className="text-[17px] font-bold text-[#111827]">
                    Delete Category?
                </h2>
 
                <div className="mt-3 flex gap-4 rounded-2xl bg-[#fff7ed] px-2 py-2">
                    <AlertTriangle
                        size={20}
                        className="mt-1 shrink-0 text-orange-500"
                    />
 
                    <p className="text-[13px] leading-8 text-[#92400e]">
                        Are you sure you want to delete this category?
                    </p>
                </div>
 
                <div className="mt-8 flex justify-end gap-4">
 
                    <button
                        onClick={closeModal}
                        className="h-[40px] min-w-[100px] rounded-2xl border border-gray-200 bg-white px-7"
                    >
                        Cancel
                    </button>
 
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="h-[40px] min-w-[100px] rounded-full bg-red-500 text-white"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
 
                </div>
            </div>
        </div>
    );
}