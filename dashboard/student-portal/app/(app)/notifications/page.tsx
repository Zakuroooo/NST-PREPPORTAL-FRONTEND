"use client";
import { useState, useEffect } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { mockNotifications, type AppNotification } from "@/lib/mock-data";

function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function NotificationRow({
  notification,
  onMarkRead,
}: {
  notification: AppNotification;
  onMarkRead: (id: string) => void;
}) {
  return (
    <div
      className={`flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer ${
        !notification.read ? "bg-blue-50/40" : ""
      }`}
      onClick={() => onMarkRead(notification.id)}
    >
      {/* Emoji icon */}
      <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm">
        {notification.emoji}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"} truncate`}>
          {notification.title}
        </div>
        {notification.subtitle && (
          <div className="text-xs text-gray-500 mt-0.5 truncate">{notification.subtitle}</div>
        )}
        <div className="text-[11px] text-gray-400 mt-1">{timeAgo(notification.createdAt)}</div>
      </div>

      {/* Unread dot */}
      {!notification.read && (
        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />
      )}
    </div>
  );
}

export default function NotificationsPage() {
  // BACKEND TODO: GET /api/notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);

  // Mark all as read when page loads
  useEffect(() => {
    sessionStorage.setItem("notifications_last_read", new Date().toISOString());
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    // BACKEND TODO: POST /api/notifications/mark-all-read
  };

  const grouped = {
    unread: notifications.filter((n) => !n.read),
    read: notifications.filter((n) => n.read),
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
            <p className="text-sm text-gray-500">
              {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <CheckCheck className="w-4 h-4" /> Mark all read
          </button>
        )}
      </div>

      {/* Notification list */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {/* Unread section */}
        {grouped.unread.length > 0 && (
          <div>
            <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-100">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                New · {grouped.unread.length}
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {grouped.unread.map((n) => (
                <NotificationRow key={n.id} notification={n} onMarkRead={handleMarkRead} />
              ))}
            </div>
          </div>
        )}

        {/* Read section */}
        {grouped.read.length > 0 && (
          <div>
            <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-100">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Earlier
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {grouped.read.map((n) => (
                <NotificationRow key={n.id} notification={n} onMarkRead={handleMarkRead} />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {notifications.length === 0 && (
          <div className="py-20 text-center">
            <div className="text-5xl mb-4">🔔</div>
            <div className="font-semibold text-gray-700">No notifications yet</div>
            <div className="text-sm text-gray-400 mt-1">We&apos;ll notify you about your roadmap, badges, and new questions</div>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        Click a notification to mark it as read
      </p>
    </div>
  );
}
