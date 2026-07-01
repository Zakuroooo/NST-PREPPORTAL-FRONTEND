"use client";

import { useFaculty } from "@/lib/context/FacultyContext";
import { getFacultyTier, TIER_STYLES, LEADERBOARD_CONFIG, FacultyTier } from "@/lib/data/facultyMembers";
import { Medal, Calendar, Clock, HelpCircle, Info } from "lucide-react";
import { DoubtTag } from "@/lib/data/types";

const TAG_MAP: Record<DoubtTag, string> = {
  "DSA":           "bg-blue-100 text-blue-800",
  "System Design": "bg-blue-50 text-blue-700",
  "LLD":           "bg-slate-100 text-slate-700",
  "HR":            "bg-gray-100 text-gray-700",
  "General":       "bg-gray-50 text-gray-600",
  "Web Development": "bg-cyan-100 text-cyan-800",
  "Aptitude":      "bg-orange-100 text-orange-800",
};

function TagPill({ tag }: { tag: DoubtTag }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded whitespace-nowrap ${TAG_MAP[tag]}`}>
      {tag}
    </span>
  );
}

export default function LeaderboardPage() {
  const { facultyMembers, currentFaculty } = useFaculty();

  const sortedFaculty = [...facultyMembers].sort((a, b) => b.doubtsSolvedThisMonth - a.doubtsSolvedThisMonth).map((f, i) => ({
    ...f,
    rank: i + 1,
    tier: getFacultyTier(f.doubtsSolvedThisMonth)
  }));

  const top3 = sortedFaculty.slice(0, 3);
  const allFaculty = sortedFaculty; // Display ALL faculty in the table below

  // Calculate days left in month
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const daysLeft = Math.ceil((nextMonth.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Hero Banner */}
      <div className="rounded-2xl overflow-hidden mb-8" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)" }}>
        <div className="p-8 text-center relative">
          <div className="flex justify-center gap-3 mb-4">
            <div className="inline-flex items-center gap-1.5 border border-white/30 text-white text-xs font-semibold px-3 py-1 rounded-full bg-white/10">
              <Calendar className="w-3.5 h-3.5" />
              {LEADERBOARD_CONFIG.currentLeaderboardMonth} Rankings
            </div>
            <div className="inline-flex items-center gap-1.5 border border-white/30 text-white text-xs font-semibold px-3 py-1 rounded-full bg-white/10">
              <Clock className="w-3.5 h-3.5" />
              Resets in {daysLeft} days
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Faculty Leaderboard</h1>
          <p className="text-blue-200 text-sm max-w-lg mx-auto">
            See who's leading in doubt resolution this month. 
            Help students, earn points, and climb the ranks!
          </p>
        </div>
      </div>

      {/* Podium */}
      <div className="flex justify-center items-end gap-4 sm:gap-10 mb-12">
        {/* 2nd Place */}
        {top3[1] && (
          <div className="text-center flex flex-col items-center pb-6">
            <Medal className="w-6 h-6 sm:w-8 sm:h-8 text-slate-300 mb-2" />
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 text-xl font-bold border-4 border-slate-300">
              {top3[1].initials}
            </div>
            <div className="bg-slate-500 text-white text-[10px] sm:text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center -mt-3 ml-12">2</div>
            <div className="text-sm font-bold text-gray-900 mt-2">{top3[1].name}</div>
            <div className={`mt-1 text-[10px] px-2 py-0.5 rounded-full ${TIER_STYLES[top3[1].tier]}`}>
              {top3[1].tier}
            </div>
            <div className="text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1">
              <HelpCircle className="w-4 h-4 text-blue-500" /> {top3[1].doubtsSolvedThisMonth}
            </div>
          </div>
        )}
        
        {/* 1st Place */}
        {top3[0] && (
          <div className="text-center flex flex-col items-center mb-6">
            <Medal className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 mb-2 drop-shadow-md" />
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-2xl font-bold border-4 border-amber-300 shadow-lg">
              {top3[0].initials}
            </div>
            <div className="bg-amber-500 text-white text-[10px] sm:text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center -mt-4 ml-14 shadow-sm">1</div>
            <div className="text-base sm:text-lg font-bold text-gray-900 mt-3">{top3[0].name}</div>
            <div className={`mt-1 text-[10px] px-2 py-0.5 rounded-full ${TIER_STYLES[top3[0].tier]}`}>
              {top3[0].tier}
            </div>
            <div className="text-base font-bold text-gray-900 mt-1 flex items-center gap-1.5">
              <HelpCircle className="w-4.5 h-4.5 text-blue-600" /> {top3[0].doubtsSolvedThisMonth}
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {top3[2] && (
          <div className="text-center flex flex-col items-center pb-6">
            <Medal className="w-6 h-6 sm:w-8 sm:h-8 text-amber-700 opacity-80 mb-2" />
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 text-xl font-bold border-4 border-orange-200">
              {top3[2].initials}
            </div>
            <div className="bg-orange-600 text-white text-[10px] sm:text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center -mt-3 ml-12">3</div>
            <div className="text-sm font-bold text-gray-900 mt-2">{top3[2].name}</div>
            <div className={`mt-1 text-[10px] px-2 py-0.5 rounded-full ${TIER_STYLES[top3[2].tier]}`}>
              {top3[2].tier}
            </div>
            <div className="text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1">
              <HelpCircle className="w-4 h-4 text-blue-500" /> {top3[2].doubtsSolvedThisMonth}
            </div>
          </div>
        )}
      </div>

      {/* Full Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto shadow-sm mb-8">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-[60px_250px_150px_1fr_120px_120px_100px] gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
            {["RANK", "FACULTY", "DEPARTMENT", "SUBJECTS", "SOLVED (MO)", "TIER", "ALL TIME"].map((h) => (
              <div key={h} className={`text-xs font-bold text-gray-500 uppercase tracking-wider ${h === "SOLVED (MO)" || h === "ALL TIME" ? "text-right" : ""}`}>
                {h}
              </div>
            ))}
          </div>
          {allFaculty.map((f) => {
            const isYou = f.id === currentFaculty?.id;
            return (
              <div
                key={f.id}
                className={`grid grid-cols-[60px_250px_150px_1fr_120px_120px_100px] gap-4 px-6 py-4 border-b border-gray-100 last:border-0 items-center transition-colors ${
                  isYou ? "bg-indigo-50/60 border-indigo-100" : "hover:bg-gray-50"
                }`}
              >
                <div className="font-bold text-gray-900 text-sm">#{f.rank}</div>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold ${isYou ? "bg-indigo-600" : "bg-gray-400"}`}>
                    {f.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-sm ${isYou ? "font-bold text-indigo-900" : "font-semibold text-gray-900"}`}>
                      {f.name} {isYou && <span className="text-indigo-600 text-xs ml-1">(You)</span>}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 font-medium">{f.department}</div>
                <div className="flex flex-wrap gap-1">
                  {f.subjects.map(tag => (
                    <TagPill key={tag} tag={tag} />
                  ))}
                </div>
                <div className="text-base font-bold text-gray-900 text-right">{f.doubtsSolvedThisMonth}</div>
                <div>
                  <span className={`inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full ${TIER_STYLES[f.tier]}`}>
                    {f.tier}
                  </span>
                </div>
                <div className="text-sm text-gray-500 font-medium text-right">{f.doubtsSolvedAllTime}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-500" /> Tier Thresholds
        </h3>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {(
            [
              { t: "Newbie", range: "0-9" },
              { t: "Contributor", range: "10-19" },
              { t: "Mentor", range: "20-29" },
              { t: "Expert", range: "30-39" },
              { t: "Grandmaster", range: "40-49" },
              { t: "Legend", range: "50+" }
            ] as const
          ).map(({ t, range }) => (
            <div key={t} className="flex items-center gap-2">
              <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded ${TIER_STYLES[t as FacultyTier]}`}>
                {t}
              </span>
              <span className="text-xs text-gray-500 font-medium">{range} doubts</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
