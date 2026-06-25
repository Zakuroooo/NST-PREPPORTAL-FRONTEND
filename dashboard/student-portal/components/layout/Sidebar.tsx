"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
 House, Building2, TrendingUp, Trophy, Send,
 MessageCircle, CalendarDays, Map, Dumbbell,
} from "lucide-react";

const navItems = [
 { icon: House,     label: "Home",               href: "/dashboard" },
 { icon: Building2, label: "Companies",          href: "/companies" },
 { icon: Map,       label: "My Roadmap",         href: "/roadmap" },
 { icon: Dumbbell,  label: "Practice",           href: "/practice" },
 { icon: TrendingUp,label: "My Progress",        href: "/progress" },
 { icon: Trophy,    label: "Leaderboard",        href: "/leaderboard" },
 { icon: Send,      label: "Interview Experience", href: "/submit" },
];

const connectItems = [
 { icon: MessageCircle, label: "Ask a Doubt",   href: "/doubts" },
 { icon: CalendarDays,  label: "Book a Session", href: "/sessions" },
];

export default function Sidebar() {
 const pathname = usePathname();

 const isActive = (href: string) =>
  pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

 return (
  <aside className="fixed left-0 top-14 bottom-0 w-[216px] bg-white border-r border-gray-200 flex flex-col z-40">
   <nav className="flex-1 px-3 py-4 overflow-y-auto">
    {/* Main Nav */}
    <div className="space-y-0.5">
     {navItems.map(({ icon: Icon, label, href }) => (
      <Link
       key={href}
       href={href}
       className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
        isActive(href)
         ? "bg-blue-50 text-blue-600"
         : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
       }`}
      >
       <Icon className="w-4 h-4 shrink-0" />
       {label}
      </Link>
     ))}
    </div>

    {/* Faculty Connect Section */}
    <div className="mt-5">
     <p className="px-3 mb-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
      Faculty Connect
     </p>
     <div className="space-y-0.5">
      {connectItems.map(({ icon: Icon, label, href }) => (
       <Link
        key={href}
        href={href}
        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
         isActive(href)
          ? "bg-indigo-50 text-indigo-600"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
       >
        <Icon className="w-4 h-4 shrink-0" />
        {label}
       </Link>
      ))}
     </div>
    </div>
   </nav>
 </aside>
 );
}
