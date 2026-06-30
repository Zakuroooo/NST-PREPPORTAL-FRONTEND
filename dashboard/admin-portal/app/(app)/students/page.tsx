"use client";
import React, { useState, useMemo } from "react";

const mockStudents = [
  { id: 1, name: "Arjun Sharma", batch: "2024", progress: 85, doubts: 2, sessions: 12, status: "PLACED" },
  { id: 2, name: "Meera Kapoor", batch: "2025", progress: 45, doubts: 5, sessions: 8, status: "IN PROGRESS" },
  { id: 3, name: "Rohan Desai", batch: "2024", progress: 92, doubts: 1, sessions: 15, status: "PLACED" },
  { id: 4, name: "Priya Singh", batch: "2025", progress: 30, doubts: 8, sessions: 4, status: "IN PROGRESS" },
  { id: 5, name: "Vikram Patel", batch: "2024", progress: 15, doubts: 12, sessions: 2, status: "INACTIVE" },
  { id: 6, name: "Ananya Iyer", batch: "2025", progress: 78, doubts: 4, sessions: 10, status: "IN PROGRESS" },
  { id: 7, name: "Karan Verma", batch: "2024", progress: 100, doubts: 0, sessions: 18, status: "PLACED" },
  { id: 8, name: "Sneha Reddy", batch: "2025", progress: 55, doubts: 6, sessions: 7, status: "IN PROGRESS" },
  { id: 9, name: "Amit Kumar", batch: "2023", progress: 100, doubts: 1, sessions: 20, status: "PLACED" },
  { id: 10, name: "Neha Gupta", batch: "2026", progress: 10, doubts: 3, sessions: 1, status: "IN PROGRESS" },
  { id: 11, name: "Rahul Jain", batch: "2023", progress: 90, doubts: 2, sessions: 14, status: "PLACED" },
  { id: 12, name: "Pooja Mishra", batch: "2026", progress: 20, doubts: 5, sessions: 3, status: "IN PROGRESS" },
  { id: 13, name: "Suresh Pillai", batch: "2024", progress: 88, doubts: 1, sessions: 11, status: "PLACED" },
  { id: 14, name: "Divya Das", batch: "2025", progress: 65, doubts: 4, sessions: 9, status: "IN PROGRESS" },
  { id: 15, name: "Manoj Tiwari", batch: "2023", progress: 95, doubts: 0, sessions: 16, status: "PLACED" },
  { id: 16, name: "Kavita R", batch: "2026", progress: 5, doubts: 2, sessions: 1, status: "IN PROGRESS" },
  { id: 17, name: "Nitin B", batch: "2024", progress: 75, doubts: 3, sessions: 10, status: "PLACED" },
  { id: 18, name: "Asha K", batch: "2025", progress: 50, doubts: 7, sessions: 6, status: "IN PROGRESS" },
  { id: 19, name: "Vikas M", batch: "2023", progress: 85, doubts: 2, sessions: 12, status: "PLACED" },
  { id: 20, name: "Rita P", batch: "2026", progress: 15, doubts: 4, sessions: 2, status: "IN PROGRESS" },
  { id: 21, name: "Ajay S", batch: "2024", progress: 10, doubts: 10, sessions: 1, status: "INACTIVE" },
  { id: 22, name: "Riya V", batch: "2025", progress: 80, doubts: 3, sessions: 11, status: "IN PROGRESS" },
  { id: 23, name: "Ravi D", batch: "2023", progress: 92, doubts: 1, sessions: 15, status: "PLACED" },
  { id: 24, name: "Sonia G", batch: "2026", progress: 25, doubts: 5, sessions: 4, status: "IN PROGRESS" },
  { id: 25, name: "Vijay N", batch: "2024", progress: 82, doubts: 2, sessions: 13, status: "PLACED" },
  { id: 26, name: "Tara S", batch: "2025", progress: 70, doubts: 4, sessions: 10, status: "IN PROGRESS" },
  { id: 27, name: "Anil C", batch: "2023", progress: 98, doubts: 0, sessions: 19, status: "PLACED" },
  { id: 28, name: "Bina R", batch: "2026", progress: 30, doubts: 6, sessions: 5, status: "IN PROGRESS" },
  { id: 29, name: "Sunil K", batch: "2024", progress: 0, doubts: 0, sessions: 0, status: "INACTIVE" },
  { id: 30, name: "Geeta M", batch: "2025", progress: 60, doubts: 5, sessions: 8, status: "IN PROGRESS" },
  { id: 31, name: "Raj P", batch: "2023", progress: 89, doubts: 1, sessions: 14, status: "PLACED" },
  { id: 32, name: "Simran K", batch: "2026", progress: 35, doubts: 4, sessions: 6, status: "IN PROGRESS" },
  { id: 33, name: "Prem T", batch: "2024", progress: 91, doubts: 2, sessions: 16, status: "PLACED" },
  { id: 34, name: "Lata S", batch: "2025", progress: 72, doubts: 3, sessions: 10, status: "IN PROGRESS" },
  { id: 35, name: "Dev A", batch: "2023", progress: 96, doubts: 0, sessions: 17, status: "PLACED" },
  { id: 36, name: "Mira B", batch: "2026", progress: 40, doubts: 5, sessions: 7, status: "IN PROGRESS" },
  { id: 37, name: "Gopal V", batch: "2024", progress: 87, doubts: 2, sessions: 12, status: "PLACED" },
  { id: 38, name: "Nisha D", batch: "2025", progress: 68, doubts: 4, sessions: 9, status: "IN PROGRESS" },
  { id: 39, name: "Hari R", batch: "2023", progress: 94, doubts: 1, sessions: 15, status: "PLACED" },
  { id: 40, name: "Jaya L", batch: "2026", progress: 45, doubts: 6, sessions: 8, status: "IN PROGRESS" },
];

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 5;

  const filteredStudents = useMemo(() => {
    return mockStudents.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.batch.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBatch = selectedBatch === "All" || student.batch === selectedBatch;
      const matchesStatus =
        selectedStatus === "All" || student.status === selectedStatus.toUpperCase();

      return matchesSearch && matchesBatch && matchesStatus;
    });
  }, [searchTerm, selectedBatch, selectedStatus]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  
  const currentStudents = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredStudents, currentPage]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedBatch("All");
    setSelectedStatus("All");
    setCurrentPage(1);
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "PLACED":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-label-caps font-bold bg-teal-50 text-teal-700">
            {status}
          </span>
        );
      case "IN PROGRESS":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-label-caps font-bold bg-amber-50 text-amber-700">
            {status}
          </span>
        );
      case "INACTIVE":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-label-caps font-bold bg-rose-50 text-rose-700">
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-label-caps font-bold bg-gray-50 text-gray-700">
            {status}
          </span>
        );
    }
  };

  return (
    <>
      {/* Main Content Area */}
      <div className="p-container-padding flex-1 min-h-[calc(100vh-64px)] bg-surface-container-low flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="font-headline-lg text-headline-lg text-on-surface m-0">
            Students
          </h1>
          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-start md:items-center">
            <div className="relative w-full sm:w-72">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                search
              </span>
              <input
                className="w-full pl-11 pr-4 py-2.5 bg-surface border border-outline-variant rounded-xl text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm placeholder:text-outline"
                placeholder="Search students or batch..."
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="flex flex-wrap gap-3 shrink-0 items-center w-full md:w-auto">
              <div className="relative w-full sm:w-auto">
                <select
                  className="appearance-none w-full sm:w-auto px-4 py-2.5 bg-surface border border-outline-variant rounded-xl text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 hover:bg-surface-container-lowest transition-all cursor-pointer shadow-sm pr-10 font-medium text-on-surface"
                  value={selectedBatch}
                  onChange={(e) => {
                    setSelectedBatch(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">Batch (All)</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline-variant text-[20px]">
                  expand_more
                </span>
              </div>
              <div className="relative w-full sm:w-auto">
                <select
                  className="appearance-none w-full sm:w-auto px-4 py-2.5 bg-surface border border-outline-variant rounded-xl text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 hover:bg-surface-container-lowest transition-all cursor-pointer shadow-sm pr-10 font-medium text-on-surface"
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">Status (All)</option>
                  <option value="Placed">Placed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline-variant text-[20px]">
                  expand_more
                </span>
              </div>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2.5 text-secondary hover:text-primary hover:bg-primary/5 rounded-xl transition-colors flex items-center gap-1.5 font-semibold text-sm justify-center w-full sm:w-auto"
              >
                <span className="material-symbols-outlined text-[18px]">
                  clear_all
                </span>
                Clear
              </button>
            </div>
          </div>
        </div>
        {/* Data Table Card */}
        <div className="bg-surface rounded-xl border border-outline-variant/50 shadow-sm overflow-hidden flex flex-col">
          <div className="px-container-padding py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-bright">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Showing {filteredStudents.length} students
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-surface-container text-on-surface-variant font-label-caps text-label-caps">
                <tr>
                  <th className="px-6 py-4 border-b border-outline-variant/50 font-bold w-[20%]">
                    NAME
                  </th>
                  <th className="px-6 py-4 border-b border-outline-variant/50 font-bold">
                    BATCH
                  </th>
                  <th className="px-6 py-4 border-b border-outline-variant/50 font-bold w-[20%]">
                    ROADMAP PROGRESS
                  </th>
                  <th className="px-6 py-4 border-b border-outline-variant/50 font-bold text-center">
                    DOUBTS RAISED
                  </th>
                  <th className="px-6 py-4 border-b border-outline-variant/50 font-bold text-center">
                    SESSIONS
                  </th>
                  <th className="px-6 py-4 border-b border-outline-variant/50 font-bold">
                    PLACEMENT STATUS
                  </th>
                  <th className="px-6 py-4 border-b border-outline-variant/50 font-bold text-right">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="font-data-cell text-data-cell text-on-surface bg-surface">
                {currentStudents.length > 0 ? (
                  currentStudents.map((student, idx) => (
                    <tr
                      key={student.id}
                      className={`${
                        idx % 2 === 1 ? "bg-surface-container-lowest" : ""
                      } hover:bg-surface-container-low transition-colors group border-b border-outline-variant/20 last:border-b-0 h-row-height-standard`}
                    >
                      <td className="px-6 py-3 font-semibold text-on-surface">
                        {student.name}
                      </td>
                      <td className="px-6 py-3 text-on-surface-variant">
                        {student.batch}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-primary h-1.5 rounded-full"
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-on-surface-variant w-8">
                            {student.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-center text-on-surface-variant">
                        {student.doubts}
                      </td>
                      <td className="px-6 py-3 text-center text-on-surface-variant">
                        {student.sessions}
                      </td>
                      <td className="px-6 py-3">
                        {renderStatusBadge(student.status)}
                      </td>
                      <td className="px-6 py-3 text-right">
                        <button 
                          onClick={() => setIsModalOpen(true)}
                          className="bg-primary text-on-primary hover:opacity-90 px-4 py-1.5 rounded-full font-body-sm text-body-sm inline-flex items-center justify-center gap-1 transition-opacity cursor-pointer"
                        >
                          View
                          <span className="material-symbols-outlined text-[14px]">
                            arrow_forward
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-on-surface-variant">
                      No students found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-container-padding py-4 border-t border-outline-variant/30 flex justify-end items-center bg-surface-bright">
              <div className="flex items-center gap-2">
                <button
                  className="p-1.5 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    chevron_left
                  </span>
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded font-body-sm text-body-sm flex items-center justify-center transition-colors ${
                        currentPage === page
                          ? "bg-primary text-on-primary"
                          : "text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  className="p-1.5 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-50"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Bottom Summary Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="bg-surface p-container-padding rounded-xl border border-outline-variant/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">work</span>
            </div>
            <div>
              <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                PLACEMENT OVERVIEW
              </div>
              <div className="font-headline-md text-headline-md text-on-surface">
                84% Success
              </div>
            </div>
          </div>
          <div className="bg-surface p-container-padding rounded-xl border border-outline-variant/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <div>
              <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                AVG PROGRESS
              </div>
              <div className="font-headline-md text-headline-md text-on-surface">
                72.4%
              </div>
            </div>
          </div>
          <div className="bg-surface p-container-padding rounded-xl border border-outline-variant/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">school</span>
            </div>
            <div>
              <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                ACTIVE BATCHES
              </div>
              <div className="font-headline-md text-headline-md text-on-surface">
                4
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-surface p-6 sm:p-8 rounded-2xl max-w-sm w-full shadow-lg relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[24px]">rocket_launch</span>
            </div>
            <h2 className="text-xl font-bold text-on-surface mb-2">Coming Soon!</h2>
            <p className="text-on-surface-variant text-body-md leading-relaxed">
              This feature is currently under development. Soon, it will be linked to the student's full profile where you can seamlessly track their overall growth, placement journey, and roadmap progress.
            </p>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-full mt-6 bg-primary text-on-primary py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
