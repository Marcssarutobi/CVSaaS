import React from "react";
import { LayoutTemplate, Edit3, Eye, DownloadCloud } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01.",
      icon: LayoutTemplate,
      title: "Choisissez votre modèle",
      description:
        "Sélectionnez le template adapté à votre profil professionnel (Tech, Cadre, Créatif ou Minimaliste). Tous sont certifiés ATS.",
    },
    {
      number: "02.",
      icon: Edit3,
      title: "Remplissez vos informations",
      description:
        "Saisissez votre parcours étape par étape. Pas de compte requis : vos modifications sont automatiquement conservées dans votre session.",
    },
    {
      number: "03.",
      icon: Eye,
      title: "Prévisualisez en direct",
      description:
        "Observez votre CV prendre forme en temps réel. Ajustez l'ordre des sections et testez différents designs sans perdre vos données.",
    },
    {
      number: "04.",
      icon: DownloadCloud,
      title: "Téléchargez immédiatement",
      description:
        "Réglez en toute sérénité sans aucun abonnement récurrent. Votre fichier PDF vectoriel haute définition est prêt instantanément.",
    },
  ];

  return (
    <section id="comment-ca-marche" className="py-20 bg-[#FDFCFB] border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="w-8 h-[1px] bg-black" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-900">
              Processus Éditorial
            </span>
            <span className="w-8 h-[1px] bg-black" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Comment ça marche en 4 étapes
          </h2>
          <p className="text-stone-500 text-sm sm:text-base">
            Aucun formulaire d'inscription fastidieux. Vous allez directement à l'essentiel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative flex flex-col p-6 rounded-xl border border-stone-200 bg-white hover:border-stone-400 shadow-xs hover:shadow-md transition-all group"
              >
                {/* Editorial step header */}
                <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
                  <span className="text-3xl font-serif italic text-stone-900 group-hover:text-black transition-colors">
                    {step.number}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-800 border border-stone-200">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-stone-900 mb-2">{step.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
