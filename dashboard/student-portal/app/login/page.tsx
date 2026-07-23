"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  User,
  CheckCircle2,
  Building2,
  BarChart3,
  Shield,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    const inputEmail = email.trim().toLowerCase();

    // Determine target role behind the scenes based on email
    let role = "student";
    if (inputEmail.includes("faculty")) {
      role = "faculty";
    } else if (inputEmail.includes("admin")) {
      role = "admin";
    }

    // Set universal auth cookies for all portals
    document.cookie = `student_authed=true; path=/; max-age=86400`;
    document.cookie = `faculty_authed=true; path=/; max-age=86400`;
    document.cookie = `admin_authed=true; path=/; max-age=86400`;

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "nst_session",
        JSON.stringify({
          role,
          email: inputEmail,
          name: name || (isSignUp ? "New User" : "NST User"),
          loginTime: new Date().toISOString(),
        })
      );
    }

    setSuccessMsg(isSignUp ? "Account created successfully! Redirecting..." : "Signed in successfully! Redirecting...");

    await new Promise((r) => setTimeout(r, 600));

    const currentHost = typeof window !== "undefined" ? window.location.hostname : "localhost";
    const currentPort = typeof window !== "undefined" ? window.location.port : "";

    // Route to appropriate portal seamlessly
    if (role === "faculty") {
      if (currentPort === "3001") {
        router.push("/");
      } else {
        window.location.href = `http://${currentHost}:3001/`;
      }
    } else if (role === "admin") {
      if (currentPort === "3002") {
        router.push("/overview");
      } else {
        window.location.href = `http://${currentHost}:3002/overview`;
      }
    } else {
      // Student (default)
      if (currentPort === "3000" || currentPort === "") {
        router.push("/dashboard");
      } else {
        window.location.href = `http://${currentHost}:3000/dashboard`;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col lg:flex-row font-sans text-gray-100">
      {/* Left Branding & Highlights */}
      <div className="lg:w-5/12 bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-950 p-8 lg:p-14 flex flex-col justify-between border-r border-gray-800/80 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-2.5 text-white font-bold shadow-lg shadow-blue-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-white">NST PlacePrep</span>
            </div>
          </div>

          <h1 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Empowering Your<br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Career Journey.
            </span>
          </h1>

          <p className="text-gray-300 text-base leading-relaxed mb-10 max-w-lg">
            Welcome to NST PlacePrep. Practice company interviews, track preparation roadmaps, and access curriculum intelligence all in one place.
          </p>

          <div className="space-y-4 my-8">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Company Prep & Insights</h4>
                <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
                  Over 650+ company question banks, interview patterns, and round breakdowns.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Curriculum & Progress Analytics</h4>
                <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
                  Real-time readiness score, skill radar charts, and personalized study roadmaps.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Faculty Mentorship</h4>
                <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
                  Direct doubt resolution, 1-on-1 session requests, and expert guidance.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-6 border-t border-gray-800/80 text-xs text-gray-400 flex items-center justify-between">
          <span>Newton School of Technology</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4" /> NST Secure Auth
          </span>
        </div>
      </div>

      {/* Right Form Panel — Standard Login / Sign Up */}
      <div className="flex-1 bg-white text-gray-900 flex flex-col justify-center items-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              {isSignUp ? "Create an Account" : "Welcome Back"}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              {isSignUp
                ? "Enter your details to register for NST PlacePrep"
                : "Enter your email and password to access your account"}
            </p>
          </div>

          {/* Alerts */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600 shrink-0" />
              {successMsg}
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-4" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-gray-900"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-4" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-gray-900"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                {!isSignUp && (
                  <a href="#" className="text-xs text-blue-600 font-medium hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-4" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-gray-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 text-white font-semibold py-4 rounded-xl text-sm transition-all shadow-md bg-blue-600 hover:bg-blue-700 active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                <>
                  {isSignUp ? "Sign Up" : "Sign In"} <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle between Sign In and Sign Up */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                  setSuccessMsg("");
                }}
                className="font-semibold text-blue-600 hover:underline ml-1"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
