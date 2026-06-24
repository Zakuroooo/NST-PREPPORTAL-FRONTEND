"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Search, Circle } from "lucide-react";

interface Message {
  id: string;
  senderId: "student" | "faculty";
  body: string;
  sentAt: string;
  seen: boolean;
}

interface Faculty {
  id: string;
  name: string;
  initials: string;
  subject: string;
  online: boolean;
  lastMessage: string;
  lastAt: string;
  unread: number;
}

const mockFaculty: Faculty[] = [
  {
    id: "f1", name: "Prof. Sharma", initials: "PS",
    subject: "DSA & System Design Mentor", online: true,
    lastMessage: "You're on the right track! Keep practising.",
    lastAt: "2026-06-24T13:45:00Z", unread: 1,
  },
  {
    id: "f2", name: "Dr. Meera Kapoor", initials: "MK",
    subject: "HR & Soft Skills Coach", online: false,
    lastMessage: "Send me your updated STAR story by tomorrow.",
    lastAt: "2026-06-23T10:00:00Z", unread: 0,
  },
];

const mockMessages: Record<string, Message[]> = {
  f1: [
    { id: "m1", senderId: "faculty", body: "Hi! How is your prep going? Did you try the two-pointer problems I suggested?", sentAt: "2026-06-24T11:00:00Z", seen: true },
    { id: "m2", senderId: "student", body: "Yes sir! I solved 8 of them. The ones involving sorted arrays felt intuitive but the unsorted ones still confuse me.", sentAt: "2026-06-24T11:05:00Z", seen: true },
    { id: "m3", senderId: "faculty", body: "That's normal — for unsorted arrays you often need to sort first (O(n log n)) before applying two-pointer. The key insight: two-pointer only works reliably when the array has some ordering property. Try 3Sum next!", sentAt: "2026-06-24T12:00:00Z", seen: true },
    { id: "m4", senderId: "student", body: "Got it! I'll try 3Sum today. Should I also look at 4Sum after?", sentAt: "2026-06-24T12:30:00Z", seen: true },
    { id: "m5", senderId: "faculty", body: "You're on the right track! Keep practising.", sentAt: "2026-06-24T13:45:00Z", seen: false },
  ],
  f2: [
    { id: "m6", senderId: "faculty", body: "I reviewed your behavioral answers. Your Situation and Task sections are strong but the Action section needs more specific details — avoid vague words like 'I helped'. Be specific about what you did.", sentAt: "2026-06-23T09:30:00Z", seen: true },
    { id: "m7", senderId: "student", body: "Thank you! I'll rewrite those sections. Should I send the revised version to you?", sentAt: "2026-06-23T09:45:00Z", seen: true },
    { id: "m8", senderId: "faculty", body: "Send me your updated STAR story by tomorrow.", sentAt: "2026-06-23T10:00:00Z", seen: true },
  ],
};

function timeAgo(iso: string) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h`;
  return `${Math.floor(mins / 1440)}d`;
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

function groupByDate(messages: Message[]) {
  const groups: Record<string, Message[]> = {};
  messages.forEach((m) => {
    const d = new Date(m.sentAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const key =
      d.toDateString() === today.toDateString() ? "Today" :
      d.toDateString() === yesterday.toDateString() ? "Yesterday" :
      d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    if (!groups[key]) groups[key] = [];
    groups[key].push(m);
  });
  return Object.entries(groups).map(([dateLabel, messages]) => ({ dateLabel, messages }));
}

// ── Sidebar: faculty list ─────────────────────────────
function FacultyList({ faculty, selected, onSelect }: {
  faculty: Faculty[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const filtered = faculty.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-sm font-bold text-gray-900 mb-2">Messages</h2>
        <div className="flex items-center gap-2 bg-gray-100 rounded px-2.5 py-1.5">
          <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="flex-1 bg-transparent text-xs text-gray-700 focus:outline-none"
          />
        </div>
      </div>

      {/* Faculty rows */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-8">No faculty found</p>
        )}
        {filtered.map((f) => (
          <button
            key={f.id}
            onClick={() => onSelect(f.id)}
            className={`w-full flex items-start gap-3 px-4 py-3 text-left border-b border-gray-100 ${
              selected === f.id ? "bg-blue-50 border-l-2 border-l-blue-600" : "hover:bg-gray-50"
            }`}
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {f.initials}
              </div>
              {f.online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-semibold text-gray-900 truncate">{f.name}</span>
                <span className="text-[10px] text-gray-400 shrink-0">{timeAgo(f.lastAt)}</span>
              </div>
              <p className="text-[11px] text-gray-400 truncate mt-0.5">{f.lastMessage}</p>
            </div>

            {/* Unread */}
            {f.unread > 0 && (
              <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0 mt-0.5">
                {f.unread}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Chat window ───────────────────────────────────────
function ChatWindow({ facultyId, faculty }: { facultyId: string; faculty: Faculty }) {
  const [messages, setMessages] = useState<Message[]>(mockMessages[facultyId] || []);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, {
      id: `m${Date.now()}`, senderId: "student",
      body: input.trim(), sentAt: new Date().toISOString(), seen: false,
    }]);
    setInput("");
  };

  const groups = groupByDate(messages);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 shrink-0">
        <div className="relative">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {faculty.initials}
          </div>
          {faculty.online && (
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{faculty.name}</p>
          <p className="text-[11px] text-gray-400 flex items-center gap-1">
            <Circle className={`w-1.5 h-1.5 ${faculty.online ? "fill-green-500 text-green-500" : "fill-gray-300 text-gray-300"}`} />
            {faculty.online ? "Online" : "Offline"} · {faculty.subject}
          </p>
        </div>
      </div>

      {/* Messages scroll area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {groups.map(({ dateLabel, messages: groupMsgs }) => (
          <div key={dateLabel}>
            {/* Date divider */}
            <div className="flex items-center gap-3 my-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-[10px] text-gray-400 font-medium shrink-0">{dateLabel}</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <div className="space-y-2">
              {groupMsgs.map((msg) => {
                const isMe = msg.senderId === "student";
                return (
                  <div key={msg.id} className={`flex gap-2 ${isMe ? "justify-end" : "justify-start"}`}>
                    {!isMe && (
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5">
                        {faculty.initials}
                      </div>
                    )}
                    <div className="max-w-[72%]">
                      <div className={`px-3 py-2 rounded text-sm leading-relaxed ${
                        isMe
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-gray-100 text-gray-800 rounded-tl-none"
                      }`}>
                        {msg.body}
                      </div>
                      <p className={`text-[10px] text-gray-400 mt-0.5 ${isMe ? "text-right" : "text-left"}`}>
                        {fmtTime(msg.sentAt)}
                        {isMe && <span className="ml-1">{msg.seen ? "· Seen" : "· Sent"}</span>}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-200 shrink-0">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-gray-100 rounded px-3 py-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Type a message..."
              rows={1}
              className="w-full bg-transparent text-sm text-gray-800 resize-none focus:outline-none leading-5"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              input.trim() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-center p-8">
      <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded flex items-center justify-center mb-3">
        <Send className="w-5 h-5 text-blue-300" />
      </div>
      <p className="text-sm font-semibold text-gray-500">Select a conversation</p>
      <p className="text-xs text-gray-400 mt-1">Choose a faculty member from the list</p>
    </div>
  );
}

export default function MessagesPage() {
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>("");
  const selectedFaculty = mockFaculty.find((f) => f.id === selectedFacultyId);

  return (
    // Escape the parent's px-6 py-6 padding so this fills the content area edge to edge
    <div className="-mx-6 -my-6 flex" style={{ height: "calc(100vh - 56px)" }}>
      {/* Faculty sidebar */}
      <div className="w-64 shrink-0 border-r border-gray-200">
        <FacultyList
          faculty={mockFaculty}
          selected={selectedFacultyId}
          onSelect={setSelectedFacultyId}
        />
      </div>

      {/* Chat area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {selectedFaculty
          ? <ChatWindow facultyId={selectedFacultyId} faculty={selectedFaculty} />
          : <EmptyState />}
      </div>
    </div>
  );
}
