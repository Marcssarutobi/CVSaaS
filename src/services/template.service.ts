import { ResumeTemplate, CreateTemplateDTO, UpdateTemplateDTO } from "../types/template.types";
import { templateService as supabaseTemplateService, TemplateRecord } from "./supabase/templates.service";
import { supabase, assertSupabaseConfigured } from "../lib/supabase";

const mapTemplate = (row: TemplateRecord): ResumeTemplate => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  description: row.description,
  thumbnailUrl: row.preview_image || "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80",
  priceInCents: 500,
  isPopular: false,
  isFree: false,
  style: "moderne",
  accentColor: "#2563eb",
  fontFamily: "sans",
  active: row.is_active,
  createdAt: row.created_at,
});

export const templateService = {
  async getTemplates(): Promise<ResumeTemplate[]> {
    assertSupabaseConfigured();
    const rows = await supabaseTemplateService.getAll();
    return rows.map(mapTemplate);
  },

  async getTemplateById(id: string): Promise<ResumeTemplate> {
    assertSupabaseConfigured();
    const row = await supabase
      .from("templates")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (row.error) throw row.error;
    if (!row.data) throw new Error("Template non trouvé");
    return mapTemplate(row.data as TemplateRecord);
  },

  async createTemplate(dto: CreateTemplateDTO): Promise<ResumeTemplate> {
    assertSupabaseConfigured();
    const row = await supabaseTemplateService.create({
      name: dto.name,
      slug: dto.slug,
      description: dto.description,
      preview_image: dto.thumbnailUrl,
      is_active: dto.active,
    });
    return mapTemplate(row);
  },

  async updateTemplate(id: string, dto: UpdateTemplateDTO): Promise<ResumeTemplate> {
    assertSupabaseConfigured();
    const row = await supabaseTemplateService.update(id, {
      name: dto.name,
      slug: dto.slug,
      description: dto.description,
      preview_image: dto.thumbnailUrl,
      is_active: dto.active,
    });
    return mapTemplate(row);
  },

  async deleteTemplate(id: string): Promise<void> {
    assertSupabaseConfigured();
    await supabaseTemplateService.remove(id);
  },
};
