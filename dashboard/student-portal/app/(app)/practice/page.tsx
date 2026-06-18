"use client";
import { useState } from "react";
import { Search, CheckCircle, XCircle, Zap } from "lucide-react";

const questions = [
  { id: 1, title: "Reverse a Linked List", company: "Google", companyColor: "bg-blue-600", topic: "Linked List", diff: "Easy", xp: 10, status: "solved" },
  { id: 2, title: "LRU Cache Implementation", company: "Amazon", companyColor: "bg-orange-500", topic: "Design", diff: "Medium", xp: 25, status: "wrong" },
  { id: 3, title: "Merge K Sorted Lists", company: "Microsoft", companyColor: "bg-teal-600", topic: "Heaps", diff: "Hard", xp: 40, status: null },
  { id: 4, title: "Valid Parentheses", company: "Meta", companyColor: "bg-blue-700", topic: "Stacks", diff: "Easy", xp: 10, status: null },
  { id: 5, title: "Find Median from Data Stream", company: "Apple", companyColor: "bg-gray-600", topic: "Heaps", diff: "Hard", xp: 40, status: "solved" },
  { id: 6, title: "Binary Tree Level Order Traversal", company: "Netflix", companyColor: "bg-red-600", topic: "Trees", diff: "Medium", xp: 25, status: null },
  { id: 7, title: "Two Sum", company: "Google", companyColor: "bg-blue-600", topic: "Arrays", diff: "Easy", xp: 10, status: "solved" },
  { id: 8, title: "House Robber", company: "Flipkart", companyColor: "bg-blue-500", topic: "DP", diff: "Medium", xp: 20, status: "wrong" },
  { id: 9, title: "Number of Islands", company: "Google", companyColor: "bg-blue-600", topic: "Graphs", diff: "Medium", xp: 20, status: null },
  { id: 10, title: "Word Break", company: "Flipkart", companyColor: "bg-blue-500", topic: "DP", diff: "Medium", xp: 20, status: null },
];

const diffBadge = (d: string) =>
  d === "Easy" ? "bg-green-50 text-green-700" :
  d === "Medium" ? "bg-amber-50 text-amber-700" : "bg-gray-900 text-white";

export default function PracticePage() {
  const [activeDiff, setActiveDiff] = useState<string | null>(null);

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Practice Questions</h1>
          <p className="text-sm text-gray-500 mt-1">Finish your pending practice to improve your placement score.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="18" fill="none" stroke="#E5E7EB" strokeWidth="5" />
              <circle cx="24" cy="24" r="18" fill="none" stroke="#3B82F6" strokeWidth="5"
                strokeDasharray="16 113" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900">14%</div>
          </div>
          <div>
            <div className="text-base font-bold text-gray-900">45/320 Solved</div>
            <div className="text-xs text-gray-500">Total Progress</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            placeholder="Search questions..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
        <select className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Company</option>
          <option>Google</option><option>Amazon</option><option>Flipkart</option><option>TCS</option><option>Microsoft</option>
        </select>
        <select className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Topic</option>
          <option>Arrays</option><option>DP</option><option>Graphs</option><option>Trees</option><option>SQL</option><option>OS</option>
        </select>
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          {["Easy", "Medium", "Hard"].map((d) => (
            <button
              key={d}
              onClick={() => setActiveDiff(activeDiff === d ? null : d)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                activeDiff === d
                  ? d === "Easy" ? "bg-green-500 text-white"
                    : d === "Medium" ? "bg-amber-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        <select className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Round Type</option>
          <option>Coding</option><option>System Design</option><option>HR</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_80px_80px] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200">
          {["QUESTION", "COMPANY", "DIFFICULTY", "TOPIC", "XP", "STATUS"].map((h) => (
            <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</div>
          ))}
        </div>

        {/* Rows */}
        {questions.map((q) => (
          <div
            key={q.id}
            className="grid grid-cols-[2fr_1fr_1fr_1fr_80px_80px] gap-4 px-5 py-3.5 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
          >
            <div className="font-medium text-gray-900 text-sm">{q.title}</div>
            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 ${q.companyColor} rounded flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                {q.company[0]}
              </div>
              <span className="text-sm text-gray-700 truncate">{q.company}</span>
            </div>
            <div>
              <span className={`text-xs font-medium px-2 py-1 rounded ${diffBadge(q.diff)}`}>{q.diff}</span>
            </div>
            <div className="text-sm text-gray-600">{q.topic}</div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span className="text-sm font-medium text-amber-600">{q.xp}</span>
            </div>
            <div>
              {q.status === "solved" ? (
                <CheckCircle className="w-5 h-5 text-blue-600" />
              ) : q.status === "wrong" ? (
                <XCircle className="w-5 h-5 text-red-500" />
              ) : (
                <span className="text-gray-300 text-lg">—</span>
              )}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-t border-gray-200">
          <span className="text-xs text-gray-500">Showing 1 to 10 of 45 entries</span>
          <div className="flex gap-2">
            <button className="border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-50">Previous</button>
            <button className="border border-gray-200 bg-white text-gray-900 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-50 font-medium">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
