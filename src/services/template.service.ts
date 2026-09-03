import { ResumeTemplate, CreateTemplateDTO, UpdateTemplateDTO } from "../types/template.types";
import { apiClient } from "../lib/api-client";

// Initial seed data used when local storage / mock is active
const DEFAULT_TEMPLATES: ResumeTemplate[] = [
  {
    id: "template-modern",
    name: "Moderne Tech",
    slug: "moderne-tech",
    description: "Épuré et contemporain, idéal pour les profils tech, marketing et cadres dynamiques.",
    thumbnailUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80",
    priceInCents: 490,
    isPopular: true,
    isFree: false,
    style: "moderne",
    accentColor: "#2563eb",
    fontFamily: "sans",
    active: true,
    createdAt: "2026-01-10T10:00:00Z",
  },
  {
    id: "template-classic",
    name: "Exécutif Paris",
    slug: "executif-paris",
    description: "Structure équilibrée à double colonne, parfait pour le droit, la finance et le management.",
    thumbnailUrl: "https://images.unsplash.com/photo-1586282391129-76a6df230234?w=600&auto=format&fit=crop&q=80",
    priceInCents: 590,
    isPopular: false,
    isFree: false,
    style: "classique",
    accentColor: "#0f172a",
    fontFamily: "serif",
    active: true,
    createdAt: "2026-01-12T10:00:00Z",
  },
  {
    id: "template-minimalist",
    name: "Minimaliste Zurich",
    slug: "minimaliste-zurich",
    description: "Finesse typographique suisse, aération maximale, passe-partout et ultra lisible.",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    priceInCents: 0,
    isPopular: false,
    isFree: true,
    style: "moderne",
    accentColor: "#52525b",
    fontFamily: "sans",
    active: true,
    createdAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "template-creative",
    name: "Studio Créatif",
    slug: "studio-creatif",
    description: "Touche raffinée vert sauge avec mise en avant soignée des réalisations et compétences.",
    thumbnailUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80",
    priceInCents: 690,
    isPopular: true,
    isFree: false,
    style: "creatif",
    accentColor: "#0d9488",
    fontFamily: "sans",
    active: true,
    createdAt: "2026-01-20T10:00:00Z",
  },
];

const LOCAL_STORAGE_KEY = "saas_cv_templates_data";

function getLocalTemplates(): ResumeTemplate[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_TEMPLATES));
      return DEFAULT_TEMPLATES;
    }
    return JSON.parse(raw) as ResumeTemplate[];
  } catch {
    return DEFAULT_TEMPLATES;
  }
}

function saveLocalTemplates(templates: ResumeTemplate[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(templates));
}

export const templateService = {
  async getTemplates(): Promise<ResumeTemplate[]> {
    try {
      // In production with Laravel, calls GET /api/templates
      return await apiClient<ResumeTemplate[]>("/templates");
    } catch {
      // Fallback for standalone preview & dev
      return getLocalTemplates();
    }
  },

  async getTemplateById(id: string): Promise<ResumeTemplate> {
    try {
      return await apiClient<ResumeTemplate>(`/templates/${id}`);
    } catch {
      const all = getLocalTemplates();
      const found = all.find((t) => t.id === id);
      if (!found) throw new Error("Template non trouvé");
      return found;
    }
  },

  async createTemplate(dto: CreateTemplateDTO): Promise<ResumeTemplate> {
    try {
      return await apiClient<ResumeTemplate>("/admin/templates", {
        method: "POST",
        body: JSON.stringify(dto),
      });
    } catch {
      const all = getLocalTemplates();
      const newTemplate: ResumeTemplate = {
        ...dto,
        id: `tpl-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      saveLocalTemplates([newTemplate, ...all]);
      return newTemplate;
    }
  },

  async updateTemplate(id: string, dto: UpdateTemplateDTO): Promise<ResumeTemplate> {
    try {
      return await apiClient<ResumeTemplate>(`/admin/templates/${id}`, {
        method: "PUT",
        body: JSON.stringify(dto),
      });
    } catch {
      const all = getLocalTemplates();
      const idx = all.findIndex((t) => t.id === id);
      if (idx === -1) throw new Error("Template introuvable");
      const updated = { ...all[idx], ...dto };
      all[idx] = updated;
      saveLocalTemplates([...all]);
      return updated;
    }
  },

  async deleteTemplate(id: string): Promise<void> {
    try {
      await apiClient<void>(`/admin/templates/${id}`, {
        method: "DELETE",
      });
    } catch {
      const all = getLocalTemplates();
      const filtered = all.filter((t) => t.id !== id);
      saveLocalTemplates(filtered);
    }
  },
};
