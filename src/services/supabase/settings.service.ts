import { supabase, assertSupabaseConfigured } from "../../lib/supabase";

export interface SaaSSettings {
  id: string;
  cv_price: number;
  currency: string;
  updated_at: string;
}

export const settingsService = {
  async get(): Promise<SaaSSettings> {
    assertSupabaseConfigured();

    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    if (data) {
      return data as SaaSSettings;
    }

    const fallback = { id: "default", cv_price: 500, currency: "XOF", updated_at: new Date().toISOString() };
    const { data: inserted, error: insertError } = await supabase.from("settings").insert(fallback).select().single();
    if (insertError) throw insertError;
    return inserted as SaaSSettings;
  },

  async update(input: Partial<SaaSSettings>): Promise<SaaSSettings> {
    assertSupabaseConfigured();

    const current = await this.get();
    const { data, error } = await supabase
      .from("settings")
      .update({
        ...current,
        ...input,
        updated_at: new Date().toISOString(),
      })
      .eq("id", current.id)
      .select()
      .single();

    if (error) throw error;
    return data as SaaSSettings;
  },
};
