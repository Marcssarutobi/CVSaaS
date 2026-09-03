import React, { useState } from "react";
import { useFlow } from "../../../lib/store";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Plus, X, Heart } from "lucide-react";

export const InterestsForm: React.FC = () => {
  const { cvData, addInterest, removeInterest } = useFlow();
  const [interestInput, setInterestInput] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interestInput.trim()) return;
    addInterest(interestInput.trim());
    setInterestInput("");
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h4 className="text-sm font-bold text-slate-900">Centres d'intérêt & Loisirs</h4>
        <p className="text-xs text-slate-500">
          Activités associatives, passions sportives ou culturelles pour enrichir votre profil.
        </p>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2 items-end">
        <div className="flex-1">
          <Label>Ajouter un centre d'intérêt</Label>
          <Input
            placeholder="Ex: Marathon, Photographie argentique, Échecs..."
            value={interestInput}
            onChange={(e) => setInterestInput(e.target.value)}
          />
        </div>
        <Button type="submit" size="md" className="gap-1.5 shrink-0">
          <Plus className="h-4 w-4" />
          <span>Ajouter</span>
        </Button>
      </form>

      <div className="pt-2 flex flex-wrap gap-2">
        {cvData.interests.map((item, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs"
          >
            <Heart className="h-3 w-3 text-rose-400" />
            <span>{item}</span>
            <button
              type="button"
              onClick={() => removeInterest(item)}
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
