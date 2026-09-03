import React, { createContext, useContext, useEffect, useState } from "react";
import { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, PersonalInfo } from "../types/cv.types";

export type FlowStep = "template" | "form" | "preview" | "payment" | "download";

export interface PaymentSuccessInfo {
  transactionId: string;
  downloadToken: string;
  paidAt: string;
  templateId: string;
  amountInCents: number;
}

export const INITIAL_CV_DATA: CVData = {
  personalInfo: {
    firstName: "Thomas",
    lastName: "Mercier",
    title: "Chef de Projet Digital & Lead Tech",
    email: "thomas.mercier@example.com",
    phone: "+33 6 12 34 56 78",
    address: "Lyon, France",
    summary:
      "Professionnel passionné par la transformation digitale avec 7 ans d'expérience dans la conception d'applications web performantes et le management d'équipes pluridisciplinaires.",
    website: "https://thomasmercier.dev",
    linkedin: "linkedin.com/in/thomas-mercier",
    photoUrl: "",
  },
  experiences: [
    {
      id: "exp-1",
      jobTitle: "Lead Développeur Full-Stack",
      company: "Agence Nova Web",
      location: "Lyon",
      startDate: "2021",
      endDate: "Présent",
      isCurrent: true,
      description:
        "Direction technique d'une équipe de 6 développeurs. Refonte de l'architecture micro-services et optimisation des temps de chargement de 40%.",
    },
    {
      id: "exp-2",
      jobTitle: "Développeur Front-End Senior",
      company: "TechFlow SAS",
      location: "Paris / Remote",
      startDate: "2018",
      endDate: "2021",
      isCurrent: false,
      description:
        "Développement de composants UI complexes en React et TypeScript. Mise en place de tests end-to-end automatisés et intégration continue.",
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Master Ingénierie Logicielle & Systèmes d'Information",
      institution: "INSA Lyon",
      location: "Lyon",
      startDate: "2016",
      endDate: "2018",
      description: "Spécialisation architecture web distribuée et sécurité des données.",
    },
    {
      id: "edu-2",
      degree: "Licence Informatique Générale",
      institution: "Université Claude Bernard",
      location: "Lyon",
      startDate: "2013",
      endDate: "2016",
      description: "Algorithmique, bases de données et génie logiciel.",
    },
  ],
  skills: [
    { id: "sk-1", name: "React / TypeScript", level: "expert" },
    { id: "sk-2", name: "Node.js / Laravel", level: "avance" },
    { id: "sk-3", name: "Tailwind CSS & Design System", level: "expert" },
    { id: "sk-4", name: "Docker & CI/CD", level: "intermediaire" },
    { id: "sk-5", name: "Gestion de projet Agile", level: "avance" },
  ],
  languages: [
    { id: "lang-1", language: "Français", proficiency: "Langue maternelle" },
    { id: "lang-2", language: "Anglais", proficiency: "C1/C2" },
    { id: "lang-3", language: "Espagnol", proficiency: "B1/B2" },
  ],
  interests: ["Veille technologique", "Photographie urbaine", "Cyclisme sur route", "Open-source"],
};

export const BLANK_CV_DATA: CVData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    website: "",
    linkedin: "",
    photoUrl: "",
  },
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  interests: [],
};

interface FlowContextType {
  currentStep: FlowStep;
  goToStep: (step: FlowStep) => void;
  selectedTemplateId: string;
  setSelectedTemplateId: (id: string) => void;
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  addExperience: (exp: Omit<ExperienceItem, "id">) => void;
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  addEducation: (edu: Omit<EducationItem, "id">) => void;
  updateEducation: (id: string, edu: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Omit<SkillItem, "id">) => void;
  removeSkill: (id: string) => void;
  addLanguage: (lang: Omit<LanguageItem, "id">) => void;
  removeLanguage: (id: string) => void;
  addInterest: (interest: string) => void;
  removeInterest: (interest: string) => void;
  loadSampleData: () => void;
  clearCVData: () => void;
  paymentSuccess: PaymentSuccessInfo | null;
  setPaymentSuccess: (info: PaymentSuccessInfo | null) => void;
}

const STORAGE_FLOW_KEY = "saas_cv_flow_state_v1";

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export const FlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("template");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("template-modern");
  const [cvData, setCVData] = useState<CVData>(INITIAL_CV_DATA);
  const [paymentSuccess, setPaymentSuccess] = useState<PaymentSuccessInfo | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FLOW_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentStep) setCurrentStep(parsed.currentStep);
        if (parsed.selectedTemplateId) setSelectedTemplateId(parsed.selectedTemplateId);
        if (parsed.cvData) setCVData(parsed.cvData);
        if (parsed.paymentSuccess) setPaymentSuccess(parsed.paymentSuccess);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to local storage on changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_FLOW_KEY,
        JSON.stringify({
          currentStep,
          selectedTemplateId,
          cvData,
          paymentSuccess,
        })
      );
    } catch {
      // ignore
    }
  }, [currentStep, selectedTemplateId, cvData, paymentSuccess]);

  const goToStep = (step: FlowStep) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updatePersonalInfo = (data: Partial<PersonalInfo>) => {
    setCVData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data },
    }));
  };

  const addExperience = (exp: Omit<ExperienceItem, "id">) => {
    const newExp: ExperienceItem = { ...exp, id: `exp-${Date.now()}` };
    setCVData((prev) => ({
      ...prev,
      experiences: [newExp, ...prev.experiences],
    }));
  };

  const updateExperience = (id: string, exp: Partial<ExperienceItem>) => {
    setCVData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((item) =>
        item.id === id ? { ...item, ...exp } : item
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((item) => item.id !== id),
    }));
  };

  const addEducation = (edu: Omit<EducationItem, "id">) => {
    const newEdu: EducationItem = { ...edu, id: `edu-${Date.now()}` };
    setCVData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const updateEducation = (id: string, edu: Partial<EducationItem>) => {
    setCVData((prev) => ({
      ...prev,
      education: prev.education.map((item) =>
        item.id === id ? { ...item, ...edu } : item
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  const addSkill = (skill: Omit<SkillItem, "id">) => {
    const newSkill: SkillItem = { ...skill, id: `sk-${Date.now()}` };
    setCVData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const removeSkill = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  const addLanguage = (lang: Omit<LanguageItem, "id">) => {
    const newLang: LanguageItem = { ...lang, id: `lang-${Date.now()}` };
    setCVData((prev) => ({
      ...prev,
      languages: [...prev.languages, newLang],
    }));
  };

  const removeLanguage = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l.id !== id),
    }));
  };

  const addInterest = (interest: string) => {
    if (!interest.trim()) return;
    setCVData((prev) => ({
      ...prev,
      interests: [...prev.interests, interest.trim()],
    }));
  };

  const removeInterest = (interest: string) => {
    setCVData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  const loadSampleData = () => {
    setCVData(INITIAL_CV_DATA);
  };

  const clearCVData = () => {
    setCVData(BLANK_CV_DATA);
  };

  return (
    <FlowContext.Provider
      value={{
        currentStep,
        goToStep,
        selectedTemplateId,
        setSelectedTemplateId,
        cvData,
        setCVData,
        updatePersonalInfo,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        removeSkill,
        addLanguage,
        removeLanguage,
        addInterest,
        removeInterest,
        loadSampleData,
        clearCVData,
        paymentSuccess,
        setPaymentSuccess,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

export function useFlow() {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error("useFlow must be used within a FlowProvider");
  }
  return context;
}
