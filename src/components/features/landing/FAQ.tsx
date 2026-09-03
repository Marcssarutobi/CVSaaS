import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../../lib/utils";

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Dois-je créer un compte pour faire mon CV ?",
      a: "Non, c'est tout le principe de notre service. Vous arrivez sur le site, vous choisissez un modèle, vous remplissez vos informations, vous visualisez le résultat et vous téléchargez votre CV. Aucun mot de passe à retenir, aucun email de vérification.",
    },
    {
      q: "Est-ce un abonnement récurrent mensuel ?",
      a: "Non, absolument pas. Contrairement à d'autres plateformes qui facturent un essai à 1€ puis un abonnement de 30€ chaque mois, notre paiement est 100% unique par CV. Aucun prélèvement futur n'aura lieu.",
    },
    {
      q: "Mes données personnelles sont-elles conservées ou revendues ?",
      a: "Non. Vos informations sont stockées localement dans le stockage sécurisé de votre propre navigateur (localStorage). Elles ne sont jamais revendues ni cédées à des tiers. Vous gardez le contrôle total de vos données personnelles conformément au RGPD.",
    },
    {
      q: "Le fichier PDF généré est-il compatible avec les logiciels ATS des recruteurs ?",
      a: "Oui. Nos templates sont spécialement conçus pour préserver un texte vectoriel sélectionnable et une hiérarchie sémantique claire, ce qui permet aux robots de recrutement de parser vos compétences et vos expériences sans erreur.",
    },
    {
      q: "Puis-je changer de modèle sans perdre les informations saisies ?",
      a: "Oui, à tout moment ! Vos données restent conservées dans le générateur même si vous passez d'un modèle Moderne à un modèle Exécutif ou Minimaliste.",
    },
    {
      q: "Sous quel format le CV est-il téléchargé ?",
      a: "Votre CV est exporté directement au format standard PDF A4 haute définition, prêt à être envoyé par email ou imprimé pour vos entretiens.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-[#FDFCFB] border-b border-stone-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="w-8 h-[1px] bg-black" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-900">
              Questions & Réponses
            </span>
            <span className="w-8 h-[1px] bg-black" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Foire aux questions
          </h2>
          <p className="text-stone-500 text-sm">
            Tout ce que vous devez savoir avant de générer votre CV en ligne.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-stone-200 bg-white overflow-hidden transition-all shadow-xs hover:border-stone-400"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-stone-900 hover:text-black transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-stone-400 transition-transform duration-200",
                      isOpen && "rotate-180 text-black"
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
