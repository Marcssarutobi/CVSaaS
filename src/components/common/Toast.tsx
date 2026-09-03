import React from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "../../lib/utils";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  text: string;
}

export const ToastBanner: React.FC<{
  toast: ToastMessage | null;
  onDismiss: () => void;
}> = ({ toast, onDismiss }) => {
  if (!toast) return null;

  const config = {
    success: {
      bg: "bg-emerald-50 text-emerald-900 border-emerald-300",
      icon: CheckCircle,
      iconColor: "text-emerald-600",
    },
    error: {
      bg: "bg-rose-50 text-rose-900 border-rose-300",
      icon: AlertCircle,
      iconColor: "text-rose-600",
    },
    info: {
      bg: "bg-blue-50 text-blue-900 border-blue-300",
      icon: Info,
      iconColor: "text-blue-600",
    },
  }[toast.type];

  const Icon = config.icon;

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg max-w-md animate-in slide-in-from-bottom-5 duration-200",
        config.bg
      )}
    >
      <Icon className={cn("h-5 w-5 shrink-0", config.iconColor)} />
      <p className="text-sm font-medium flex-1">{toast.text}</p>
      <button
        onClick={onDismiss}
        className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
