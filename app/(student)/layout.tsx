"use client";

import { useState } from "react";
import { useRole } from "@/hooks/useRole";
import { UserRole } from "@/types";
import { STUDENT_NAV_ITEMS } from "@/utils/constants";
import { Sidebar, Navbar } from "@/components/layout";
import { PageLoading } from "@/components/shared/LoadingSpinner";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthorized, loading } = useRole(UserRole.STUDENT);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loading || !isAuthorized) {
    return <PageLoading />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        items={STUDENT_NAV_ITEMS}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-muted/20">
          {children}
        </main>
      </div>
    </div>
  );
}
