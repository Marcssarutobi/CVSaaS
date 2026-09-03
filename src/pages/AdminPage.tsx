import React, { useState, useEffect } from "react";
import { AdminLogin } from "../components/features/admin/AdminLogin";
import { AdminSidebar, AdminTab } from "../components/features/admin/AdminSidebar";
import { AdminTemplateList } from "../components/features/admin/AdminTemplateList";
import { AdminSeoConfig } from "../components/features/admin/AdminSeoConfig";
import { AdminAnalyticsConfig } from "../components/features/admin/AdminAnalyticsConfig";
import { Header } from "../components/common/Header";

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("saas_cv_admin_token");
  });

  const [activeTab, setActiveTab] = useState<AdminTab>("templates");

  const handleLogout = () => {
    localStorage.removeItem("saas_cv_admin_token");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Admin Sidebar */}
        <AdminSidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onLogout={handleLogout}
        />

        {/* Admin Workspace Content */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-6xl overflow-auto">
          {activeTab === "templates" && <AdminTemplateList />}
          {activeTab === "seo" && <AdminSeoConfig />}
          {activeTab === "analytics" && <AdminAnalyticsConfig />}
        </main>
      </div>
    </div>
  );
};
