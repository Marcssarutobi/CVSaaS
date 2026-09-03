import React from "react";
import { Layers, Search, BarChart3, ArrowLeft, Shield, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export type AdminTab = "templates" | "seo" | "analytics";

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  onLogout,
}) => {
  const navItems: { id: AdminTab; label: string; icon: any; count?: number }[] = [
    { id: "templates", label: "Modèles de CV", icon: Layers },
    { id: "seo", label: "Référencement SEO", icon: Search },
    { id: "analytics", label: "Google Analytics", icon: BarChart3 },
  ];

  return (
    <aside className="w-64 shrink-0 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col justify-between min-h-[calc(100vh-64px)]">
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="h-7 w-7 rounded bg-blue-600 flex items-center justify-center text-white">
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Administration
            </h3>
            <span className="text-[10px] text-slate-400">Back-office SaaS</span>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voir le site public</span>
        </Link>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-950/30 transition-colors cursor-pointer text-left"
        >
          <LogOut className="h-4 w-4" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};
