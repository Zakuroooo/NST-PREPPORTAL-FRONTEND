"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { FacultyMember, mockFacultyMembers, CURRENT_FACULTY_ID } from "@/lib/facultyMembers";

interface FacultyContextType {
  facultyMembers: FacultyMember[];
  currentFaculty: FacultyMember | undefined;
  updateFacultySolvedCount: (facultyId: string) => void;
}

const FacultyContext = createContext<FacultyContextType | undefined>(undefined);

export function FacultyProvider({ children }: { children: ReactNode }) {
  const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>(mockFacultyMembers);

  const currentFaculty = facultyMembers.find((f) => f.id === CURRENT_FACULTY_ID);

  const updateFacultySolvedCount = (facultyId: string) => {
    setFacultyMembers((prev) =>
      prev.map((f) =>
        f.id === facultyId
          ? {
              ...f,
              doubtsSolvedThisMonth: f.doubtsSolvedThisMonth + 1,
              doubtsSolvedAllTime: f.doubtsSolvedAllTime + 1,
            }
          : f
      )
    );
  };

  return (
    <FacultyContext.Provider value={{ facultyMembers, currentFaculty, updateFacultySolvedCount }}>
      {children}
    </FacultyContext.Provider>
  );
}

export function useFaculty() {
  const context = useContext(FacultyContext);
  if (context === undefined) {
    throw new Error("useFaculty must be used within a FacultyProvider");
  }
  return context;
}
