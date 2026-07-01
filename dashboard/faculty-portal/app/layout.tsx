import type { Metadata } from "next";
import "./globals.css";
import { FacultyProvider } from "@/lib/context/FacultyContext";

export const metadata: Metadata = {
  title: "PlacePrep - Faculty Portal",
  description: "NST PlacePrep Faculty Portal — Curriculum intelligence and session management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-gray-50 text-gray-900 h-full" suppressHydrationWarning>
        <FacultyProvider>
          {children}
        </FacultyProvider>
      </body>
    </html>
  );
}
