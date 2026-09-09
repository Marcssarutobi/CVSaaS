import React, { useState } from "react";
import { AdminLogin } from "../components/features/admin/AdminLogin";
import { AdminSidebar, AdminTab } from "../components/features/admin/AdminSidebar";
import { AdminDashboard } from "../components/features/admin/AdminDashboard";
import { AdminTemplateList } from "../components/features/admin/AdminTemplateList";
import { AdminSeoConfig } from "../components/features/admin/AdminSeoConfig";
import { AdminAnalyticsConfig } from "../components/features/admin/AdminAnalyticsConfig";
import { Header } from "../components/common/Header";
import { useAuth, useSignOut } from "../hooks/useAuth";

export const AdminPage: React.FC = () => {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth();
  const signOutMutation = useSignOut();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  const handleLogout = async () => {
    await signOutMutation.mutateAsync();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-sm text-slate-600">
        Vérification de l'accès administrateur…
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => {}} />;
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-6 text-center">
        <div className="max-w-md rounded-xl border border-rose-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Accès refusé</h1>
          <p className="mt-3 text-sm text-slate-600">
            Ce compte n'a pas les droits d'administration pour accéder au back-office.
          </p>
          <p className="mt-2 text-xs text-slate-500">Connecté en tant que : {user?.email ?? "inconnu"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      <div className="flex-1 flex flex-col md:flex-row">
        <AdminSidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-6xl overflow-auto">
          {activeTab === "dashboard" && <AdminDashboard />}
          {activeTab === "templates" && <AdminTemplateList />}
          {activeTab === "seo" && <AdminSeoConfig />}
          {activeTab === "analytics" && <AdminAnalyticsConfig />}
        </main>
      </div>
    </div>
  );
};
