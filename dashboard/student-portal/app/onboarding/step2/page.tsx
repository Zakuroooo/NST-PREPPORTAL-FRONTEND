"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2, Briefcase, Server, Rocket, Landmark, MoreHorizontal, CheckCircle,
} from "lucide-react";
import Stepper from "@/components/onboarding/Stepper";
import { CompanyCategory } from "@/lib/mock-data";

const categories: { id: CompanyCategory; icon: React.ComponentType<{ className?: string }>; label: string; desc: string }[] = [
  {
    id: "maang",
    icon: Building2,
    label: "MAANG / Big Tech",
    desc: "Google, Meta, Amazon, Apple, Netflix scale",
  },
  {
    id: "product",
    icon: Briefcase,
    label: "Product-Based",
    desc: "Mid-size, Series B+ product companies",
  },
  {
    id: "service",
    icon: Server,
    label: "Service-Based",
    desc: "TCS, Infosys, Wipro, Cognizant, etc.",
  },
  {
    id: "startup",
    icon: Rocket,
    label: "Startup",
    desc: "Early stage, high-growth startups",
  },
  {
    id: "bfsi",
    icon: Landmark,
    label: "Finance / BFSI",
    desc: "Goldman Sachs, JP Morgan, fintech firms",
  },
  {
    id: "other",
    icon: MoreHorizontal,
    label: "Other",
    desc: "Research, academia, or mixed roles",
  },
];

export default function Step2() {
  const [selected, setSelected] = useState<CompanyCategory[]>([]);
  const router = useRouter();

  const toggle = (id: CompanyCategory) => {
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-12">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="bg-blue-700 rounded px-2 py-1 text-white font-bold text-xs">NST</div>
        <span className="font-bold text-gray-900 text-sm">PlacePrep</span>
      </div>

      <Stepper currentStep={2} totalSteps={4} />
      <p className="text-xs text-gray-400 mb-8">Step 2 of 4</p>
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">What type of company are you targeting?</h1>
      <p className="text-sm text-gray-500 text-center mb-8">Select all that apply — your prep will be tailored accordingly</p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-lg mb-8">
        {categories.map(({ id, icon: Icon, label, desc }) => {
          const isSelected = selected.includes(id);
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              className={`relative flex flex-col items-start gap-2 p-5 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? "bg-blue-50 border-blue-500"
                  : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {isSelected && (
                <CheckCircle className="absolute top-3 right-3 w-4 h-4 text-blue-600" />
              )}
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                isSelected ? "bg-blue-100" : "bg-gray-100"
              }`}>
                <Icon className={`w-5 h-5 ${isSelected ? "text-blue-600" : "text-gray-500"}`} />
              </div>
              <div>
                <div className={`text-sm font-semibold ${isSelected ? "text-blue-700" : "text-gray-900"}`}>{label}</div>
                <div className="text-xs text-gray-500 mt-0.5 leading-tight">{desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Store selected categories in sessionStorage so Step 3 can read them */}
      <div className="flex gap-3 w-full max-w-lg">
        <button
          onClick={() => router.push("/onboarding/step1")}
          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => {
            // BACKEND TODO: persist category selection to user profile
            // For now, store in sessionStorage for Step 3 to read
            if (typeof window !== "undefined") {
              sessionStorage.setItem("onboarding_categories", JSON.stringify(selected));
              // Map categories → company slugs for auto-populating roadmap in step4
              const categoryToSlugs: Record<string, string[]> = {
                maang:   ["google", "amazon", "microsoft"],
                product: ["flipkart", "razorpay"],
                service: ["tcs"],
                startup: ["razorpay"],
                bfsi:    [],
                other:   [],
              };
              const slugs = [...new Set(selected.flatMap((cat) => categoryToSlugs[cat] ?? []))];
              sessionStorage.setItem("onboarding_companies", JSON.stringify(slugs));
            }
            router.push("/onboarding/step3");
          }}
          className="flex-1 bg-gray-900 text-white py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
