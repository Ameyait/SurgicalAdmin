"use client";

import { useState } from "react";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function ProtectedLayout({
  children,
}) {
  const [collapsed, setCollapsed] =
    useState(false);

  return (
    <div className="bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen z-40 transition-all duration-300 ${
          collapsed
            ? "w-[80px]"
            : "w-[250px]"
        }`}
      >
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>

      {/* Header */}
      <div
        className={`fixed top-0 right-0 z-30 transition-all duration-300 ${
          collapsed
            ? "left-[80px]"
            : "left-[250px]"
        }`}
      >
        <Header />
      </div>

      {/* Content */}
      <main
        className={`pt-[69px] min-h-screen transition-all duration-300 ${
          collapsed
            ? "ml-[80px]"
            : "ml-[250px]"
        }`}
      >
        {children}
      </main>
    </div>
  );
}