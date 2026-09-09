import { supabase, assertSupabaseConfigured } from "../../lib/supabase";

export interface TemplateRecord {
  id: string;
  name: string;
  slug: string;
  description: string;
  preview_image: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const templateService = {
  async getAll(): Promise<TemplateRecord[]> {
    assertSupabaseConfigured();
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as TemplateRecord[];
  },

  async getActive(): Promise<TemplateRecord[]> {
    assertSupabaseConfigured();
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as TemplateRecord[];
  },

  async create(input: Partial<TemplateRecord>): Promise<TemplateRecord> {
    assertSupabaseConfigured();
    const payload = {
      name: input.name ?? "Nouveau modèle",
      slug: input.slug ?? "nouveau-modele",
      description: input.description ?? "",
      preview_image: input.preview_image ?? "",
      is_active: input.is_active ?? true,
    };

    const { data, error } = await supabase.from("templates").insert(payload).select().single();
    if (error) throw error;
    return data as TemplateRecord;
  },

  async update(id: string, input: Partial<TemplateRecord>): Promise<TemplateRecord> {
    assertSupabaseConfigured();
    const { data, error } = await supabase
      .from("templates")
      .update({ ...input, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as TemplateRecord;
  },

  async remove(id: string): Promise<void> {
    assertSupabaseConfigured();
    const { error } = await supabase.from("templates").delete().eq("id", id);
    if (error) throw error;
  },
};
