"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Inbox, Calendar, BarChart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutGrid },
  { name: "Session Requests", href: "/requests", icon: Inbox },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Relevance Matrix", href: "/relevance-matrix", icon: BarChart },
];

export function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900">Faculty Portal</h1>
      </div>

      <div className="px-6 mb-6 flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-[#534AB7] font-semibold">
          AT
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">Dr. Aris Thorne</p>
          <p className="text-xs text-gray-500 truncate">Academic Admin</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md border-l-4",
                isActive
                  ? "bg-[#534AB7]/10 text-[#534AB7] border-[#534AB7]"
                  : "text-gray-700 border-transparent hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "flex-shrink-0 h-5 w-5",
                  isActive ? "text-[#534AB7]" : "text-gray-400 group-hover:text-gray-500"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-3">
        <Link
          href="/profile"
          className="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md border-l-4 border-transparent hover:bg-gray-50 hover:text-gray-900"
        >
          <User className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
          Profile
        </Link>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <div className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 border-r border-gray-200">
      <SidebarContent />
    </div>
  );
}
