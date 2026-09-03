import React, { useState } from "react";
import { useFlow } from "../../../lib/store";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select } from "../../ui/select";
import { Label } from "../../ui/label";
import { Plus, X, Award } from "lucide-react";

export const SkillsForm: React.FC = () => {
  const { cvData, addSkill, removeSkill } = useFlow();

  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState<"debutant" | "intermediaire" | "avance" | "expert">("avance");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    addSkill({
      name: skillName.trim(),
      level: skillLevel,
    });

    setSkillName("");
  };

  const levelLabels: Record<string, string> = {
    debutant: "Débutant",
    intermediaire: "Intermédiaire",
    avance: "Avancé",
    expert: "Expert",
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h4 className="text-sm font-bold text-slate-900">Compétences Techniques & Clés</h4>
        <p className="text-xs text-slate-500">
          Ajoutez vos compétences les plus demandées par les recruteurs.
        </p>
      </div>

      <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-2.5 items-end">
        <div className="flex-1 w-full">
          <Label required>Nom de la compétence</Label>
          <Input
            placeholder="Ex: React, Gestion de projet, SEO, SQL..."
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-44">
          <Label>Niveau</Label>
          <Select
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value as any)}
          >
            <option value="debutant">Débutant</option>
            <option value="intermediaire">Intermédiaire</option>
            <option value="avance">Avancé</option>
            <option value="expert">Expert</option>
          </Select>
        </div>

        <Button type="submit" size="md" className="gap-1.5 shrink-0 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          <span>Ajouter</span>
        </Button>
      </form>

      {/* Badges list */}
      <div className="pt-2">
        <div className="flex flex-wrap gap-2">
          {cvData.skills.map((skill) => (
            <span
              key={skill.id}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-2xs"
            >
              <Award className="h-3.5 w-3.5 text-blue-600" />
              <span>{skill.name}</span>
              <span className="text-[10px] text-slate-400 font-semibold bg-slate-100 px-1.5 py-0.5 rounded">
                {levelLabels[skill.level]}
              </span>
              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                className="text-slate-300 hover:text-rose-600 ml-0.5"
                title="Supprimer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
