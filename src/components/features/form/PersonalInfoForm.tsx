import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema, PersonalInfo } from "../../../types/cv.types";
import { useFlow } from "../../../lib/store";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";

export const PersonalInfoForm: React.FC = () => {
  const { cvData, updatePersonalInfo } = useFlow();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: cvData.personalInfo,
    mode: "onChange",
  });

  // Keep form synchronized if sample data is loaded
  useEffect(() => {
    reset(cvData.personalInfo);
  }, [cvData.personalInfo, reset]);

  // Subscribe to changes to update flow state in real-time
  useEffect(() => {
    const subscription = watch((values) => {
      updatePersonalInfo(values as Partial<PersonalInfo>);
    });
    return () => subscription.unsubscribe();
  }, [watch, updatePersonalInfo]);

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h4 className="text-sm font-bold text-slate-900">Coordonnées et Identité</h4>
        <p className="text-xs text-slate-500">
          Ces informations figureront en en-tête de votre CV.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label required>Prénom</Label>
          <Input
            placeholder="Ex: Thomas"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
        </div>

        <div>
          <Label required>Nom</Label>
          <Input
            placeholder="Ex: Mercier"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </div>
      </div>

      <div>
        <Label required>Titre du poste recherché</Label>
        <Input
          placeholder="Ex: Développeur Web Full-Stack / Chef de Projet"
          {...register("title")}
          error={errors.title?.message}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label required>Adresse Email</Label>
          <Input
            type="email"
            placeholder="thomas.mercier@email.com"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div>
          <Label required>Téléphone</Label>
          <Input
            type="tel"
            placeholder="+33 6 12 34 56 78"
            {...register("phone")}
            error={errors.phone?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label required>Ville / Localisation</Label>
          <Input
            placeholder="Ex: Lyon, France"
            {...register("address")}
            error={errors.address?.message}
          />
        </div>

        <div>
          <Label>Profil LinkedIn (optionnel)</Label>
          <Input
            placeholder="linkedin.com/in/profil"
            {...register("linkedin")}
            error={errors.linkedin?.message}
          />
        </div>
      </div>

      <div>
        <Label>Site web ou Portfolio (optionnel)</Label>
        <Input
          placeholder="https://monsite.fr"
          {...register("website")}
          error={errors.website?.message}
        />
      </div>

      <div>
        <Label>Résumé professionnel / Objectif de carrière</Label>
        <Textarea
          placeholder="Présentez en 2-3 phrases vos points forts, votre expertise et votre valeur ajoutée pour l'entreprise ciblée."
          rows={3}
          {...register("summary")}
          error={errors.summary?.message}
        />
        <p className="text-[11px] text-slate-400 mt-1 text-right">
          Recommandé : 150 à 300 caractères
        </p>
      </div>
    </div>
  );
};
