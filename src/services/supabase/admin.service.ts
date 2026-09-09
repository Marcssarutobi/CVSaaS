import { supabase, assertSupabaseConfigured } from "../../lib/supabase";
import { AdminUser, AdminStats, PaymentSummary, PricingSettings } from "../../types/admin.types";

export const adminService = {
  async getUsers(): Promise<AdminUser[]> {
    assertSupabaseConfigured();

    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, full_name, role, created_at, updated_at");

    if (error) throw error;

    const results = (data ?? []) as Array<{ id: string; email: string; full_name: string | null; role: string; created_at: string; updated_at: string }>;

    const profileIds = results.map((item) => item.id);
    const { data: cvData, error: cvError } = await supabase
      .from("cvs")
      .select("user_id")
      .in("user_id", profileIds.length ? profileIds : ["__none__"]);

    if (cvError) throw cvError;

    const countByUser = new Map<string, number>();
    for (const row of cvData ?? []) {
      const count = countByUser.get(row.user_id) ?? 0;
      countByUser.set(row.user_id, count + 1);
    }

    return results.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.full_name ?? "Utilisateur",
      role: user.role as "user" | "admin",
      createdAt: user.created_at,
      cvCount: countByUser.get(user.id) ?? 0,
    }));
  },

  async getPayments(): Promise<PaymentSummary[]> {
    assertSupabaseConfigured();

    const { data, error } = await supabase
      .from("payments")
      .select("id, user_id, cv_id, amount, currency, status, payment_method, fedapay_transaction_id, created_at, paid_at, metadata")
      .order("created_at", { ascending: false });

    if (error) throw error;

    const rows = (data ?? []) as Array<{
      id: string;
      user_id: string;
      cv_id: string | null;
      amount: number;
      currency: string;
      status: string;
      payment_method: string | null;
      fedapay_transaction_id: string | null;
      created_at: string;
      paid_at: string | null;
      metadata: Record<string, unknown> | null;
    }>;

    const userIds = Array.from(new Set(rows.map((row) => row.user_id)));
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, email")
      .in("id", userIds.length ? userIds : ["__none__"]);

    if (profilesError) throw profilesError;

    const profileMap = new Map((profiles ?? []).map((item) => [item.id, item.email]));

    return rows.map((row) => ({
      id: row.id,
      userId: row.user_id,
      email: profileMap.get(row.user_id) ?? "inconnu",
      cvId: row.cv_id,
      amount: row.amount,
      currency: row.currency,
      status: row.status as PaymentSummary["status"],
      paymentMethod: row.payment_method ?? "fedapay",
      transactionId: row.fedapay_transaction_id ?? row.id,
      createdAt: row.created_at,
      paidAt: row.paid_at,
    }));
  },

  async getStats(): Promise<AdminStats> {
    assertSupabaseConfigured();

    const [{ count: usersCount }, { count: cvsCount }, { data: successfulPayments }, { data: failedPayments }] = await Promise.all([
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("cvs").select("id", { count: "exact", head: true }),
      supabase.from("payments").select("amount").eq("status", "successful"),
      supabase.from("payments").select("id").eq("status", "failed"),
    ]);

    const revenue = (successfulPayments ?? []).reduce((sum, payment) => sum + (payment.amount ?? 0), 0);

    return {
      totalUsers: usersCount ?? 0,
      totalCVs: cvsCount ?? 0,
      successfulPayments: successfulPayments?.length ?? 0,
      totalRevenue: revenue,
      failedPayments: failedPayments?.length ?? 0,
    };
  },

  async getPricing(): Promise<PricingSettings> {
    assertSupabaseConfigured();

    const { data, error } = await supabase
      .from("settings")
      .select("id, cv_price, currency, updated_at")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    if (data) {
      return {
        id: data.id,
        cvPrice: Number(data.cv_price ?? 500),
        currency: data.currency ?? "XOF",
        updatedAt: data.updated_at,
      };
    }

    const fallback = { cv_price: 500, currency: "XOF", updated_at: new Date().toISOString() };
    const { data: inserted, error: insertError } = await supabase.from("settings").insert(fallback).select().single();
    if (insertError) throw insertError;

    return {
      id: inserted.id,
      cvPrice: Number(inserted.cv_price ?? 500),
      currency: inserted.currency ?? "XOF",
      updatedAt: inserted.updated_at,
    };
  },

  async updatePricing(cvPrice: number): Promise<PricingSettings> {
    assertSupabaseConfigured();

    const current = await this.getPricing();
    const { data, error } = await supabase
      .from("settings")
      .update({
        cv_price: cvPrice,
        currency: "XOF",
        updated_at: new Date().toISOString(),
      })
      .eq("id", current.id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      cvPrice: Number(data.cv_price ?? cvPrice),
      currency: data.currency ?? "XOF",
      updatedAt: data.updated_at,
    };
  },
};
