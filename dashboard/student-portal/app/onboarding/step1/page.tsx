"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Code2, Monitor, Brain, BarChart2, Cloud, Layers, CheckCircle } from "lucide-react";
import Link from "next/link";
import Stepper from "@/components/onboarding/Stepper";

const domains = [
  { icon: Code2, label: "SDE / Software Engineering" },
  { icon: Monitor, label: "Frontend / Full Stack" },
  { icon: Brain, label: "Data Science / ML" },
  { icon: BarChart2, label: "Data Analyst" },
  { icon: Cloud, label: "DevOps / Cloud" },
  { icon: Layers, label: "Other" },
];

export default function Step1() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggle = (label: string) => {
    setSelected((s) => s.includes(label) ? s.filter((x) => x !== label) : [...s, label]);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-12">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="bg-blue-700 rounded px-2 py-1 text-white font-bold text-xs">NST</div>
        <span className="font-bold text-gray-900 text-sm">PlacePrep</span>
      </div>

      <Stepper currentStep={1} totalSteps={4} />
      <p className="text-xs text-gray-400 mb-8">Step 1 of 4</p>
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">What are you preparing for?</h1>
      <p className="text-sm text-gray-500 text-center mb-8">Select all domains you want to cover</p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
        {domains.map(({ icon: Icon, label }) => {
          const isSelected = selected.includes(label);
          return (
            <button
              key={label}
              onClick={() => toggle(label)}
              className={`relative flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 text-sm font-medium transition-all ${
                isSelected
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {isSelected && (
                <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-blue-600" />
              )}
              <Icon className={`w-6 h-6 ${isSelected ? "text-blue-600" : "text-gray-400"}`} />
              <span className="text-center text-xs leading-tight">{label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-3 w-full max-w-md">
        <button
          onClick={() => selected.length > 0 && router.push("/onboarding/step2")}
          disabled={selected.length === 0}
          className={`w-full py-3 rounded-lg text-sm font-semibold transition-colors ${
            selected.length > 0
              ? "bg-gray-900 text-white hover:bg-gray-800"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
        <Link href="/onboarding/step2" className="text-sm text-gray-400 hover:text-gray-600">
          Skip for now
        </Link>
      </div>
    </div>
  );
}
