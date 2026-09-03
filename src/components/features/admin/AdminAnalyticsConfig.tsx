import React, { useState, useEffect } from "react";
import { useAdminAnalytics, useUpdateAdminAnalytics } from "../../../hooks/useAdmin";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { BarChart3, Save, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";

export const AdminAnalyticsConfig: React.FC = () => {
  const { data: analyticsData, isLoading } = useAdminAnalytics();
  const updateMutation = useUpdateAdminAnalytics();

  const [measurementId, setMeasurementId] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [anonymizeIp, setAnonymizeIp] = useState(true);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (analyticsData) {
      setMeasurementId(analyticsData.gaMeasurementId || "");
      setEnabled(analyticsData.isEnabled || false);
      setAnonymizeIp(analyticsData.anonymizeIp ?? true);
    }
  }, [analyticsData]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateMutation.mutateAsync({
      gaMeasurementId: measurementId.trim(),
      isEnabled: enabled,
      anonymizeIp,
    });
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="pb-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">Configuration Google Analytics 4 (GA4)</h2>
        <p className="text-xs text-slate-500">
          Connectez votre compte Google Analytics pour suivre les visites, le tunnel de création et les taux de conversion.
        </p>
      </div>

      {isLoading ? (
        <div className="text-xs text-slate-400 p-8 text-center">Chargement de la configuration...</div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-amber-600" />
                <span>Paramètres de tracking</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4 text-xs">
              <div>
                <Label required>ID de mesure Google Analytics 4</Label>
                <Input
                  value={measurementId}
                  onChange={(e) => setMeasurementId(e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                  className="font-mono text-sm tracking-wide max-w-md"
                  required
                />
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Format standard : commence obligatoirement par <strong>G-</strong> suivi de 9 à 10 caractères alphanumériques.
                </p>
              </div>

              <div className="pt-2 space-y-3 border-t border-slate-100">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setEnabled(e.target.checked)}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <div>
                    <span className="font-semibold text-slate-800">Activer le suivi Google Analytics</span>
                    <p className="text-[11px] text-slate-500">
                      Injecte le script gtag.js sur l'ensemble des pages publiques du générateur de CV.
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={anonymizeIp}
                    onChange={(e) => setAnonymizeIp(e.target.checked)}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <div>
                    <span className="font-semibold text-slate-800">Anonymisation des adresses IP (Conformité CNIL / RGPD)</span>
                    <p className="text-[11px] text-slate-500">
                      Supprime le dernier octet des adresses IP collectées avant le stockage par Google.
                    </p>
                  </div>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* RGPD Compliance Note */}
          <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 space-y-1">
              <h4 className="font-bold">Respect de la vie privée des candidats</h4>
              <p className="text-blue-800 leading-relaxed">
                Le script de mesure ne transmet aucune information personnelle saisie dans les formulaires (nom, téléphone, expériences). Seuls les événements d'étapes de navigation anonymes sont mesurés.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {successMessage && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Configuration Analytics mise à jour !</span>
              </div>
            )}
            <div className="ml-auto">
              <Button type="submit" size="md" isLoading={updateMutation.isPending} className="gap-2 text-xs font-bold shadow-xs">
                <Save className="h-4 w-4" />
                <span>Enregistrer</span>
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
