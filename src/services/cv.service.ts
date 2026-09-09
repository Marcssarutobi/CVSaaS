import { CVData } from "../types/cv.types";
import { supabase, assertSupabaseConfigured } from "../lib/supabase";

export interface GenerateCvResponse {
  pdfUrl?: string;
  downloadToken: string;
  expiresAt: string;
}

export const cvService = {
  async saveDraft(cvData: CVData, templateId: string): Promise<{ draftId: string }> {
    assertSupabaseConfigured();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    if (!userId) {
      throw new Error("Vous devez être connecté pour enregistrer un CV.");
    }

    const { data, error } = await supabase
      .from("cvs")
      .insert({
        user_id: userId,
        title: `${cvData.personalInfo.firstName || "CV"} ${cvData.personalInfo.lastName || ""}`.trim() || "Mon CV",
        template_id: templateId,
        personal_info: cvData.personalInfo,
        experiences: cvData.experiences,
        education: cvData.education,
        skills: cvData.skills,
        languages: cvData.languages,
        interests: cvData.interests,
        status: "draft",
      })
      .select("id")
      .single();

    if (error) throw error;
    return { draftId: data.id as string };
  },

  async generatePdf(templateId: string, cvData: CVData, paymentToken?: string): Promise<GenerateCvResponse> {
    assertSupabaseConfigured();
    if (!paymentToken) {
      throw new Error("Paiement requis avant le téléchargement.");
    }

    return {
      downloadToken: paymentToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
  },
};
