"use client";

import React from "react";
import { useNotifications } from "@/components/context/NotificationContext";

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="p-container-padding flex-1 min-h-[calc(100vh-64px)] bg-surface-container-low flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface m-0">
            Notifications
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            You have {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}.
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-surface border border-outline-variant rounded-lg text-primary hover:bg-surface-container-high transition-colors font-body-sm font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="bg-surface rounded-xl border border-outline-variant/50 shadow-sm overflow-hidden flex flex-col">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant">
            No notifications found.
          </div>
        ) : (
          <ul className="divide-y divide-outline-variant/30">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-4 md:p-6 transition-colors ${
                  !notification.isRead ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-surface-container-lowest"
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary">
                        {notification.title.includes("Registration") ? "person_add" : "notifications"}
                      </span>
                    </div>
                    <div>
                      <h3 className={`font-headline-sm text-headline-sm mb-1 ${!notification.isRead ? "text-on-surface font-semibold" : "text-on-surface-variant"}`}>
                        {notification.title}
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        {notification.message}
                      </p>
                      <span className="font-label-sm text-label-sm text-on-surface-variant opacity-70 mt-2 block">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors shrink-0"
                      title="Mark as read"
                    >
                      <span className="material-symbols-outlined text-[20px]">check</span>
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
