"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle, Lock, ChevronDown, ChevronUp,
  ExternalLink, Zap, Play, ChevronRight, BarChart2, ClipboardList,
  Trash2, Timer, Trophy, XCircle
} from "lucide-react";
import { Suspense } from "react";
import {
  getUserRoadmapCompanies,
  removeRoadmapCompany,
  type UserRoadmapCompany,
} from "@/lib/mock-data";

// ─── Company logo map ────────────────────────────────────────────────────────
const COMPANY_LOGOS: Record<string, string> = {
  google:    "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
  microsoft: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  amazon:    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  apple:     "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  meta:      "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
  netflix:   "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  flipkart:  "https://upload.wikimedia.org/wikipedia/commons/1/18/Flipkart_logo.png",
  tcs:       "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
  razorpay:  "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg",
  atlassian: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Atlassian_logo.svg",
};

function getLogoUrl(slug: string): string | null {
  return COMPANY_LOGOS[slug.toLowerCase()] ?? null;
}

function CompanyLogo({
  logoUrl,
  name,
  initial,
  fallbackClass,
}: {
  logoUrl: string | null;
  name: string;
  initial: string;
  fallbackClass: string;
}) {
  const [error, setError] = useState(false);
  
  if (logoUrl && !error) {
    return (
      <img
        className="w-7 h-7 object-contain"
        src={logoUrl}
        alt={name}
        onError={() => setError(true)}
      />
    );
  }
  
  return <span className={`text-base font-bold ${fallbackClass}`}>{initial}</span>;
}

const EXPLORE_SUGGESTIONS = [
  {
    slug: "tcs",
    name: "TCS",
    initial: "T",
    role: "Ninja / Digital",
    totalXP: 1200,
    weeks: 6,
  },
  {
    slug: "razorpay",
    name: "Razorpay",
    initial: "R",
    role: "SDE-1",
    totalXP: 1800,
    weeks: 8,
  },
  {
    slug: "atlassian",
    name: "Atlassian",
    initial: "A",
    role: "Software Engineer",
    totalXP: 1500,
    weeks: 8,
  },
  {
    slug: "netflix",
    name: "Netflix",
    initial: "N",
    role: "SDE",
    totalXP: 2200,
    weeks: 10,
  }
];



// ─── Active Roadmap Hero Card ────────────────────────────────────────────────
function ActiveRoadmapCard({
  company,
  isSelected,
  onClick,
  onRemove,
}: {
  company: UserRoadmapCompany;
  isSelected: boolean;
  onClick: () => void;
  onRemove?: (slug: string) => void;
}) {
  const logoUrl = getLogoUrl(company.slug);
  const totalXP = company.weeks.reduce(
    (sum, w) => sum + w.questions.reduce((s, q) => s + q.xp, 0),
    0
  );
  const earnedXP = company.weeks.reduce(
    (sum, w) =>
      sum + w.questions.filter((q) => q.done).reduce((s, q) => s + q.xp, 0),
    0
  );
  const daysElapsed = company.currentWeek * 7;
  const totalDays = company.totalWeeks * 7;

  return (
    <div
      className={`min-w-[300px] bg-white border rounded-lg flex flex-col flex-shrink-0 cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-blue-500 shadow-md ring-2 ring-blue-200"
          : "border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300"
      }`}
      onClick={onClick}
    >
      {/* Card header ribbon */}
      <div className="bg-blue-600 px-5 py-2.5 rounded-t-lg">
        <p className="text-white text-[10px] font-bold uppercase tracking-widest opacity-90">
          Active Roadmap
        </p>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {/* Company logo + title */}
        <div className="flex items-start gap-3 mb-5">
          <div className="w-11 h-11 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200 shrink-0">
            <CompanyLogo
              logoUrl={logoUrl}
              name={company.name}
              initial={company.initial}
              fallbackClass="text-blue-600"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <h4 className="font-bold text-sm text-gray-900 leading-tight">
                {company.name} {company.role}
              </h4>
              <button
                className="text-gray-400 hover:text-red-500 transition-colors ml-2 shrink-0 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove?.(company.slug);
                }}
                aria-label="Remove roadmap"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-1">
              <Trophy className="w-3 h-3" /> Contest Mode
            </p>
          </div>
        </div>

        {/* XP badges */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-100">
              2X XP
            </span>
            <span className="text-blue-600 text-xs font-bold flex items-center gap-0.5">
              <Zap className="w-3.5 h-3.5 fill-blue-600" />
              {earnedXP}/{totalXP}
            </span>
          </div>
          <p className="text-gray-400 text-[10px]">
            {company.totalWeeks}-week plan · Week {company.currentWeek} of {company.totalWeeks}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-blue-600">{daysElapsed}</span>
            <span className="text-[10px] text-gray-500">/ {totalDays} days</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
              document.getElementById("roadmap-curriculum")?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-all shadow-sm"
          >
            Track
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Explore More Card (grid view) ───────────────────────────────────────────
function ExploreRoadmapCard({ company }: { company: typeof EXPLORE_SUGGESTIONS[0] }) {
  const logoUrl = getLogoUrl(company.slug);

  return (
    <div className="min-w-[300px] bg-white border border-gray-200 rounded-lg flex flex-col flex-shrink-0 cursor-pointer shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 h-full">
      {/* Card header ribbon */}
      <div className="bg-gray-100 px-5 py-2.5 rounded-t-lg border-b border-gray-200">
        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest opacity-90">
          Suggested Roadmap
        </p>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200 shrink-0">
              <CompanyLogo
                logoUrl={logoUrl}
                name={company.name}
                initial={company.initial}
                fallbackClass="text-gray-700"
              />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900 leading-tight">
                {company.name} {company.role}
              </h4>
              <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-1">
                <Timer className="w-3 h-3" /> {company.weeks} Weeks Plan
              </p>
            </div>
          </div>
        </div>

        {/* XP */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-100 shrink-0">
              2X XP
            </span>
            <span className="text-blue-600 text-xs font-bold flex items-center gap-0.5">
              <Zap className="w-3.5 h-3.5 fill-blue-600" />
              Total {company.totalXP} XP
            </span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-gray-400 text-[10px]">Preview curriculum &amp; challenges</p>
          <Link
            href={`/companies/${company.slug}/practice`}
            className="px-5 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-all shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            Track
          </Link>
        </div>
      </div>
    </div>
  );
}



// ─── Main Roadmap Page Content ───────────────────────────────────────────────
function RoadmapContent() {
  const searchParams = useSearchParams();
  const [companies, setCompanies] = useState<UserRoadmapCompany[]>(getUserRoadmapCompanies);
  const initialSlug = searchParams.get("company") ?? companies[0]?.slug ?? "";
  const [activeSlug, setActiveSlug] = useState(initialSlug);

  // Sync state if returned from other pages
  useEffect(() => {
    setTimeout(() => {
      setCompanies(getUserRoadmapCompanies());
    }, 0);
  }, []);

  useEffect(() => {
    const slug = searchParams.get("company");
    if (slug && companies.some((c) => c.slug === slug)) {
      setTimeout(() => setActiveSlug(slug), 0);
    }
  }, [searchParams, companies]);

  const handleRemove = (slug: string) => {
    removeRoadmapCompany(slug);
    const updated = getUserRoadmapCompanies();
    setCompanies(updated);
    if (activeSlug === slug) {
      setActiveSlug(updated[0]?.slug ?? "");
    }
  };

  const activeCompany = companies.find((c) => c.slug === activeSlug) ?? companies[0];

  if (!activeCompany || companies.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="flex justify-center mb-3 text-gray-300">
          <ClipboardList className="w-12 h-12" />
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">No companies in your roadmap yet</h2>
        <p className="text-gray-500 text-sm mb-6">
          Go to the Companies page and click &quot;Add to Roadmap&quot;
        </p>
        <Link
          href="/companies"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          Browse Companies
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* ── Page Header ── */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">My Roadmaps</h1>
        <p className="text-sm text-gray-500">
          Select a target company to view your personalized preparation path.
        </p>
      </header>

      {companies.length >= 5 && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
          <div className="bg-red-100 text-red-600 rounded-full p-1 mt-0.5 shrink-0">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-red-800 font-bold text-sm">Roadmap Limit Reached</h3>
            <p className="text-red-600 text-xs mt-1 font-medium">Adding more than 5 roadmaps will be messy. Focus on your current targets to maximize your chances of success!</p>
          </div>
        </div>
      )}

      {/* ── Hero: Horizontally scrollable Active Roadmap Cards ── */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-1 px-1">
        {companies.map((co) => (
          <ActiveRoadmapCard
            key={co.slug}
            company={co}
            isSelected={co.slug === activeSlug}
            onClick={() => setActiveSlug(co.slug)}
            onRemove={handleRemove}
          />
        ))}

        {/* Add company shortcut */}
        <Link
          href="/companies"
          className="min-w-[160px] flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 hover:text-blue-600 hover:border-blue-300 transition-colors flex-shrink-0 px-5 py-8"
        >
          <div className="w-10 h-10 rounded-full border-2 border-dashed border-current flex items-center justify-center">
            <span className="text-xl font-light leading-none">+</span>
          </div>
          <span className="text-xs font-semibold text-center">Add Roadmap</span>
        </Link>
      </div>

      {/* ── Explore More Roadmaps ── */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">Explore More Roadmaps</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-1 px-1">
          {EXPLORE_SUGGESTIONS.map((co) => (
            <div key={co.slug}>
              <ExploreRoadmapCard company={co} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Active Roadmap Detail View ── */}
      <div id="roadmap-curriculum">
        <h2 className="text-lg font-semibold text-gray-900 mb-5 border-t pt-8">Roadmap Curriculum</h2>
        <RoadmapCurriculumView company={activeCompany} />
      </div>
    </div>
  );
}

function RoadmapCurriculumView({ company }: { company: UserRoadmapCompany }) {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(company.currentWeek);

  // Sync expanded week when company changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setTimeout(() => setExpandedWeek(company.currentWeek), 0);
  }, [company.slug]);

  const logoUrl = getLogoUrl(company.slug);

  return (
    <div className="pb-12">
      {/* Hero Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200 shrink-0">
            {logoUrl ? (
              <img src={logoUrl} alt={company.name} className="w-8 h-8 object-contain" />
            ) : (
              <span className={`text-xl font-bold text-blue-600`}>{company.initial}</span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
            <p className="text-gray-500 text-sm">{company.role} · {company.totalWeeks}-week plan</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-end md:items-center gap-6 w-full md:w-auto">
          {/* Overall Progress */}
          <div className="w-full md:w-64">
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-2xl font-bold text-gray-900 leading-none">{company.pctComplete}%</span>
              <span className="text-xs text-gray-500 font-medium">{company.currentWeek}/{company.totalWeeks} weeks done</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${company.pctComplete}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex gap-2 shrink-0">
            <Link
              href={`/companies/${company.slug}/practice`}
              className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm"
            >
              <Play className="w-4 h-4 fill-white" /> Practice
            </Link>
            <Link
              href={`/companies/${company.slug}`}
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm"
            >
               Intel
            </Link>
          </div>
        </div>
      </div>

      {/* Curriculum List */}
      <div className="space-y-4">
        {company.weeks.map((week) => {
          const isExpanded = expandedWeek === week.weekNumber;
          const isDone = week.status === "done";
          const isActive = week.status === "active";
          const isLocked = week.status === "locked";
          const pct = week.totalQuestions > 0 ? Math.round((week.doneQuestions / week.totalQuestions) * 100) : 0;

          return (
            <div 
              key={week.weekNumber} 
              className={`border rounded-xl bg-white overflow-hidden transition-all ${
                isActive ? 'border-blue-200 shadow-sm' : 'border-gray-200'
              }`}
            >
              <div 
                className={`p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 ${isLocked ? 'opacity-60 cursor-not-allowed' : ''}`}
                onClick={() => {
                  if (!isLocked) setExpandedWeek(isExpanded ? null : week.weekNumber);
                }}
              >
                <div className="flex items-center gap-4">
                  {isDone && <CheckCircle className="w-6 h-6 text-green-500" />}
                  {isActive && <Play className="w-6 h-6 text-blue-600 fill-blue-50" />}
                  {isLocked && <Lock className="w-6 h-6 text-gray-300" />}

                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        isDone ? 'text-gray-500' : isActive ? 'text-blue-600' : 'text-gray-400'
                      }`}>
                        WEEK {week.weekNumber}
                      </span>
                      {isActive && (
                        <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className={`font-bold text-base ${isLocked ? 'text-gray-400' : 'text-gray-900'}`}>
                      {week.topic}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right w-28 hidden sm:block">
                    <div className="text-xs font-bold text-gray-700 mb-1">
                      {week.doneQuestions}/{week.totalQuestions}
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{pct}% done</span>
                      <div className="w-12 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-500 ${isDone ? 'bg-green-500' : isActive ? 'bg-blue-600' : 'bg-gray-300'}`} 
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {!isLocked && (
                    <div className="text-gray-400">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  )}
                  {isLocked && <Lock className="w-4 h-4 text-gray-300" />}
                </div>
              </div>

              {isExpanded && !isLocked && (
                <div className="border-t border-gray-100 bg-gray-50/30 p-5">
                  <div className="space-y-3">
                    {week.questions.map((q) => (
                      <div key={q.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-300 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${q.done ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'}`}>
                            {q.done && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <span className={`font-semibold text-sm ${q.done ? 'text-gray-400 line-through' : 'text-gray-700 group-hover:text-blue-600'}`}>
                            {q.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            q.diff === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' :
                            q.diff === 'Medium' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            'bg-red-50 text-red-700 border-red-200'
                          }`}>
                            {q.diff}
                          </span>
                          <span className="text-xs font-bold text-orange-500 flex items-center gap-0.5">
                            +{q.xp}
                          </span>
                          <a 
                            href={q.leetcodeUrl || '#'} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-blue-500 hover:text-blue-700 p-1 rounded-md hover:bg-blue-50 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function RoadmapPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <div className="h-8 bg-gray-100 rounded-lg w-48 animate-pulse" />
          <div className="flex gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="min-w-[300px] h-52 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      }
    >
      <RoadmapContent />
    </Suspense>
  );
}
