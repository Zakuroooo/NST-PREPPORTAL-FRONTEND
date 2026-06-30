"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Overview", href: "/overview", icon: "dashboard" },
    { name: "Students", href: "/students", icon: "person" },
    { name: "Faculty", href: "/faculty", icon: "group" },
    { name: "Manage Faculty", href: "/manage-faculty", icon: "manage_accounts" },
  ];

  return (
    <nav className="hidden md:flex fixed left-0 top-0 h-screen w-[260px] border-r border-outline-variant bg-surface-container-lowest text-on-surface-variant flex-col py-6 z-50">
      <div className="px-6 mb-8">
        <h1 className="font-headline-lg text-headline-lg text-primary mb-6 tracking-tight">PlacePrep</h1>
        <div className="flex items-center gap-3">
          <img alt="Admin User Avatar" className="w-10 h-10 rounded-full object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOV0OI5sr_4de_uemtGXjvIc1ITJDzikmKcMPqFEqsbC8zxqVWZcLEELPAaZ4fNQXhVPWxvuI_m2h8fxZnq9HMV8tMmca4VEbeOD5JoXdO_WwnSWlWWTvSFIb934DpPyQ2kaQWUr7JZKo7hTBL8MmrChj06rEsOOCWc7CUjyd6SVkrVmjxiRoVM4QcjKhKREmFJvkUanTv8gn9EKjscs_KdEOhkfh5A4BeZW_3XFKOZZ1qZsaTKmmjwUNdqVDYLy9rB_UPneElVD83"/>
          <div>
            <div className="font-headline-md text-headline-md text-on-surface leading-none text-[16px]">Admin User</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant mt-1">Super Admin</div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-6 py-3 transition-colors duration-200 ease-in-out font-label-sm text-label-sm uppercase ${
                    isActive
                      ? "text-primary border-l-4 border-primary bg-primary/5"
                      : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                  }`}
                >
                  <span 
                    className={`material-symbols-outlined text-[20px] ${isActive ? 'filled' : ''}`}
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      
      <div className="mt-auto px-6 space-y-1 border-t border-outline-variant/30 pt-4">
        <button 
          onClick={() => {
            document.cookie = "admin_authed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = '/login';
          }} 
          className="w-full flex items-center gap-3 py-2 text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors duration-200 ease-in-out font-label-sm text-label-sm uppercase cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Logout
        </button>
      </div>
    </nav>
  );
}
