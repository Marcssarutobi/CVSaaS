import { supabase, assertSupabaseConfigured } from "../../lib/supabase";

export interface CVRecord {
  id: string;
  user_id: string;
  title: string;
  template_id: string;
  personal_info: Record<string, unknown>;
  experiences: unknown[];
  education: unknown[];
  skills: unknown[];
  languages: unknown[];
  interests: string[];
  status: "draft" | "paid" | "downloaded" | "archived";
  created_at: string;
  updated_at: string;
}

export const cvService = {
  async getAll(): Promise<CVRecord[]> {
    assertSupabaseConfigured();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    if (!userId) {
      return [];
    }

    const { data, error } = await supabase
      .from("cvs")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as CVRecord[];
  },

  async getById(id: string): Promise<CVRecord | null> {
    assertSupabaseConfigured();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    if (!userId) return null;

    const { data, error } = await supabase
      .from("cvs")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;
    return (data as CVRecord | null) ?? null;
  },

  async create(input: Partial<CVRecord>): Promise<CVRecord> {
    assertSupabaseConfigured();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    if (!userId) {
      throw new Error("Vous devez être connecté pour créer un CV.");
    }

    const payload = {
      user_id: userId,
      title: input.title ?? "Mon CV",
      template_id: input.template_id ?? "classic",
      personal_info: input.personal_info ?? {},
      experiences: input.experiences ?? [],
      education: input.education ?? [],
      skills: input.skills ?? [],
      languages: input.languages ?? [],
      interests: input.interests ?? [],
      status: input.status ?? "draft",
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from("cvs").insert(payload).select().single();
    if (error) throw error;
    return data as CVRecord;
  },

  async update(id: string, input: Partial<CVRecord>): Promise<CVRecord> {
    assertSupabaseConfigured();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    if (!userId) {
      throw new Error("Session expirée.");
    }

    const payload = {
      ...input,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("cvs")
      .update(payload)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return data as CVRecord;
  },

  async remove(id: string): Promise<void> {
    assertSupabaseConfigured();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    if (!userId) {
      throw new Error("Session expirée.");
    }

    const { error } = await supabase.from("cvs").delete().eq("id", id).eq("user_id", userId);
    if (error) throw error;
  },
};
