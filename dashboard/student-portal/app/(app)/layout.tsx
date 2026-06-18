import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      <main className="min-h-screen bg-gray-50 ml-[216px] pt-14">
        <div className="px-6 py-6">{children}</div>
      </main>
    </div>
  );
}
