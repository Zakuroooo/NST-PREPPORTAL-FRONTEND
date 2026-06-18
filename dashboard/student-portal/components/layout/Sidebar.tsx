"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House, Map, Building2, Code2, TrendingUp, Trophy, Send, Bot,
  Shield, HelpCircle,
} from "lucide-react";

const navItems = [
  { icon: House, label: "Home", href: "/dashboard" },
  { icon: Map, label: "My Roadmap", href: "/roadmap" },
  { icon: Building2, label: "Companies", href: "/companies" },
  { icon: Code2, label: "Practice", href: "/practice" },
  { icon: TrendingUp, label: "My Progress", href: "/progress" },
  { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
  { icon: Send, label: "Submit Experience", href: "/submit" },
  { icon: Bot, label: "Ask Athena", href: "/athena" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-[216px] bg-white border-r border-gray-200 flex flex-col z-40">
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
              {label === "Ask Athena" && (
                <span className="ml-auto text-[10px] font-semibold bg-blue-600 text-white rounded px-1.5 py-0.5">AI</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-4 space-y-1 border-t border-gray-100 pt-3">
        <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium w-full bg-green-50 text-green-700 hover:bg-green-100 transition-colors">
          <Shield className="w-4 h-4 shrink-0" />
          Share a Concern
        </button>
        <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium w-full text-gray-500 hover:bg-gray-100 transition-colors">
          <HelpCircle className="w-4 h-4 shrink-0" />
          Help & Support
        </button>
      </div>
    </aside>
  );
}
