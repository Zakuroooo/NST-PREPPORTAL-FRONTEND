import Link from "next/link";
import {
  ArrowRight,
  BarChart2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Inbox,
  MessageCircle,
} from "lucide-react";
import { mockFacultySessionRequests } from "@/lib/data/sessionRequests";
import { CATEGORIES, DEFAULT_MATRIX, TOPICS } from "@/lib/data/relevanceMatrix";
import { cn } from "@/lib/utils";

const TODAY = new Date(2026, 5, 26);

function getWeekBounds(date: Date): { start: Date; end: Date } {
  const d = new Date(date);
  const day = d.getDay();
  const start = new Date(d);
  start.setDate(d.getDate() - day);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

const pendingRequests = mockFacultySessionRequests.filter((r) => r.status === "pending");
const confirmedSessions = mockFacultySessionRequests.filter((r) => r.status === "confirmed");

const { start: weekStart, end: weekEnd } = getWeekBounds(TODAY);
const sessionsThisWeek = confirmedSessions.filter((s) => {
  const d = new Date(`${s.date}T00:00:00`);
  return d >= weekStart && d <= weekEnd;
});

const totalCells = TOPICS.length * CATEGORIES.length;
const tickedCells = TOPICS.reduce(
  (acc, topic) => acc + CATEGORIES.filter((cat) => DEFAULT_MATRIX[topic.id]?.[cat.id]).length,
  0
);
const coveragePct = Math.round((tickedCells / totalCells) * 100);

const quickLinks = [
  {
    href: "/requests",
    icon: CalendarDays,
    label: "Session Requests",
    description: "Review pending student session bookings",
    badge: pendingRequests.length > 0 ? `${pendingRequests.length} pending` : null,
    accentColor: "bg-blue-50 text-blue-600",
  },
  {
    href: "/doubts",
    icon: MessageCircle,
    label: "Doubts & Questions",
    description: "Answer tagged student doubts across interview topics",
    badge: null,
    accentColor: "bg-emerald-50 text-emerald-600",
  },
  {
    href: "/curriculum",
    icon: BarChart2,
    label: "Curriculum Gap Matrix",
    description: "Check syllabus coverage against interview categories",
    badge: null,
    accentColor: "bg-amber-50 text-amber-600",
  },
];

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("rounded px-2 py-0.5 text-xs font-medium", className)}>
      {children}
    </span>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <Inbox className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{pendingRequests.length}</p>
              <p className="mt-0.5 text-sm font-medium text-gray-500">Pending Requests</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
              <CalendarDays className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{sessionsThisWeek.length}</p>
              <p className="mt-0.5 text-sm font-medium text-gray-500">Sessions This Week</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50">
              <BarChart2 className="h-6 w-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-3xl font-bold text-gray-900">{coveragePct}%</p>
              <p className="mt-0.5 text-sm font-medium text-gray-500">Curriculum Coverage</p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={cn(
                    "h-full rounded-full",
                    coveragePct >= 70 ? "bg-emerald-500" : coveragePct >= 40 ? "bg-amber-500" : "bg-blue-600"
                  )}
                  style={{ width: `${coveragePct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900">Upcoming Sessions</h2>
            <Link href="/requests" className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
              View Requests
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3 p-6">
            {confirmedSessions.slice(0, 3).map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between rounded-lg border border-gray-100 p-3.5 transition-colors hover:border-gray-200 hover:bg-gray-50/50"
              >
                <div>
                  <p className="mb-1 text-sm font-bold leading-none text-gray-900">{session.studentName}</p>
                  <p className="text-xs text-gray-500">{session.topic}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-blue-600">{session.time}</p>
                  <p className="text-xs text-gray-400">{session.date}</p>
                </div>
              </div>
            ))}
            {confirmedSessions.length === 0 && (
              <p className="py-4 text-center text-sm italic text-gray-400">No upcoming sessions.</p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900">Pending Action Needed</h2>
            <Link href="/requests" className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
              View All Requests
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3 p-6">
            {pendingRequests.slice(0, 3).map((req) => (
              <div
                key={req.id}
                className="flex items-center gap-3 rounded-lg border border-gray-100 p-3.5 transition-colors hover:border-gray-200 hover:bg-gray-50/50"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  {req.studentInitials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-1 truncate text-sm font-bold leading-none text-gray-900">{req.studentName}</p>
                  <p className="truncate text-xs text-gray-500">
                    {req.branch} · {req.year}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <Badge className="border border-blue-200 bg-blue-50 text-[10px] font-semibold text-blue-700">
                    {req.topic}
                  </Badge>
                  <p className="text-[10px] text-gray-400">{req.date}</p>
                </div>
              </div>
            ))}
            {pendingRequests.length === 0 && (
              <p className="flex items-center justify-center gap-2 py-4 text-center text-sm italic text-gray-400">
                <CheckCircle2 className="h-4 w-4 text-gray-400" />
                All caught up. No pending requests.
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Quick Links</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className="group block">
              <div className="h-full rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-blue-200">
                <div className="flex items-start gap-4">
                  <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", link.accentColor)}>
                    <link.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                        {link.label}
                      </p>
                      {link.badge && (
                        <Badge className="border border-blue-200 bg-blue-50 text-[10px] text-blue-700">
                          {link.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed text-gray-500">{link.description}</p>
                  </div>
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-blue-600" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
