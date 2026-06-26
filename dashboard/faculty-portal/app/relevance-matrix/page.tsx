"use client";

import { useState } from "react";
import { Plus, Upload, Download, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { TOPICS, CATEGORIES, DEFAULT_MATRIX } from "@/lib/data/relevanceMatrix";
import { cn } from "@/lib/utils";

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export default function RelevanceMatrixPage() {
  const [matrix, setMatrix] = useState<Record<string, Record<string, boolean>>>(
    deepClone(DEFAULT_MATRIX)
  );
  const [uploadOpen, setUploadOpen] = useState(false);

  const toggleCell = (topicId: string, categoryId: string) => {
    setMatrix(prev => ({
      ...prev,
      [topicId]: {
        ...prev[topicId],
        [categoryId]: !prev[topicId][categoryId],
      },
    }));
  };

  // Per-column coverage %
  const columnCoverage = CATEGORIES.map(cat => {
    const ticked = TOPICS.filter(t => matrix[t.id]?.[cat.id]).length;
    return { id: cat.id, label: cat.shortLabel, pct: Math.round((ticked / TOPICS.length) * 100) };
  });

  // Summary card logic
  const criticalGaps: { topic: string; category: string }[] = [];
  const wellAligned: string[] = [];
  const overIndexed: string[] = [];

  TOPICS.forEach(topic => {
    const tickedCats = CATEGORIES.filter(c => matrix[topic.id]?.[c.id]);
    const tickedCount = tickedCats.length;

    if (tickedCount === 0) {
      CATEGORIES.forEach(c => {
        criticalGaps.push({ topic: topic.label, category: c.label });
      });
    } else {
      // Topics with no ticked cells per individual category become individual gaps
      CATEGORIES.forEach(cat => {
        if (!matrix[topic.id]?.[cat.id]) {
          criticalGaps.push({ topic: topic.label, category: cat.label });
        }
      });
    }

    if (tickedCount >= 4) {
      wellAligned.push(topic.label);
    }

    if (topic.teachingLoad === "high" && tickedCount <= 1) {
      overIndexed.push(topic.label);
    }
  });

  // Limit gaps to at most 5 for readability
  const displayedGaps = criticalGaps.slice(0, 5);

  return (
    <div className="space-y-8 pb-20 relative">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Select defaultValue="2024">
              <SelectTrigger className="w-36 h-9 bg-white border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">Batch: 2024</SelectItem>
                <SelectItem value="2025">Batch: 2025</SelectItem>
                <SelectItem value="2026">Batch: 2026</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="cs">
              <SelectTrigger className="w-36 h-9 bg-white border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cs">Branch: CS</SelectItem>
                <SelectItem value="ai">Branch: AI &amp; ML</SelectItem>
                <SelectItem value="se">Branch: Software Eng</SelectItem>
                <SelectItem value="cy">Branch: Cybersecurity</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            {/* Upload Syllabus */}
            <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
              <DialogTrigger
                render={
                  <Button variant="outline" className="border-gray-200 bg-white hover:bg-gray-50 shadow-sm" />
                }
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Syllabus
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Syllabus</DialogTitle>
                  <DialogDescription>
                    Upload your course syllabus to auto-populate the matrix. Supports PDF and DOCX.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="syllabus-file">File</Label>
                    <Input id="syllabus-file" type="file" accept=".pdf,.docx,.doc" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course-name">Course Name</Label>
                    <Input id="course-name" placeholder="e.g. Data Structures & Algorithms" />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    className="bg-[#534AB7] hover:bg-[#433b9f]"
                    onClick={() => {
                      setUploadOpen(false);
                      toast.success("Syllabus parsed and matrix updated!");
                    }}
                  >
                    Upload &amp; Parse
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Export PDF */}
            <Button
              className="bg-[#534AB7] hover:bg-[#433b9f] shadow-sm"
              onClick={() => toast.info("PDF export coming soon")}
            >
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        <p className="text-sm text-gray-500 max-w-2xl">
          Tick each cell where your current syllabus covers that interview category. 
          Green cells indicate coverage; red cells indicate gaps that students are likely 
          to encounter in real technical interviews.
        </p>
      </div>

      {/* Matrix Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/60">
              <th className="py-4 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-52">
                Topic / Course Area
              </th>
              {CATEGORIES.map(cat => (
                <th key={cat.id} className="py-4 px-4 text-center">
                  <Badge className={cn("font-semibold shadow-none text-xs", cat.color)}>
                    {cat.label}
                  </Badge>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {TOPICS.map((topic, tIdx) => (
              <tr
                key={topic.id}
                className={cn(
                  "group transition-colors hover:bg-gray-50/50",
                  tIdx % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                )}
              >
                <td className="py-3 px-5 font-medium text-gray-800">
                  {topic.label}
                  {topic.teachingLoad === "high" && (
                    <span className="ml-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                      Core
                    </span>
                  )}
                </td>
                {CATEGORIES.map(cat => {
                  const checked = matrix[topic.id]?.[cat.id] ?? false;
                  return (
                    <td key={cat.id} className="py-2 px-4 text-center">
                      <button
                        onClick={() => toggleCell(topic.id, cat.id)}
                        className={cn(
                          "h-9 w-9 rounded-lg mx-auto flex items-center justify-center border-2 transition-all",
                          checked
                            ? "bg-emerald-50 border-emerald-400 text-emerald-600 hover:bg-emerald-100"
                            : "bg-rose-50 border-rose-200 text-rose-300 hover:bg-rose-100 hover:border-rose-300"
                        )}
                        aria-label={`Toggle ${topic.label} for ${cat.label}`}
                      >
                        {checked ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          {/* Summary row */}
          <tfoot>
            <tr className="border-t-2 border-gray-200 bg-gray-50">
              <td className="py-4 px-5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Coverage %
              </td>
              {columnCoverage.map(col => (
                <td key={col.id} className="py-4 px-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span
                      className={cn(
                        "text-sm font-bold",
                        col.pct >= 70 ? "text-emerald-600" : col.pct >= 40 ? "text-amber-600" : "text-rose-600"
                      )}
                    >
                      {col.pct}%
                    </span>
                    <div className="w-14 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          col.pct >= 70 ? "bg-emerald-500" : col.pct >= 40 ? "bg-amber-500" : "bg-rose-500"
                        )}
                        style={{ width: `${col.pct}%` }}
                      />
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Critical Gaps */}
        <Card className="border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500 rounded-l-xl" />
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-rose-500" />
              Critical Gaps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {displayedGaps.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No gaps detected. Great coverage!</p>
            ) : (
              <>
                {displayedGaps.map((gap, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-700">
                      <span className="font-medium">{gap.topic}</span>{" "}
                      <span className="text-gray-400">→</span>{" "}
                      <span className="text-rose-600">{gap.category}</span>
                    </span>
                  </div>
                ))}
                {criticalGaps.length > 5 && (
                  <p className="text-xs text-gray-400 mt-1">+{criticalGaps.length - 5} more gaps</p>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Over-indexed */}
        <Card className="border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 rounded-l-xl" />
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Over-indexed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {overIndexed.length === 0 ? (
              <p className="text-sm text-gray-400 italic">Teaching load is well balanced.</p>
            ) : (
              overIndexed.map((topic, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">{topic}</span>
                </div>
              ))
            )}
            <p className="text-xs text-gray-400 pt-1">
              Core topics with fewer than 2 industry mappings
            </p>
          </CardContent>
        </Card>

        {/* Well Aligned */}
        <Card className="border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-l-xl" />
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              Well Aligned
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {wellAligned.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No topics with strong cross-category coverage yet.</p>
            ) : (
              wellAligned.map((topic, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">{topic}</span>
                </div>
              ))
            )}
            <p className="text-xs text-gray-400 pt-1">
              Topics ticked in 4 or more interview categories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Floating + button */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogTrigger
          render={
            <Button
              className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg bg-[#534AB7] hover:bg-[#433b9f] flex items-center justify-center p-0 z-10"
            />
          }
        >
          <Plus className="h-6 w-6 text-white" />
          <span className="sr-only">Upload Syllabus</span>
        </DialogTrigger>
      </Dialog>
    </div>
  );
}
