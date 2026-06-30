import React from "react";

export default function HelpPage() {
  return (
    <div className="p-container-padding flex-1 min-h-[calc(100vh-64px)] bg-surface-container-low flex flex-col gap-6">
      <div className="mb-4">
        <h1 className="font-headline-lg text-headline-lg text-on-surface m-0">
          Admin Portal Help Guide
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-3xl">
          Welcome to the PlacePrep Admin Portal! This guide will help you understand how to navigate and use the features available to you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Navigation */}
        <div className="bg-surface rounded-xl border border-outline-variant/50 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <span className="material-symbols-outlined text-[24px]">explore</span>
            <h2 className="font-headline-sm text-headline-sm m-0 text-on-surface">Navigation & Layout</h2>
          </div>
          <div className="space-y-4 text-on-surface-variant font-body-md text-body-md">
            <p>
              The portal is divided into two main areas: the <strong>Sidebar</strong> (on the left) and the <strong>Main Content Area</strong> (on the right). 
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Sidebar:</strong> Use this to navigate between different sections of the portal like Overview, Students, and Faculty.</li>
              <li><strong>Top Header:</strong> Contains quick access to your notifications, settings, and this help guide.</li>
            </ul>
          </div>
        </div>

        {/* Section 2: Dashboard Overview */}
        <div className="bg-surface rounded-xl border border-outline-variant/50 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4 text-secondary">
            <span className="material-symbols-outlined text-[24px]">dashboard</span>
            <h2 className="font-headline-sm text-headline-sm m-0 text-on-surface">Dashboard Overview</h2>
          </div>
          <div className="space-y-4 text-on-surface-variant font-body-md text-body-md">
            <p>
              The <strong>Overview</strong> page provides a high-level summary of the placement platform's daily activity.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>KPI Metrics:</strong> View quick stats like Students on Roadmap, Doubts Raised, and Sessions Booked.</li>
              <li><strong>Live Monitor:</strong> Shows active users and server load in real-time.</li>
              <li><strong>Charts:</strong> Visual representations of placement rates and session volume over time.</li>
            </ul>
          </div>
        </div>

        {/* Section 3: Managing Students */}
        <div className="bg-surface rounded-xl border border-outline-variant/50 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4 text-tertiary">
            <span className="material-symbols-outlined text-[24px]">school</span>
            <h2 className="font-headline-sm text-headline-sm m-0 text-on-surface">Managing Students</h2>
          </div>
          <div className="space-y-4 text-on-surface-variant font-body-md text-body-md">
            <p>
              The <strong>Students</strong> section allows you to view and track individual student progress.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Search & Filter:</strong> Quickly locate students by name, batch, or placement status.</li>
              <li><strong>Data Table:</strong> View progress bars for their roadmap completion, number of doubts raised, and their current placement status.</li>
              <li><strong>Detailed View:</strong> Click 'View' on any row to see in-depth information about a specific student.</li>
            </ul>
          </div>
        </div>

        {/* Section 4: Faculty & Mentors */}
        <div className="bg-surface rounded-xl border border-outline-variant/50 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4 text-error">
            <span className="material-symbols-outlined text-[24px]">group</span>
            <h2 className="font-headline-sm text-headline-sm m-0 text-on-surface">Faculty & Mentors</h2>
          </div>
          <div className="space-y-4 text-on-surface-variant font-body-md text-body-md">
            <p>
              Manage your teaching staff and external mentors through the <strong>Faculty</strong> and <strong>Manage Faculty</strong> sections.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Performance Analytics:</strong> See how different departments are performing with engagement and satisfaction metrics.</li>
              <li><strong>Upcoming Sessions:</strong> Track which mentors have mock interviews or review clinics scheduled.</li>
            </ul>
          </div>
        </div>

        {/* Section 5: Notifications */}
        <div className="bg-surface rounded-xl border border-outline-variant/50 shadow-sm p-6 md:col-span-2">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <span className="material-symbols-outlined text-[24px]">notifications_active</span>
            <h2 className="font-headline-sm text-headline-sm m-0 text-on-surface">Notifications & Alerts</h2>
          </div>
          <div className="space-y-4 text-on-surface-variant font-body-md text-body-md">
            <p>
              Stay updated with real-time events on the platform using the <strong>Notifications</strong> system.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Click the bell icon in the top header to view all your alerts.</li>
              <li>A red dot indicates you have unread notifications.</li>
              <li>You can click the checkmark next to a notification to mark it as read, or use the <strong>Mark all as read</strong> button to clear your inbox instantly.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
