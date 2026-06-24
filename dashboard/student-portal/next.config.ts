import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: The 'Compaction failed' warnings in dev are a known Turbopack
  // LevelDB caching bug in Next.js 16. They are non-fatal and can be ignored.
  // https://github.com/vercel/next.js/issues
};

export default nextConfig;
