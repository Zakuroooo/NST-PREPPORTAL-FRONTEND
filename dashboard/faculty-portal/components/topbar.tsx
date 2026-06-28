"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, Menu, X } from "lucide-react";
import { SidebarContent } from "@/components/sidebar";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/requests": "Session Requests",
  "/doubts": "Doubts & Questions",
  "/curriculum": "Curriculum Gap Matrix",
  "/trends": "Industry Trends",
  "/rankings": "Company Rankings",
  "/reports": "Export Reports",
};

export function Topbar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const title = pageTitles[pathname] || "Faculty Portal";

  return (
    <header className="sticky top-0 z-10 flex h-[var(--navbar-height)] shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex md:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 rounded p-2.5 text-gray-700 hover:bg-gray-100"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-gray-900/30"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            />
            <div className="absolute inset-y-0 left-0 w-[var(--sidebar-width)] border-r border-gray-200 bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="absolute right-3 top-3 rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
              <SidebarContent />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 items-center justify-between gap-x-4 self-stretch lg:gap-x-6">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="relative -m-2.5 rounded p-2.5 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            aria-label="View notifications"
          >
            <Bell className="h-6 w-6" aria-hidden="true" />
            <span className="absolute right-2 top-2 block h-2.5 w-2.5 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
            PS
          </div>
        </div>
      </div>
    </header>
  );
}
