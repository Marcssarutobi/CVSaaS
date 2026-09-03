import React from "react";
import { CVData } from "../../../../types/cv.types";

export const MinimalistTemplate: React.FC<{ cvData: CVData; accentColor?: string }> = ({
  cvData,
}) => {
  const { personalInfo, experiences, education, skills, languages, interests } = cvData;

  return (
    <div
      className="p-10 sm:p-12 bg-white text-slate-900 leading-normal min-h-[1050px] flex flex-col justify-between"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif" }}
    >
      <div className="space-y-7">
        {/* Header */}
        <div className="border-b border-slate-900 pb-6">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
            {personalInfo.firstName || "Prénom"} {personalInfo.lastName || "Nom"}
          </h1>
          <p className="text-sm font-medium tracking-wide text-slate-600 mt-1 uppercase">
            {personalInfo.title || "Poste recherché"}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-600 font-mono">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.address && <span>• {personalInfo.address}</span>}
            {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
            {personalInfo.website && <span>• {personalInfo.website}</span>}
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              Profil
            </div>
            <div className="col-span-9 text-xs text-slate-700 leading-relaxed font-normal">
              {personalInfo.summary}
            </div>
          </div>
        )}

        {/* Experiences */}
        {experiences.length > 0 && (
          <div className="grid grid-cols-12 gap-4 pt-2">
            <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              Expériences
            </div>
            <div className="col-span-9 space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="text-xs">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{exp.jobTitle} — {exp.company}</span>
                    <span className="font-mono text-[11px] text-slate-500 font-normal">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  {exp.location && <p className="text-slate-500 text-[11px]">{exp.location}</p>}
                  {exp.description && (
                    <p className="text-slate-600 mt-1 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="grid grid-cols-12 gap-4 pt-2">
            <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              Formation
            </div>
            <div className="col-span-9 space-y-2 text-xs">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <span className="font-bold text-slate-900">{edu.degree}</span>, {edu.institution}
                  </div>
                  <span className="font-mono text-[11px] text-slate-500 shrink-0">
                    {edu.startDate} {edu.endDate && `— ${edu.endDate}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="grid grid-cols-12 gap-4 pt-2">
            <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              Compétences
            </div>
            <div className="col-span-9 flex flex-wrap gap-2 text-xs text-slate-800">
              {skills.map((s, idx) => (
                <span key={s.id} className="border-b border-slate-300 pb-0.5">
                  {s.name}
                  {idx < skills.length - 1 ? "" : ""}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages & Interests */}
        {(languages.length > 0 || interests.length > 0) && (
          <div className="grid grid-cols-12 gap-4 pt-2">
            <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              Autres
            </div>
            <div className="col-span-9 text-xs text-slate-700 space-y-1">
              {languages.length > 0 && (
                <p>
                  <strong className="text-slate-900">Langues :</strong>{" "}
                  {languages.map((l) => `${l.language} (${l.proficiency})`).join(", ")}
                </p>
              )}
              {interests.length > 0 && (
                <p>
                  <strong className="text-slate-900">Loisirs :</strong> {interests.join(", ")}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-between text-[10px] text-slate-400 font-mono">
        <span>Format standard A4</span>
        <span>Généré sans compte</span>
      </div>
    </div>
  );
};
