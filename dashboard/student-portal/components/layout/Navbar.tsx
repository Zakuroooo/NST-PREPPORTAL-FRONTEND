"use client";
import Link from "next/link";
import { Bell, Gift, Zap, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center px-4 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 w-[216px] shrink-0">
        <div className="bg-blue-700 rounded px-2 py-1 text-white font-bold text-xs">NST</div>
        <span className="font-bold text-gray-900 text-sm">PlacePrep</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search company or topic..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto">
        <button
          aria-label="Daily rewards"
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Gift className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500">Total XP</span>
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="text-sm font-bold text-amber-600">2,450</span>
        </div>

        <button
          aria-label="Notifications"
          className="text-gray-400 hover:text-gray-600 transition-colors relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <Link href="/profile" aria-label="Go to profile">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all">
            PS
          </div>
        </Link>
      </div>
    </header>
  );
}
