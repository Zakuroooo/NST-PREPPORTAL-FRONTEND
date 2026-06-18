"use client";
import { useState, use } from "react";
import Link from "next/link";
import {
  BarChart2, Target, Layers, TrendingUp, ChevronRight,
  ExternalLink, Flame, Play, Bookmark, CheckCircle,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip,
  Legend, CartesianGrid,
} from "recharts";
import { getCompanyIntel, getCompanyBg } from "@/lib/mock-data";

const tabs = ["Overview", "Questions", "Experiences", "Trends"];

export default function CompanyPage({ params }: { params: Promise<{ name: string }> }) {
  const { name: slug } = use(params);
  const intel = getCompanyIntel(slug);
  const bg = getCompanyBg(slug);

  const [activeTab, setActiveTab] = useState("Overview");
  const [role, setRole] = useState("SDE-1 (L3)");

  const name = slug.charAt(0).toUpperCase() + slug.slice(1);
  const initial = name.charAt(0);

  return (
    <div className="max-w-6xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
        <Link href="/dashboard" className="hover:text-gray-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/companies" className="hover:text-gray-700">Companies</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 font-medium">{name}</span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Hero card */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 ${bg} rounded-xl flex items-center justify-center text-white text-2xl font-bold shrink-0`}>
              {initial}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
              <p className="text-sm text-gray-500 mt-1">Software Engineering Intelligence</p>
            </div>
            <div className="text-right">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>SDE-1 (L3)</option>
                <option>SDE-2 (L4)</option>
                <option>Data Analyst</option>
              </select>
              <p className="text-xs text-gray-400 mt-2">Updated: Oct 24, 2023</p>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
              <Play className="w-4 h-4" /> Start Mock Interview
            </button>
            <button className="border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <Bookmark className="w-4 h-4" /> Save Target
            </button>
          </div>
        </div>

        {/* Hiring Pulse */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Hiring Pulse</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4" />
                Current Trend
              </div>
              <span className="text-green-600 text-sm font-medium bg-green-50 px-2 py-0.5 rounded">
                {intel.hiringStatus}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg. Process</span>
              <span className="text-sm font-medium text-gray-900">{intel.avgProcess}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 leading-relaxed border-t border-gray-100 pt-3">
            {intel.hiringNote}
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { icon: BarChart2, color: "text-blue-600", val: intel.successRate, sub: "SUCCESS RATE", note: "↑ 2.1%" },
          { icon: Target, color: "text-amber-500", val: intel.avgSalary, sub: "AVG. SALARY (L3)", note: "TC" },
          { icon: Layers, color: "text-purple-600", val: intel.difficulty, sub: "DIFFICULTY", note: "/10" },
          { icon: TrendingUp, color: "text-green-600", val: intel.totalQuestions, sub: "TOTAL QUESTIONS", note: "tagged" },
        ].map(({ icon: Icon, color, val, sub, note }) => (
          <div key={sub} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Icon className={`w-4 h-4 ${color}`} />
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{sub}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {val} <span className="text-sm font-medium text-green-600">{note}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
              {tab === "Questions" && <span className="ml-1 text-xs bg-gray-100 text-gray-600 rounded px-1.5 py-0.5">1.2k</span>}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Overview" && (
        <div className="grid grid-cols-3 gap-4">
          {/* Round structure */}
          <div className="col-span-3 bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Standard Round Structure</h3>
            <div className="grid grid-cols-4 gap-3">
              {intel.roundStructure.map((r) => (
                <div key={r.n} className="border border-gray-200 rounded-xl p-4 text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mx-auto mb-3 ${
                    r.n === intel.roundStructure.length ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                  }`}>{r.n}</div>
                  <div className="text-sm font-medium text-gray-900">{r.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{r.dur}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Interview DNA */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Interview DNA</h3>
            <div className="h-6 rounded-full overflow-hidden flex mb-3">
              <div className="bg-blue-600 flex items-center justify-center text-white text-xs" style={{ width: "55%" }}>55%</div>
              <div className="bg-amber-400 flex items-center justify-center text-white text-xs" style={{ width: "25%" }}>25%</div>
              <div className="bg-green-500 flex items-center justify-center text-white text-xs" style={{ width: "15%" }}>15%</div>
              <div className="bg-gray-300 flex items-center justify-center text-gray-600 text-xs" style={{ width: "5%" }}>5%</div>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {[
                { c: "bg-blue-600", l: "DSA (55%)" },
                { c: "bg-amber-400", l: "Sys Design (25%)" },
                { c: "bg-green-500", l: "Behavioral (15%)" },
                { c: "bg-gray-300", l: "Domain (5%)" },
              ].map(({ c, l }) => (
                <div key={l} className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-sm ${c}`} />
                  <span className="text-gray-600">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Topics */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Top Topics</h3>
            <div className="space-y-2.5">
              {intel.topTopics.map((t) => (
                <div key={t.topic}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-700">{t.topic}</span>
                    <span className="text-gray-500">{t.pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${t.pct * 3.57}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Difficulty Donut */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Question Difficulty</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-28 h-28">
                <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90">
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#10B981" strokeWidth="18" strokeDasharray="11 283" />
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#F59E0B" strokeWidth="18" strokeDasharray="71 283" strokeDashoffset="-11" />
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#EF4444" strokeWidth="18" strokeDasharray="155 283" strokeDashoffset="-82" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-base font-bold text-gray-900">Hard</span>
                  <span className="text-xs text-gray-400">MAJORITY</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-3 text-xs">
              {intel.difficultyBreakdown.map((d) => (
                <div key={d.name} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-gray-600">{d.name} ({d.value}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Questions */}
          <div className="col-span-3 bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Sample Questions</h3>
            <div className="space-y-2">
              {intel.sampleQuestions.map((q) => (
                <div key={q.title} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                  <span className="flex-1 text-sm font-medium text-gray-900">{q.title}</span>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{q.topic}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    q.diff === "Easy" ? "bg-green-50 text-green-700" :
                    q.diff === "Medium" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-600"
                  }`}>{q.diff}</span>
                  {q.hot && <Flame className="w-4 h-4 text-orange-500" />}
                  <ExternalLink className="w-4 h-4 text-blue-400 cursor-pointer hover:text-blue-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Trends" && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Topic Trends (2022–2025)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={intel.trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} unit="%" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="DSA" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="SystemDesign" stroke="#8B5CF6" strokeWidth={2} />
              <Line type="monotone" dataKey="Behavioral" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === "Experiences" && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center text-white font-bold text-xs`}>{initial}</div>
                <div>
                  <span className="font-medium text-gray-900 text-sm">{name}</span>
                  <span className="text-xs text-gray-500 ml-2">SDE-1 • {i === 1 ? "Jan 2026" : i === 2 ? "Dec 2025" : "Nov 2025"}</span>
                </div>
                <span className="ml-auto text-xs font-medium text-green-700 bg-green-50 rounded px-2 py-0.5 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Offer Received
                </span>
              </div>
              <div className="flex gap-2 mb-3 text-xs text-gray-500">
                <span className="bg-gray-100 rounded px-2 py-1">Round 1: Arrays, DP</span>
                <span className="bg-gray-100 rounded px-2 py-1">Round 2: System Design</span>
                <span className="bg-gray-100 rounded px-2 py-1">Round 3: HR</span>
              </div>
              <p className="text-sm text-gray-600">"Arrays and DP were heavily tested. System design was LLD focused."</p>
              <p className="text-xs text-gray-400 mt-2">Submitted anonymously · {i * 3} days ago</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Questions" && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500 text-center py-8">Full questions database — filtered to {name}. See Practice page.</p>
          <div className="flex justify-center">
            <Link href="/practice" className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Go to Practice
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
