"use client";

import { FileText, Download, Play, CheckCircle2, History } from "lucide-react";
import { mockReportHistory } from "@/lib/mock-data";
import { useState, useEffect } from "react";

export default function ReportsPage() {
  const [sections, setSections] = useState({
    gapMatrix: true,
    industryTrends: true,
    companyRankings: true,
    subjectBreakdown: false
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const handleGenerate = () => {
    alert("Report generation coming soon");
  };

  const handleDownload = () => {
    alert("Download coming soon");
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Export Reports</h1>
        <p className="text-sm text-gray-500">Generate and download curriculum intelligence reports for academic review.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-gray-100 animate-pulse rounded-xl"></div>
          <div className="lg:col-span-1 h-96 bg-gray-100 animate-pulse rounded-xl"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Generate Report */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-full">
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <h2 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5 text-blue-600" />
                Generate New Report
              </h2>
              <p className="text-sm text-gray-500 mt-1">Select the sections you want to include in the PDF export.</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4 mb-8">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer peer appearance-none border checked:bg-blue-600 checked:border-blue-600 transition-colors"
                      checked={sections.gapMatrix}
                      onChange={() => setSections({...sections, gapMatrix: !sections.gapMatrix})}
                    />
                    <CheckCircle2 className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Curriculum Gap Matrix</p>
                    <p className="text-sm text-gray-500 leading-snug">Include the full breakdown of subjects vs industry demand.</p>
                  </div>
                </label>
                
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer peer appearance-none border checked:bg-blue-600 checked:border-blue-600 transition-colors"
                      checked={sections.industryTrends}
                      onChange={() => setSections({...sections, industryTrends: !sections.industryTrends})}
                    />
                    <CheckCircle2 className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Industry Trends</p>
                    <p className="text-sm text-gray-500 leading-snug">Include topic frequency charts and recent trend alerts.</p>
                  </div>
                </label>
                
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer peer appearance-none border checked:bg-blue-600 checked:border-blue-600 transition-colors"
                      checked={sections.companyRankings}
                      onChange={() => setSections({...sections, companyRankings: !sections.companyRankings})}
                    />
                    <CheckCircle2 className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Company Rankings</p>
                    <p className="text-sm text-gray-500 leading-snug">Include top hiring companies sorted by curriculum alignment.</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer peer appearance-none border checked:bg-blue-600 checked:border-blue-600 transition-colors"
                      checked={sections.subjectBreakdown}
                      onChange={() => setSections({...sections, subjectBreakdown: !sections.subjectBreakdown})}
                    />
                    <CheckCircle2 className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Full Subject Breakdown</p>
                    <p className="text-sm text-gray-500 leading-snug">Include detailed syllabus analysis for all subjects.</p>
                  </div>
                </label>
              </div>

              <button 
                onClick={handleGenerate}
                className="bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-2 shadow-sm w-full justify-center md:w-auto"
              >
                <Play className="w-4 h-4" /> Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: History */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm h-full flex flex-col">
            <div className="p-5 border-b border-gray-200 bg-gray-50">
              <h2 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                <History className="w-5 h-5 text-gray-600" />
                Previously Generated
              </h2>
            </div>
            
            <div className="p-5 flex-grow overflow-y-auto">
              <div className="space-y-4">
                {mockReportHistory.map(report => (
                  <div key={report.id} className="border border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm transition-all rounded-lg p-4 group">
                    <div className="flex justify-between items-start mb-2">
                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">{report.date}</span>
                    </div>
                    <p className="font-bold text-gray-900 mb-3 text-sm">{report.name}</p>
                    <button 
                      onClick={handleDownload}
                      className="w-full text-blue-600 bg-blue-50 hover:bg-blue-100 font-semibold text-xs py-2 rounded transition-colors flex items-center justify-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Download PDF
                    </button>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
