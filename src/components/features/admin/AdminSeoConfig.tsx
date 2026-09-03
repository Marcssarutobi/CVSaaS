import React, { useState, useEffect } from "react";
import { useAdminSeo, useUpdateAdminSeo } from "../../../hooks/useAdmin";
import { SeoConfig } from "../../../types/admin.types";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Search, Globe, Share2, Save, CheckCircle2 } from "lucide-react";

export const AdminSeoConfig: React.FC = () => {
  const { data: seoList, isLoading } = useAdminSeo();
  const updateMutation = useUpdateAdminSeo();

  const [activePage, setActivePage] = useState<string>("landing");
  const [configs, setConfigs] = useState<SeoConfig[]>([]);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (seoList) {
      setConfigs(seoList);
    }
  }, [seoList]);

  const currentConfig = configs.find((c) => c.page === activePage) || {
    page: activePage,
    metaTitle: "",
    metaDescription: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    keywords: "",
  };

  const handleFieldChange = (field: keyof SeoConfig, value: string) => {
    setConfigs((prev) =>
      prev.map((item) =>
        item.page === activePage ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateMutation.mutateAsync(configs);
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Configuration Référencement & SEO</h2>
          <p className="text-xs text-slate-500">
            Personnalisez les balises méta Google et les balises de partage Open Graph pour chaque page clé du SaaS.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-xs text-slate-400 p-8 text-center">Chargement de la configuration SEO...</div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Page selector tabs */}
          <div className="flex gap-2 border-b border-slate-200 pb-2">
            {[
              { id: "landing", label: "Page d'accueil (Landing)" },
              { id: "builder", label: "Page Générateur (/creer)" },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePage(p.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activePage === p.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Form column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <Card>
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <Search className="h-4 w-4 text-blue-600" />
                    <span>Balises Google (SERP)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4 text-xs">
                  <div>
                    <Label required>Meta Title (Titre dans les moteurs de recherche)</Label>
                    <Input
                      value={currentConfig.metaTitle}
                      onChange={(e) => handleFieldChange("metaTitle", e.target.value)}
                      placeholder="Générateur de CV en ligne — Créez votre CV en 5 min"
                    />
                    <p className="text-[11px] text-slate-400 mt-1 flex justify-between">
                      <span>Recommandé : 50 à 60 caractères</span>
                      <span className="font-mono">{currentConfig.metaTitle.length}/60</span>
                    </p>
                  </div>

                  <div>
                    <Label required>Meta Description</Label>
                    <Textarea
                      rows={3}
                      value={currentConfig.metaDescription}
                      onChange={(e) => handleFieldChange("metaDescription", e.target.value)}
                      placeholder="Créez votre CV sans compte et téléchargez votre PDF immédiatement..."
                    />
                    <p className="text-[11px] text-slate-400 mt-1 flex justify-between">
                      <span>Recommandé : 140 à 160 caractères</span>
                      <span className="font-mono">{currentConfig.metaDescription.length}/160</span>
                    </p>
                  </div>

                  <div>
                    <Label>Mots-clés cibles (séparés par des virgules)</Label>
                    <Input
                      value={currentConfig.keywords}
                      onChange={(e) => handleFieldChange("keywords", e.target.value)}
                      placeholder="cv en ligne, modèle cv gratuit, générateur cv sans inscription"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <Share2 className="h-4 w-4 text-emerald-600" />
                    <span>Réseaux Sociaux (Open Graph / Twitter Card)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4 text-xs">
                  <div>
                    <Label>Titre Open Graph (og:title)</Label>
                    <Input
                      value={currentConfig.ogTitle}
                      onChange={(e) => handleFieldChange("ogTitle", e.target.value)}
                      placeholder="Générateur de CV Professionnel sans compte"
                    />
                  </div>

                  <div>
                    <Label>Description Open Graph (og:description)</Label>
                    <Textarea
                      rows={2}
                      value={currentConfig.ogDescription}
                      onChange={(e) => handleFieldChange("ogDescription", e.target.value)}
                      placeholder="Démarquez-vous auprès des recruteurs..."
                    />
                  </div>

                  <div>
                    <Label>Image de partage (og:image URL)</Label>
                    <Input
                      value={currentConfig.ogImage}
                      onChange={(e) => handleFieldChange("ogImage", e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Google SERP Live Simulation (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <Card className="bg-slate-50 border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Aperçu dans les résultats Google
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-2xs font-sans text-left">
                    <div className="flex items-center gap-2 text-xs text-slate-700 mb-1">
                      <div className="h-4 w-4 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
                        G
                      </div>
                      <span className="text-slate-800 text-[11px] truncate">https://monsaas-cv.fr/{activePage === "landing" ? "" : activePage}</span>
                    </div>
                    <h3 className="text-base font-semibold text-blue-800 hover:underline cursor-pointer line-clamp-1 leading-snug">
                      {currentConfig.metaTitle || "Générateur de CV en ligne"}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                      {currentConfig.metaDescription || "Description du site dans les résultats de recherche Google..."}
                    </p>
                  </div>

                  {/* Social share card preview */}
                  <div className="p-3 bg-white rounded-lg border border-slate-200 mt-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Aperçu Carte LinkedIn / Twitter
                    </span>
                    <div className="rounded-md border border-slate-200 overflow-hidden bg-slate-50">
                      {currentConfig.ogImage ? (
                        <img
                          src={currentConfig.ogImage}
                          alt="OG Preview"
                          className="h-28 w-full object-cover"
                        />
                      ) : (
                        <div className="h-28 w-full bg-slate-200 flex items-center justify-center text-slate-400 text-xs font-mono">
                          Image de partage 1200x630
                        </div>
                      )}
                      <div className="p-3 bg-white">
                        <span className="text-[10px] text-slate-400 font-mono uppercase">MONSAAS-CV.FR</span>
                        <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">
                          {currentConfig.ogTitle || currentConfig.metaTitle || "Titre partagé"}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {currentConfig.ogDescription || currentConfig.metaDescription || "Description partagée..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            {successMessage && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Paramètres SEO enregistrés avec succès !</span>
              </div>
            )}
            <div className="ml-auto">
              <Button type="submit" size="md" isLoading={updateMutation.isPending} className="gap-2 text-xs font-bold shadow-xs">
                <Save className="h-4 w-4" />
                <span>Enregistrer la configuration SEO</span>
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
