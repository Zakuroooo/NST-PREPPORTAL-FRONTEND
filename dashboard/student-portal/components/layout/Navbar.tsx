"use client";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Zap, Search, X, Building2, Tag } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { searchAll, type SearchResult } from "@/lib/mock-data";

// Unread notification count — reads from sessionStorage
function useUnreadCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // BACKEND TODO: GET /api/notifications/unread-count
    const lastRead = sessionStorage.getItem("notifications_last_read");
    if (!lastRead) {
      setCount(3); // 3 unread by default for new users
    } else {
      setCount(0);
    }
  }, []);
  return count;
}

export default function Navbar() {
  const router = useRouter();
  const { user } = useUser();
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const unreadCount = useUnreadCount();

  // Derive XP from user metadata (BACKEND TODO: from /api/user/me)
  const xp = (user?.publicMetadata as { xp?: number })?.xp ?? 2450;

  // Derive results directly from query — no useEffect needed
  const results = useMemo(() => searchAll(query), [query]);
  const open = results.length > 0 && query.trim().length > 0;

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setSelectedIdx(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const target = selectedIdx >= 0 ? results[selectedIdx] : results[0];
        if (target) {
          router.push(target.href);
          setQuery("");
          setSelectedIdx(-1);
        }
      } else if (e.key === "Escape") {
        setSelectedIdx(-1);
        inputRef.current?.blur();
      }
    },
    [open, results, selectedIdx, router]
  );

  const handleSelect = (r: SearchResult) => {
    router.push(r.href);
    setQuery("");
    setSelectedIdx(-1);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center px-4 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 w-[216px] shrink-0">
        <div className="bg-blue-700 rounded px-2 py-1 text-white font-bold text-xs">NST</div>
        <span className="font-bold text-gray-900 text-sm">PlacePrep</span>
      </div>

      {/* Search — global command palette */}
      <div className="flex-1 max-w-md mx-auto relative" ref={wrapperRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIdx(-1); }}
            onKeyDown={handleKeyDown}
            placeholder="Search company, topic, or question..."
            className="w-full pl-9 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            aria-label="Global search"
            aria-autocomplete="list"
          />
          {query && (
            <button
              onClick={() => { setQuery(""); setSelectedIdx(-1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown results */}
        {open && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
            {results.map((r, idx) => (
              <button
                key={`${r.type}-${r.label}`}
                onClick={() => handleSelect(r)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors ${
                  idx === selectedIdx ? "bg-blue-50" : ""
                }`}
              >
                {r.type === "company" ? (
                  <div className={`w-7 h-7 ${r.color} rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {r.initial}
                  </div>
                ) : (
                  <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    {r.type === "topic" ? (
                      <Tag className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <Building2 className="w-3.5 h-3.5 text-gray-500" />
                    )}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{r.label}</div>
                  <div className="text-xs text-gray-500 truncate">{r.subtitle}</div>
                </div>
                <span className="ml-auto text-[10px] font-semibold uppercase tracking-wide text-gray-400 shrink-0">
                  {r.type}
                </span>
              </button>
            ))}
            <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-400 flex items-center gap-1">
              <kbd className="font-mono bg-gray-100 rounded px-1">↑↓</kbd> navigate &nbsp;
              <kbd className="font-mono bg-gray-100 rounded px-1">↵</kbd> open &nbsp;
              <kbd className="font-mono bg-gray-100 rounded px-1">esc</kbd> close
            </div>
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto">
        {/* XP */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500">XP</span>
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="text-sm font-bold text-amber-600">{xp.toLocaleString()}</span>
        </div>

        {/* Notification Bell */}
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="text-gray-400 hover:text-gray-600 transition-colors relative"
          onClick={() => sessionStorage.setItem("notifications_last_read", new Date().toISOString())}
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] bg-red-500 rounded-full flex items-center justify-center text-[9px] text-white font-bold px-0.5">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Link>

        {/* Clerk User Button — handles avatar, profile, sign out */}
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-8 h-8",
            },
          }}
        />
      </div>
    </header>
  );
}
