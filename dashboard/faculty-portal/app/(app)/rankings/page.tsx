"use client";

import { useState, useEffect } from "react";
import { Building2, ArrowDownAZ, ArrowUpNarrowWide, ArrowDownWideNarrow, Search } from "lucide-react";
import { mockCompaniesRankings } from "@/lib/mock-data";
import { CompanyRanking } from "@/lib/mock-data";

type SortOption = "name_asc" | "name_desc" | "score_asc" | "score_desc";

export default function RankingsPage() {
  const [sortOption, setSortOption] = useState<SortOption>("score_desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const sortedCompanies = [...mockCompaniesRankings]
    .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sortOption) {
        case "name_asc": return a.name.localeCompare(b.name);
        case "name_desc": return b.name.localeCompare(a.name);
        case "score_asc": return a.alignmentScore - b.alignmentScore;
        case "score_desc": return b.alignmentScore - a.alignmentScore;
        default: return 0;
      }
    });

  const getScoreColor = (score: number) => {
    if (score < 40) return "bg-red-50 text-red-700 border-red-200";
    if (score <= 70) return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "maang": return <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-semibold uppercase tracking-wide">FAANG</span>;
      case "product": return <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-semibold uppercase tracking-wide">Product</span>;
      case "service": return <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded font-semibold uppercase tracking-wide">Service</span>;
      case "startup": return <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded font-semibold uppercase tracking-wide">Startup</span>;
      default: return <span className="text-[10px] bg-gray-50 text-gray-700 border border-gray-200 px-2 py-0.5 rounded font-semibold uppercase tracking-wide">{category}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Company Rankings</h1>
        <p className="text-sm text-gray-500">See which companies test which subjects most heavily, ranked by curriculum relevance impact.</p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <div className="h-12 bg-gray-100 animate-pulse rounded-xl"></div>
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-lg"></div>)}
        </div>
      ) : (
        <>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search companies..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-900 placeholder:text-gray-400 transition-shadow"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setSortOption(sortOption === "name_asc" ? "name_desc" : "name_asc")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                sortOption.startsWith("name") ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <ArrowDownAZ className="w-4 h-4" /> Name
            </button>
            <button 
              onClick={() => setSortOption("score_desc")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                sortOption === "score_desc" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <ArrowDownWideNarrow className="w-4 h-4" /> High Score
            </button>
            <button 
              onClick={() => setSortOption("score_asc")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                sortOption === "score_asc" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <ArrowUpNarrowWide className="w-4 h-4" /> Low Score
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200 text-xs uppercase tracking-wider font-bold text-gray-500 bg-white">
                <th className="py-4 px-6 w-1/3">Company Name</th>
                <th className="py-4 px-6">Top Tested Subject</th>
                <th className="py-4 px-6 text-right">Curriculum Alignment Score</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {sortedCompanies.length > 0 ? (
                sortedCompanies.map((company, index) => (
                  <tr key={company.slug} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded bg-gray-100 flex items-center justify-center text-gray-700 border border-gray-200 font-bold uppercase shrink-0">
                          {company.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-base">{company.name}</p>
                          <div className="mt-1">
                            {getCategoryBadge(company.category)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-gray-700">{company.topTestedSubject}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className={`inline-flex items-center px-3 py-1 rounded-md font-bold text-sm border ${getScoreColor(company.alignmentScore)}`}>
                        {company.alignmentScore}%
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-gray-500">
                    No companies found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </>
      )}
    </div>
  );
}
