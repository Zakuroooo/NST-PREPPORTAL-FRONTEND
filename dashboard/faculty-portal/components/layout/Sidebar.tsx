"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  CalendarDays,
  LayoutDashboard,
  MessageCircle,
  Send,
  LogOut,
  LayoutList,
  Trophy,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Session Requests", href: "/requests", icon: CalendarDays },
  { name: "Doubts & Questions", href: "/doubts", icon: MessageCircle },
  { name: "Student Matrix", href: "/students", icon: LayoutList },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Company Rankings", href: "/rankings", icon: Building2 },
  { name: "Export Reports", href: "/reports", icon: Send },
];

export function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-full flex-col bg-white pt-3">
      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 px-3 overflow-y-auto">
        <p className="px-3 mb-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Faculty Menu
        </p>
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-gray-200 p-3 space-y-1 shrink-0">
        <button
          onClick={() => {
            document.cookie = "faculty_authed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/login";
          }}
          className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0 text-gray-400 group-hover:text-red-500" />
          Logout
        </button>
        <p className="px-3 pt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          NST PlacePrep
        </p>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden border-r border-gray-200 lg:fixed lg:top-14 lg:bottom-0 lg:flex lg:w-[216px] lg:flex-col z-40 bg-white">
      <SidebarContent />
    </aside>
  );
}
