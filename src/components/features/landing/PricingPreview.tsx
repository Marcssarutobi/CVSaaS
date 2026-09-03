import React from "react";
import { Link } from "react-router-dom";
import { useTemplates } from "../../../hooks/useTemplates";
import { formatPrice } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { Skeleton } from "../../common/Skeleton";
import { Check, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export const PricingPreview: React.FC = () => {
  const { data: templates, isLoading } = useTemplates();

  // Find minimal price or popular price
  const paidTemplates = templates?.filter((t) => !t.isFree) || [];
  const minPrice = paidTemplates.length > 0
    ? Math.min(...paidTemplates.map((t) => t.priceInCents))
    : 490;
  const maxPrice = paidTemplates.length > 0
    ? Math.max(...paidTemplates.map((t) => t.priceInCents))
    : 690;

  return (
    <section id="tarifs" className="py-20 bg-[#FDFCFB] border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="w-8 h-[1px] bg-black" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-900">
              Tarif Sans Surprise
            </span>
            <span className="w-8 h-[1px] bg-black" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Paiement unique par CV. Zéro abonnement.
          </h2>
          <p className="text-stone-500 text-sm sm:text-base">
            Contrairement à la majorité des générateurs de CV qui prélèvent 29,90 € par mois en douce, vous payez uniquement pour ce que vous téléchargez.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <div className="rounded-2xl border border-stone-200 p-8 space-y-4 bg-white">
              <Skeleton className="h-8 w-48 mx-auto" />
              <Skeleton className="h-12 w-32 mx-auto" />
              <div className="space-y-2 pt-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            </div>
          ) : (
            <div className="relative rounded-2xl border border-stone-900 bg-white p-8 sm:p-12 shadow-sm">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-black text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                  Accès Immédiat
                </span>
              </div>

              <div className="text-center pb-8 border-b border-stone-200">
                <h3 className="text-lg font-bold text-stone-900 uppercase tracking-wider">Formule CV Professionnel</h3>
                <p className="text-xs text-stone-500 mt-1">Export PDF vectoriel sans filigrane</p>
                
                <div className="mt-5 flex items-baseline justify-center gap-2">
                  <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">À partir de</span>
                  <span className="text-4xl sm:text-6xl font-serif italic text-stone-900 tracking-tight">
                    {formatPrice(minPrice)}
                  </span>
                  <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">paiement unique</span>
                </div>
                <p className="text-xs text-stone-600 font-medium mt-2">
                  Modèles de {formatPrice(minPrice)} à {formatPrice(maxPrice)} selon le design (options gratuites disponibles)
                </p>
              </div>

              {/* Inclusions */}
              <div className="py-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-4 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center shrink-0">
                    <Check className="h-2.5 w-2.5 text-stone-900" />
                  </div>
                  <span>Fichier PDF haute résolution prêt à l'emploi</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-4 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center shrink-0">
                    <Check className="h-2.5 w-2.5 text-stone-900" />
                  </div>
                  <span>Certification 100% conforme aux filtres ATS</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-4 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center shrink-0">
                    <Check className="h-2.5 w-2.5 text-stone-900" />
                  </div>
                  <span>Sans création de compte ni mot de passe</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-4 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center shrink-0">
                    <Check className="h-2.5 w-2.5 text-stone-900" />
                  </div>
                  <span>Paiement chiffré sécurisé par Stripe</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-4 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center shrink-0">
                    <Check className="h-2.5 w-2.5 text-stone-900" />
                  </div>
                  <span>Aucun abonnement récurrent prélevé</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-4 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center shrink-0">
                    <Check className="h-2.5 w-2.5 text-stone-900" />
                  </div>
                  <span>Sauvegarde locale automatique</span>
                </div>
              </div>

              {/* Call to action */}
              <div className="pt-6 text-center">
                <Link to="/creer">
                  <Button size="lg" className="w-full sm:w-auto bg-black text-white hover:bg-stone-800 rounded-full px-8 text-xs uppercase tracking-widest font-bold shadow-md gap-2">
                    <span>Créer et télécharger mon CV</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-[10px] text-stone-400 mt-3 uppercase tracking-widest font-bold">
                  Paiement sécurisé SSL • Format vectoriel A4
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
