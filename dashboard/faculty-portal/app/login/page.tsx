"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, GraduationCap, UserCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate auth
    await new Promise((r) => setTimeout(r, 800));
    document.cookie = "faculty_authed=true; path=/";
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-blue-700 to-indigo-800 p-12">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 rounded px-2 py-1 text-white font-bold text-sm">NST</div>
          <span className="font-bold text-white text-base">PlacePrep</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white leading-snug mb-4">
            Faculty Portal
          </h1>
          <p className="text-blue-200 text-base leading-relaxed max-w-sm">
            Curriculum intelligence and student engagement. 
            Manage your sessions, track student progress, and answer doubts.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { num: "3", label: "Smart Curriculum Insights" },
            { num: "Real-time", label: "Student Doubt Resolution" },
            { num: "Full", label: "Session Management" },
          ].map(({ num, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="text-white font-bold text-base w-24">{num}</div>
              <div className="text-blue-200 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8 lg:hidden">
          <div className="bg-blue-700 rounded px-2 py-1 text-white font-bold text-sm">NST</div>
          <span className="font-bold text-gray-900 text-base">PlacePrep Faculty</span>
        </div>

        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Faculty Sign In</h2>
          <p className="text-sm text-gray-500 mb-8">Access your academic dashboard</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="faculty@newtonschool.co"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white font-semibold py-3 rounded-xl text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <GraduationCap className="w-4 h-4" />
              )}
              {loading ? "Signing in..." : "Sign In to Faculty Portal"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            type="button"
            onClick={() => {
              document.cookie = "faculty_authed=guest; path=/";
              router.push("/");
            }}
            className="w-full flex items-center justify-center gap-3 bg-gray-100 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl text-sm hover:bg-gray-200 transition-colors"
          >
            <UserCheck className="w-4 h-4 text-gray-500" />
            Guest Access (Demo Mode)
          </button>
        </div>
      </div>
    </div>
  );
}
