import { CVData } from "../types/cv.types";
import { apiClient } from "../lib/api-client";

export interface GenerateCvResponse {
  pdfUrl?: string;
  downloadToken: string;
  expiresAt: string;
}

export const cvService = {
  async saveDraft(cvData: CVData, templateId: string): Promise<{ draftId: string }> {
    try {
      return await apiClient<{ draftId: string }>("/cv/draft", {
        method: "POST",
        body: JSON.stringify({ cvData, templateId }),
      });
    } catch {
      const draftId = `draft-${Date.now()}`;
      localStorage.setItem(`cv_draft_${draftId}`, JSON.stringify({ cvData, templateId }));
      return { draftId };
    }
  },

  async generatePdf(templateId: string, cvData: CVData, paymentToken?: string): Promise<GenerateCvResponse> {
    try {
      return await apiClient<GenerateCvResponse>("/cv/generate-pdf", {
        method: "POST",
        body: JSON.stringify({ templateId, cvData, paymentToken }),
      });
    } catch {
      // Local mock response
      return {
        downloadToken: `tok_${Math.random().toString(36).substring(2, 10)}`,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };
    }
  },
};
