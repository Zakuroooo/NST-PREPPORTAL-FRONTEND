"use client";
import { useState, useEffect } from "react";
import {
  MessageCircle, ChevronDown, ChevronUp,
  Clock, CheckCircle2, AlertCircle, Send, Tag, X,
} from "lucide-react";
import { mockFacultyDoubts } from "@/lib/mock-data";
import { FacultyDoubt, DoubtStatus, DoubtTag, DoubtReply } from "@/lib/mock-data";
import { useFaculty } from "@/lib/context/FacultyContext";

// ── Status config — blue/white only ──────────────────
const STATUS_MAP: Record<DoubtStatus, { label: string; dot: string; badge: string }> = {
  pending:  { label: "Awaiting Reply", dot: "bg-blue-400",  badge: "bg-blue-50 text-blue-700 border-blue-200" },
  answered: { label: "Answered",       dot: "bg-blue-600",  badge: "bg-blue-600 text-white border-blue-600" },
  resolved: { label: "Resolved",       dot: "bg-gray-400",  badge: "bg-gray-100 text-gray-600 border-gray-200" },
};

// ── Tag config — blue-scale only ──────────────────────
const TAG_MAP: Record<DoubtTag, string> = {
  "DSA":           "bg-blue-100 text-blue-800",
  "System Design": "bg-blue-50 text-blue-700",
  "LLD":           "bg-slate-100 text-slate-700",
  "HR":            "bg-gray-100 text-gray-700",
  "General":       "bg-gray-50 text-gray-600",
  "Web Development": "bg-cyan-100 text-cyan-800",
  "Aptitude":      "bg-orange-100 text-orange-800",
};

function timeAgo(iso: string) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
  return `${Math.floor(mins / 1440)}d ago`;
}

function StatusBadge({ status }: { status: DoubtStatus }) {
  const { label, badge, dot } = STATUS_MAP[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded border ${badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

function TagPill({ tag }: { tag: DoubtTag }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded ${TAG_MAP[tag]}`}>
      <Tag className="w-2.5 h-2.5" /> {tag}
    </span>
  );
}

function DoubtCard({ doubt, isMySubject, onReply, onResolve }: { doubt: FacultyDoubt; isMySubject: boolean; onReply: (id: string, text: string) => void; onResolve: (id: string) => void }) {
  const [open, setOpen] = useState(doubt.status === "answered");
  const [replyText, setReplyText] = useState("");

  const leftAccent =
    doubt.status === "answered" ? "border-l-blue-600" :
    doubt.status === "pending"  ? "border-l-blue-300" : "border-l-gray-300";

  const handleSendReply = () => {
    if (replyText.trim()) {
      onReply(doubt.id, replyText);
      setReplyText("");
    }
  };

  return (
    <div className={`bg-white border border-gray-200 border-l-4 ${leftAccent} rounded shadow-sm`}>
      {/* Header row */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <TagPill tag={doubt.tag} />
            {isMySubject && (
              <span className="inline-flex items-center text-[10px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                Matches your expertise
              </span>
            )}
            <StatusBadge status={doubt.status} />
            <span className="text-[11px] text-gray-400 flex items-center gap-1 ml-auto sm:ml-0">
              <Clock className="w-3 h-3" /> {timeAgo(doubt.createdAt)}
            </span>
          </div>
          <p className="text-sm font-semibold text-gray-900 leading-snug">
            {doubt.studentName}: <span className="font-normal">{doubt.subject}</span>
          </p>
          {!open && (
            <p className="text-xs text-gray-400 line-clamp-1">{doubt.body}</p>
          )}
        </div>
        <span className="text-gray-400 mt-0.5 shrink-0 hover:text-gray-600 bg-gray-50 p-1 rounded">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {open && (
        <div className="border-t border-gray-100">
          {/* Question body */}
          <div className="px-5 py-4 bg-gray-50">
            <p className="text-sm text-gray-700 leading-relaxed">{doubt.body}</p>
          </div>

          {/* Replies */}
          {doubt.replies.map((r) => (
            <div key={r.id} className={`flex gap-3 px-5 py-4 border-t border-gray-100 ${r.author === "faculty" ? "bg-blue-50/40" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                r.author === "faculty" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}>
                {r.authorName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold ${r.author === "faculty" ? "text-blue-700" : "text-gray-900"}`}>
                    {r.authorName}
                  </span>
                  {r.author === "faculty" && (
                    <span className="text-[9px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded tracking-wide">
                      FACULTY
                    </span>
                  )}
                  <span className="text-[11px] text-gray-400">• {timeAgo(r.sentAt)}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{r.body}</p>
              </div>
            </div>
          ))}

          {/* Pending notice */}
          {doubt.status === "pending" && (
            <div className="px-5 py-3 border-t border-gray-100 flex items-center gap-2 text-xs font-medium text-blue-600 bg-blue-50/60">
              <AlertCircle className="w-4 h-4 shrink-0" />
              Awaiting your response
            </div>
          )}

          {/* Follow-up / Reply composer */}
          {doubt.status !== "resolved" && (
            <div className="px-5 py-4 border-t border-gray-100 space-y-3 bg-white">
              <div className="flex gap-3">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply to the student..."
                  rows={2}
                  className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
                />
                <button 
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 text-sm font-medium self-end py-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-4 h-4" /> Send Reply
                </button>
              </div>
              
              {doubt.status === "answered" && (
                <div className="flex justify-end">
                  <button
                    onClick={() => onResolve(doubt.id)}
                    className="text-xs text-gray-500 font-medium hover:text-gray-800 flex items-center gap-1 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-gray-400" /> Mark as Resolved
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function DoubtsPage() {
  const { currentFaculty, updateFacultySolvedCount } = useFaculty();
  const [doubts, setDoubts] = useState<FacultyDoubt[]>(mockFacultyDoubts);
  const [filter, setFilter] = useState<"All" | DoubtStatus>("All");
  const [subjectFilter, setSubjectFilter] = useState<"My Subjects" | "All Doubts">("My Subjects");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const handleReply = (id: string, text: string) => {
    // Check if this is a first answer (pending -> answered) BEFORE updating doubts state.
    // This must be called here in the event handler body, NOT inside the setDoubts updater,
    // because the updater runs during React's render phase and calling setState on another
    // component (FacultyProvider) from there triggers "Cannot update a component while
    // rendering a different component".
    const doubt = doubts.find(d => d.id === id);
    if (doubt?.status === "pending" && currentFaculty) {
      updateFacultySolvedCount(currentFaculty.id);
    }

    setDoubts(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          status: d.status === "pending" ? "answered" : d.status,
          replies: [
            ...d.replies,
            {
              id: `r${Date.now()}`,
              author: "faculty",
              authorName: currentFaculty?.name || "Prof. Sharma",
              body: text,
              sentAt: new Date().toISOString()
            }
          ]
        };
      }
      return d;
    }));
  };

  const handleResolve = (id: string) => {
    setDoubts((prev) => prev.map((d) => d.id === id ? { ...d, status: "resolved" } : d));
  };

  const subjectDoubts = subjectFilter === "My Subjects" && currentFaculty
    ? doubts.filter(d => currentFaculty.subjects.includes(d.tag))
    : doubts;

  const filtered = filter === "All" ? subjectDoubts : subjectDoubts.filter((d) => d.status === filter);
  
  const counts = {
    All: subjectDoubts.length,
    pending: subjectDoubts.filter((d) => d.status === "pending").length,
    answered: subjectDoubts.filter((d) => d.status === "answered").length,
    resolved: subjectDoubts.filter((d) => d.status === "resolved").length,
  };

  return (
    <div className="max-w-4xl pb-20">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Doubts & Questions</h1>
        <p className="text-sm text-gray-500 mt-1">Answer student questions across all topics</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-lg"></div>)}
          </div>
          {[1,2,3,4,5].map(i => <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-xl"></div>)}
        </div>
      ) : (
        <>
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Doubts",   value: counts.All,      color: "text-gray-900" },
          { label: "Awaiting Reply", value: counts.pending,  color: "text-blue-600" },
          { label: "Resolved",       value: counts.resolved, color: "text-gray-500" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-gray-200 rounded px-3 py-2.5 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className={`text-xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-0 border border-gray-200 rounded overflow-hidden mb-4 w-fit bg-white shadow-sm">
        {(["All", "pending", "answered", "resolved"] as const).map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold capitalize transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {f}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                isActive ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"
              }`}>
                {counts[f]}
              </span>
            </button>
          )
        })}
      </div>

      {/* Subject Filter tabs */}
      <div className="flex items-center gap-0 border border-gray-200 rounded overflow-hidden mb-6 w-fit bg-white shadow-sm">
        {(["All Doubts", "My Subjects"] as const).map((f) => {
          const isActive = subjectFilter === f;
          return (
            <button
              key={f}
              onClick={() => setSubjectFilter(f)}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold transition-colors ${
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {f}
            </button>
          )
        })}
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-xl">
            <MessageCircle className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-500">No {filter !== "All" ? filter : ""} doubts found.</p>
          </div>
        ) : (
          filtered.map((d) => (
            <DoubtCard 
              key={d.id} 
              doubt={d} 
              isMySubject={currentFaculty ? currentFaculty.subjects.includes(d.tag) : false}
              onReply={handleReply}
              onResolve={handleResolve} 
            />
          ))
        )}
      </div>
      </>
      )}
    </div>
  );
}
