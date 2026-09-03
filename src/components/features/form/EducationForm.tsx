import React, { useState } from "react";
import { useFlow } from "../../../lib/store";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Plus, Trash2, GraduationCap } from "lucide-react";

export const EducationForm: React.FC = () => {
  const { cvData, addEducation, removeEducation } = useFlow();
  const [showAddForm, setShowAddForm] = useState(false);

  const [newEdu, setNewEdu] = useState({
    degree: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEdu.degree.trim() || !newEdu.institution.trim()) return;

    addEducation(newEdu);

    setNewEdu({
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Formations & Diplômes</h4>
          <p className="text-xs text-slate-500">
            Diplômes, certifications et études supérieures.
          </p>
        </div>
        {!showAddForm && (
          <Button
            size="sm"
            onClick={() => setShowAddForm(true)}
            className="gap-1.5 text-xs font-semibold"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Ajouter un diplôme</span>
          </Button>
        )}
      </div>

      {showAddForm && (
        <form
          onSubmit={handleAddEducation}
          className="rounded-xl border border-blue-200 bg-blue-50/30 p-4 space-y-3"
        >
          <div className="flex items-center justify-between pb-2 border-b border-blue-100">
            <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5" />
              Nouvelle formation
            </span>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-slate-400 hover:text-slate-700"
            >
              Annuler
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label required>Diplôme / Spécialisation</Label>
              <Input
                placeholder="Ex: Master Informatique"
                value={newEdu.degree}
                onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                required
              />
            </div>
            <div>
              <Label required>École / Université</Label>
              <Input
                placeholder="Ex: Université de Lyon"
                value={newEdu.institution}
                onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <Label>Ville</Label>
              <Input
                placeholder="Ex: Lyon"
                value={newEdu.location}
                onChange={(e) => setNewEdu({ ...newEdu, location: e.target.value })}
              />
            </div>
            <div>
              <Label>Année de début</Label>
              <Input
                placeholder="Ex: 2016"
                value={newEdu.startDate}
                onChange={(e) => setNewEdu({ ...newEdu, startDate: e.target.value })}
              />
            </div>
            <div>
              <Label>Année d'obtention</Label>
              <Input
                placeholder="Ex: 2018"
                value={newEdu.endDate}
                onChange={(e) => setNewEdu({ ...newEdu, endDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label>Détails complémentaires (optionnel)</Label>
            <Textarea
              placeholder="Ex: Mention Très Bien, majeure systèmes d'information."
              rows={2}
              value={newEdu.description}
              onChange={(e) => setNewEdu({ ...newEdu, description: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowAddForm(false)}
            >
              Annuler
            </Button>
            <Button type="submit" size="sm">
              Enregistrer
            </Button>
          </div>
        </form>
      )}

      {cvData.education.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-400 mb-2">Aucune formation ajoutée.</p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowAddForm(true)}
            className="text-xs"
          >
            Ajouter une formation
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {cvData.education.map((edu) => (
            <div
              key={edu.id}
              className="p-4 rounded-xl border border-slate-200 bg-white flex items-start justify-between"
            >
              <div>
                <h5 className="text-sm font-bold text-slate-900">{edu.degree}</h5>
                <p className="text-xs text-slate-600 font-medium">
                  {edu.institution} {edu.location && `• ${edu.location}`}
                </p>
                {(edu.startDate || edu.endDate) && (
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {edu.startDate} {edu.endDate && `— ${edu.endDate}`}
                  </p>
                )}
                {edu.description && (
                  <p className="text-xs text-slate-500 mt-1">{edu.description}</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => removeEducation(edu.id)}
                className="text-slate-300 hover:text-rose-600 p-1 rounded-md transition-colors"
                title="Supprimer cette formation"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
