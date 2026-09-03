import React, { useState } from "react";
import { Header } from "../components/common/Header";
import { Stepper } from "../components/common/Stepper";
import { useFlow } from "../lib/store";
import { CVFormContainer } from "../components/features/form/CVFormContainer";
import { CVPreview } from "../components/features/preview/CVPreview";
import { TemplateSelector } from "../components/features/templates/TemplateSelector";
import { PaymentCheckout } from "../components/features/payment/PaymentCheckout";
import { DownloadConfirmation } from "../components/features/download/DownloadConfirmation";
import { Button } from "../components/ui/button";
import { Eye, Edit3, ArrowRight, ArrowLeft } from "lucide-react";

export const BuilderPage: React.FC = () => {
  const { currentStep, goToStep, canProceedToPayment } = useFlow();
  const [mobileView, setMobileView] = useState<"form" | "preview">("form");

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCFB]">
      <Header />

      {/* Stepper Progress Bar */}
      <div className="bg-[#FDFCFB]/95 backdrop-blur-md border-b border-stone-200 sticky top-16 z-30 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
          <Stepper currentStep={currentStep} onStepClick={(step) => goToStep(step)} />
        </div>
      </div>

      <main className="flex-1 py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* STEP 1: TEMPLATE SELECTION (Inside Builder) */}
          {currentStep === "template" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-black" />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-900">Étape 01</span>
                  <span className="w-8 h-[1px] bg-black" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                  Choisissez la mise en page de votre CV
                </h1>
                <p className="text-xs sm:text-sm text-stone-500">
                  Vous pourrez changer de modèle à tout moment sans rien perdre de vos textes.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
                <TemplateSelector />

                <div className="mt-8 pt-4 border-t border-stone-100 flex justify-end">
                  <Button
                    size="sm"
                    onClick={() => goToStep("form")}
                    className="gap-1.5 font-bold uppercase tracking-wider text-[11px] bg-black text-white hover:bg-stone-800 rounded-full px-6"
                  >
                    <span>Continuer vers le formulaire</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: FORM INPUT + LIVE SPLIT PREVIEW */}
          {currentStep === "form" && (
            <div className="space-y-4">
              {/* Mobile View Toggle */}
              <div className="lg:hidden flex items-center justify-center p-1 bg-stone-100 rounded-full border border-stone-200 mb-4">
                <button
                  type="button"
                  onClick={() => setMobileView("form")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded-full transition-colors ${
                    mobileView === "form"
                      ? "bg-black text-white shadow-xs"
                      : "text-stone-600 hover:text-black"
                  }`}
                >
                  <Edit3 className="h-3 w-3" />
                  <span>1. Formulaire</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMobileView("preview")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded-full transition-colors ${
                    mobileView === "preview"
                      ? "bg-black text-white shadow-xs"
                      : "text-stone-600 hover:text-black"
                  }`}
                >
                  <Eye className="h-3 w-3" />
                  <span>2. Aperçu Direct</span>
                </button>
              </div>

              {/* Side by side layout on desktop (7 cols form / 5 cols preview) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Multi-step Form */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    mobileView === "preview" ? "hidden lg:block" : "block"
                  }`}
                >
                  <CVFormContainer onProceedToReview={() => goToStep("payment")} />
                </div>

                {/* Right Column: Live CV Preview Sheet */}
                <div
                  className={`lg:col-span-6 lg:sticky lg:top-36 ${
                    mobileView === "form" ? "hidden lg:block" : "block"
                  }`}
                >
                  <div className="rounded-xl border border-stone-200 bg-white p-4 sm:p-5 shadow-xs">
                    <CVPreview showTemplateSelector={true} />

                    {/* Bottom action button */}
                    <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToStep("template")}
                        className="text-[10px] font-bold uppercase tracking-wider gap-1 rounded-full border-stone-300"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        <span>Changer de modèle</span>
                      </Button>

                      <Button
                        size="sm"
                        onClick={() => goToStep("payment")}
                        className="text-[10px] font-bold uppercase tracking-wider gap-1.5 bg-black text-white hover:bg-stone-800 rounded-full px-5 shadow-xs"
                      >
                        <span>Finaliser & Payer</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT & CHECKOUT */}
          {currentStep === "payment" && (
            <PaymentCheckout onBackToForm={() => goToStep("form")} />
          )}

          {/* STEP 4: DOWNLOAD CONFIRMATION */}
          {currentStep === "download" && <DownloadConfirmation />}
        </div>
      </main>
    </div>
  );
};
