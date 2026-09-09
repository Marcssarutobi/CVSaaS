import { supabase, assertSupabaseConfigured } from "../../lib/supabase";

export interface PaymentRecord {
  id: string;
  user_id: string;
  cv_id: string | null;
  transaction_id: string | null;
  amount: number;
  currency: string;
  status: "pending" | "successful" | "failed" | "cancelled";
  payment_method: string | null;
  fedapay_transaction_id: string | null;
  metadata: Record<string, unknown> | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export const paymentsService = {
  async create(input: Partial<PaymentRecord>): Promise<PaymentRecord> {
    assertSupabaseConfigured();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    if (!userId) throw new Error("Session expirée.");

    const payload = {
      user_id: userId,
      cv_id: input.cv_id ?? null,
      transaction_id: input.transaction_id ?? crypto.randomUUID(),
      amount: input.amount ?? 0,
      currency: input.currency ?? "XOF",
      status: input.status ?? "pending",
      payment_method: input.payment_method ?? "fedapay",
      fedapay_transaction_id: input.fedapay_transaction_id ?? null,
      metadata: input.metadata ?? {},
      paid_at: input.paid_at ?? null,
    };

    const { data, error } = await supabase.from("payments").insert(payload).select().single();
    if (error) throw error;
    return data as PaymentRecord;
  },

  async list(): Promise<PaymentRecord[]> {
    assertSupabaseConfigured();
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as PaymentRecord[];
  },

  async getForUser(): Promise<PaymentRecord[]> {
    assertSupabaseConfigured();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    if (!userId) return [];

    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as PaymentRecord[];
  },

  async getByTransaction(transactionId: string): Promise<PaymentRecord | null> {
    assertSupabaseConfigured();
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .or(`transaction_id.eq.${transactionId},fedapay_transaction_id.eq.${transactionId}`)
      .maybeSingle();

    if (error) throw error;
    return (data as PaymentRecord | null) ?? null;
  },

  async update(id: string, input: Partial<PaymentRecord>): Promise<PaymentRecord> {
    assertSupabaseConfigured();
    const { data, error } = await supabase
      .from("payments")
      .update({ ...input, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as PaymentRecord;
  },
};
