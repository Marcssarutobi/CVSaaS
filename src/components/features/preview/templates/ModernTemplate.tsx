import React from "react";
import { CVData } from "../../../../types/cv.types";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

export const ModernTemplate: React.FC<{ cvData: CVData; accentColor?: string }> = ({
  cvData,
  accentColor = "#2563eb",
}) => {
  const { personalInfo, experiences, education, skills, languages, interests } = cvData;

  return (
    <div
      className="p-8 sm:p-10 bg-white text-slate-800 leading-normal min-h-[1050px] flex flex-col justify-between"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b-2 pb-5" style={{ borderColor: accentColor }}>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {personalInfo.firstName || "Prénom"} {personalInfo.lastName || "Nom"}
              </h1>
              <p className="text-base font-semibold mt-1" style={{ color: accentColor }}>
                {personalInfo.title || "Titre de votre métier"}
              </p>
            </div>
          </div>

          {/* Contact Bar */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.address && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                {personalInfo.address}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                {personalInfo.website}
              </span>
            )}
          </div>
        </div>

        {/* Profile Summary */}
        {personalInfo.summary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">
              Profil Professionnel
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experiences */}
        {experiences.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 border-b border-slate-100 pb-1">
              Expérience Professionnelle
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-3 border-l-2 border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h3 className="text-sm font-bold text-slate-900">{exp.jobTitle}</h3>
                    <span className="text-[11px] font-mono text-slate-500">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700">
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

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 border-b border-slate-100 pb-1">
              Formation & Diplômes
            </h2>
            <div className="space-y-2.5">
              {education.map((edu) => (
                <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">{edu.degree}</h4>
                    <p className="text-slate-600">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                    {edu.description && <p className="text-[11px] text-slate-500 mt-0.5">{edu.description}</p>}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 shrink-0">
                    {edu.startDate} {edu.endDate && `— ${edu.endDate}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Languages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-100 pb-1">
                Compétences
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span
                    key={s.id}
                    className="text-[11px] font-medium bg-slate-100 text-slate-800 px-2.5 py-1 rounded"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-100 pb-1">
                Langues
              </h2>
              <div className="space-y-1 text-xs">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between text-slate-700">
                    <span className="font-medium">{l.language}</span>
                    <span className="text-slate-500">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Interests */}
        {interests.length > 0 && (
          <div className="pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1 border-b border-slate-100 pb-1">
              Centres d'intérêt
            </h2>
            <p className="text-xs text-slate-600">
              {interests.join(" • ")}
            </p>
          </div>
        )}
      </div>

      {/* Subtle footer */}
      <div className="mt-8 pt-4 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between">
        <span>Curriculum Vitae</span>
        <span>Mis à jour en {new Date().getFullYear()}</span>
      </div>
    </div>
  );
};
