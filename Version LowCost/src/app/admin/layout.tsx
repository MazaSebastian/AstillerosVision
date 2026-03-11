"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogin from "@/components/admin/AdminLogin";
import { useAdmin } from "@/context/AdminContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) return <AdminLogin />;

  return (
    <div className="min-h-screen bg-dark-950">
      <AdminSidebar />
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
