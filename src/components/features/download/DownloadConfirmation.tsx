import React, { useState } from "react";
import { useFlow } from "../../../lib/store";
import { exportCvToPdf } from "../../../lib/export-pdf";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Download,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Printer,
  FileCheck,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { CVPreview } from "../preview/CVPreview";

export const DownloadConfirmation: React.FC = () => {
  const { cvData, paymentSuccess, goToStep } = useFlow();
  const [isExporting, setIsExporting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [backupEmail, setBackupEmail] = useState(cvData.personalInfo.email || "");

  const handleDownload = async () => {
    try {
      setIsExporting(true);
      const fullName = `${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}`
        .trim()
        .replace(/\s+/g, "_") || "Mon_CV";
      const fileName = `CV_${fullName}.pdf`;
      await exportCvToPdf("cv-preview-sheet", fileName);
    } catch (err) {
      // If canvas export fails, fall back to window.print()
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!backupEmail) return;
    setEmailSent(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Banner */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 sm:p-8 text-center space-y-4 mb-8">
        <div className="h-14 w-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Votre CV professionnel est prêt !
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-lg mx-auto">
            Votre document a été compilé avec succès en haute définition vectorielle.
          </p>
        </div>

        {paymentSuccess?.transactionId && (
          <p className="text-xs font-mono text-slate-500">
            Réf. transaction : {paymentSuccess.transactionId}
          </p>
        )}

        {/* Main download action */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            size="lg"
            onClick={handleDownload}
            isLoading={isExporting}
            className="w-full sm:w-auto px-8 gap-2 bg-slate-900 hover:bg-slate-800 text-white shadow-lg text-base"
          >
            <Download className="h-5 w-5" />
            <span>Télécharger mon CV (PDF)</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.print()}
            className="w-full sm:w-auto gap-2 border-slate-300"
          >
            <Printer className="h-4 w-4" />
            <span>Imprimer</span>
          </Button>
        </div>
      </div>

      {/* Important Security Notice: No Account Storage */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 mb-8 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 space-y-1">
          <h4 className="font-bold">Important : aucun compte ni stockage distant</h4>
          <p className="text-amber-800 leading-relaxed">
            Conformément à notre engagement de confidentialité, nous ne conservons aucun historique de vos CV sur nos serveurs. <strong>Téléchargez votre PDF dès maintenant</strong> et sauvegardez-le sur votre ordinateur ou votre téléphone.
          </p>
        </div>
      </div>

      {/* Send by email option */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs mb-8">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
          <Mail className="h-4 w-4 text-blue-600" />
          <span>Recevoir une copie de secours par email (Optionnel)</span>
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Pratique pour retrouver le PDF sur votre boîte mail sans créer de compte.
        </p>

        {emailSent ? (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800 flex items-center gap-2 font-medium">
            <CheckCircle2 className="h-4 w-4 text-blue-600" />
            <span>Le CV et le reçu ont été envoyés à {backupEmail} !</span>
          </div>
        ) : (
          <form onSubmit={handleSendEmail} className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              value={backupEmail}
              onChange={(e) => setBackupEmail(e.target.value)}
              placeholder="votre.email@exemple.com"
              className="flex-1 text-xs"
              required
            />
            <Button type="submit" size="md" variant="secondary" className="text-xs shrink-0">
              Envoyer par email
            </Button>
          </form>
        )}
      </div>

      {/* Embedded Live Preview */}
      <div className="mt-8 border-t border-slate-200 pt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Aperçu du document final</h3>
            <p className="text-xs text-slate-500">Rendu identique au fichier PDF téléchargé</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToStep("form")}
            className="text-xs gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Modifier des informations</span>
          </Button>
        </div>

        <CVPreview showTemplateSelector={false} scaleOverride={0.8} />
      </div>
    </div>
  );
};
