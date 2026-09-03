import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "danger" | "subtle";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer rounded-full";

    const variantClasses = {
      default:
        "bg-black text-white hover:bg-stone-800 shadow-sm active:scale-[0.99]",
      secondary:
        "bg-stone-100 text-stone-900 hover:bg-stone-200 active:scale-[0.99]",
      outline:
        "border border-stone-300 bg-white text-stone-900 hover:bg-stone-50 hover:border-stone-400 active:scale-[0.99]",
      ghost:
        "text-stone-700 hover:bg-stone-100 hover:text-black",
      danger:
        "bg-rose-600 text-white hover:bg-rose-700 active:scale-[0.99]",
      subtle:
        "bg-stone-100 text-stone-900 hover:bg-stone-200 border border-stone-200",
    };

    const sizeClasses = {
      sm: "h-8 px-4 text-xs gap-1.5 font-semibold",
      md: "h-10 px-5 text-xs sm:text-sm gap-2 font-semibold",
      lg: "h-12 px-7 text-sm sm:text-base gap-2.5 font-semibold",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Chargement...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
