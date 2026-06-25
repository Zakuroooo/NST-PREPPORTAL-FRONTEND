"use client";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Loader2, Globe2, UserCheck } from "lucide-react";

export default function LoginPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;
    setError("");
    setLoading(true);
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err: unknown) {
      const e = err as { errors?: { message: string }[] };
      setError(e?.errors?.[0]?.message ?? "Google sign-in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left panel — brand */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-blue-700 p-12">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 rounded px-2 py-1 text-white font-bold text-sm">NST</div>
          <span className="font-bold text-white text-base">PlacePrep</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white leading-snug mb-4">
            India&apos;s Interview<br />Intelligence Platform
          </h1>
          <p className="text-blue-200 text-base leading-relaxed max-w-sm">
            Built exclusively for NST students. Practice smarter, track your
            readiness, and crack your dream company interview.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { num: "658+", label: "Companies Covered" },
            { num: "18,000+", label: "Real Interview Questions" },
            { num: "4–16 Weeks", label: "Custom Roadmaps" },
          ].map(({ num, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="text-white font-bold text-base w-20">{num}</div>
              <div className="text-blue-200 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-8 lg:hidden">
          <div className="bg-blue-700 rounded px-2 py-1 text-white font-bold text-sm">NST</div>
          <span className="font-bold text-gray-900 text-base">PlacePrep</span>
        </div>

        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500 mb-8">Sign in to continue to PlacePrep</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div id="clerk-captcha" />

          {/* Google SSO */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading || !isLoaded}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-800 font-semibold py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
            ) : (
              <Globe2 className="w-4 h-4 text-blue-500" />
            )}
            {loading ? "Redirecting..." : "Sign in with Google (NST Email)"}
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Guest Access */}
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="w-full flex items-center justify-center gap-3 bg-gray-100 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl text-sm hover:bg-gray-200 transition-colors"
          >
            <UserCheck className="w-4 h-4 text-gray-500" />
            Guest Access (Demo Mode)
          </button>

          <p className="text-xs text-center text-gray-400 mt-6">
            Access restricted to NST students only.
            <br />
            Use your <span className="font-medium text-gray-600">@newtonschool.co</span> Google account.
          </p>
        </div>
      </div>
    </div>
  );
}
