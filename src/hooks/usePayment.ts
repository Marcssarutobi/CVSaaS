import { useMutation } from "@tanstack/react-query";
import { paymentService } from "../services/payment.service";
import { PaymentIntentRequest, ConfirmPaymentRequest } from "../types/payment.types";

export function useCreatePaymentIntent() {
  return useMutation({
    mutationFn: (req: PaymentIntentRequest) => paymentService.createPaymentIntent(req),
  });
}

export function useConfirmPayment() {
  return useMutation({
    mutationFn: (req: ConfirmPaymentRequest) => paymentService.confirmPayment(req),
  });
}
