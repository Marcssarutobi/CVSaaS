import React, { useState } from "react";
import { Header } from "../components/common/Header";
import { Footer } from "../components/common/Footer";
import { useTemplates } from "../hooks/useTemplates";
import { useFlow } from "../lib/store";
import { formatPrice } from "../lib/utils";
import { TemplateStyle, ResumeTemplate } from "../types/template.types";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Dialog } from "../components/ui/dialog";
import { useNavigate } from "react-router-dom";
import {
  Check,
  Eye,
  Filter,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const TemplatesPage: React.FC = () => {
  const { data: templates, isLoading } = useTemplates();
  const { setSelectedTemplateId, goToStep } = useFlow();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");
  const [previewTemplate, setPreviewTemplate] = useState<ResumeTemplate | null>(null);

  const activeTemplates = (templates || []).filter((t) => t.active);

  const filteredTemplates = activeTemplates.filter((t) => {
    if (selectedCategory !== "all" && t.style !== selectedCategory) {
      return false;
    }
    if (priceFilter === "free" && !t.isFree) return false;
    if (priceFilter === "paid" && t.isFree) return false;
    return true;
  });

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    goToStep("form");
    navigate("/creer");
  };

  const categories = [
    { id: "all", label: "Tous les styles" },
    { id: "moderne", label: "Moderne" },
    { id: "classique", label: "Classique / Exécutif" },
    { id: "creatif", label: "Créatif" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCFB]">
      <Header />

      <main className="flex-1 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header text */}
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-8 h-[1px] bg-black" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-900">
                Collection Exclusive
              </span>
              <span className="w-8 h-[1px] bg-black" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Choisissez votre modèle de CV
            </h1>
            <p className="text-sm text-stone-500">
              Tous nos modèles sont certifiés conformes aux normes de recrutement européennes et aux algorithmes ATS.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-2.5 sm:px-4 bg-white rounded-xl sm:rounded-full border border-stone-200 shadow-2xs">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-black text-white shadow-xs"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-black"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Price filter */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400 flex items-center gap-1">
                <Filter className="h-3 w-3" />
                Filtre :
              </span>
              <div className="flex bg-stone-100 p-0.5 rounded-full">
                {[
                  { id: "all", label: "Tous" },
                  { id: "free", label: "Gratuits" },
                  { id: "paid", label: "Premium" },
                ].map((pf) => (
                  <button
                    key={pf.id}
                    onClick={() => setPriceFilter(pf.id as any)}
                    className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold transition-colors cursor-pointer ${
                      priceFilter === pf.id
                        ? "bg-white text-black shadow-2xs"
                        : "text-stone-500 hover:text-black"
                    }`}
                  >
                    {pf.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          {isLoading ? (
            <div className="py-20 text-center text-stone-400 text-xs">
              Chargement des modèles de CV...
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-xl border border-stone-200 p-8">
              <p className="text-sm font-semibold text-stone-700 mb-2">
                Aucun modèle ne correspond à vos filtres.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs uppercase tracking-wider font-bold"
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceFilter("all");
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="group rounded-xl border border-stone-200 bg-white overflow-hidden shadow-xs hover:shadow-md hover:border-stone-400 transition-all flex flex-col justify-between"
                >
                  <div className="p-4 bg-stone-50 border-b border-stone-200 relative">
                    {/* Badges */}
                    <div className="absolute top-6 left-6 z-10 flex gap-1.5">
                      {template.isPopular && (
                        <Badge variant="default" className="bg-black text-white font-bold text-[9px] uppercase tracking-wider shadow-xs">
                          <Sparkles className="h-2.5 w-2.5 mr-1 text-amber-400" />
                          Populaire
                        </Badge>
                      )}
                      {template.isFree && (
                        <Badge variant="outline" className="bg-white text-stone-900 border-stone-300 font-bold text-[9px] uppercase tracking-wider shadow-xs">
                          Offert
                        </Badge>
                      )}
                    </div>

                    {/* Image thumbnail with hover preview action */}
                    <div className="aspect-[3/4] rounded-lg overflow-hidden bg-white border border-stone-200 shadow-sm relative group-hover:scale-[1.01] transition-transform">
                      <img
                        src={template.thumbnailUrl}
                        alt={template.name}
                        className="h-full w-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setPreviewTemplate(template)}
                          className="bg-white text-black text-[10px] font-bold uppercase tracking-wider gap-1 shadow-md rounded-full"
                        >
                          <Eye className="h-3 w-3" />
                          <span>Aperçu</span>
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSelectTemplate(template.id)}
                          className="bg-black text-white hover:bg-stone-800 text-[10px] font-bold uppercase tracking-wider gap-1 shadow-md rounded-full"
                        >
                          <span>Choisir</span>
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="text-sm font-bold tracking-tight text-stone-900 uppercase">
                          {template.name}
                        </h3>
                        <span className="text-base font-serif italic text-stone-900">
                          {template.isFree ? "Gratuit" : formatPrice(template.priceInCents)}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 leading-relaxed mb-4">
                        {template.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                        <span
                          className="h-2 w-2 rounded-full border border-stone-300"
                          style={{ backgroundColor: template.accentColor }}
                        />
                        <span>{template.style}</span>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => handleSelectTemplate(template.id)}
                        className="text-[10px] font-bold uppercase tracking-wider gap-1 bg-black text-white hover:bg-stone-800 rounded-full px-4 shadow-xs"
                      >
                        <span>Choisir</span>
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Template Fullscreen Preview Modal */}
      {previewTemplate && (
        <Dialog
          open={!!previewTemplate}
          onOpenChange={(open) => !open && setPreviewTemplate(null)}
          title={`Modèle : ${previewTemplate.name}`}
          description={previewTemplate.description}
        >
          <div className="space-y-4">
            <div className="max-h-[60vh] overflow-auto rounded-lg border border-stone-200 p-2 bg-stone-100 flex justify-center">
              <img
                src={previewTemplate.thumbnailUrl}
                alt={previewTemplate.name}
                className="max-w-md w-full rounded shadow-md object-contain"
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-base font-serif italic text-stone-900">
                Tarif : {previewTemplate.isFree ? "Offert (0 €)" : formatPrice(previewTemplate.priceInCents)}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewTemplate(null)}
                  className="rounded-full text-xs uppercase tracking-wider font-bold"
                >
                  Fermer
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    handleSelectTemplate(previewTemplate.id);
                  }}
                  className="bg-black text-white hover:bg-stone-800 font-bold text-xs uppercase tracking-wider rounded-full px-5"
                >
                  <span>Sélectionner</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </Dialog>
      )}

      <Footer />
    </div>
  );
};
