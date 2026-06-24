"use client";
import { useState } from "react";
import {
  MessageCircle, Plus, ChevronDown, ChevronUp,
  Clock, CheckCircle2, AlertCircle, Send, Tag, X,
} from "lucide-react";

type DoubtStatus = "pending" | "answered" | "resolved";
type DoubtTag = "DSA" | "System Design" | "LLD" | "HR" | "General";

interface DoubtReply {
  id: string;
  author: "faculty" | "student";
  authorName: string;
  body: string;
  sentAt: string;
}

interface Doubt {
  id: string;
  subject: string;
  body: string;
  tag: DoubtTag;
  status: DoubtStatus;
  createdAt: string;
  replies: DoubtReply[];
}

const TAGS: DoubtTag[] = ["DSA", "System Design", "LLD", "HR", "General"];

const mockDoubts: Doubt[] = [
  {
    id: "d1",
    subject: "How to approach 2-pointer problems in interviews?",
    body: "I keep freezing when I see sliding window / two-pointer problems. Should I memorise templates or try to derive them from scratch each time?",
    tag: "DSA",
    status: "answered",
    createdAt: "2026-06-24T10:00:00Z",
    replies: [
      {
        id: "r1", author: "faculty", authorName: "Prof. Sharma",
        body: "Great question! You should understand the intuition behind both patterns so you can derive them. The template approach works initially but breaks down on novel variants. I'd recommend practising 5 two-pointer problems without templates first, then check solutions.",
        sentAt: "2026-06-24T12:30:00Z",
      },
      {
        id: "r2", author: "student", authorName: "You",
        body: "That makes sense! Should I start with LeetCode Easy problems or jump to Medium directly?",
        sentAt: "2026-06-24T13:00:00Z",
      },
    ],
  },
  {
    id: "d2",
    subject: "Difference between HLD and LLD — when to go deep?",
    body: "In a Google interview, if they say 'design a URL shortener', should I go into class diagrams or stay at system level? I get confused about how much depth to cover.",
    tag: "System Design",
    status: "pending",
    createdAt: "2026-06-24T14:00:00Z",
    replies: [],
  },
  {
    id: "d3",
    subject: "STAR method — how long should each answer be?",
    body: "My behavioral answers feel either too short or way too long. Is there a time limit I should target for each STAR response?",
    tag: "HR",
    status: "resolved",
    createdAt: "2026-06-23T09:00:00Z",
    replies: [
      {
        id: "r3", author: "faculty", authorName: "Prof. Sharma",
        body: "Target 2–3 minutes per STAR answer. Situation + Task = ~30 seconds, Action = ~90 seconds (the meat), Result = ~30 seconds. Practice recording yourself — you'll immediately see if you're running long.",
        sentAt: "2026-06-23T11:00:00Z",
      },
    ],
  },
];

// ── Status config — blue/white only ──────────────────
const STATUS_MAP: Record<DoubtStatus, { label: string; dot: string; badge: string }> = {
  pending:  { label: "Awaiting Reply", dot: "bg-blue-400",  badge: "bg-blue-50 text-blue-700 border border-blue-200" },
  answered: { label: "Answered",       dot: "bg-blue-600",  badge: "bg-blue-600 text-white border border-blue-600" },
  resolved: { label: "Resolved",       dot: "bg-gray-400",  badge: "bg-gray-100 text-gray-600 border border-gray-200" },
};

// ── Tag config — blue-scale only ──────────────────────
const TAG_MAP: Record<DoubtTag, string> = {
  "DSA":           "bg-blue-100 text-blue-800",
  "System Design": "bg-blue-50 text-blue-700",
  "LLD":           "bg-slate-100 text-slate-700",
  "HR":            "bg-gray-100 text-gray-700",
  "General":       "bg-gray-50 text-gray-600",
};

function timeAgo(iso: string) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
  return `${Math.floor(mins / 1440)}d ago`;
}

function StatusBadge({ status }: { status: DoubtStatus }) {
  const { label, badge } = STATUS_MAP[status];
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${badge}`}>
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

function DoubtCard({ doubt, onResolve }: { doubt: Doubt; onResolve: (id: string) => void }) {
  const [open, setOpen] = useState(doubt.status === "answered");
  const [replyText, setReplyText] = useState("");

  const leftAccent =
    doubt.status === "answered" ? "border-l-blue-600" :
    doubt.status === "pending"  ? "border-l-blue-300" : "border-l-gray-300";

  return (
    <div className={`bg-white border border-gray-200 border-l-4 ${leftAccent} rounded`}>
      {/* Header row */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-gray-50"
      >
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <TagPill tag={doubt.tag} />
            <StatusBadge status={doubt.status} />
            <span className="text-[11px] text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {timeAgo(doubt.createdAt)}
            </span>
          </div>
          <p className="text-sm font-semibold text-gray-900 leading-snug">{doubt.subject}</p>
          {!open && (
            <p className="text-xs text-gray-400 line-clamp-1">{doubt.body}</p>
          )}
        </div>
        <span className="text-gray-300 mt-0.5 shrink-0">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {open && (
        <div className="border-t border-gray-100">
          {/* Question body */}
          <div className="px-4 py-3 bg-gray-50">
            <p className="text-sm text-gray-600 leading-relaxed">{doubt.body}</p>
          </div>

          {/* Replies */}
          {doubt.replies.map((r) => (
            <div key={r.id} className={`flex gap-3 px-4 py-3 border-t border-gray-100 ${r.author === "faculty" ? "bg-blue-50/40" : ""}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 ${
                r.author === "faculty" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
              }`}>
                {r.authorName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-xs font-semibold ${r.author === "faculty" ? "text-blue-700" : "text-gray-700"}`}>
                    {r.authorName}
                  </span>
                  {r.author === "faculty" && (
                    <span className="text-[9px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded-sm tracking-wide">
                      FACULTY
                    </span>
                  )}
                  <span className="text-[11px] text-gray-400">{timeAgo(r.sentAt)}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{r.body}</p>
              </div>
            </div>
          ))}

          {/* Pending notice */}
          {doubt.status === "pending" && (
            <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-2 text-xs text-blue-600 bg-blue-50/50">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              Waiting for faculty reply — typically within 24 hours
            </div>
          )}

          {/* Follow-up input (only for answered) */}
          {doubt.status === "answered" && (
            <div className="px-4 py-3 border-t border-gray-100 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a follow-up..."
                  className="flex-1 text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <button className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 text-sm">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <button
                onClick={() => onResolve(doubt.id)}
                className="text-xs text-gray-500 font-medium hover:text-blue-600 flex items-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3" /> Mark as Resolved
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function NewDoubtDrawer({ onClose, onSubmit }: {
  onClose: () => void;
  onSubmit: (d: Omit<Doubt, "id" | "replies" | "createdAt" | "status">) => void;
}) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState<DoubtTag>("DSA");

  const canSubmit = subject.trim().length > 5 && body.trim().length > 10;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded w-full max-w-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Ask a Doubt</h2>
            <p className="text-xs text-gray-400 mt-0.5">Faculty typically replies within 24 hours</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          {/* Tag */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Topic Area</label>
            <div className="flex flex-wrap gap-1.5">
              {TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`px-3 py-1 rounded text-xs font-semibold border ${
                    tag === t
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value.slice(0, 100))}
              placeholder="e.g. How to approach graph BFS problems?"
              className="w-full text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-[10px] text-gray-400 mt-1 text-right">{subject.length}/100</p>
          </div>

          {/* Body */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Describe Your Doubt</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              placeholder="Explain your doubt in detail..."
              className="w-full text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b">
          <button onClick={onClose} className="text-sm text-gray-500 px-3 py-1.5">Cancel</button>
          <button
            disabled={!canSubmit}
            onClick={() => { onSubmit({ subject, body, tag }); onClose(); }}
            className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded ${
              canSubmit ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Send className="w-3.5 h-3.5" /> Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DoubtsPage() {
  const [doubts, setDoubts] = useState<Doubt[]>(mockDoubts);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<"all" | DoubtStatus>("all");

  const handleSubmit = (d: Omit<Doubt, "id" | "replies" | "createdAt" | "status">) => {
    setDoubts((prev) => [{
      ...d, id: `d${Date.now()}`, status: "pending",
      createdAt: new Date().toISOString(), replies: [],
    }, ...prev]);
  };

  const handleResolve = (id: string) =>
    setDoubts((prev) => prev.map((d) => d.id === id ? { ...d, status: "resolved" } : d));

  const filtered = filter === "all" ? doubts : doubts.filter((d) => d.status === filter);
  const counts = {
    all: doubts.length,
    pending: doubts.filter((d) => d.status === "pending").length,
    answered: doubts.filter((d) => d.status === "answered").length,
    resolved: doubts.filter((d) => d.status === "resolved").length,
  };

  return (
    <div className="max-w-3xl">
      {/* Page header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Doubts</h1>
          <p className="text-xs text-gray-400 mt-0.5">Ask questions · Get answers from faculty</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 bg-blue-600 text-white font-semibold px-3 py-1.5 rounded text-sm hover:bg-blue-700"
        >
          <Plus className="w-3.5 h-3.5" /> Ask a Doubt
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-0 border border-gray-200 rounded overflow-hidden mb-5 w-fit bg-white">
        {(["all", "pending", "answered", "resolved"] as const).map((f, i) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold capitalize border-r border-gray-200 last:border-r-0 ${
              filter === f
                ? "bg-blue-600 text-white"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            {f}
            <span className={`text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ${
              filter === f ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"
            }`}>
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Total Doubts",   value: counts.all,      color: "text-gray-900" },
          { label: "Awaiting Reply", value: counts.pending,  color: "text-blue-600" },
          { label: "Resolved",       value: counts.resolved, color: "text-gray-500" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-gray-200 rounded px-3 py-2.5">
            <p className={`text-lg font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-400">{label}</p>
          </div>
        ))}
      </div>

      {/* List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-14 bg-white border border-gray-200 rounded">
            <MessageCircle className="w-8 h-8 text-gray-200 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-400">No doubts in this category</p>
          </div>
        ) : (
          filtered.map((d) => <DoubtCard key={d.id} doubt={d} onResolve={handleResolve} />)
        )}
      </div>

      {showForm && <NewDoubtDrawer onClose={() => setShowForm(false)} onSubmit={handleSubmit} />}
    </div>
  );
}
