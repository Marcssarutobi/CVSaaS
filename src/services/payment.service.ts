import {
  PaymentIntentRequest,
  PaymentIntentResponse,
  ConfirmPaymentRequest,
  PaymentResult,
} from "../types/payment.types";
import { supabase, assertSupabaseConfigured } from "../lib/supabase";

const functionName = "create-fedapay-payment";

export const paymentService = {
  async createPaymentIntent(request: PaymentIntentRequest): Promise<PaymentIntentResponse> {
    assertSupabaseConfigured();

    const { data, error } = await supabase.functions.invoke(functionName, {
      body: request,
    });

    if (error) throw error;
    return data as PaymentIntentResponse;
  },

  async confirmPayment(request: ConfirmPaymentRequest): Promise<PaymentResult> {
    assertSupabaseConfigured();

    const { data, error } = await supabase.functions.invoke("verify-fedapay-payment", {
      body: request,
    });

    if (error) throw error;
    return data as PaymentResult;
  },
};
