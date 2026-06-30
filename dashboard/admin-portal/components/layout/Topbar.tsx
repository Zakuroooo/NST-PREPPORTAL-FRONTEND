"use client";

import Link from "next/link";
import { useNotifications } from "../context/NotificationContext";

export default function Topbar() {
  const { unreadCount } = useNotifications();
  return (
    <header className="md:hidden fixed top-0 w-full h-16 bg-surface border-b border-outline-variant flex justify-between items-center px-6 z-40">
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">PlacePrep Admin</h1>
      <div className="flex gap-2">
        <Link href="/notifications" className="relative text-on-surface-variant hover:bg-surface-container-high rounded-full p-2 transition-opacity cursor-pointer">
          <span className="material-symbols-outlined">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface"></span>
          )}
        </Link>
        <button className="text-on-surface-variant hover:bg-surface-container-high rounded-full p-2 transition-opacity cursor-pointer">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
}
