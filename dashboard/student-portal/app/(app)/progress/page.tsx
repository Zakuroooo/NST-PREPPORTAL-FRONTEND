"use client";
import { useRouter } from "next/navigation";
import { TrendingUp, Flame, Trophy, Zap, AlertCircle } from "lucide-react";

const companyReadiness = [
  { co: "G", name: "Google", color: "bg-blue-600", role: "SDE-1", pct: 34, done: 15, total: 2274, last: "2 days ago", trend: "↑ +5%", trendColor: "text-green-600" },
  { co: "A", name: "Amazon", color: "bg-orange-500", role: "SDE-1", pct: 21, done: 8, total: 1957, last: "5 days ago", trend: "—", trendColor: "text-gray-400" },
  { co: "F", name: "Flipkart", color: "bg-blue-500", role: "SDE-1", pct: 45, done: 22, total: 892, last: "Today", trend: "↑ +12%", trendColor: "text-green-600" },
];

const topics = [
  { name: "Arrays & Strings", done: 12, total: 20, pct: 60, color: "bg-blue-500", textColor: "text-blue-600" },
  { name: "Binary Search", done: 6, total: 12, pct: 50, color: "bg-indigo-500", textColor: "text-indigo-600" },
  { name: "Dynamic Programming", done: 3, total: 15, pct: 20, color: "bg-violet-500", textColor: "text-violet-600" },
  { name: "Trees", done: 5, total: 18, pct: 28, color: "bg-cyan-500", textColor: "text-cyan-600" },
  { name: "Graphs", done: 2, total: 16, pct: 13, color: "bg-sky-500", textColor: "text-sky-600" },
  { name: "System Design", done: 1, total: 10, pct: 10, color: "bg-fuchsia-500", textColor: "text-fuchsia-600" },
];

const weakAreas = [
  { topic: "Dynamic Programming", pct: 20, companies: "Flipkart", companyPct: 72, color: "text-indigo-600", bgColor: "bg-indigo-50 border-indigo-200" },
  { topic: "Graphs", pct: 13, companies: "Google", companyPct: 71, color: "text-violet-600", bgColor: "bg-violet-50 border-violet-200" },
  { topic: "System Design", pct: 10, companies: "Amazon", companyPct: 65, color: "text-cyan-600", bgColor: "bg-cyan-50 border-cyan-200" },
];

// 12 weeks × 7 days heatmap data
const heatmap = Array.from({ length: 84 }, (_, i) => {
  const actives = [70, 71, 72, 73, 74, 76, 77, 78, 79, 80, 81, 83];
  const mids = [56, 57, 58, 63, 64, 65];
  const lights = [42, 43, 49, 50];
  if (actives.includes(i)) return "bg-green-600";
  const rand = Math.random();
  return rand > 0.8 ? "bg-green-700" : rand > 0.5 ? "bg-green-500" : rand > 0.3 ? "bg-green-300" : "bg-gray-100";
});

export default function ProgressPage() {
  const router = useRouter();

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Progress</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50", val: "45", label: "Problems Solved" },
          { icon: Flame, color: "text-indigo-600", bg: "bg-indigo-50", val: "12", label: "Day Streak" },
          { icon: Trophy, color: "text-violet-600", bg: "bg-violet-50", val: "18", label: "Best Streak" },
          { icon: Zap, color: "text-cyan-600", bg: "bg-cyan-50", val: "2,450", label: "XP Earned" },
        ].map(({ icon: Icon, color, bg, val, label }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{val}</div>
            <div className="text-sm text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Company Readiness */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Company Readiness</h2>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {["Company", "Role", "Readiness", "Problems Done", "Last Practiced", "Trend"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {companyReadiness.map((co) => (
                <tr key={co.name} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://www.google.com/s2/favicons?sz=64&domain=${co.name.toLowerCase()}.com`}
                        alt={co.name}
                        className="w-7 h-7 rounded shrink-0 object-contain bg-white border border-gray-100 p-0.5"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://www.google.com/s2/favicons?sz=64&domain=example.com"; }}
                      />
                      <span className="font-medium text-gray-900">{co.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{co.role}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${co.pct}%` }} />
                      </div>
                      <span className="text-xs font-medium text-gray-700 w-8">{co.pct}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{co.done}/{co.total.toLocaleString()}</td>
                  <td className="px-5 py-4 text-gray-500">{co.last}</td>
                  <td className={`px-5 py-4 font-medium ${co.trendColor}`}>{co.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Topic Mastery */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Topic Mastery</h2>
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          {topics.map((t) => (
            <div key={t.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-700">{t.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{t.done}/{t.total}</span>
                  <span className={`text-xs font-semibold ${t.textColor} w-10 text-right`}>{t.pct}%</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className={`h-2 ${t.color} rounded-full transition-all`} style={{ width: `${t.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Activity Heatmap */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Activity — Last 12 Weeks</h2>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex gap-4 text-xs text-gray-400 mb-2">
            {["Mar", "Apr", "May", "Jun"].map((m) => (
              <span key={m} className="flex-1">{m}</span>
            ))}
          </div>
          <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(12, 1fr)" }}>
            {heatmap.map((cls, i) => (
              <div key={i} className={`h-4 rounded-sm ${cls}`} title={`Day ${i + 1}`} />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
            <span>Less</span>
            {["bg-gray-100", "bg-green-200", "bg-green-400", "bg-green-600"].map((c) => (
              <div key={c} className={`w-4 h-4 rounded-sm ${c}`} />
            ))}
            <span>More</span>
          </div>
        </div>
      </section>

      {/* Weak Areas */}
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-4">Focus Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weakAreas.map((w) => (
            <div key={w.topic} className={`border rounded-xl p-5 ${w.bgColor}`}>
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className={`w-5 h-5 ${w.color}`} />
                <span className="font-semibold text-gray-900 text-sm">{w.topic}</span>
              </div>
              <p className="text-xs text-gray-600 mb-4">
                Only {w.pct}% mastered. {w.companies} tests this in {w.companyPct}% of interviews.
              </p>
              <button
                onClick={() => router.push(`/practice?topic=${encodeURIComponent(w.topic)}`)}
                className={`text-xs font-semibold px-3 py-2 rounded-lg border ${w.color} border-current hover:bg-white/50 transition-colors w-full`}
              >
                Practice Now →
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
