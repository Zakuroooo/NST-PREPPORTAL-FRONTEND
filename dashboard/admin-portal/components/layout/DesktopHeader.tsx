"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useNotifications } from "../context/NotificationContext";
import SettingsModal from "../modals/SettingsModal";

export default function DesktopHeader() {
  const { unreadCount } = useNotifications();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <header className="hidden md:flex h-16 px-container-padding justify-between items-center bg-surface border-b border-outline-variant shrink-0 sticky top-0 z-40">
        <div className="font-headline-md text-headline-md text-primary font-bold">
          PlacePrep Admin
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant">
          <Link
            href="/notifications"
            aria-label="notifications"
            className="relative p-2 rounded-full hover:bg-surface-container-high transition-opacity opacity-80 cursor-pointer"
          >
            <span className="material-symbols-outlined">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface"></span>
            )}
          </Link>
          <button
            onClick={() => setIsSettingsOpen(true)}
            aria-label="settings"
            className="p-2 rounded-full hover:bg-surface-container-high transition-opacity opacity-80 cursor-pointer"
          >
            <span className="material-symbols-outlined">settings</span>
          </button>
          <Link
            href="/help"
            aria-label="help"
            className="p-2 rounded-full hover:bg-surface-container-high transition-opacity opacity-80 cursor-pointer"
          >
            <span className="material-symbols-outlined">help</span>
          </Link>
        </div>
      </header>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
}
