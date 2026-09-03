import React, { useState } from "react";
import { useFlow } from "../../../lib/store";
import { useTemplates } from "../../../hooks/useTemplates";
import { useConfirmPayment } from "../../../hooks/usePayment";
import { formatPrice } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/card";
import {
  CreditCard,
  Lock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Download,
} from "lucide-react";
import confetti from "canvas-confetti";

export const PaymentCheckout: React.FC<{ onBackToForm: () => void }> = ({
  onBackToForm,
}) => {
  const { selectedTemplateId, cvData, setPaymentSuccess, goToStep } = useFlow();
  const { data: templates } = useTemplates();
  const confirmPaymentMutation = useConfirmPayment();

  const currentTemplate = templates?.find((t) => t.id === selectedTemplateId) || {
    id: selectedTemplateId,
    name: "Modèle Sélectionné",
    priceInCents: 490,
    isFree: false,
  };

  const isFree = currentTemplate.isFree || currentTemplate.priceInCents === 0;

  const [cardData, setCardData] = useState({
    name: `${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName}`.trim() || "Thomas Mercier",
    number: "4242 4242 4242 4242",
    expiry: "12/28",
    cvc: "123",
    email: cvData.personalInfo.email || "thomas.mercier@example.com",
  });

  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "").substring(0, 16);
    val = val.replace(/(.{4})/g, "$1 ").trim();
    setCardData({ ...cardData, number: val });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "").substring(0, 4);
    if (val.length >= 3) {
      val = `${val.substring(0, 2)}/${val.substring(2)}`;
    }
    setCardData({ ...cardData, expiry: val });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);

    // Free template shortcut
    if (isFree) {
      const freeToken = `free_${Date.now()}`;
      setPaymentSuccess({
        transactionId: `free_tx_${Date.now()}`,
        downloadToken: freeToken,
        paidAt: new Date().toISOString(),
        templateId: currentTemplate.id,
        amountInCents: 0,
      });
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      goToStep("download");
      return;
    }

    try {
      const result = await confirmPaymentMutation.mutateAsync({
        paymentId: `pay_${Date.now()}`,
        cardNumber: cardData.number,
        expMonth: cardData.expiry.split("/")[0] || "12",
        expYear: cardData.expiry.split("/")[1] || "28",
        cvc: cardData.cvc,
        customerName: cardData.name,
        customerEmail: cardData.email,
      });

      if (!result.success) {
        setPaymentError(result.error || "Le paiement a échoué. Veuillez réessayer.");
        return;
      }

      setPaymentSuccess({
        transactionId: result.transactionId,
        downloadToken: result.downloadToken,
        paidAt: new Date().toISOString(),
        templateId: currentTemplate.id,
        amountInCents: currentTemplate.priceInCents,
      });

      // Trigger celebratory confetti
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      goToStep("download");
    } catch (err: any) {
      setPaymentError(err.message || "Une erreur est survenue lors de la communication bancaire.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBackToForm}
          className="text-xs text-slate-600 gap-1.5"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Retour à l'édition</span>
        </Button>

        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Lock className="h-3.5 w-3.5 text-emerald-600" />
          <span>Connexion chiffrée SSL 256 bits</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Order Recap */}
        <div className="md:col-span-5 space-y-4">
          <Card className="border-slate-200">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-bold">Récapitulatif de la commande</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4 text-xs">
              <div className="flex justify-between items-start pb-3 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900">{currentTemplate.name}</h4>
                  <p className="text-slate-500 mt-0.5">Modèle certifié ATS + Export PDF vectoriel</p>
                  <p className="text-[11px] text-emerald-700 font-medium mt-1">
                    Candidat : {cvData.personalInfo.firstName} {cvData.personalInfo.lastName}
                  </p>
                </div>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {isFree ? "0,00 €" : formatPrice(currentTemplate.priceInCents)}
                </span>
              </div>

              <div className="space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>Sous-total HT</span>
                  <span>{isFree ? "0,00 €" : formatPrice(Math.round(currentTemplate.priceInCents * 0.8))}</span>
                </div>
                <div className="flex justify-between">
                  <span>TVA (20%)</span>
                  <span>{isFree ? "0,00 €" : formatPrice(Math.round(currentTemplate.priceInCents * 0.2))}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100 font-bold text-slate-900 text-sm">
                  <span>Total à régler</span>
                  <span className="font-mono text-base">
                    {isFree ? "Gratuit" : formatPrice(currentTemplate.priceInCents)}
                  </span>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="p-3 bg-slate-50 rounded-lg space-y-2 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-[11px]">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Téléchargement PDF immédiat</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-[11px]">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Aucun abonnement récurrent</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-[11px]">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Reçu de paiement envoyé par email</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Stripe UI Payment Form */}
        <div className="md:col-span-7">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">
                  {isFree ? "Validation Gratuite" : "Paiement Sécurisé"}
                </CardTitle>
                <div className="flex items-center gap-1">
                  <CreditCard className="h-5 w-5 text-slate-400" />
                  <span className="text-[11px] font-bold text-slate-400">Stripe</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              {paymentError && (
                <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{paymentError}</span>
                </div>
              )}

              {isFree ? (
                <div className="py-6 text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                    <Download className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    Ce modèle est 100% offert !
                  </h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Aucune carte bancaire requise. Cliquez sur le bouton ci-dessous pour générer et télécharger votre CV dès maintenant.
                  </p>
                  <Button
                    onClick={handleSubmit}
                    size="lg"
                    className="mt-4 w-full sm:w-auto px-8 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <span>Télécharger mon CV gratuitement</span>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <Label required>Email pour la facture & le lien de secours</Label>
                    <Input
                      type="email"
                      value={cardData.email}
                      onChange={(e) => setCardData({ ...cardData, email: e.target.value })}
                      placeholder="nom@exemple.com"
                      required
                    />
                  </div>

                  <div>
                    <Label required>Nom du titulaire de la carte</Label>
                    <Input
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                      placeholder="Nom complet tel qu'indiqué sur la carte"
                      required
                    />
                  </div>

                  <div>
                    <Label required>Numéro de carte</Label>
                    <div className="relative">
                      <Input
                        value={cardData.number}
                        onChange={handleCardNumberChange}
                        placeholder="4242 4242 4242 4242"
                        className="font-mono text-sm tracking-wider pr-10"
                        required
                      />
                      <CreditCard className="h-4 w-4 text-slate-400 absolute right-3 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label required>Date d'expiration</Label>
                      <Input
                        value={cardData.expiry}
                        onChange={handleExpiryChange}
                        placeholder="MM/AA"
                        className="font-mono text-center"
                        required
                      />
                    </div>
                    <div>
                      <Label required>Code CVC</Label>
                      <Input
                        type="password"
                        maxLength={4}
                        value={cardData.cvc}
                        onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                        placeholder="123"
                        className="font-mono text-center"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-3">
                    <Button
                      type="submit"
                      size="lg"
                      isLoading={confirmPaymentMutation.isPending}
                      className="w-full text-sm font-bold shadow-md gap-2"
                    >
                      <Lock className="h-4 w-4" />
                      <span>
                        Payer {formatPrice(currentTemplate.priceInCents)} & Télécharger
                      </span>
                    </Button>
                  </div>

                  <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>Paiement chiffré TLS 1.3 conforme PCI-DSS</span>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
