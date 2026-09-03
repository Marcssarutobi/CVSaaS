import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Star } from "lucide-react";
import { Button } from "../../ui/button";

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-24 border-b border-stone-200 bg-[#FDFCFB]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          {/* Left Column: Editorial Copy & Flow */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left lg:pr-8">
            {/* Editorial Rule Eyebrow */}
            <div className="mb-4 flex items-center gap-2.5">
              <span className="w-10 h-[1px] bg-black" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-900">
                Générateur 100% Sans Inscription
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-stone-900 leading-[0.92] mb-6">
              FORGEZ VOTRE <br />
              <span className="text-stone-400 italic font-serif">AUTORITÉ.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl mb-8">
              Générez un CV professionnel et percutant en quelques minutes. Aucun compte requis, aucune inscription fastidieuse. Payez uniquement à l'export final de votre PDF vectoriel.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <Link to="/creer">
                <Button size="lg" className="w-full sm:w-auto bg-black text-white hover:bg-stone-800 rounded-full px-8 text-xs uppercase tracking-widest font-bold shadow-lg shadow-stone-200 gap-2">
                  <span>Créer mon CV</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#templates">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-stone-300 text-stone-900 hover:bg-stone-50 rounded-full px-6 text-xs uppercase tracking-widest font-bold">
                  Parcourir les designs
                </Button>
              </a>
            </div>

            {/* Editorial 3-Step Process Row */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-stone-200">
              <div>
                <span className="block text-2xl sm:text-3xl font-serif italic border-b border-stone-200 mb-1.5 pb-1 text-stone-900">
                  01.
                </span>
                <span className="text-[11px] uppercase tracking-wider font-bold text-stone-900">
                  Sélection
                </span>
                <p className="text-[11px] text-stone-500 leading-normal mt-0.5">
                  Templates certifiés ATS.
                </p>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-serif italic border-b border-stone-200 mb-1.5 pb-1 text-stone-900">
                  02.
                </span>
                <span className="text-[11px] uppercase tracking-wider font-bold text-stone-900">
                  Rédaction
                </span>
                <p className="text-[11px] text-stone-500 leading-normal mt-0.5">
                  Saisie fluide & instantanée.
                </p>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-serif italic border-b border-stone-200 mb-1.5 pb-1 text-stone-900">
                  03.
                </span>
                <span className="text-[11px] uppercase tracking-wider font-bold text-stone-900">
                  Déploiement
                </span>
                <p className="text-[11px] text-stone-500 leading-normal mt-0.5">
                  PDF vectoriel sans filigrane.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Mockup Frame */}
          <div className="lg:col-span-5 bg-stone-100 p-8 sm:p-10 rounded-2xl border border-stone-200 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Floating generated counter pill */}
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-white/90 backdrop-blur-xs shadow-xs border border-stone-200 px-3.5 py-1.5 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-stone-800">
                  1 240 CV générés aujourd'hui
                </span>
              </div>
            </div>

            {/* Document Preview Card */}
            <div className="w-full max-w-[320px] bg-white shadow-2xl rounded-sm p-6 flex flex-col relative border border-stone-200">
              {/* Header profile avatar placeholder */}
              <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-stone-900 rounded-full flex items-center justify-center text-white text-xs font-serif italic">
                    TM
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm leading-tight">Thomas Mercier</h3>
                    <p className="text-[11px] font-medium text-stone-500">Lead Développeur Full-Stack</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-stone-900 rounded-full text-stone-900">
                  Elite
                </span>
              </div>

              {/* Body snippet */}
              <div className="space-y-3 text-left">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1">
                    Parcours Récent
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-stone-800 font-semibold text-[11px]">
                      <span>Nova Web • Lead Ingénieur</span>
                      <span className="text-stone-400 font-normal text-[10px]">2022 — Actuel</span>
                    </div>
                    <p className="text-stone-500 text-[10px] leading-relaxed">
                      Direction technique d'une équipe de 8 développeurs. Performance web & scalabilité.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1">
                    Compétences Clés
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {["Architecture", "TypeScript", "React", "Node.js"].map((s) => (
                      <span
                        key={s}
                        className="text-[9px] font-bold uppercase tracking-wider bg-stone-100 px-2 py-0.5 rounded text-stone-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom rating */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                  <span className="font-bold text-stone-800 ml-1">4.9/5</span>
                </div>
                <span className="text-stone-400 font-medium">Format A4 Vectoriel</span>
              </div>
            </div>

            {/* Endorsement line */}
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full border border-white bg-stone-300 flex items-center justify-center text-[9px] font-bold text-stone-700">ST</div>
                <div className="w-7 h-7 rounded-full border border-white bg-stone-400 flex items-center justify-center text-[9px] font-bold text-white">AB</div>
                <div className="w-7 h-7 rounded-full border border-white bg-stone-800 flex items-center justify-center text-[9px] font-bold text-white">DC</div>
              </div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 text-center">
                Recommandé par des candidats chez <br />
                <span className="text-stone-900">Stripe, Airbnb & Doctolib</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
