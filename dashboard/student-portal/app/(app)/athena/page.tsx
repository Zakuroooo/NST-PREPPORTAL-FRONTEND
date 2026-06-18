"use client";
import { useState, useRef, useEffect } from "react";
import {
  Bot, Send, Sparkles, Plus, ChevronRight, RotateCcw,
  User, Copy, ThumbsUp, ThumbsDown, Lightbulb,
  Code2, BookOpen, Target,
} from "lucide-react";

// ─────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "athena";
  content: string;
  timestamp: string;
}

interface Session {
  id: string;
  title: string;
  preview: string;
  time: string;
}

// ─────────────────────────────────────────────────────────
// MOCK DATA
// BACKEND TODO: Replace with GET /api/athena/sessions and POST /api/athena/chat
// ─────────────────────────────────────────────────────────
const mockSessions: Session[] = [
  { id: "1", title: "Two Sum & Sliding Window", preview: "Explained the sliding window approach...", time: "2h ago" },
  { id: "2", title: "Google System Design Prep", preview: "How to approach HLD for a URL shortener...", time: "Yesterday" },
  { id: "3", title: "DP Patterns Deep Dive", preview: "Memoization vs tabulation trade-offs...", time: "2 days ago" },
  { id: "4", title: "Amazon LP Questions", preview: "STAR format for leadership situations...", time: "3 days ago" },
];

const initialMessages: Message[] = [
  {
    id: "a1",
    role: "athena",
    content: "Hello! I'm **Athena**, your NST interview intelligence assistant.\n\nI can help you with:\n- **DSA concepts** — explanations, approaches, and complexity analysis\n- **Company-specific prep** — Google, Amazon, Microsoft and more\n- **System Design** — HLD, LLD, and trade-off analysis\n- **Behavioral questions** — STAR-format coaching\n\nWhat would you like to work on today?",
    timestamp: "10:00 AM",
  },
  {
    id: "a2",
    role: "user",
    content: "Explain the sliding window technique with an example",
    timestamp: "10:01 AM",
  },
  {
    id: "a3",
    role: "athena",
    content: "Great topic! The **Sliding Window** technique is used to solve problems involving contiguous subarrays or substrings efficiently — reducing O(n²) brute-force solutions to O(n).\n\n**Core Idea:**\nMaintain a \"window\" (defined by two pointers, `left` and `right`) and expand or shrink it based on a condition.\n\n**Example: Longest Substring Without Repeating Characters**\n```\nInput:  s = \"abcabcbb\"\nOutput: 3  (\"abc\")\n```\n**Approach:**\n1. Use a `Set` to track characters in the current window\n2. Expand `right` pointer — add `s[right]` to the Set\n3. If `s[right]` already in Set → shrink from `left` until it's removed\n4. Track maximum window size\n\n**Time Complexity:** O(n) — each character is added and removed at most once\n\n**When to use it:**\n- Problems with \"maximum/minimum subarray\"\n- Problems with a fixed or variable window constraint\n- Strings or arrays with consecutive element conditions\n\nWant me to walk through the code implementation or show you a Google-tagged problem using this pattern?",
    timestamp: "10:01 AM",
  },
];

const suggestedPrompts = [
  { icon: Code2, text: "Explain time complexity of Quick Sort" },
  { icon: Target, text: "What does Google ask in SDE-1 rounds?" },
  { icon: BookOpen, text: "Teach me Binary Search variations" },
  { icon: Lightbulb, text: "How to crack behavioral interviews?" },
];

// ─────────────────────────────────────────────────────────
// HELPER: Render markdown-lite (bold, code blocks, lists)
// ─────────────────────────────────────────────────────────
function renderMessage(content: string) {
  const lines = content.split("\n");
  return lines.map((line, i) => {
    // Code block lines
    if (line.startsWith("```")) {
      return null; // handled below
    }
    // Bold text **...**
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={j} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
      }
      return <span key={j}>{part}</span>;
    });
    return <p key={i} className="mb-1 last:mb-0">{rendered}</p>;
  });
}

// ─────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────
export default function AthenaPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeSession, setActiveSession] = useState("1");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);

    // BACKEND TODO: POST /api/athena/chat { sessionId: activeSession, message: userMsg.content }
    setTimeout(() => {
      const athenaReply: Message = {
        id: (Date.now() + 1).toString(),
        role: "athena",
        content: "That's a great question! I'm currently running in **demo mode** — my full AI capabilities will be available once the backend is connected.\n\nIn the meantime, I can still help you navigate company profiles, roadmaps, and practice questions. Try asking me about a specific DSA topic or company interview pattern!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((m) => [...m, athenaReply]);
      setIsTyping(false);
    }, 1400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="flex h-[calc(100vh-56px-48px)] max-w-7xl -m-6 overflow-hidden rounded-xl border border-gray-200">

      {/* ── LEFT: Session list ── */}
      <aside className="w-64 shrink-0 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900 text-sm">Athena</span>
            <span className="text-[10px] font-semibold bg-blue-600 text-white rounded px-1.5 py-0.5">AI</span>
          </div>
          <button
            onClick={() => {
              setMessages(initialMessages.slice(0, 1));
              setActiveSession("new");
            }}
            aria-label="New conversation"
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Demo badge */}
        <div className="mx-3 mt-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-700 font-medium">Demo Mode</p>
          <p className="text-xs text-amber-600 mt-0.5">AI responses are mocked. Backend integration pending.</p>
        </div>

        {/* Session list */}
        <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide px-2 mb-2">Recent Chats</p>
          {mockSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setActiveSession(session.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                activeSession === session.id
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs font-semibold truncate">{session.title}</span>
                <span className="text-[10px] text-gray-400 shrink-0 ml-1">{session.time}</span>
              </div>
              <p className="text-[11px] text-gray-500 truncate">{session.preview}</p>
            </button>
          ))}
        </div>
      </aside>

      {/* ── RIGHT: Chat area ── */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Chat header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-gray-900 text-sm">Athena Intelligence</h1>
                <span className="flex items-center gap-1 text-[10px] text-green-600 font-medium">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Online
                </span>
              </div>
              <p className="text-xs text-gray-500">NST Interview Intelligence Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 rounded-lg px-3 py-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              Athena v1.0 — Demo
            </div>
            <button
              onClick={() => setMessages(initialMessages.slice(0, 1))}
              aria-label="Reset conversation"
              className="text-gray-400 hover:text-gray-700 transition-colors p-1.5 rounded-lg hover:bg-gray-100"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "athena"
                  ? "bg-gradient-to-br from-blue-600 to-blue-700"
                  : "bg-gray-200"
              }`}>
                {msg.role === "athena"
                  ? <Bot className="w-4 h-4 text-white" />
                  : <User className="w-4 h-4 text-gray-500" />
                }
              </div>

              {/* Bubble */}
              <div className={`group max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gray-900 text-white rounded-tr-sm"
                    : "bg-white border border-gray-200 text-gray-700 rounded-tl-sm shadow-sm"
                }`}>
                  {msg.role === "athena"
                    ? <div className="prose prose-sm max-w-none">{renderMessage(msg.content)}</div>
                    : msg.content
                  }
                </div>

                {/* Actions row */}
                <div className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                  {msg.role === "athena" && (
                    <>
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Copy message"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      {copiedId === msg.id && <span className="text-[10px] text-green-600">Copied!</span>}
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" aria-label="Helpful">
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-500 transition-colors" aria-label="Not helpful">
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-200 rounded-xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1 items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested prompts */}
        {messages.length <= 1 && (
          <div className="px-6 pb-2">
            <p className="text-xs text-gray-500 mb-2">Suggested questions</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestedPrompts.map(({ icon: Icon, text }) => (
                <button
                  key={text}
                  onClick={() => setInput(text)}
                  className="flex items-center gap-2 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-left text-xs text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all"
                >
                  <Icon className="w-4 h-4 shrink-0 text-blue-500" />
                  {text}
                  <ChevronRight className="w-3 h-3 ml-auto text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1 border border-gray-200 rounded-xl bg-gray-50 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Athena anything about DSA, companies, system design..."
                rows={1}
                className="w-full px-4 py-3 text-sm bg-transparent resize-none focus:outline-none text-gray-900 placeholder-gray-400 max-h-32"
                style={{ minHeight: "44px" }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              aria-label="Send message"
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                input.trim()
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 text-center">
            Athena is in demo mode. Responses are illustrative until backend integration is complete.
          </p>
        </div>
      </div>
    </div>
  );
}
