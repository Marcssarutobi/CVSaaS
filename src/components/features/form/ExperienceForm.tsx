import React, { useState } from "react";
import { useFlow } from "../../../lib/store";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Plus, Trash2, Briefcase } from "lucide-react";

export const ExperienceForm: React.FC = () => {
  const { cvData, addExperience, updateExperience, removeExperience } = useFlow();
  const [showAddForm, setShowAddForm] = useState(false);

  const [newJob, setNewJob] = useState({
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
  });

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.jobTitle.trim() || !newJob.company.trim()) return;

    addExperience({
      ...newJob,
      endDate: newJob.isCurrent ? "Présent" : newJob.endDate,
    });

    setNewJob({
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Expérience Professionnelle</h4>
          <p className="text-xs text-slate-500">
            Mentionnez vos postes les plus récents et pertinents.
          </p>
        </div>
        {!showAddForm && (
          <Button
            size="sm"
            onClick={() => setShowAddForm(true)}
            className="gap-1.5 text-xs font-semibold"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Ajouter un poste</span>
          </Button>
        )}
      </div>

      {/* Add New Experience Modal/Box */}
      {showAddForm && (
        <form
          onSubmit={handleAddJob}
          className="rounded-xl border border-blue-200 bg-blue-50/30 p-4 space-y-3"
        >
          <div className="flex items-center justify-between pb-2 border-b border-blue-100">
            <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5" />
              Nouvelle expérience
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
              <Label required>Poste / Intitulé</Label>
              <Input
                placeholder="Ex: Développeur Web"
                value={newJob.jobTitle}
                onChange={(e) => setNewJob({ ...newJob, jobTitle: e.target.value })}
                required
              />
            </div>
            <div>
              <Label required>Entreprise</Label>
              <Input
                placeholder="Ex: Société Générale"
                value={newJob.company}
                onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <Label>Ville / Pays</Label>
              <Input
                placeholder="Ex: Paris"
                value={newJob.location}
                onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
              />
            </div>
            <div>
              <Label required>Date de début</Label>
              <Input
                placeholder="Ex: 2021 ou Sept 2021"
                value={newJob.startDate}
                onChange={(e) => setNewJob({ ...newJob, startDate: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Date de fin</Label>
              <Input
                placeholder="Ex: 2023"
                value={newJob.endDate}
                disabled={newJob.isCurrent}
                onChange={(e) => setNewJob({ ...newJob, endDate: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isCurrentNew"
              checked={newJob.isCurrent}
              onChange={(e) => setNewJob({ ...newJob, isCurrent: e.target.checked })}
              className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
            />
            <label htmlFor="isCurrentNew" className="text-xs text-slate-700 font-medium cursor-pointer">
              Poste actuel / En cours
            </label>
          </div>

          <div>
            <Label>Missions & Réalisations chiffrées</Label>
            <Textarea
              placeholder="Ex: Gestion d'une équipe de 5 personnes. Augmentation des ventes en ligne de 25%."
              rows={2}
              value={newJob.description}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
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
              Enregistrer ce poste
            </Button>
          </div>
        </form>
      )}

      {/* Existing experiences list */}
      {cvData.experiences.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-400 mb-2">Aucune expérience ajoutée.</p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowAddForm(true)}
            className="text-xs"
          >
            Ajouter votre première expérience
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {cvData.experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors relative group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="text-sm font-bold text-slate-900">{exp.jobTitle}</h5>
                  <p className="text-xs text-blue-700 font-medium">{exp.company} {exp.location && `• ${exp.location}`}</p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {exp.startDate} — {exp.endDate}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  className="text-slate-300 hover:text-rose-600 p-1 rounded-md transition-colors"
                  title="Supprimer cette expérience"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {exp.description && (
                <p className="text-xs text-slate-600 mt-2 leading-relaxed whitespace-pre-line">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
