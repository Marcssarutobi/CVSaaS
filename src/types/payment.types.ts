export interface PaymentIntentRequest {
  templateId: string;
  amountInCents: number;
  currency: string;
  customerEmail: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentId: string;
  status: "pending" | "succeeded" | "failed";
  downloadToken: string;
}

export interface ConfirmPaymentRequest {
  paymentId: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvc: string;
  customerName: string;
  customerEmail: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  downloadToken: string;
  error?: string;
  receiptUrl?: string;
}
