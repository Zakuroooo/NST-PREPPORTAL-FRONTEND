import useSWR from "swr";
import {
  mockStudents, mockFaculty, mockOverviewStats, mockWeeklySessions, mockSessions,
  mockEngagementData, mockDoubtsData, mockPracticeData, mockPlacementData,
  mockLeaderboard, mockBookingsData,
} from "./mock-data";
import type { Student, Faculty } from "./types";

// ─── Base mock fetcher with simulated network delay ─────────────
const mockFetcher = async <T,>(
  key: string,
  options?: { page?: number; limit?: number; search?: string }
): Promise<{ data: T[]; total: number } | T> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let data: any[] = [];
  if (key === "/api/students") data = [...mockStudents];
  else if (key === "/api/faculty") data = [...mockFaculty];

  if (options?.search) {
    const q = options.search.toLowerCase();
    data = data.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        (item.email && item.email.toLowerCase().includes(q))
    );
  }

  const total = data.length;
  if (options?.page !== undefined && options?.limit !== undefined) {
    const start = (options.page - 1) * options.limit;
    data = data.slice(start, start + options.limit);
  }

  return { data: data as T[], total };
};

// ─── Existing hooks ─────────────────────────────────────────────

export function useOverviewData() {
  const { data, error, isLoading } = useSWR(
    "/api/overview",
    async () => {
      await new Promise((r) => setTimeout(r, 500));
      return {
        stats: mockOverviewStats,
        weeklySessions: mockWeeklySessions,
        sessions: mockSessions,
      };
    },
    { refreshInterval: 30_000 }
  );
  return { data, isLoading, isError: error };
}

export function useStudents(page = 1, limit = 10, search = "") {
  const { data, error, isLoading } = useSWR(
    ["/api/students", page, limit, search],
    ([key, p, l, s]) =>
      mockFetcher<Student>(key as string, {
        page: p as number,
        limit: l as number,
        search: s as string,
      })
  );
  return {
    students: (data as { data: Student[]; total: number })?.data || [],
    total: (data as { data: Student[]; total: number })?.total || 0,
    isLoading,
    isError: error,
  };
}

export function useFaculty(page = 1, limit = 10, search = "") {
  const { data, error, isLoading } = useSWR(
    ["/api/faculty", page, limit, search],
    ([key, p, l, s]) =>
      mockFetcher<Faculty>(key as string, {
        page: p as number,
        limit: l as number,
        search: s as string,
      })
  );
  return {
    faculty: (data as { data: Faculty[]; total: number })?.data || [],
    total: (data as { data: Faculty[]; total: number })?.total || 0,
    isLoading,
    isError: error,
  };
}

// ─── Phase 2 hooks ──────────────────────────────────────────────

export function useEngagementData(_range = "30d") {
  const { data, error, isLoading } = useSWR(
    `/api/analytics/engagement?range=${_range}`,
    async () => {
      await new Promise((r) => setTimeout(r, 500));
      return mockEngagementData;
    },
    { refreshInterval: 30_000 } // "live" feel
  );
  return { data, isLoading, isError: error };
}

export function useDoubtsData(_range = "monthly") {
  const { data, error, isLoading } = useSWR(
    `/api/analytics/doubts?range=${_range}`,
    async () => {
      await new Promise((r) => setTimeout(r, 500));
      return mockDoubtsData;
    }
  );
  return { data, isLoading, isError: error };
}

export function usePracticeData(_range = "30d") {
  const { data, error, isLoading } = useSWR(
    `/api/analytics/practice?range=${_range}`,
    async () => {
      await new Promise((r) => setTimeout(r, 500));
      return mockPracticeData;
    }
  );
  return { data, isLoading, isError: error };
}

export function usePlacementData() {
  const { data, error, isLoading } = useSWR(
    "/api/analytics/placement",
    async () => {
      await new Promise((r) => setTimeout(r, 500));
      return mockPlacementData;
    }
  );
  return { data, isLoading, isError: error };
}

export function useLeaderboard(_batch = "all", _period = "monthly") {
  const { data, error, isLoading } = useSWR(
    `/api/leaderboard?batch=${_batch}&period=${_period}`,
    async () => {
      await new Promise((r) => setTimeout(r, 400));
      // In prod: filter by batch/period from server
      return mockLeaderboard;
    }
  );
  return { leaderboard: data || [], isLoading, isError: error };
}

export function useBookingsData(_range = "30d") {
  const { data, error, isLoading } = useSWR(
    `/api/bookings/stats?range=${_range}`,
    async () => {
      await new Promise((r) => setTimeout(r, 500));
      return mockBookingsData;
    }
  );
  return { data, isLoading, isError: error };
}
