"use client";
import { useState, useMemo, use } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Search, X } from "lucide-react";
import {
  filterQuestions,
  allTopics,
  getCompanyIntel,
  type Difficulty,
  type RoundType,
} from "@/lib/mock-data";

const diffBadge = (d: string) =>
  d === "Easy"   ? "bg-green-50 text-green-700 border border-green-200" :
  d === "Medium" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                   "bg-red-50 text-red-600 border border-red-200";

const roundColors: Record<string, string> = {
  "Coding":        "bg-blue-100 text-blue-700",
  "System Design": "bg-purple-100 text-purple-700",
  "LLD":           "bg-indigo-100 text-indigo-700",
  "HR":            "bg-green-100 text-green-700",
  "Aptitude":      "bg-amber-100 text-amber-700",
  "Domain":        "bg-gray-100 text-gray-700",
};

export default function CompanyPracticePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name: slug } = use(params);
  const intel = getCompanyIntel(slug);

  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | "">("");
  const [roundType, setRoundType] = useState<RoundType | "">("");

  const filtered = useMemo(
    () =>
      filterQuestions({
        company: slug,
        topic: topic || undefined,
        difficulty: difficulty || undefined,
        roundType: roundType || undefined,
        search: search || undefined,
      }),
    [slug, topic, difficulty, roundType, search]
  );

  const companyBg =
    slug === "google"    ? "bg-blue-600"   :
    slug === "amazon"    ? "bg-orange-500" :
    slug === "flipkart"  ? "bg-blue-500"   :
    slug === "microsoft" ? "bg-teal-600"   :
    slug === "razorpay"  ? "bg-blue-800"   :
    slug === "tcs"       ? "bg-indigo-600" : "bg-blue-600";

  const initial = intel.name[0].toUpperCase();

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
        <Link href="/companies" className="hover:text-gray-700 transition-colors">Companies</Link>
        <span>/</span>
        <Link href={`/companies/${slug}`} className="hover:text-gray-700 transition-colors capitalize">{intel.name}</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Practice</span>
      </div>

      {/* Company header banner */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 flex items-center gap-4">
        <div className={`w-12 h-12 ${companyBg} rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0`}>
          {initial}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <h1 className="text-lg font-bold text-gray-900">Practice for {intel.name}</h1>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${companyBg} text-white`}>
              Company-Locked
            </span>
          </div>
          <p className="text-sm text-gray-500">
            All questions below are from {intel.name} interviews only — {filtered.length} shown
          </p>
        </div>
        <Link
          href={`/companies/${slug}`}
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 shrink-0"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Intel
        </Link>
      </div>

      {/* Filters — 3 + Round (round is shown here because it's company-specific) */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Topic */}
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700"
        >
          <option value="">All Topics</option>
          {allTopics.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>

        {/* Round type (available here since this is company-specific) */}
        <select
          value={roundType}
          onChange={(e) => setRoundType(e.target.value as RoundType | "")}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700"
        >
          <option value="">All Rounds</option>
          <option value="Coding">Round: Coding/DSA</option>
          <option value="System Design">Round: System Design</option>
          <option value="LLD">Round: LLD</option>
          <option value="HR">Round: HR/Behavioral</option>
          <option value="Aptitude">Round: Aptitude/OA</option>
          <option value="Domain">Round: Domain/CS</option>
        </select>

        {/* Difficulty */}
        <div className="flex gap-1">
          {(["", "Easy", "Medium", "Hard"] as const).map((d) => (
            <button
              key={d || "all"}
              onClick={() => setDifficulty(d as Difficulty | "")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                difficulty === d
                  ? d === "Easy"   ? "bg-green-600 text-white" :
                    d === "Medium" ? "bg-amber-500 text-white" :
                    d === "Hard"   ? "bg-red-500 text-white"   : "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {d || "All"}
            </button>
          ))}
        </div>
      </div>

      {/* Question list */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <div className="font-medium">No questions match your filters</div>
            <div className="text-sm mt-1">Try adjusting the topic, round, or difficulty</div>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((q, idx) => (
              <div key={q.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                <span className="text-xs text-gray-400 font-mono w-6 shrink-0">{idx + 1}</span>

                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-gray-900 truncate">{q.title}</div>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-xs text-gray-500">{q.topic}</span>
                    {q.hot && <span className="text-xs bg-red-50 text-red-600 rounded px-1.5 py-0.5">🔥 Hot</span>}
                    {q.frequency && (
                      <span className="text-xs text-gray-400">Asked in {q.frequency}% of interviews</span>
                    )}
                  </div>
                </div>

                {/* Round badge */}
                <span className={`text-xs font-semibold rounded-full px-2.5 py-1 shrink-0 ${roundColors[q.roundType] ?? "bg-gray-100 text-gray-700"}`}>
                  {q.roundType}
                </span>

                {/* Difficulty badge */}
                <span className={`text-xs font-semibold rounded-full border px-2.5 py-1 shrink-0 ${diffBadge(q.diff)}`}>
                  {q.diff}
                </span>

                <span className="text-xs font-bold text-amber-600 shrink-0">+{q.xp} XP</span>

                {q.leetcodeUrl ? (
                  <a
                    href={q.leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 shrink-0"
                    aria-label={`Open ${q.title} on LeetCode`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <div className="w-4 shrink-0" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        Showing {filtered.length} questions for {intel.name} · More coming as community contributes
      </p>
    </div>
  );
}
