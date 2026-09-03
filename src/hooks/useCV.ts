import { useMutation } from "@tanstack/react-query";
import { cvService } from "../services/cv.service";
import { CVData } from "../types/cv.types";

export function useSaveDraft() {
  return useMutation({
    mutationFn: ({ cvData, templateId }: { cvData: CVData; templateId: string }) =>
      cvService.saveDraft(cvData, templateId),
  });
}

export function useGeneratePdf() {
  return useMutation({
    mutationFn: ({
      templateId,
      cvData,
      paymentToken,
    }: {
      templateId: string;
      cvData: CVData;
      paymentToken?: string;
    }) => cvService.generatePdf(templateId, cvData, paymentToken),
  });
}
