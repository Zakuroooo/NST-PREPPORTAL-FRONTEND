"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { CalendarDays, Check, Plus, X } from "lucide-react";
import { mockSessionRequests, type SessionRequest, type SessionStatus } from "@/lib/data/sessionRequests";
import { cn } from "@/lib/utils";

function StatusBadge({ status }: { status: SessionStatus }) {
  return (
    <span
      className={cn(
        "rounded border px-2 py-0.5 text-xs font-medium capitalize",
        status === "pending" && "border-blue-200 bg-blue-50 text-blue-700",
        status === "accepted" && "border-blue-600 bg-blue-600 text-white",
        status === "declined" && "border-gray-200 bg-gray-100 text-gray-500"
      )}
    >
      {status}
    </span>
  );
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<SessionRequest[]>(mockSessionRequests);
  const [open, setOpen] = useState(false);

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  const updateStatus = (id: string, newStatus: SessionStatus) => {
    setRequests((current) =>
      current.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
    );
  };

  const handleAddRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const studentName = formData.get("name") as string;

    const newReq: SessionRequest = {
      id: `req-${Date.now()}`,
      studentName,
      studentInitials: studentName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .substring(0, 2)
        .toUpperCase(),
      branch: "Computer Science",
      year: "Year 3",
      topicTag: formData.get("topic") as string,
      preferredDate: formData.get("date") as string,
      preferredTime: formData.get("time") as string,
      note: "",
      status: "pending",
    };

    setRequests((current) => [...current, newReq]);
    setOpen(false);
  };

  return (
    <div className="relative space-y-6 pb-20">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <button className="rounded border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
            All Requests
          </button>
          <button className="rounded px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">
            This Week
          </button>
        </div>
        <p className="text-sm font-medium text-gray-500">Showing {pendingCount} pending actions</p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {requests.map((request) => (
          <div key={request.id} className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="relative flex items-start justify-between gap-4 p-6 pb-3">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white">
                  {request.studentInitials}
                </div>
                <div>
                  <h3 className="mb-1.5 text-lg font-bold leading-none text-gray-900">{request.studentName}</h3>
                  <p className="text-sm text-gray-500">
                    {request.branch} · {request.year}
                  </p>
                </div>
              </div>
              <StatusBadge status={request.status} />
            </div>

            <div className="flex-1 px-6 pb-6 pt-3">
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <span className="w-fit rounded border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                    {request.topicTag}
                  </span>
                  <div className="flex items-center text-sm font-medium text-gray-600">
                    <CalendarDays className="mr-1.5 h-4 w-4 shrink-0 text-gray-400" />
                    {request.preferredDate}, {request.preferredTime}
                  </div>
                </div>
                {request.note && <p className="mt-3 text-sm italic text-gray-500">"{request.note}"</p>}
              </div>
            </div>

            {request.status === "pending" && (
              <div className="flex gap-3 rounded-b-xl border-t border-gray-100 bg-gray-50/50 p-4">
                <button
                  className="flex flex-1 items-center justify-center gap-2 rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                  onClick={() => updateStatus(request.id, "accepted")}
                >
                  <Check className="h-4 w-4" />
                  Accept
                </button>
                <button
                  className="flex flex-1 items-center justify-center gap-2 rounded border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => updateStatus(request.id, "declined")}
                >
                  <X className="h-4 w-4" />
                  Decline
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 p-0 text-white shadow-sm hover:bg-blue-700"
        onClick={() => setOpen(true)}
        aria-label="Add request"
      >
        <Plus className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/30 px-4">
          <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-start justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">New Session Request</h2>
                <p className="mt-1 text-sm text-gray-500">Create a new doubt-clearing session request manually.</p>
              </div>
              <button
                className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                onClick={() => setOpen(false)}
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddRequest} className="space-y-4 p-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Student Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. Jane Doe"
                  className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="topic" className="text-sm font-medium text-gray-700">
                  Topic
                </label>
                <input
                  id="topic"
                  name="topic"
                  required
                  placeholder="e.g. System Design"
                  className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    required
                    placeholder="Oct 16, 2026"
                    className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="time" className="text-sm font-medium text-gray-700">
                    Time
                  </label>
                  <input
                    id="time"
                    name="time"
                    required
                    placeholder="10:00 AM"
                    className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Add Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
