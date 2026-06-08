"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function DeleteProductModal({
  openDeleteModal,
  setOpenDeleteModal,
  product,
  handleDeleteProduct,
}) {
  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const onConfirmDelete = async () => {
    try {
      const response =
        await handleDeleteProduct(
          product?.id
        );

      console.log(
        "DELETE RESPONSE:",
        response
      );

      setOpenDeleteModal(false);

      setSuccessMessage(
        response?.message
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.error(
        "DELETE ERROR:",
        error
      );

      setErrorMessage(
        error?.response?.data
          ?.message ||
          error?.message
      );

      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  };

  if (
    !openDeleteModal &&
    !successMessage &&
    !errorMessage
  ) {
    return null;
  }

  return (
    <>
      {/* SUCCESS POPUP */}
      {successMessage && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
          <div className="bg-green-500 text-white px-6 py-2 rounded-xl shadow-xl text-center min-w-[280px]">
            <p className="font-medium text-lg">
              {successMessage}
            </p>
          </div>
        </div>
      )}

      {/* ERROR POPUP */}
      {errorMessage && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
          <div className="bg-red-500 text-white px-6 py-2 rounded-xl shadow-xl text-center min-w-[280px]">
            <p className="font-medium text-lg">
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {openDeleteModal && (
        <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center">
          <div className="bg-white w-full max-w-[440px] rounded-3xl shadow-2xl p-8 relative">
            <button
              onClick={() =>
                setOpenDeleteModal(
                  false
                )
              }
              className="absolute right-6 top-6 text-gray-500 hover:text-black"
            >
              <X size={18} />
            </button>

            <h2 className="text-[15px] font-semibold text-[#111827] mb-6">
              Delete "
              {product?.name}"?
            </h2>

            <p className="text-[13px] text-gray-500 mb-8">
              This product will be
              removed from the
              catalog and frontend.
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() =>
                  setOpenDeleteModal(
                    false
                  )
                }
                className="h-[32px] px-2 rounded-2xl border border-gray-200 bg-white text-[#111827] text-sm font-medium shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={
                  onConfirmDelete
                }
                className="h-[32px] px-2 rounded-2xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}