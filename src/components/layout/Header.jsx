"use client";

import { useState, useRef, useEffect } from "react";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import {
  Search,
  ChevronDown,
} from "lucide-react";

import {
  getStorage,
  removeStorage,
} from "@/utils/storage";
import { removeToken } from "@/utils/cookies";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef(null);

  const pathname = usePathname();
  const router = useRouter();

  const formattedPageName =
    pathname === "/dashboard"
      ? "Dashboard"
      : pathname.replace("/", "").charAt(0).toUpperCase() +
        pathname.replace("/", "").slice(1);

  useEffect(() => {
    const adminUser =
      getStorage("adminUser");

    console.log(
      "HEADER USER =>",
      adminUser
    );

    if (adminUser) {
      setUser(adminUser);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = () => {
    removeToken();
    removeStorage("adminUser");

    router.push("/");
    // If login page is /login use:
    // router.push("/login");
  };

  const initials =
    user?.full_name
      ?.split(" ")
      ?.map((word) => word[0])
      ?.join("")
      ?.toUpperCase() || "AD";

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-1.5">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-wide">
            ADMIN / {formattedPageName}
          </p>

          <h1 className="text-base font-bold text-gray-900 mt-1">
            {formattedPageName}
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search orders, customers, products..."
              className="w-[350px] pl-11 pr-3 py-1 bg-gray-100 text-sm rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Profile */}
          <div
            ref={dropdownRef}
            className="relative"
          >
            <button
              onClick={() =>
                setOpen(!open)
              }
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-8 h-8 text-sm rounded-xl bg-indigo-600 text-white flex items-center justify-center font-semibold">
                {initials}
              </div>

              <div className="hidden md:block">
                <h3 className="font-semibold text-xs text-gray-900">
                  {user?.full_name ||
                    "Admin"}
                </h3>

                <p className="text-[10px] text-gray-500 capitalize">
                  {user?.role ||
                    "Admin"}
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  open
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50">
                <div className="p-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 text-[13px] rounded-xl bg-indigo-600 text-white flex items-center justify-center font-semibold">
                      {initials}
                    </div>

                    <div>
                      <h3 className="font-semibold text-sm text-gray-900">
                        {user?.full_name}
                      </h3>

                      <p className="text-[10px] text-gray-500 capitalize">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div>
                    <p className="text-xs text-gray-400">
                      Email
                    </p>
                    <p className="text-sm text-gray-900 break-all">
                      {user?.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      User ID
                    </p>
                    <p className="text-xs text-gray-900 break-all">
                      {user?.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Phone
                    </p>
                    <p className="text-sm text-gray-900">
                      {user?.phone ||
                        "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Role
                    </p>
                    <p className="text-sm text-gray-900 capitalize">
                      {user?.role}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Created At
                    </p>
                    <p className="text-xs text-gray-900">
                      {user?.created_at
                        ? new Date(
                            user.created_at
                          ).toLocaleString()
                        : "-"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200">
                  <button
                    onClick={
                      handleLogout
                    }
                    className="w-full text-left text-sm px-4 py-3 text-red-500 hover:bg-red-50 transition"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}