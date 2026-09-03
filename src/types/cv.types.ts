import { z } from "zod";

export interface ExperienceItem {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: "debutant" | "intermediaire" | "avance" | "expert";
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: "A1/A2" | "B1/B2" | "C1/C2" | "Langue maternelle";
}

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit comporter au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit comporter au moins 2 caractères"),
  title: z.string().min(2, "Le titre du poste recherché est requis"),
  email: z.string().email("Adresse email valide requise"),
  phone: z.string().min(8, "Numéro de téléphone requis"),
  address: z.string().min(2, "Ville ou localisation requise"),
  summary: z.string().max(600, "Le résumé doit faire moins de 600 caractères"),
  website: z.string().optional().or(z.literal("")),
  linkedin: z.string().optional().or(z.literal("")),
  photoUrl: z.string().optional().or(z.literal("")),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;

export interface CVData {
  personalInfo: PersonalInfo;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
  interests: string[];
}

export const experienceSchema = z.object({
  id: z.string(),
  jobTitle: z.string().min(2, "Intitulé de poste requis"),
  company: z.string().min(1, "Entreprise requise"),
  location: z.string().optional().default(""),
  startDate: z.string().min(4, "Date de début requise"),
  endDate: z.string().optional().default(""),
  isCurrent: z.boolean().default(false),
  description: z.string().optional().default(""),
});

export const educationSchema = z.object({
  id: z.string(),
  degree: z.string().min(2, "Diplôme ou formation requis"),
  institution: z.string().min(1, "Établissement requis"),
  location: z.string().optional().default(""),
  startDate: z.string().optional().default(""),
  endDate: z.string().optional().default(""),
  description: z.string().optional().default(""),
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nom de la compétence"),
  level: z.enum(["debutant", "intermediaire", "avance", "expert"]),
});

export const languageSchema = z.object({
  id: z.string(),
  language: z.string().min(1, "Langue"),
  proficiency: z.enum(["A1/A2", "B1/B2", "C1/C2", "Langue maternelle"]),
});

export const fullCVSchema = z.object({
  personalInfo: personalInfoSchema,
  experiences: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
  languages: z.array(languageSchema),
  interests: z.array(z.string()),
});
