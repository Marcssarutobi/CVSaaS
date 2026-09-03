import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export const SocialProof: React.FC = () => {
  const testimonials = [
    {
      name: "Camille D.",
      role: "Responsable RH & Recrutement",
      city: "Paris",
      content:
        "En tant que recruteuse, je vois trop de CV mal formatés qui bloquent dans nos logiciels ATS. Les modèles de ce site sont d'une clarté exemplaire : hiérarchie parfaite, lisibles en 30 secondes.",
      rating: 5,
    },
    {
      name: "Alexandre V.",
      role: "Développeur Full-Stack",
      city: "Nantes",
      content:
        "Enfin un outil sans abonnement à 29€/mois qui se renouvelle en douce ! J'ai payé une seule fois mon modèle, exporté mon PDF en 5 minutes et décroché 3 entretiens la même semaine.",
      rating: 5,
    },
    {
      name: "Sarah B.",
      role: "Cheffe de Projet Marketing",
      city: "Bordeaux",
      content:
        "Le fait de ne pas avoir à créer de compte avec mot de passe et confirmation par email fait gagner un temps précieux. La prévisualisation en direct est ultra fluide.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-[#1A1A1A] text-stone-100 border-b border-stone-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-16 border-b border-stone-800 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">
              42 800+
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1 font-bold">
              CV Téléchargés
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">
              0 Compte
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1 font-bold">
              Sans Inscription
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">
              98.6%
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1 font-bold">
              Taux d'Entretien
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">
              100% ATS
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1 font-bold">
              Conformité Filtres
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="w-8 h-[1px] bg-stone-700" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
                Témoignages Candidats
              </span>
              <span className="w-8 h-[1px] bg-stone-700" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              La parole aux candidats et recruteurs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-xl border border-stone-800 bg-stone-900/60 p-6 backdrop-blur-xs"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="pt-6 border-t border-stone-800 mt-6 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{t.name}</span>
                      <CheckCircle2 className="h-3 w-3 text-stone-400" />
                    </div>
                    <div className="text-[10px] text-stone-400 uppercase tracking-wider mt-0.5">{t.role} • {t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
