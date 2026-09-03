import React from "react";
import { Check, LayoutTemplate, Edit3, CreditCard, Download } from "lucide-react";
import { FlowStep } from "../../lib/store";
import { cn } from "../../lib/utils";

interface StepperProps {
  currentStep: FlowStep;
  onStepClick?: (step: FlowStep) => void;
  isPaid?: boolean;
}

const STEPS: { id: FlowStep; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "template", label: "1. Modèle", icon: LayoutTemplate },
  { id: "form", label: "2. Informations", icon: Edit3 },
  { id: "payment", label: "3. Paiement", icon: CreditCard },
  { id: "download", label: "4. Téléchargement", icon: Download },
];

const STEP_ORDER: FlowStep[] = ["template", "form", "payment", "download"];

export const Stepper: React.FC<StepperProps> = ({ currentStep, onStepClick, isPaid }) => {
  const currentIndex = STEP_ORDER.indexOf(currentStep);

  return (
    <div className="w-full bg-[#FDFCFB] border-b border-stone-200 py-3.5 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentIndex || (step.id === "payment" && isPaid);
          const isCurrent = step.id === currentStep;
          const isAccessible = idx <= currentIndex || isPaid;
          const Icon = step.icon;

          return (
            <React.Fragment key={step.id}>
              {/* Step indicator */}
              <button
                type="button"
                disabled={!isAccessible}
                onClick={() => isAccessible && onStepClick?.(step.id)}
                className={cn(
                  "flex items-center gap-2.5 group transition-all text-left",
                  isAccessible ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all shrink-0",
                    isCompleted
                      ? "bg-black text-white"
                      : isCurrent
                      ? "bg-black text-white ring-4 ring-stone-200 shadow-xs"
                      : "bg-stone-100 text-stone-400 group-hover:bg-stone-200 group-hover:text-stone-700"
                  )}
                >
                  {isCompleted ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
                </div>

                <div className="hidden sm:block">
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-wider block leading-tight",
                      isCurrent
                        ? "text-black font-extrabold"
                        : isCompleted
                        ? "text-stone-800"
                        : "text-stone-400"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
              </button>

              {/* Connecting line */}
              {idx < STEPS.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-[1px] mx-2 sm:mx-4 transition-colors",
                    idx < currentIndex ? "bg-black" : "bg-stone-200"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
