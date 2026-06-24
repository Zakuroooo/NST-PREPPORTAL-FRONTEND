"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Calendar, Flame, CheckSquare, Square, ExternalLink, Clock,
  TrendingUp, Zap,
} from "lucide-react";
import {
  dashboardTargetCompanies,
  dashboardTodayProblems,
  dashboardRecentReports,
} from "@/lib/mock-data";

export default function DashboardPage() {
  const [checked, setChecked] = useState<Record<number, boolean>>({ 1: true });

  return (
    <div className="flex gap-6">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Activity bar */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Latest Activity: Completed &quot;Two Sum&quot; 2 hours ago</span>
        </div>

        {/* Target Companies */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Your Target Companies</h2>
            <Link href="/companies" className="text-sm text-blue-600 font-medium hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dashboardTargetCompanies.map((co) => (
              <div key={co.name} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://www.google.com/s2/favicons?sz=64&domain=${co.name.toLowerCase()}.com`}
                      alt={co.name}
                      className="w-10 h-10 rounded-lg shrink-0 object-contain bg-white border border-gray-100 p-1"
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://www.google.com/s2/favicons?sz=64&domain=example.com"; }}
                    />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{co.name}</div>
                      <div className="text-xs text-gray-500">{co.role}</div>
                    </div>
                  </div>
                  {/* Circular readiness */}
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                      <circle cx="24" cy="24" r="20" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                      <circle
                        cx="24" cy="24" r="20"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="4"
                        strokeDasharray={`${co.readiness * 1.257} 125.7`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900">
                      {co.readiness}%
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Link
                    href={`/companies/${co.slug}`}
                    className="flex-1 text-center text-xs font-medium border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    View Intel
                  </Link>
                  <Link
                    href={`/roadmap?company=${co.slug}`}
                    className="flex-1 text-center text-xs font-medium bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Practice
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Today's Focus */}
        <section className="mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 rounded px-2 py-1 mb-2">
                  DAY 14 OF 84
                </div>
                <h2 className="text-xl font-bold text-gray-900">Arrays &amp; Hashing</h2>
                <p className="text-sm text-gray-500 mt-1">Master the fundamentals of array manipulation and hash maps.</p>
              </div>
              <Link
                href="/practice"
                className="bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors shrink-0"
              >
                Start Today&apos;s Practice
              </Link>
            </div>

            <div className="space-y-3 mt-2">
              {dashboardTodayProblems.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0 cursor-pointer"
                  onClick={() => setChecked((c) => ({ ...c, [p.id]: !c[p.id] }))}
                >
                  <button className="shrink-0" aria-label={checked[p.id] ? "Mark as incomplete" : "Mark as complete"}>
                    {checked[p.id] ? (
                      <CheckSquare className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-300" />
                    )}
                  </button>
                  <span className={`flex-1 text-sm ${checked[p.id] ? "line-through text-gray-400" : "text-gray-900 font-medium"}`}>
                    {p.title}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                    <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    {p.xp} XP
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    p.difficulty === "Easy" ? "bg-green-50 text-green-700" :
                    p.difficulty === "Medium" ? "bg-blue-50 text-blue-700" : "bg-red-50 text-red-600"
                  }`}>{p.difficulty}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Reports */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Recent Interview Reports</h2>
            <Link href="/submit" className="text-sm text-blue-600 font-medium hover:underline">Browse All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dashboardRecentReports.map((r) => (
              <Link
                key={r.name}
                href={`/submit?expand=${r.id}`}
                className="block bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://www.google.com/s2/favicons?sz=64&domain=${r.name.toLowerCase()}.com`}
                    alt={r.name}
                    className="w-8 h-8 rounded-lg shrink-0 object-contain bg-white border border-gray-100 p-0.5"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://www.google.com/s2/favicons?sz=64&domain=example.com"; }}
                  />
                  <span className="font-semibold text-gray-900 text-sm">{r.name}</span>
                  <span className="ml-auto text-xs text-gray-400">{r.time}</span>
                  <span className="bg-gray-100 text-gray-600 text-xs rounded px-2 py-0.5">{r.rounds} Rounds</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{r.role}</p>
                <div className="flex flex-wrap gap-1">
                  {r.tags.map((t) => (
                    <span key={t} className="bg-gray-100 text-gray-600 text-xs rounded px-2 py-0.5">{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Right Panel */}
      <aside className="hidden xl:block w-64 shrink-0 space-y-4">
        {/* Readiness */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wide">Your Readiness</h3>
          <div className="flex justify-center mb-3">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r="40" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                <circle cx="48" cy="48" r="40" fill="none" stroke="#3B82F6" strokeWidth="8"
                  strokeDasharray="163 251" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">68%</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center">Based on practice volume and mock scores.</p>
        </div>

        {/* Days + Streak */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">42</div>
            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Days to Target</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Day Streak</div>
          </div>
        </div>

        {/* Activity Map */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Activity Map</h3>
            <span className="text-xs text-gray-400">Nov 2023</span>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <div key={i} className="text-[10px] text-gray-400 text-center">{d}</div>
            ))}
            {Array.from({ length: 28 }).map((_, i) => {
              const actives = [2, 3, 5, 6, 7, 9, 12, 13, 14, 18, 19, 20, 25, 26, 27];
              const dark = [25, 26, 27];
              const mid = [12, 13, 14, 18, 19, 20];
              return (
                <div
                  key={i}
                  className={`h-4 w-full rounded-sm ${
                    dark.includes(i) ? "bg-green-700" :
                    mid.includes(i) ? "bg-green-500" :
                    actives.includes(i) ? "bg-green-300" : "bg-gray-100"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}
