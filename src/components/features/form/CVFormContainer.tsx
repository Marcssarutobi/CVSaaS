import React, { useState } from "react";
import { useFlow } from "../../../lib/store";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ExperienceForm } from "./ExperienceForm";
import { EducationForm } from "./EducationForm";
import { SkillsForm } from "./SkillsForm";
import { LanguagesForm } from "./LanguagesForm";
import { InterestsForm } from "./InterestsForm";
import { Progress } from "../../ui/progress";
import { Button } from "../../ui/button";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const CVFormContainer: React.FC<{ onProceedToReview?: () => void }> = ({
  onProceedToReview,
}) => {
  const { cvData, loadSampleData, clearCVData, goToStep } = useFlow();
  const [activeTab, setActiveTab] = useState<string>("personal");

  // Calculate completeness percentage
  let score = 0;
  if (cvData.personalInfo.firstName && cvData.personalInfo.lastName) score += 20;
  if (cvData.personalInfo.email && cvData.personalInfo.phone) score += 15;
  if (cvData.personalInfo.title) score += 15;
  if (cvData.experiences.length > 0) score += 20;
  if (cvData.education.length > 0) score += 15;
  if (cvData.skills.length > 0) score += 10;
  if (cvData.languages.length > 0) score += 5;

  const sections = [
    { id: "personal", label: "Coordonnées", icon: User },
    { id: "experiences", label: "Expériences", icon: Briefcase, count: cvData.experiences.length },
    { id: "education", label: "Formation", icon: GraduationCap, count: cvData.education.length },
    { id: "skills", label: "Compétences", icon: Award, count: cvData.skills.length },
    { id: "languages", label: "Langues & Loisirs", icon: Globe },
  ];

  return (
    <div className="space-y-6">
      {/* Top Controls: Completion & Quick Actions */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">Complétion du CV</span>
              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {score}%
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Sauvegarde locale automatique activée
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadSampleData}
              className="text-xs gap-1.5 border-slate-300 text-slate-700 hover:bg-slate-50"
              title="Pré-remplir avec un profil type"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Remplir exemple</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCVData}
              className="text-xs text-slate-400 hover:text-slate-700"
              title="Effacer les champs"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              <span>Réinitialiser</span>
            </Button>
          </div>
        </div>

        <Progress value={score} className="h-1.5" />
      </div>

      {/* Section navigation tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-1.5 border-b border-slate-200 pb-2">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeTab === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveTab(sec.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{sec.label}</span>
              {sec.count !== undefined && sec.count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {sec.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Form Component */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
        {activeTab === "personal" && <PersonalInfoForm />}
        {activeTab === "experiences" && <ExperienceForm />}
        {activeTab === "education" && <EducationForm />}
        {activeTab === "skills" && <SkillsForm />}
        {activeTab === "languages" && (
          <div className="space-y-6">
            <LanguagesForm />
            <div className="border-t border-slate-100 pt-6">
              <InterestsForm />
            </div>
          </div>
        )}

        {/* Bottom Form Navigation */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Changements enregistrés localement</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {activeTab !== "languages" ? (
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto text-xs"
                onClick={() => {
                  const idx = sections.findIndex((s) => s.id === activeTab);
                  if (idx < sections.length - 1) {
                    setActiveTab(sections[idx + 1].id);
                  }
                }}
              >
                Section suivante
              </Button>
            ) : null}

            <Button
              size="sm"
              onClick={() => {
                if (onProceedToReview) {
                  onProceedToReview();
                } else {
                  goToStep("preview");
                }
              }}
              className="w-full sm:w-auto text-xs gap-1.5 font-bold shadow-xs bg-slate-900 text-white"
            >
              <span>Continuer vers le paiement</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
