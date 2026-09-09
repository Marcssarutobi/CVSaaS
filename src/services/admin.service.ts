import { SeoConfig, AnalyticsConfig, AdminAuthResponse } from "../types/admin.types";
import { apiClient } from "../lib/api-client";

const LOCAL_SEO_KEY = "saas_cv_admin_seo";
const LOCAL_GA_KEY = "saas_cv_admin_ga";

const DEFAULT_SEO: SeoConfig[] = [
  {
    page: "landing",
    metaTitle: "Générateur de CV en ligne — Créez un CV pro sans inscription",
    metaDescription: "Créez votre CV professionnel en 5 minutes chrono sans créer de compte. Choisissez un modèle certifié RH, prévisualisez et téléchargez votre PDF.",
    ogTitle: "Générateur de CV professionnel — Sans inscription",
    ogDescription: "Démarquez-vous auprès des recruteurs avec un CV percutant conçu en 5 minutes.",
    ogImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80",
    keywords: "cv en ligne, générateur cv gratuit, template cv, modèle cv pdf, sans inscription",
  },
  {
    page: "builder",
    metaTitle: "Éditeur de CV en direct — Générateur de CV",
    metaDescription: "Personnalisez facilement votre CV avec prévisualisation en temps réel et modèles adaptés aux recruteurs.",
    ogTitle: "Éditeur de CV en direct",
    ogDescription: "Éditez vos expériences et vos compétences facilement.",
    ogImage: "",
    keywords: "editeur cv, creer cv, modele cv",
  },
];

const DEFAULT_GA: AnalyticsConfig = {
  gaMeasurementId: "G-DEMO123456",
  isEnabled: true,
  anonymizeIp: true,
};

export const adminService = {
  async login(email: string, password: string):Promise<AdminAuthResponse> {
    try {
      const res = await apiClient<AdminAuthResponse>("/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("admin_auth_token", res.token);
      return res;
    } catch {
      // Demo admin credential check
      await new Promise((res) => setTimeout(res, 400));
      if (email === "admin@saas.com" && password === "admin123") {
        const fakeToken = "sanctum_token_" + Math.random().toString(36).substring(2);
        localStorage.setItem("admin_auth_token", fakeToken);
        return {
          token: fakeToken,
          user: {
            id: "u-admin-1",
            name: "Administrateur",
            email: "admin@saas.com",
            role: "admin",
          },
        };
      }
      throw new Error("Identifiants incorrects (Essayez admin@saas.com / admin123)");
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem("admin_auth_token");
  },

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem("admin_auth_token"));
  },

  async getSeoConfig(): Promise<SeoConfig[]> {
    try {
      return await apiClient<SeoConfig[]>("/admin/seo");
    } catch {
      const raw = localStorage.getItem(LOCAL_SEO_KEY);
      if (!raw) {
        localStorage.setItem(LOCAL_SEO_KEY, JSON.stringify(DEFAULT_SEO));
        return DEFAULT_SEO;
      }
      return JSON.parse(raw) as SeoConfig[];
    }
  },

  async updateSeoConfig(configs: SeoConfig[]): Promise<SeoConfig[]> {
    try {
      return await apiClient<SeoConfig[]>("/admin/seo", {
        method: "PUT",
        body: JSON.stringify(configs),
      });
    } catch {
      localStorage.setItem(LOCAL_SEO_KEY, JSON.stringify(configs));
      return configs;
    }
  },

  async getAnalyticsConfig(): Promise<AnalyticsConfig> {
    try {
      return await apiClient<AnalyticsConfig>("/admin/analytics");
    } catch {
      const raw = localStorage.getItem(LOCAL_GA_KEY);
      if (!raw) {
        localStorage.setItem(LOCAL_GA_KEY, JSON.stringify(DEFAULT_GA));
        return DEFAULT_GA;
      }
      return JSON.parse(raw) as AnalyticsConfig;
    }
  },

  async updateAnalyticsConfig(config: AnalyticsConfig): Promise<AnalyticsConfig> {
    try {
      return await apiClient<AnalyticsConfig>("/admin/analytics", {
        method: "PUT",
        body: JSON.stringify(config),
      });
    } catch {
      localStorage.setItem(LOCAL_GA_KEY, JSON.stringify(config));
      return config;
    }
  },
};
