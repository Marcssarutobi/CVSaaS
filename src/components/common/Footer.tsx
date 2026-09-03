import React from "react";
import { Link } from "react-router-dom";
import { Shield, Zap, Sparkles, CheckCircle2 } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-stone-200 bg-[#FDFCFB] text-stone-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Proposition */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                <span className="text-white text-[10px] font-bold tracking-tighter">CV</span>
              </div>
              <span className="text-sm font-bold tracking-widest uppercase text-stone-900">
                CVPro<span className="text-stone-400 font-light">.Studio</span>
              </span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Le premier générateur de CV français 100% sans inscription. Vos données personnelles restent sur votre appareil et sont détruites après téléchargement.
            </p>
            <div className="pt-2 flex flex-col gap-1.5 text-xs text-stone-500">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-stone-900" />
                Conformité RGPD garantie
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-stone-900" />
                Téléchargement PDF instantané
              </span>
            </div>
          </div>

          {/* Col 2: Modèles & Styles */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900 mb-3">
              Modèles de CV
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/creer" className="hover:text-black transition-colors">
                  CV Moderne & Tech
                </Link>
              </li>
              <li>
                <Link to="/creer" className="hover:text-black transition-colors">
                  CV Cadre & Exécutif
                </Link>
              </li>
              <li>
                <Link to="/creer" className="hover:text-black transition-colors">
                  CV Minimaliste Suisse
                </Link>
              </li>
              <li>
                <Link to="/creer" className="hover:text-black transition-colors">
                  CV Studio Créatif
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Rassurance & Sécurité */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900 mb-3">
              Engagements
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-stone-600">
                <CheckCircle2 className="h-3.5 w-3.5 text-stone-900" />
                <span>Zéro création de compte</span>
              </li>
              <li className="flex items-center gap-1.5 text-stone-600">
                <CheckCircle2 className="h-3.5 w-3.5 text-stone-900" />
                <span>Aucun abonnement caché</span>
              </li>
              <li className="flex items-center gap-1.5 text-stone-600">
                <CheckCircle2 className="h-3.5 w-3.5 text-stone-900" />
                <span>Format compatible ATS / RH</span>
              </li>
              <li className="flex items-center gap-1.5 text-stone-600">
                <CheckCircle2 className="h-3.5 w-3.5 text-stone-900" />
                <span>Paiement chiffré SSL Stripe</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Informations légales & Admin */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900 mb-3">
              Informations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#faq" className="hover:text-black transition-colors">
                  Foire aux questions (FAQ)
                </a>
              </li>
              <li>
                <span className="text-stone-500">Mentions légales & CGV</span>
              </li>
              <li>
                <span className="text-stone-500">Politique de confidentialité</span>
              </li>
              <li className="pt-2 border-t border-stone-200">
                <Link to="/admin" className="text-stone-900 font-semibold hover:underline flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Espace Gestionnaire SaaS
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} CVPro Studio. Développé pour les profils ambitieux.</p>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-stone-500">
            Système actif • PDF Vectoriel certifié • Dès 4.90 €
          </p>
        </div>
      </div>
    </footer>
  );
};
