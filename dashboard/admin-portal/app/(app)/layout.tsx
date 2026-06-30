import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import DesktopHeader from "@/components/layout/DesktopHeader";
import { NotificationProvider } from "@/components/context/NotificationContext";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotificationProvider>
      <div className="bg-background text-on-background font-body-md min-h-screen flex">
        <Sidebar />
        <Topbar />
        <main className="flex-1 flex flex-col md:ml-[260px] pt-16 md:pt-0 min-h-screen">
          <DesktopHeader />
          {children}
        </main>
      </div>
    </NotificationProvider>
  );
}
