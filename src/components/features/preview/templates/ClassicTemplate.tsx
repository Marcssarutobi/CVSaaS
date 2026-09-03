import React from "react";
import { CVData } from "../../../../types/cv.types";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

export const ClassicTemplate: React.FC<{ cvData: CVData; accentColor?: string }> = ({
  cvData,
  accentColor = "#0f172a",
}) => {
  const { personalInfo, experiences, education, skills, languages, interests } = cvData;

  return (
    <div
      className="grid grid-cols-12 min-h-[1050px] bg-white text-slate-800"
      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
    >
      {/* Sidebar Col (4 cols) */}
      <div className="col-span-4 bg-slate-900 text-slate-100 p-6 sm:p-7 flex flex-col justify-between font-sans">
        <div className="space-y-6">
          {/* Sidebar Top: Initials Badge */}
          <div className="flex flex-col items-center text-center pb-4 border-b border-slate-800">
            <div className="h-16 w-16 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-xl font-bold tracking-wider text-blue-400 font-mono mb-2">
              {(personalInfo.firstName?.[0] || "C") + (personalInfo.lastName?.[0] || "V")}
            </div>
            <h2 className="text-sm font-bold text-white tracking-wide">
              {personalInfo.firstName} {personalInfo.lastName}
            </h2>
          </div>

          {/* Contact details */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">
              Contact
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              {personalInfo.email && (
                <div className="flex items-start gap-2 break-all">
                  <Mail className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span>{personalInfo.address}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">
                Expertises
              </h3>
              <div className="space-y-1.5 text-xs">
                {skills.map((s) => (
                  <div key={s.id} className="flex items-center justify-between text-slate-200">
                    <span>{s.name}</span>
                    <span className="text-[10px] text-slate-400 capitalize">{s.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">
                Langues
              </h3>
              <div className="space-y-1 text-xs">
                {languages.map((l) => (
                  <div key={l.id} className="text-slate-300">
                    <span className="font-semibold text-white">{l.language}</span> : {l.proficiency}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {interests.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                Intérêts
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {interests.join(", ")}
              </p>
            </div>
          )}
        </div>

        <div className="text-[10px] text-slate-500 pt-4 border-t border-slate-800">
          Document certifié
        </div>
      </div>

      {/* Main Content Col (8 cols) */}
      <div className="col-span-8 p-8 sm:p-9 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Header Title */}
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-3xl font-bold text-slate-900 leading-tight">
              {personalInfo.firstName || "Prénom"} {personalInfo.lastName || "Nom"}
            </h1>
            <p className="text-sm font-sans font-semibold tracking-wide text-slate-600 mt-1 uppercase">
              {personalInfo.title || "Titre du poste"}
            </p>
          </div>

          {/* Summary */}
          {personalInfo.summary && (
            <div>
              <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 mb-1.5">
                Présentation Exécutive
              </h2>
              <p className="text-xs font-sans text-slate-600 leading-relaxed">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experiences */}
          {experiences.length > 0 && (
            <div>
              <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 mb-3 border-b border-slate-200 pb-1">
                Parcours Professionnel
              </h2>
              <div className="space-y-4 font-sans">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-bold text-slate-900">{exp.jobTitle}</h3>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-blue-900">
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
              <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 mb-3 border-b border-slate-200 pb-1">
                Formation Académique
              </h2>
              <div className="space-y-2.5 font-sans">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-baseline text-xs">
                    <div>
                      <h4 className="font-bold text-slate-900">{edu.degree}</h4>
                      <p className="text-slate-600">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      {edu.startDate} {edu.endDate && `— ${edu.endDate}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
