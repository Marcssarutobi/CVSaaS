import React from "react";
import { cn } from "../../lib/utils";

export const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200/80", className)}
      {...props}
    />
  );
};

export const TemplateCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
      <Skeleton className="h-64 w-full rounded-lg" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-9 w-full rounded-lg" />
    </div>
  );
};
