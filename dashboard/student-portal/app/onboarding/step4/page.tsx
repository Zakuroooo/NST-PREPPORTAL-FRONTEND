"use client";
import { useRouter } from "next/navigation";
import { Rocket, CheckCircle, Map, Zap, Calendar } from "lucide-react";
import Stepper from "@/components/onboarding/Stepper";

const readyItems = [
  "12-Week personalised roadmap based on your goals",
  "Daily practice plan tailored to your topic ratings",
  "Company-tagged questions from your target categories",
  "Bi-weekly progress check-ins and XP milestones",
];

export default function Step4() {
  const router = useRouter();

  const handleLaunch = () => {
    // Auto-populate roadmap from onboarding step2 company selections
    // BACKEND TODO: POST /api/user/me/onboarding/complete
    try {
      const storedCompanies = sessionStorage.getItem("onboarding_companies");
      if (storedCompanies) {
        const companies: string[] = JSON.parse(storedCompanies);
        const companyData: Record<string, { name: string; initial: string; color: string }> = {
          google:    { name: "Google",    initial: "G", color: "bg-blue-600" },
          amazon:    { name: "Amazon",    initial: "A", color: "bg-blue-500" },
          flipkart:  { name: "Flipkart",  initial: "F", color: "bg-blue-500" },
          microsoft: { name: "Microsoft", initial: "M", color: "bg-blue-600" },
          tcs:       { name: "TCS",       initial: "T", color: "bg-blue-600" },
          razorpay:  { name: "Razorpay",  initial: "R", color: "bg-blue-800" },
        };
        const roadmapEntries = companies
          .filter((slug) => companyData[slug])
          .map((slug) => ({
            slug,
            ...companyData[slug],
            role: "SDE-1",
            weeks: 12,
            addedAt: new Date().toISOString(),
          }));
        if (roadmapEntries.length > 0) {
          sessionStorage.setItem("roadmap_companies", JSON.stringify(roadmapEntries));
        }
      }
    } catch {
      // sessionStorage might not be available
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-12 text-center">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="bg-blue-700 rounded px-2 py-1 text-white font-bold text-xs">NST</div>
        <span className="font-bold text-gray-900 text-sm">PlacePrep</span>
      </div>

      <Stepper currentStep={4} totalSteps={4} />
      <p className="text-xs text-gray-400 mb-8">Step 4 of 4</p>

      {/* Hero Icon */}
      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
        <Rocket className="w-10 h-10 text-blue-600" />
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re all set!</h1>
      <p className="text-sm text-gray-500 mb-8 max-w-sm">
        Your personalised roadmap is ready. Here&apos;s what we&apos;ve prepared based on your goals:
      </p>

      {/* Summary card */}
      <div className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl p-5 text-left space-y-3 mb-6">
        {readyItems.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">{item}</span>
          </div>
        ))}
      </div>

      {/* Quick stats */}
      <div className="flex gap-4 mb-8">
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 rounded-lg px-4 py-2 text-sm font-medium">
          <Map className="w-4 h-4" /> 84-day roadmap
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 rounded-lg px-4 py-2 text-sm font-medium">
          <Zap className="w-4 h-4" /> XP rewards enabled
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 rounded-lg px-4 py-2 text-sm font-medium">
          <Calendar className="w-4 h-4" /> Daily targets set
        </div>
      </div>

      <button
        onClick={handleLaunch}
        className="w-full max-w-md bg-gray-900 text-white py-3 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
      >
        <Rocket className="w-4 h-4" /> Launch My Dashboard
      </button>
    </div>
  );
}

