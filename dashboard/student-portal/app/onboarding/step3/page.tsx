"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Info } from "lucide-react";
import Stepper from "@/components/onboarding/Stepper";
import { CompanyCategory, getTopicsForCategories, TopicRating } from "@/lib/mock-data";

const durations = ["4 weeks", "8 weeks", "12 weeks", "16 weeks", "24 weeks"];

export default function SelfRatingPage() {
  const router = useRouter();
  const [topics, setTopics] = useState<TopicRating[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [time, setTime] = useState("12 weeks");

  useEffect(() => {
    // Read selected categories from Step 2
    // BACKEND TODO: replace with GET /api/users/me/onboarding-state
    let categories: CompanyCategory[] = [];
    if (typeof window !== "undefined") {
      try {
        const raw = sessionStorage.getItem("onboarding_categories");
        if (raw) categories = JSON.parse(raw) as CompanyCategory[];
      } catch {
        categories = [];
      }
    }
    const resolved = getTopicsForCategories(categories);
    setTopics(resolved);
    // Initialize ratings with defaults
    const initial: Record<string, number> = {};
    resolved.forEach((t) => { initial[t.id] = t.defaultRating; });
    setRatings(initial);
  }, []);

  const handleRatingChange = (id: string, value: number) => {
    setRatings((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <div className="bg-blue-700 rounded px-2 py-1 text-white font-bold text-xs">NST</div>
            <span className="font-bold text-gray-900 text-sm">PlacePrep</span>
          </div>
          <Stepper currentStep={3} totalSteps={4} />
        </div>

        <p className="text-xs text-gray-400 mb-6 text-center">Step 3 of 4</p>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Rate your topic-wise confidence</h1>
        <p className="text-gray-500 text-sm mb-2">Topics are tailored to your selected company category</p>

        {/* Backend note */}
        <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-8 text-xs text-blue-700">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            Topics shown are based on your selected company type. When the backend is connected, these will be dynamically personalised for your exact target companies.
          </span>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-6 shadow-sm">
          {topics.length === 0 ? (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-6 mb-10">
              {topics.map((topic) => (
                <div key={topic.id} className="flex items-center gap-4">
                  <div className="w-48 text-sm font-medium text-gray-900 shrink-0">{topic.label}</div>
                  <div className="flex-1">
                    <input
                      type="range" min="1" max="10" step="1"
                      value={ratings[topic.id] ?? topic.defaultRating}
                      onChange={(e) => handleRatingChange(topic.id, parseInt(e.target.value))}
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="w-8 text-right text-blue-600 font-semibold text-sm shrink-0">
                    {ratings[topic.id] ?? topic.defaultRating}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-gray-100 pt-8 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">How much time do you have?</h3>
            <div className="flex flex-wrap gap-3">
              {durations.map((duration) => (
                <button
                  key={duration}
                  onClick={() => setTime(duration)}
                  className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                    time === duration
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              // BACKEND TODO: POST /api/onboarding/self-rating { ratings, duration: time }
              router.push("/onboarding/step4");
            }}
            className="w-full bg-gray-900 text-white rounded-lg py-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
          >
            Generate My Roadmap <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => router.push("/onboarding/step2")}
          className="mx-auto flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to previous step
        </button>
      </div>
    </div>
  );
}
