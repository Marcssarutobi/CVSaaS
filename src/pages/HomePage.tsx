import React from "react";
import { Header } from "../components/common/Header";
import { Footer } from "../components/common/Footer";
import { Hero } from "../components/features/landing/Hero";
import { TemplateShowcase } from "../components/features/landing/TemplateShowcase";
import { HowItWorks } from "../components/features/landing/HowItWorks";
import { SocialProof } from "../components/features/landing/SocialProof";
import { PricingPreview } from "../components/features/landing/PricingPreview";
import { FAQ } from "../components/features/landing/FAQ";

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <TemplateShowcase />
        <HowItWorks />
        <SocialProof />
        <PricingPreview />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};
