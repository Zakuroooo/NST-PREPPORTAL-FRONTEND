"use client";

import { useState, useEffect } from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Video,
} from "lucide-react";
import { mockFacultySessionRequests } from "@/lib/mock-data";
import { FacultySessionRequest, SessionStatus } from "@/lib/mock-data";

const TIME_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

const STATUS_CFG: Record<SessionStatus, { label: string; cls: string; icon: React.ElementType }> = {
  pending: { label: "Pending", cls: "bg-blue-50 text-blue-700 border-blue-200", icon: Clock },
  confirmed: { label: "Confirmed", cls: "bg-blue-600 text-white border-blue-600", icon: CheckCircle2 },
  proposed: { label: "New Time Proposed", cls: "bg-slate-100 text-slate-700 border-slate-200", icon: AlertCircle },
  completed: { label: "Completed", cls: "bg-gray-100 text-gray-500 border-gray-200", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", cls: "bg-gray-100 text-gray-400 border-gray-200", icon: XCircle },
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<FacultySessionRequest[]>(mockFacultySessionRequests);
  const [activeTab, setActiveTab] = useState<"All" | SessionStatus>("All");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [proposingFor, setProposingFor] = useState<string | null>(null);
  const [proposedDate, setProposedDate] = useState("");
  const [proposedTime, setProposedTime] = useState(TIME_SLOTS[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filteredRequests = requests.filter(
    (r) => activeTab === "All" || r.status === activeTab
  );

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const confirmedThisWeek = requests.filter(
    (r) => r.status === "confirmed" && new Date(r.date) >= new Date()
  ).length;

  const handleConfirm = (id: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "confirmed",
              meetLink: `https://meet.jit.si/NST-PlacePrep-${id}-${Math.random().toString(36).slice(2, 7)}`,
            }
          : r
      )
    );
  };

  const handleDecline = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "cancelled" } : r))
    );
  };

  const handleProposeSubmit = (id: string) => {
    if (!proposedDate) return;
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "proposed",
              proposedDate,
              proposedTime,
            }
          : r
      )
    );
    setProposingFor(null);
    setProposedDate("");
    setProposedTime(TIME_SLOTS[0]);
  };

  return (
    <div className="max-w-6xl pb-20">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Session Requests</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage 1:1 session requests from students
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-lg"></div>)}
          </div>
          {[1,2,3,4].map(i => <div key={i} className="h-28 bg-gray-100 animate-pulse rounded-xl"></div>)}
        </div>
      ) : (
        <>
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded px-3 py-2.5 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Total Requests</p>
          <p className="text-xl font-bold text-gray-900">{requests.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded px-3 py-2.5 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Pending Action</p>
          <p className="text-xl font-bold text-blue-600">{pendingCount}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded px-3 py-2.5 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Confirmed This Week</p>
          <p className="text-xl font-bold text-gray-900">{confirmedThisWeek}</p>
        </div>
      </div>

      {/* Tabs and View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-0 border border-gray-200 rounded overflow-hidden w-fit bg-white shadow-sm">
          {(["All", "pending", "confirmed", "proposed", "completed"] as const).map(
            (tab) => {
              const isActive = activeTab === tab;
              const count =
                tab === "All"
                  ? requests.length
                  : requests.filter((r) => r.status === tab).length;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-bold capitalize flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {tab}
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            }
          )}
        </div>
        
        {/* View Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${viewMode === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${viewMode === "calendar" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            Calendar
          </button>
        </div>
      </div>

      {/* Content View */}
      {viewMode === "calendar" ? (
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
           <CalendarDays className="w-12 h-12 text-blue-100 mx-auto mb-4" />
           <h3 className="text-lg font-bold text-gray-900">Calendar View Ready</h3>
           <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
             Full calendar synchronization will be available once the backend is connected. Currently displaying {filteredRequests.length} matching requests in list mode.
           </p>
           <button onClick={() => setViewMode("list")} className="mt-6 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700">
             Switch back to List
           </button>
        </div>
      ) : (
        <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-xl">
            <CalendarDays className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-500">
              No {activeTab !== "All" ? activeTab : ""} requests found.
            </p>
          </div>
        ) : (
          filteredRequests.map((req) => {
            const { label, cls, icon: StatusIcon } = STATUS_CFG[req.status];
            
            // Determine left border color based on status
            let borderAccent = "border-l-gray-300";
            if (req.status === "confirmed") borderAccent = "border-l-blue-600";
            else if (req.status === "pending") borderAccent = "border-l-blue-300";
            else if (req.status === "proposed") borderAccent = "border-l-slate-400";

            return (
              <div
                key={req.id}
                className={`bg-white border border-gray-200 border-l-4 ${borderAccent} rounded shadow-sm p-4`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                      {req.studentInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-sm text-gray-900">
                          {req.studentName}
                        </h3>
                        <span className="text-xs text-gray-500">
                          • {req.branch}, {req.year}
                        </span>
                      </div>
                      <p className="font-bold text-sm text-gray-900 mb-1">
                        {req.topic}
                      </p>
                      {req.notes && (
                        <p className="text-xs text-gray-400 mb-3">
                          {req.notes}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {fmtDate(req.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {req.time} · {req.duration} min
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] font-semibold ${cls}`}
                        >
                          <StatusIcon className="w-3 h-3" /> {label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {req.status === "pending" && proposingFor !== req.id && (
                      <>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleConfirm(req.id)}
                            className="bg-blue-600 text-white text-xs font-semibold px-4 py-1.5 rounded hover:bg-blue-700 transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setProposingFor(req.id)}
                            className="border border-gray-300 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded hover:bg-gray-50 transition-colors"
                          >
                            Propose New Time
                          </button>
                        </div>
                        <button
                          onClick={() => handleDecline(req.id)}
                          className="text-xs text-gray-400 hover:text-gray-600 font-medium mt-1"
                        >
                          Decline Request
                        </button>
                      </>
                    )}

                    {/* Inline Propose Form */}
                    {proposingFor === req.id && (
                      <div className="bg-gray-50 border border-gray-200 rounded p-3 text-right">
                        <p className="text-xs font-bold text-gray-700 mb-2">Propose Alternative Time</p>
                        <div className="flex items-center gap-2 mb-3">
                          <input
                            type="date"
                            value={proposedDate}
                            onChange={(e) => setProposedDate(e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-blue-500"
                          />
                          <select
                            value={proposedTime}
                            onChange={(e) => setProposedTime(e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-blue-500"
                          >
                            {TIME_SLOTS.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setProposingFor(null)}
                            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleProposeSubmit(req.id)}
                            disabled={!proposedDate}
                            className="text-xs font-semibold bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 disabled:opacity-50"
                          >
                            Send Proposal
                          </button>
                        </div>
                      </div>
                    )}

                    {req.status === "confirmed" && req.meetLink && (
                      <a
                        href={req.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-4 py-1.5 rounded hover:bg-blue-700 transition-colors"
                      >
                        <Video className="w-3.5 h-3.5" /> Join
                      </a>
                    )}
                  </div>
                </div>

                {/* Proposed State Context */}
                {req.status === "proposed" && req.proposedDate && (
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-0.5">
                        Awaiting student response
                      </p>
                      <p className="text-xs text-blue-600 font-medium">
                        You proposed: {fmtDate(req.proposedDate)} at {req.proposedTime}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      )}
      </>
      )}
    </div>
  );
}
