"use client";
import { useState } from "react";
import { X, Plus, Edit2, Flame, RotateCcw, Trash2, AlertTriangle } from "lucide-react";

const Toggle = ({ defaultOn = true }: { defaultOn?: boolean }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <label className="toggle-switch cursor-pointer">
      <input type="checkbox" checked={on} onChange={() => setOn(!on)} />
      <span className="toggle-slider" />
    </label>
  );
};

export default function ProfilePage() {
  const [companies, setCompanies] = useState(["Google", "Microsoft", "Amazon"]);

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Profile & Settings</h1>
      <p className="text-sm text-gray-500 mb-6">Manage your account preferences and career goals.</p>

      <div className="grid grid-cols-[1fr_2fr] gap-6">
        {/* Left column */}
        <div className="space-y-5">
          {/* Avatar card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <div className="relative inline-block mb-3">
              <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center text-3xl font-bold text-gray-600">
                PS
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shadow-md" aria-label="Edit avatar">
                <Edit2 className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <h2 className="font-bold text-gray-900 text-lg">Pranay Sarkar</h2>
            <p className="text-sm text-gray-500 mt-0.5">pranay.sarkar@nst.edu</p>
            <div className="border-t border-gray-100 mt-4 pt-4 grid grid-cols-2 text-left gap-y-2">
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">BATCH</div>
                <div className="text-sm font-semibold text-gray-900">2023</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">BRANCH</div>
                <div className="text-sm font-semibold text-gray-900">CS-AI</div>
              </div>
            </div>
            <button className="mt-5 w-full border border-gray-300 text-gray-700 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
              <Edit2 className="w-3.5 h-3.5" /> Edit Full Profile
            </button>
          </div>

          {/* Performance Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Performance Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Global Rank</span>
                <span className="text-sm font-bold text-blue-600">#42</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Problems Solved</span>
                <span className="text-sm font-semibold text-gray-900">128</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Current Streak</span>
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-500" /> 14 Days
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Target Companies */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Target Companies</h3>
              <button className="text-sm text-blue-600 font-medium hover:underline">Edit</button>
            </div>
            <p className="text-xs text-gray-500 mb-4">Select companies to tailor your roadmap and practice sets.</p>
            <div className="flex flex-wrap gap-2">
              {companies.map((c) => (
                <span key={c} className="flex items-center gap-1.5 border border-gray-300 text-gray-700 text-sm px-3 py-1.5 rounded-lg">
                  {c}
                  <button onClick={() => setCompanies(companies.filter((x) => x !== c))}>
                    <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                  </button>
                </span>
              ))}
              <button className="flex items-center gap-1.5 border border-dashed border-gray-300 text-gray-500 text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                <Plus className="w-3.5 h-3.5" /> Add Company
              </button>
            </div>
          </div>

          {/* Domain Preferences */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Domain Preferences</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Data Structures & Algorithms", checked: true },
                { label: "System Design", checked: true },
                { label: "Frontend Development", checked: false },
                { label: "Backend Development", checked: false },
              ].map(({ label, checked }) => (
                <label key={label} className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" defaultChecked={checked} className="w-4 h-4 accent-blue-600" />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Notifications + Privacy */}
          <div className="grid grid-cols-2 gap-5">
            {/* Notifications */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-800">Daily Reminders</div>
                    <div className="text-xs text-gray-400">Practice prompts</div>
                  </div>
                  <Toggle defaultOn={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-800">New Companies</div>
                    <div className="text-xs text-gray-400">When added to DB</div>
                  </div>
                  <Toggle defaultOn={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-800">Marketing Emails</div>
                    <div className="text-xs text-gray-400">News and offers</div>
                  </div>
                  <Toggle defaultOn={false} />
                </div>
              </div>
            </div>

            {/* Privacy */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Privacy</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-800">Public Profile</div>
                    <div className="text-xs text-gray-400">Visible to recruiters</div>
                  </div>
                  <Toggle defaultOn={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-800">Show on Leaderboard</div>
                    <div className="text-xs text-gray-400">Display rank to peers</div>
                  </div>
                  <Toggle defaultOn={true} />
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-red-700">Danger Zone</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4">Irreversible actions regarding your account data and progress.</p>
            <div className="grid grid-cols-2 gap-3">
              <button className="border border-red-300 text-red-600 text-sm font-medium py-3 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                <RotateCcw className="w-4 h-4" /> Retake Assessment
              </button>
              <button className="bg-red-700 text-white text-sm font-medium py-3 rounded-lg hover:bg-red-800 transition-colors flex items-center justify-center gap-2">
                <Trash2 className="w-4 h-4" /> Reset Roadmap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
