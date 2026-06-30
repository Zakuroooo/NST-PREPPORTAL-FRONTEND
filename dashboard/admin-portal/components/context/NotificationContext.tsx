"use client";

import React, { createContext, useContext, useState } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  time: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Student Registration",
      message: "John Doe has registered for the 2025 batch.",
      isRead: false,
      time: "2 mins ago",
    },
    {
      id: "2",
      title: "Faculty Session Completed",
      message: "Dr. Smith completed the Mock Interview session.",
      isRead: false,
      time: "1 hour ago",
    },
    {
      id: "3",
      title: "Doubt Raised",
      message: "A new doubt has been raised in System Design.",
      isRead: true,
      time: "3 hours ago",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
