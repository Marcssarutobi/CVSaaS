import React, { useState } from "react";
import { useFlow } from "../../../lib/store";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select } from "../../ui/select";
import { Label } from "../../ui/label";
import { Plus, X, Globe } from "lucide-react";

export const LanguagesForm: React.FC = () => {
  const { cvData, addLanguage, removeLanguage } = useFlow();

  const [language, setLanguage] = useState("");
  const [proficiency, setProficiency] = useState<"A1/A2" | "B1/B2" | "C1/C2" | "Langue maternelle">("B1/B2");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!language.trim()) return;

    addLanguage({
      language: language.trim(),
      proficiency,
    });

    setLanguage("");
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h4 className="text-sm font-bold text-slate-900">Langues parlées</h4>
        <p className="text-xs text-slate-500">
          Indiquez votre niveau selon le cadre européen (A1 à C2) ou langue maternelle.
        </p>
      </div>

      <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-2.5 items-end">
        <div className="flex-1 w-full">
          <Label required>Langue</Label>
          <Input
            placeholder="Ex: Anglais, Espagnol, Allemand..."
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-52">
          <Label>Niveau de maîtrise</Label>
          <Select
            value={proficiency}
            onChange={(e) => setProficiency(e.target.value as any)}
          >
            <option value="Langue maternelle">Langue maternelle</option>
            <option value="C1/C2">C1/C2 (Courant / Bilingue)</option>
            <option value="B1/B2">B1/B2 (Professionnel)</option>
            <option value="A1/A2">A1/A2 (Notions / Débutant)</option>
          </Select>
        </div>

        <Button type="submit" size="md" className="gap-1.5 shrink-0 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          <span>Ajouter</span>
        </Button>
      </form>

      <div className="pt-2 flex flex-wrap gap-2">
        {cvData.languages.map((lang) => (
          <span
            key={lang.id}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-2xs"
          >
            <Globe className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-semibold">{lang.language}</span>
            <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
              {lang.proficiency}
            </span>
            <button
              type="button"
              onClick={() => removeLanguage(lang.id)}
              className="text-slate-300 hover:text-rose-600 ml-0.5"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
