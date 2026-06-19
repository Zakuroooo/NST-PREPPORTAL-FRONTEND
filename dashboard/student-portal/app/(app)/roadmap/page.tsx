"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle, Lock, ChevronDown, ChevronUp,
  ExternalLink, Zap, Play, ChevronRight, BarChart2,
} from "lucide-react";
import { Suspense } from "react";
import { getUserRoadmapCompanies, type UserRoadmapCompany, type RoadmapWeek } from "@/lib/mock-data";

// ── Difficulty badge ─────────────────────────────────
const diffBadge = (d: string) =>
  d === "Easy"   ? "text-green-700 bg-green-50 border-green-200" :
  d === "Medium" ? "text-amber-700 bg-amber-50 border-amber-200" :
                   "text-red-600 bg-red-50 border-red-200";

// ── Week Accordion Card ──────────────────────────────
function WeekCard({ week, companyColor }: { week: RoadmapWeek; companyColor: string }) {
  const [open, setOpen] = useState(week.status === "active");
  const pct = week.totalQuestions > 0
    ? Math.round((week.doneQuestions / week.totalQuestions) * 100)
    : 0;

  const statusIcon =
    week.status === "done"   ? <CheckCircle className="w-5 h-5 text-green-500" /> :
    week.status === "active" ? <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center"><Play className="w-2.5 h-2.5 text-white fill-white" /></div> :
                               <Lock className="w-4.5 h-4.5 text-gray-400" />;

  const borderClass =
    week.status === "done"   ? "border-green-200 bg-green-50/40" :
    week.status === "active" ? "border-blue-300 bg-blue-50/30 shadow-sm" :
                               "border-gray-200 bg-white opacity-70";

  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${borderClass}`}>
      {/* Header row */}
      <button
        onClick={() => week.status !== "locked" && setOpen((o) => !o)}
        disabled={week.status === "locked"}
        className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${
          week.status !== "locked" ? "hover:bg-white/60 cursor-pointer" : "cursor-not-allowed"
        }`}
        aria-expanded={open}
      >
        <span className="shrink-0">{statusIcon}</span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Week {week.weekNumber}
            </span>
            {week.status === "active" && (
              <span className="text-[10px] font-bold text-blue-600 bg-blue-100 rounded-full px-1.5 py-0.5">
                CURRENT
              </span>
            )}
          </div>
          <div className="font-semibold text-gray-900 text-sm truncate">{week.topic}</div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-xs font-semibold text-gray-700">
            {week.doneQuestions}/{week.totalQuestions}
          </div>
          <div className="text-xs text-gray-400">{pct}% done</div>
        </div>

        {/* Progress mini-bar */}
        <div className="w-16 h-1.5 bg-gray-200 rounded-full shrink-0 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${companyColor}`}
            style={{ width: `${pct}%` }}
          />
        </div>

        {week.status !== "locked" && (
          open ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> :
                 <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
        )}
        {week.status === "locked" && <Lock className="w-3.5 h-3.5 text-gray-300 shrink-0" />}
      </button>

      {/* Expanded question list */}
      {open && week.questions.length > 0 && (
        <div className="border-t border-gray-100 divide-y divide-gray-50">
          {week.questions.map((q) => (
            <div
              key={q.id}
              className={`flex items-center gap-3 px-5 py-3 ${q.done ? "opacity-60" : ""}`}
            >
              {/* Done checkbox (frontend state only for now) */}
              <div className={`w-4 h-4 rounded shrink-0 flex items-center justify-center ${
                q.done ? "bg-green-500" : "border-2 border-gray-300"
              }`}>
                {q.done && <CheckCircle className="w-4 h-4 text-white fill-white" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium truncate ${q.done ? "line-through text-gray-400" : "text-gray-900"}`}>
                  {q.title}
                </div>
              </div>

              <span className={`text-xs font-semibold rounded-full border px-2 py-0.5 shrink-0 ${diffBadge(q.diff)}`}>
                {q.diff}
              </span>
              <span className="text-xs font-bold text-amber-600 shrink-0">+{q.xp}</span>

              {q.leetcodeUrl ? (
                <a
                  href={q.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 shrink-0"
                  aria-label={`Open ${q.title} on LeetCode`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div className="w-3.5 shrink-0" />
              )}
            </div>
          ))}
        </div>
      )}

      {open && week.questions.length === 0 && (
        <div className="px-5 py-4 text-sm text-gray-400 border-t border-gray-100">
          Questions will be added soon for this week.
        </div>
      )}
    </div>
  );
}

// ── Company Tab ──────────────────────────────────────
function CompanyRoadmap({ company }: { company: UserRoadmapCompany }) {
  const completedWeeks = company.weeks.filter((w) => w.status === "done").length;
  const bgColorSolid =
    company.color === "bg-blue-600"   ? "bg-blue-600" :
    company.color === "bg-orange-500" ? "bg-orange-500" :
    company.color === "bg-blue-500"   ? "bg-blue-500" : "bg-blue-600";

  const progressBarColor =
    company.color === "bg-blue-600"   ? "bg-blue-600" :
    company.color === "bg-orange-500" ? "bg-orange-500" :
    company.color === "bg-blue-500"   ? "bg-blue-500" : "bg-blue-600";

  return (
    <div>
      {/* Company stat banner */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-5 flex items-center gap-4">
        <div className={`w-12 h-12 ${bgColorSolid} rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0`}>
          {company.initial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-gray-900">{company.name}</div>
          <div className="text-sm text-gray-500">{company.role} · {company.totalWeeks}-week plan</div>
          <div className="mt-2 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${progressBarColor} rounded-full transition-all`}
              style={{ width: `${company.pctComplete}%` }}
            />
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-2xl font-black text-gray-900">{company.pctComplete}%</div>
          <div className="text-xs text-gray-500">{completedWeeks}/{company.totalWeeks} weeks done</div>
        </div>

        {/* Quick actions */}
        <div className="flex flex-col gap-2 ml-4 shrink-0">
          <Link
            href={`/companies/${company.slug}/practice`}
            className="flex items-center gap-1.5 bg-gray-900 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Play className="w-3 h-3 fill-white" /> Practice
          </Link>
          <Link
            href={`/companies/${company.slug}`}
            className="flex items-center gap-1.5 border border-gray-300 text-gray-700 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BarChart2 className="w-3 h-3" /> Intel
          </Link>
        </div>
      </div>

      {/* Week cards */}
      <div className="space-y-2">
        {company.weeks.map((week) => (
          <WeekCard key={week.weekNumber} week={week} companyColor={progressBarColor} />
        ))}
      </div>
    </div>
  );
}

// ── Main Roadmap Page Content ────────────────────────
function RoadmapContent() {
  const searchParams = useSearchParams();
  const companies = getUserRoadmapCompanies();
  const initialSlug = searchParams.get("company") ?? companies[0]?.slug ?? "";
  const [activeSlug, setActiveSlug] = useState(initialSlug);

  // Sync if URL param changes
  useEffect(() => {
    const slug = searchParams.get("company");
    if (slug) setActiveSlug(slug);
  }, [searchParams]);

  const activeCompany = companies.find((c) => c.slug === activeSlug) ?? companies[0];

  if (!activeCompany) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-3">📋</div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">No companies in your roadmap yet</h2>
        <p className="text-gray-500 text-sm mb-6">Go to the Companies page and click &quot;Add to Roadmap&quot;</p>
        <Link href="/companies" className="bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
          Browse Companies
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Roadmap</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {companies.length} {companies.length === 1 ? "company" : "companies"} · Week-by-week prep plan
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Total XP this week:</span>
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="text-sm font-bold text-amber-600">+240</span>
        </div>
      </div>

      {/* Company tabs (horizontal scroll for many companies) */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {companies.map((co) => {
          const isActive = co.slug === activeSlug;
          const tabBg =
            co.color === "bg-blue-600"   ? (isActive ? "bg-blue-600 text-white"   : "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100") :
            co.color === "bg-orange-500" ? (isActive ? "bg-orange-500 text-white" : "bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100") :
            co.color === "bg-blue-500"   ? (isActive ? "bg-blue-500 text-white"   : "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100") :
                                           (isActive ? "bg-gray-900 text-white"   : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200");
          return (
            <button
              key={co.slug}
              onClick={() => setActiveSlug(co.slug)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold shrink-0 transition-all ${tabBg}`}
            >
              <div className={`w-5 h-5 ${isActive ? "bg-white/20" : co.color} rounded flex items-center justify-center text-white text-[10px] font-bold`}>
                {co.initial}
              </div>
              {co.name}
              <span className={`text-xs ${isActive ? "text-white/80" : "text-gray-400"}`}>
                {co.pctComplete}%
              </span>
              <ChevronRight className="w-3 h-3 opacity-60" />
            </button>
          );
        })}

        {/* Add more companies shortcut */}
        <Link
          href="/companies"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-dashed border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors shrink-0"
        >
          + Add Company
        </Link>
      </div>

      {/* Active company roadmap */}
      <CompanyRoadmap company={activeCompany} />
    </div>
  );
}

export default function RoadmapPage() {
  return (
    <Suspense fallback={
      <div className="space-y-4">
        <div className="h-8 bg-gray-100 rounded-lg w-48 animate-pulse" />
        <div className="flex gap-2 mb-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 w-32 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    }>
      <RoadmapContent />
    </Suspense>
  );
}
