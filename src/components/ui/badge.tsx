import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning";
  className?: string;
  children?: React.ReactNode;
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantClasses = {
    default: "bg-black text-white border-transparent",
    secondary: "bg-stone-100 text-stone-800 border-stone-200",
    outline: "text-stone-800 border-stone-300 bg-white",
    success: "bg-emerald-50 text-emerald-800 border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
