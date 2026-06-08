"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Boxes,
  Tags,
  Users,
  Star,
  Ticket,
  LogOut,
  ChevronLeft,
  Stethoscope,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    name: "Orders",
    icon: ShoppingCart,
    href: "/orders",
  },
  {
    name: "Products",
    icon: Package,
    href: "/products",
  },
  {
    name: "Inventory",
    icon: Boxes,
    href: "/inventory",
  },
  {
    name: "Categories",
    icon: Tags,
    href: "/categories",
  },
  {
    name: "Customers",
    icon: Users,
    href: "/customers",
  },
  {
    name: "Reviews",
    icon: Star,
    href: "/reviews",
  },
  {
    name: "Coupons",
    icon: Ticket,
    href: "/coupons",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function Sidebar({
  collapsed,
  setCollapsed,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <aside
      className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        collapsed ? "w-[80px]" : "w-[250px]"
      }`}
    >
      {/* Logo */}
      <div className="h-14 border-b border-gray-200 px-5 flex items-center gap-4 flex-shrink-0">
        <div className="w-9.5 h-9.5 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
          <Stethoscope size={18} />
        </div>

        {!collapsed && (
          <div>
            <h2 className="text-[14px] font-bold text-slate-900">
              Surgical World
            </h2>

            <p className="text-gray-500 uppercase tracking-wide text-[10px]">
              Admin Panel
            </p>
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`w-full flex items-center rounded-2xl transition-all py-2 px-2 ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-slate-800 hover:bg-blue-100 hover:text-blue-600"
                  }`}
                >
                  <div className="w-[17px] flex justify-center flex-shrink-0">
                    <Icon size={17} />
                  </div>

                  {!collapsed && (
                    <span className="ml-4 font-semibold text-[13px]">
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-2 bg-white flex-shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-slate-500 hover:text-red-500 hover:bg-red-100 rounded-xl px-2 py-1"
        >
          <div className="w-[17px] flex justify-center flex-shrink-0">
            <LogOut size={17} />
          </div>

          {!collapsed && (
            <span className="font-bold text-sm">
              Logout
            </span>
          )}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full mt-3 flex items-center justify-center gap-2 text-xs text-gray-500 hover:bg-gray-100 rounded-xl py-2"
        >
          <ChevronLeft
            size={13}
            className={`transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
          />

          {!collapsed && "Collapse"}
        </button>
      </div>
    </aside>
  );
}