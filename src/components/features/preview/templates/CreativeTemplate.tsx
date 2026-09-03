import React from "react";
import { CVData } from "../../../../types/cv.types";
import { Mail, Phone, MapPin, Globe, Sparkles } from "lucide-react";

export const CreativeTemplate: React.FC<{ cvData: CVData; accentColor?: string }> = ({
  cvData,
  accentColor = "#0d9488",
}) => {
  const { personalInfo, experiences, education, skills, languages, interests } = cvData;

  return (
    <div
      className="p-8 sm:p-10 bg-white text-slate-800 leading-normal min-h-[1050px] flex flex-col justify-between"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="space-y-6">
        {/* Creative Top Banner */}
        <div className="rounded-xl p-6 text-white shadow-xs" style={{ backgroundColor: accentColor }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-emerald-100 font-semibold flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Profil Professionnel
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-0.5">
                {personalInfo.firstName || "Prénom"} {personalInfo.lastName || "Nom"}
              </h1>
              <p className="text-sm font-medium text-teal-100 mt-1">
                {personalInfo.title || "Titre du métier"}
              </p>
            </div>

            <div className="text-xs space-y-1 sm:text-right text-emerald-50">
              {personalInfo.email && <div className="flex sm:justify-end items-center gap-1.5"><Mail className="h-3 w-3" />{personalInfo.email}</div>}
              {personalInfo.phone && <div className="flex sm:justify-end items-center gap-1.5"><Phone className="h-3 w-3" />{personalInfo.phone}</div>}
              {personalInfo.address && <div className="flex sm:justify-end items-center gap-1.5"><MapPin className="h-3 w-3" />{personalInfo.address}</div>}
            </div>
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="p-4 rounded-lg bg-teal-50/50 border border-teal-100/80">
            <p className="text-xs text-slate-700 leading-relaxed italic">
              "{personalInfo.summary}"
            </p>
          </div>
        )}

        {/* 2 Column Layout for Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Main Experience column (8 cols) */}
          <div className="col-span-12 sm:col-span-8 space-y-5">
            {experiences.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />
                  Expériences Clés
                </h3>
                <div className="space-y-3.5">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-xs font-bold text-slate-900">{exp.jobTitle}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {exp.startDate} — {exp.endDate}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-teal-800 mt-0.5">
                        {exp.company} {exp.location && `• ${exp.location}`}
                      </p>
                      {exp.description && (
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />
                  Parcours Académique
                </h3>
                <div className="space-y-2 text-xs">
                  {education.map((edu) => (
                    <div key={edu.id} className="flex justify-between border-b border-slate-100 pb-1">
                      <div>
                        <strong className="text-slate-900">{edu.degree}</strong>
                        <p className="text-slate-500 text-[11px]">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">
                        {edu.startDate} {edu.endDate && `— ${edu.endDate}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Side skills & info column (4 cols) */}
          <div className="col-span-12 sm:col-span-4 space-y-4">
            {skills.length > 0 && (
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                  Compétences
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span
                      key={s.id}
                      className="text-[10px] font-semibold bg-teal-50 text-teal-900 px-2 py-0.5 rounded border border-teal-200"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {languages.length > 0 && (
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                  Langues
                </h3>
                <div className="space-y-1 text-xs">
                  {languages.map((l) => (
                    <div key={l.id} className="flex justify-between">
                      <span className="font-medium text-slate-800">{l.language}</span>
                      <span className="text-slate-500 text-[11px]">{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {interests.length > 0 && (
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                  Intérêts
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {interests.join(" • ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-3 border-t border-slate-100 flex justify-between text-[10px] text-slate-400">
        <span>Portfolio & CV Studio</span>
        <span>Conception professionnelle</span>
      </div>
    </div>
  );
};
