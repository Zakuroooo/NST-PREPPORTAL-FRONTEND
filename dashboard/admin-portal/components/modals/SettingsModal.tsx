"use client";

import React, { useState } from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col border border-outline-variant/30">
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Account Settings</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-outline-variant/30 bg-surface">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-3 font-label-md text-label-md uppercase transition-colors ${
              activeTab === "profile"
                ? "text-primary border-b-2 border-primary bg-primary/5"
                : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`flex-1 py-3 font-label-md text-label-md uppercase transition-colors ${
              activeTab === "security"
                ? "text-primary border-b-2 border-primary bg-primary/5"
                : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
            }`}
          >
            Security
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === "profile" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex flex-col items-center gap-3 mb-6">
                <div className="relative group">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOV0OI5sr_4de_uemtGXjvIc1ITJDzikmKcMPqFEqsbC8zxqVWZcLEELPAaZ4fNQXhVPWxvuI_m2h8fxZnq9HMV8tMmca4VEbeOD5JoXdO_WwnSWlWWTvSFIb934DpPyQ2kaQWUr7JZKo7hTBL8MmrChj06rEsOOCWc7CUjyd6SVkrVmjxiRoVM4QcjKhKREmFJvkUanTv8gn9EKjscs_KdEOhkfh5A4BeZW_3XFKOZZ1qZsaTKmmjwUNdqVDYLy9rB_UPneElVD83" 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-surface shadow-sm"
                  />
                  <button className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer">
                    <span className="material-symbols-outlined">photo_camera</span>
                  </button>
                </div>
                <span className="font-label-sm text-label-sm text-primary cursor-pointer hover:underline">Change Picture</span>
              </div>
              
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Admin User"
                  className="w-full px-4 py-2.5 bg-surface border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="admin@placeprep.com"
                  className="w-full px-4 py-2.5 bg-surface border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase">Current Password</label>
                <input 
                  type="password" 
                  placeholder="Enter current password"
                  className="w-full px-4 py-2.5 bg-surface border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase">New Password</label>
                <input 
                  type="password" 
                  placeholder="Enter new password"
                  className="w-full px-4 py-2.5 bg-surface border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase">Confirm New Password</label>
                <input 
                  type="password" 
                  placeholder="Confirm new password"
                  className="w-full px-4 py-2.5 bg-surface border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-outline-variant/30 flex justify-end gap-3 bg-surface-container-lowest">
          <button 
            onClick={onClose}
            className="px-5 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              // Add any mock save logic here if needed
              onClose();
            }}
            className="px-5 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
