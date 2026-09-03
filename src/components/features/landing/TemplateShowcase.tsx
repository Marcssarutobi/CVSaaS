import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTemplates } from "../../../hooks/useTemplates";
import { ResumeTemplate, TemplateStyle } from "../../../types/template.types";
import { useFlow } from "../../../lib/store";
import { formatPrice } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { TemplateCardSkeleton } from "../../common/Skeleton";
import { ArrowRight, Check, Eye } from "lucide-react";

export const TemplateShowcase: React.FC = () => {
  const { data: templates, isLoading, error } = useTemplates();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { setSelectedTemplateId, goToStep } = useFlow();
  const navigate = useNavigate();

  const handleSelectTemplate = (template: ResumeTemplate) => {
    setSelectedTemplateId(template.id);
    goToStep("form");
    navigate("/creer");
  };

  const filteredTemplates = (templates || []).filter((t) => {
    if (!t.active) return false;
    if (activeFilter === "all") return true;
    if (activeFilter === "gratuit") return t.isFree;
    return t.style === activeFilter;
  });

  return (
    <section id="templates" className="py-20 bg-[#FDFCFB] border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="w-8 h-[1px] bg-black" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-900">
              Collection de Modèles
            </span>
            <span className="w-8 h-[1px] bg-black" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Des designs conçus pour imposer votre profil
          </h2>
          <p className="text-sm sm:text-base text-stone-500">
            Chaque modèle respecte rigoureusement la lisibilité ATS et l'équilibre typographique attendu par les recruteurs exigeants.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: "all", label: "Tous les modèles" },
              { id: "moderne", label: "Modernes" },
              { id: "classique", label: "Classiques & Exécutifs" },
              { id: "creatif", label: "Créatifs" },
              { id: "gratuit", label: "Modèles Gratuits" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? "bg-black text-white shadow-xs"
                    : "bg-white text-stone-600 hover:border-stone-400 hover:text-black border border-stone-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid with Loading / Error */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <TemplateCardSkeleton key={n} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-white rounded-xl border border-stone-200 max-w-md mx-auto">
            <p className="text-xs text-rose-600 mb-3">Impossible de charger les modèles pour l'instant.</p>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              Réessayer
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group relative flex flex-col rounded-xl border border-stone-200 bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                {/* Visual Preview Header */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
                  <img
                    src={template.thumbnailUrl}
                    alt={template.name}
                    className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <Button
                      size="sm"
                      onClick={() => handleSelectTemplate(template)}
                      className="w-full bg-white text-stone-900 hover:bg-stone-100 shadow-md gap-1.5 text-[10px] uppercase tracking-wider font-bold rounded-full"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Choisir ce modèle</span>
                    </Button>
                  </div>

                  {/* Badges on top */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {template.isPopular && (
                      <Badge className="bg-stone-900 text-white font-bold text-[9px] uppercase tracking-wider">
                        Populaire
                      </Badge>
                    )}
                    {template.isFree ? (
                      <Badge className="bg-emerald-700 text-white font-bold text-[9px] uppercase tracking-wider">
                        Gratuit
                      </Badge>
                    ) : (
                      <Badge className="bg-black text-white font-bold text-[9px] uppercase tracking-wider">
                        {formatPrice(template.priceInCents)}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Content info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-bold text-stone-900 group-hover:text-black transition-colors">
                        {template.name}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                        {template.style}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-4">
                      {template.description}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSelectTemplate(template)}
                    className="w-full justify-between group/btn text-[10px] uppercase tracking-wider font-bold border-stone-300 hover:bg-black hover:text-white hover:border-black transition-colors rounded-full"
                  >
                    <span>Personnaliser</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
