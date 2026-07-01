import { Bell, CheckCircle2, MessageCircle, AlertTriangle } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "New Session Request",
      message: "Maya Singh has requested a System Design mock interview.",
      time: "10 minutes ago",
      type: "request",
      unread: true,
    },
    {
      id: 2,
      title: "Doubt Unresolved",
      message: "Kavya Rao is waiting for clarification on HLD vs LLD.",
      time: "2 hours ago",
      type: "doubt",
      unread: true,
    },
    {
      id: 3,
      title: "System Update",
      message: "The curriculum matrix has been updated for Q3.",
      time: "1 day ago",
      type: "system",
      unread: false,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Mark all as read
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm divide-y divide-gray-100 overflow-hidden">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 flex gap-4 hover:bg-gray-50 transition-colors cursor-pointer ${
              notification.unread ? "bg-blue-50/50" : ""
            }`}
          >
            <div className="mt-1">
              {notification.type === "request" && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                </div>
              )}
              {notification.type === "doubt" && (
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-amber-600" />
                </div>
              )}
              {notification.type === "system" && (
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-gray-600" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-semibold ${notification.unread ? "text-gray-900" : "text-gray-700"}`}>
                  {notification.title}
                </h3>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            </div>
            {notification.unread && (
              <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 self-center" />
            )}
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Bell className="w-8 h-8 mx-auto mb-3 text-gray-400" />
            <p>You have no notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
}
