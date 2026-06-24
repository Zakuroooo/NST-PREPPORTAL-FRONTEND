"use client";
import { useState } from "react";
import {
  CalendarDays, Clock, CheckCircle2, XCircle, AlertCircle,
  Video, ChevronLeft, ChevronRight, X, Send, User,
} from "lucide-react";

type SessionStatus = "pending" | "confirmed" | "proposed" | "completed" | "cancelled";

interface Session {
  id: string;
  topic: string;
  notes: string;
  date: string;
  time: string;
  duration: 30 | 60;
  status: SessionStatus;
  facultyName: string;
  meetLink?: string;
  proposedDate?: string;
  proposedTime?: string;
}

const TIME_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

const mockSessions: Session[] = [
  {
    id: "s1", topic: "System Design Mock Interview",
    notes: "Want to practice designing a URL shortener end-to-end",
    date: "2026-06-26", time: "10:00 AM", duration: 60,
    status: "confirmed", facultyName: "Prof. Sharma",
    meetLink: "https://meet.jit.si/NST-PlacePrep-s1-x7k2m",
  },
  {
    id: "s2", topic: "DSA Doubt Clearing",
    notes: "Two-pointer and sliding window patterns",
    date: "2026-06-28", time: "3:00 PM", duration: 30,
    status: "proposed", facultyName: "Prof. Sharma",
    proposedDate: "2026-06-29", proposedTime: "4:00 PM",
  },
  {
    id: "s3", topic: "HR Round Preparation",
    notes: "STAR method practice for Amazon Leadership Principles",
    date: "2026-06-20", time: "11:00 AM", duration: 60,
    status: "completed", facultyName: "Prof. Sharma",
    meetLink: "https://meet.jit.si/NST-PlacePrep-s3-a8b2c",
  },
];

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayOfMonth(y: number, m: number) { return new Date(y, m, 1).getDay(); }

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

function daysUntil(dateStr: string) {
  const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
  if (diff < 0) return null;
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return `In ${diff} days`;
}

const STATUS_CFG: Record<SessionStatus, { label: string; cls: string; icon: React.ElementType }> = {
  pending:   { label: "Pending",            cls: "bg-blue-50 text-blue-700 border border-blue-200",  icon: Clock },
  confirmed: { label: "Confirmed",          cls: "bg-blue-600 text-white border border-blue-600",    icon: CheckCircle2 },
  proposed:  { label: "New Time Proposed",  cls: "bg-slate-100 text-slate-700 border border-slate-200", icon: AlertCircle },
  completed: { label: "Completed",          cls: "bg-gray-100 text-gray-500 border border-gray-200", icon: CheckCircle2 },
  cancelled: { label: "Cancelled",          cls: "bg-gray-100 text-gray-400 border border-gray-200", icon: XCircle },
};

// ── Calendar ──────────────────────────────────────────
function MiniCalendar({ onSelect, selected }: { onSelect: (d: string) => void; selected: string }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => viewMonth === 0 ? (setViewMonth(11), setViewYear(y => y - 1)) : setViewMonth(m => m - 1);
  const nextMonth = () => viewMonth === 11 ? (setViewMonth(0), setViewYear(y => y + 1)) : setViewMonth(m => m + 1);

  const isAvail = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    // All future dates (including today) are bookable — no day-of-week restriction
    return d >= today;
  };

  const ds = (day: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  return (
    <div className="bg-white border border-gray-200 rounded">
      {/* Month nav */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded text-gray-400">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-semibold text-gray-800">{MONTHS[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded text-gray-400">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 px-3 pt-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">{d}</div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-0.5 px-3 pb-3">
        {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const dateStr = ds(day);
          const avail = isAvail(day);
          const isSel = dateStr === selected;
          const isPast = new Date(viewYear, viewMonth, day) < today;
          return (
            <button
              key={day}
              disabled={!avail}
              onClick={() => onSelect(dateStr)}
              className={`aspect-square rounded text-[11px] font-medium flex items-center justify-center ${
                isSel  ? "bg-blue-600 text-white" :
                avail  ? "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200" :
                isPast ? "text-gray-200 cursor-default" : "text-gray-200 cursor-default"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-4 py-2.5 border-t border-gray-100 text-[10px] text-gray-400">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-blue-50 border border-blue-200 inline-block" />
          Available (any future date)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-blue-600 inline-block" />
          Selected
        </span>
      </div>
    </div>
  );
}

// ── Booking Drawer ────────────────────────────────────
function BookingDrawer({ selectedDate, onClose, onBook }: {
  selectedDate: string;
  onClose: () => void;
  onBook: (s: Omit<Session, "id" | "status" | "facultyName" | "meetLink">) => void;
}) {
  const [time, setTime] = useState(TIME_SLOTS[0]);
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [duration, setDuration] = useState<30 | 60>(30);
  const canBook = topic.trim().length > 3;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Book a Session</h2>
            <p className="text-xs text-gray-400 mt-0.5">{fmtDate(selectedDate)}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
        </div>

        <div className="px-5 py-4 space-y-4">
          {/* Time slots */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Time Slot</label>
            <div className="grid grid-cols-4 gap-1.5">
              {TIME_SLOTS.map((t) => (
                <button key={t} onClick={() => setTime(t)}
                  className={`py-1.5 rounded text-xs font-semibold border ${
                    time === t
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
                  }`}
                >{t}</button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Duration</label>
            <div className="flex gap-2">
              {([30, 60] as const).map((d) => (
                <button key={d} onClick={() => setDuration(d)}
                  className={`flex-1 py-1.5 rounded text-sm font-semibold border ${
                    duration === d
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
                  }`}
                >{d} min</button>
              ))}
            </div>
          </div>

          {/* Topic */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Session Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. System Design Mock, DSA Doubt Clearing..."
              className="w-full text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
              Notes <span className="font-normal text-gray-400 normal-case">(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Specific topics or questions to cover..."
              className="w-full text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <p className="text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded px-3 py-2">
            A Jitsi Meet link will be shared once faculty confirms.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b">
          <button onClick={onClose} className="text-sm text-gray-500 px-3 py-1.5">Cancel</button>
          <button
            disabled={!canBook}
            onClick={() => { onBook({ topic, notes, date: selectedDate, time, duration }); onClose(); }}
            className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded ${
              canBook ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Send className="w-3.5 h-3.5" /> Send Request
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Session Card ──────────────────────────────────────
function SessionCard({ session, onAcceptProposal }: { session: Session; onAcceptProposal: (id: string) => void }) {
  const { label, cls, icon: StatusIcon } = STATUS_CFG[session.status];
  const until = daysUntil(session.date);
  const showJoin = session.status === "confirmed" && new Date(session.date) >= new Date();

  return (
    <div className={`bg-white border border-gray-200 rounded overflow-hidden ${
      session.status === "proposed" ? "border-l-4 border-l-blue-400" :
      session.status === "confirmed" ? "border-l-4 border-l-blue-600" : ""
    }`}>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${cls}`}>
                <StatusIcon className="w-3 h-3" /> {label}
              </span>
              {until && (
                <span className="text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {until}
                </span>
              )}
            </div>
            <h3 className="text-sm font-bold text-gray-900">{session.topic}</h3>
            {session.notes && <p className="text-xs text-gray-400 mt-0.5">{session.notes}</p>}
            <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-gray-400">
              <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" />{fmtDate(session.date)}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{session.time} · {session.duration} min</span>
              <span className="flex items-center gap-1"><User className="w-3 h-3" />{session.facultyName}</span>
            </div>
          </div>
          {showJoin && session.meetLink && (
            <a href={session.meetLink} target="_blank" rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded hover:bg-blue-700"
            >
              <Video className="w-3.5 h-3.5" /> Join
            </a>
          )}
        </div>
      </div>

      {session.status === "proposed" && session.proposedDate && (
        <div className="border-t border-gray-100 bg-blue-50/50 px-4 py-3">
          <p className="text-xs font-semibold text-gray-700 mb-0.5">Faculty proposed a new time</p>
          <p className="text-xs text-blue-700 font-medium">{fmtDate(session.proposedDate)} at {session.proposedTime}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => onAcceptProposal(session.id)}
              className="flex items-center gap-1 text-xs font-semibold bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
            >
              <CheckCircle2 className="w-3 h-3" /> Accept
            </button>
            <button className="flex items-center gap-1 text-xs font-medium border border-gray-300 text-gray-500 px-3 py-1.5 rounded hover:bg-gray-50">
              <XCircle className="w-3 h-3" /> Decline
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [selectedDate, setSelectedDate] = useState("");
  const [showBooking, setShowBooking] = useState(false);
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const handleBook = (data: Omit<Session, "id" | "status" | "facultyName" | "meetLink">) =>
    setSessions((prev) => [{ ...data, id: `s${Date.now()}`, status: "pending", facultyName: "Prof. Sharma" }, ...prev]);

  const handleAcceptProposal = (id: string) =>
    setSessions((prev) => prev.map((s) => s.id === id ? {
      ...s, status: "confirmed",
      date: s.proposedDate ?? s.date, time: s.proposedTime ?? s.time,
      meetLink: `https://meet.jit.si/NST-PlacePrep-${id}-${Math.random().toString(36).slice(2, 6)}`,
    } : s));

  const upcoming = sessions.filter((s) => ["pending", "confirmed", "proposed"].includes(s.status));
  const past = sessions.filter((s) => ["completed", "cancelled"].includes(s.status));

  return (
    <div className="max-w-5xl">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">Book a Session</h1>
        <p className="text-xs text-gray-400 mt-0.5">Schedule 1:1 sessions with your faculty mentor</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5">
        {/* Left: Calendar */}
        <div className="space-y-3">
          <MiniCalendar onSelect={setSelectedDate} selected={selectedDate} />

          {selectedDate ? (
            <div className="bg-white border border-gray-200 rounded p-3">
              <p className="text-xs text-gray-400 mb-0.5">Selected</p>
              <p className="text-sm font-semibold text-gray-900 mb-3">{fmtDate(selectedDate)}</p>
              <button
                onClick={() => setShowBooking(true)}
                className="w-full bg-blue-600 text-white text-sm font-semibold py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Request This Slot
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded p-3 text-xs text-gray-400 space-y-1">
              <p className="font-semibold text-gray-600 text-xs mb-1.5">How it works</p>
              <p>1. Click a blue (available) date on the calendar</p>
              <p>2. Choose time slot and session topic</p>
              <p>3. Faculty confirms or proposes a new time</p>
              <p>4. Jitsi Meet link is auto-generated on confirmation</p>
            </div>
          )}
        </div>

        {/* Right: Sessions */}
        <div>
          {/* Tab switcher */}
          <div className="flex items-center gap-0 border border-gray-200 rounded overflow-hidden mb-4 w-fit bg-white">
            {(["upcoming", "past"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-1.5 text-xs font-semibold capitalize border-r border-gray-200 last:border-r-0 ${
                  tab === t ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {t} ({t === "upcoming" ? upcoming.length : past.length})
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {(tab === "upcoming" ? upcoming : past).length === 0 ? (
              <div className="text-center py-12 bg-white border border-gray-200 rounded">
                <CalendarDays className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                <p className="text-sm text-gray-400">
                  {tab === "upcoming" ? "No upcoming sessions — pick a date to book one" : "No past sessions yet"}
                </p>
              </div>
            ) : (
              (tab === "upcoming" ? upcoming : past).map((s) => (
                <SessionCard key={s.id} session={s} onAcceptProposal={handleAcceptProposal} />
              ))
            )}
          </div>
        </div>
      </div>

      {showBooking && selectedDate && (
        <BookingDrawer selectedDate={selectedDate} onClose={() => setShowBooking(false)} onBook={handleBook} />
      )}
    </div>
  );
}
