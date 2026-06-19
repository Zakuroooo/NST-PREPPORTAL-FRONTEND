"use client";
import { useState } from "react";
import { Zap, Plus, X, CheckCircle, Clock, XCircle, Check } from "lucide-react";

const companies = ["Google", "Amazon", "Microsoft", "Flipkart", "TCS", "Infosys", "Razorpay", "Swiggy", "Paytm", "Adobe"];

export default function SubmitPage() {
  const [outcome, setOutcome] = useState<string | null>(null);
  const [stars, setStars] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [tags, setTags] = useState(["Arrays", "Dynamic Programming"]);
  const [tagInput, setTagInput] = useState("");

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-20">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you for contributing!</h2>
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-6 py-3 text-amber-800 font-bold text-lg mt-4 mb-4">
          <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
          +50 XP Earned!
        </div>
        <p className="text-gray-500 text-sm">Your experience will help future NST students prepare better.</p>
        <button onClick={() => setSubmitted(false)} className="mt-6 border border-gray-300 text-gray-700 text-sm px-5 py-2 rounded-lg hover:bg-gray-50">
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold text-gray-900">Share Your Interview Experience</h1>
      <p className="text-sm text-gray-500 mt-1 mb-5">Help your juniors prepare better. Every submission makes PlacePrep smarter.</p>

      {/* XP Banner */}
      <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <Zap className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0" />
        <span className="text-amber-800 font-medium text-sm">Earn 50 XP for submitting your interview experience this week!</span>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-7 space-y-5">
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Company</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              {companies.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Role / Level</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>SDE-1</option><option>SDE-2</option><option>Data Analyst</option><option>Frontend Engineer</option><option>Other</option>
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Interview Date</label>
            <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Outcome</label>
            <div className="flex gap-2">
              {[
                { key: "offer", label: "Offer", icon: CheckCircle, activeClass: "bg-green-600 text-white border-green-600" },
                { key: "rejected", label: "Rejected", icon: XCircle, activeClass: "bg-red-600 text-white border-red-600" },
                { key: "waiting", label: "Waiting", icon: Clock, activeClass: "bg-amber-500 text-white border-amber-500" },
              ].map(({ key, label, icon: Icon, activeClass }) => (
                <button
                  key={key}
                  onClick={() => setOutcome(key)}
                  className={`flex-1 text-xs font-medium py-2.5 rounded-lg border transition-colors flex items-center justify-center gap-1.5 ${ outcome === key ? activeClass : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
                >
                  <Icon className="w-3.5 h-3.5" />{label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stars */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Overall Difficulty</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} onClick={() => setStars(s)} className={`text-2xl ${s <= stars ? "text-yellow-400" : "text-gray-200"} hover:text-yellow-400 transition-colors`}>★</button>
            ))}
          </div>
        </div>

        {/* Round */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">Interview Rounds</label>
            <button className="flex items-center gap-1.5 text-sm text-blue-600 border border-dashed border-blue-300 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add Round
            </button>
          </div>
          <div className="border border-gray-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">ROUND 1</span>
              <select className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Online Assessment</option><option>DSA Coding</option><option>System Design</option><option>HR</option><option>Managerial</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Topics Asked</label>
              <div className="flex flex-wrap gap-2 border border-gray-200 rounded-lg p-2 min-h-[42px]">
                {tags.map((t) => (
                  <span key={t} className="flex items-center gap-1 bg-blue-50 text-blue-700 text-xs rounded px-2 py-1">
                    {t} <button onClick={() => setTags(tags.filter((x) => x !== t))}><X className="w-3 h-3" /></button>
                  </span>
                ))}
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                  placeholder="Type topic + Enter"
                  className="flex-1 min-w-20 text-xs outline-none"
                />
              </div>
            </div>
            <textarea
              rows={2}
              placeholder="What specific questions were asked in this round?"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="flex gap-2">
              <button className="text-xs font-medium bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-lg flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Cleared
              </button>
              <button className="text-xs font-medium bg-white text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-red-50 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> Not Cleared
              </button>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Any surprises or tips?</label>
          <textarea
            rows={3}
            placeholder="What wasn't covered in any prep guide? What surprised you?"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          Submit Experience
        </button>
      </div>
    </div>
  );
}
