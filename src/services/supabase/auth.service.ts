import { supabase, assertSupabaseConfigured } from "../../lib/supabase";

export interface SignUpInput {
  email: string;
  password: string;
  fullName?: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface AppUser {
  id: string;
  email: string;
  full_name: string | null;
  role: "user" | "admin";
  created_at: string;
  updated_at: string;
}

export const authService = {
  async getSession() {
    assertSupabaseConfigured();
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  async getCurrentUser(): Promise<AppUser | null> {
    assertSupabaseConfigured();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    const userId = userData.user?.id;
    if (!userId) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, full_name, role, created_at, updated_at")
      .eq("id", userId)
      .maybeSingle();

    if (error) throw error;
    return data as AppUser | null;
  },

  async signUp(input: SignUpInput) {
    assertSupabaseConfigured();
    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        data: {
          full_name: input.fullName ?? "",
          role: "user",
        },
      },
    });

    if (error) throw error;
    return data.user;
  },

  async signIn(input: SignInInput) {
    assertSupabaseConfigured();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });

    if (error) throw error;
    return data.user;
  },

  async signOut() {
    assertSupabaseConfigured();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};
