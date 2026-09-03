export type TemplateStyle = "moderne" | "classique" | "creatif" | "executif";

export interface ResumeTemplate {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  priceInCents: number; // e.g. 490 = 4,90 € (or 0 for free)
  isPopular?: boolean;
  isFree?: boolean;
  style: TemplateStyle;
  accentColor: string;
  fontFamily: "sans" | "serif" | "mono";
  active: boolean;
  createdAt: string;
}

export interface CreateTemplateDTO {
  name: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  priceInCents: number;
  isPopular?: boolean;
  isFree?: boolean;
  style: TemplateStyle;
  accentColor: string;
  fontFamily: "sans" | "serif" | "mono";
  active: boolean;
}

export interface UpdateTemplateDTO extends Partial<CreateTemplateDTO> {
  id: string;
}
