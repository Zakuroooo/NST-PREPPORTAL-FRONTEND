"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";

const companies = [
  { initial: "G", name: "Google", color: "bg-blue-600", questions: 2274, type: "FAANG", topTopic: "Arrays", slug: "google" },
  { initial: "A", name: "Amazon", color: "bg-orange-500", questions: 1957, type: "FAANG", topTopic: "DP", slug: "amazon" },
  { initial: "M", name: "Microsoft", color: "bg-teal-600", questions: 1374, type: "FAANG", topTopic: "Trees", slug: "microsoft" },
  { initial: "F", name: "Flipkart", color: "bg-blue-500", questions: 892, type: "Indian Product", topTopic: "Graphs", slug: "flipkart" },
  { initial: "T", name: "TCS", color: "bg-indigo-600", questions: 634, type: "Service", topTopic: "SQL", slug: "tcs" },
  { initial: "I", name: "Infosys", color: "bg-blue-800", questions: 521, type: "Service", topTopic: "OS", slug: "infosys" },
  { initial: "R", name: "Razorpay", color: "bg-blue-600", questions: 287, type: "Indian Startup", topTopic: "System Design", slug: "razorpay" },
  { initial: "S", name: "Swiggy", color: "bg-orange-500", questions: 198, type: "Indian Startup", topTopic: "Backend", slug: "swiggy" },
  { initial: "P", name: "Paytm", color: "bg-blue-500", questions: 176, type: "Indian Product", topTopic: "Arrays", slug: "paytm" },
  { initial: "P", name: "PhonePe", color: "bg-indigo-500", questions: 143, type: "Indian Product", topTopic: "DP", slug: "phonepe" },
  { initial: "A", name: "Adobe", color: "bg-red-600", questions: 1102, type: "FAANG", topTopic: "Graphs", slug: "adobe" },
  { initial: "G", name: "Goldman Sachs", color: "bg-blue-900", questions: 445, type: "Product", topTopic: "SQL", slug: "goldman-sachs" },
];

const filters = ["All", "Product", "Service", "Startup", "FAANG", "Indian"];

const filterMap: Record<string, string[]> = {
  "All": [],
  "Product": ["Indian Product", "Product"],
  "Service": ["Service"],
  "Startup": ["Indian Startup"],
  "FAANG": ["FAANG"],
  "Indian": ["Indian Product", "Indian Startup"],
};

export default function CompaniesPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All"
    ? companies
    : companies.filter((c) => filterMap[activeFilter]?.includes(c.type));

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Explore Companies</h1>
      <p className="text-sm text-gray-500 mb-6">Browse interview intelligence for 658+ companies</p>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search companies by name or topic..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`text-sm font-medium px-4 py-1.5 rounded-full border transition-colors ${
              activeFilter === f
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((co) => (
          <div
            key={co.slug}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 ${co.color} rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                {co.initial}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-gray-900 text-sm truncate">{co.name}</div>
                <div className="text-xs text-gray-400">{co.type}</div>
              </div>
            </div>
            <div className="text-sm text-gray-500 mb-2">{co.questions.toLocaleString()} questions</div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs bg-blue-50 text-blue-600 rounded px-2 py-0.5 font-medium">
                Top: {co.topTopic}
              </span>
            </div>
            <Link
              href={`/companies/${co.slug}`}
              className="block w-full text-center bg-gray-900 text-white text-xs font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <span className="flex items-center justify-center gap-1">View Intel <ChevronRight className="w-3.5 h-3.5" /></span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
