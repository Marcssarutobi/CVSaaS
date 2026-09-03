import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText, ShieldCheck, Menu, X, ArrowRight, Lock } from "lucide-react";
import { Button } from "../ui/button";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-[#FDFCFB]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo - Editorial Circular Monogram */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:scale-105 shadow-xs">
            <span className="text-white text-[11px] font-bold tracking-tighter">CV</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-widest uppercase text-stone-900 block leading-tight">
              CVPro<span className="text-stone-400 font-light">.Studio</span>
            </span>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-stone-400 block leading-none">
              Sans Inscription
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest">
          {isHome ? (
            <>
              <a
                href="#templates"
                className="text-stone-600 hover:text-black transition-colors"
              >
                Modèles
              </a>
              <a
                href="#comment-ca-marche"
                className="text-stone-600 hover:text-black transition-colors"
              >
                Méthode
              </a>
              <a
                href="#tarifs"
                className="text-stone-600 hover:text-black transition-colors"
              >
                Tarifs
              </a>
              <a
                href="#faq"
                className="text-stone-600 hover:text-black transition-colors"
              >
                FAQ
              </a>
            </>
          ) : (
            <Link
              to="/"
              className="text-stone-600 hover:text-black transition-colors"
            >
              Accueil
            </Link>
          )}

          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-700 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
            <ShieldCheck className="h-3 w-3 text-stone-800" />
            <span>100% Confidentiel</span>
          </div>
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/admin">
            <Button variant="ghost" size="sm" className="text-stone-400 hover:text-black text-[11px] font-bold uppercase tracking-widest gap-1.5">
              <Lock className="h-3.5 w-3.5" />
              <span>Admin</span>
            </Button>
          </Link>

          {!isAdmin && (
            <Link to="/creer">
              <Button size="sm" className="gap-2 bg-black text-white hover:bg-stone-800 px-5 py-2 text-[11px] font-bold uppercase tracking-widest shadow-xs">
                <span>Créer mon CV</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Link to="/creer">
            <Button size="sm" className="bg-black text-white text-xs px-3">Créer</Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-800 hover:text-black rounded-full hover:bg-stone-100"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#FDFCFB] px-6 py-5 space-y-3 font-semibold text-xs tracking-wider uppercase">
          <a
            href="/#templates"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-800 hover:text-black"
          >
            Modèles de CV
          </a>
          <a
            href="/#comment-ca-marche"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-800 hover:text-black"
          >
            Méthode en 4 étapes
          </a>
          <a
            href="/#tarifs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-800 hover:text-black"
          >
            Tarification Unique
          </a>
          <a
            href="/#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-800 hover:text-black"
          >
            Questions Fréquentes
          </a>
          <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[11px] text-stone-500 hover:text-black flex items-center gap-1.5"
            >
              <Lock className="h-3.5 w-3.5" />
              Espace Administrateur
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
