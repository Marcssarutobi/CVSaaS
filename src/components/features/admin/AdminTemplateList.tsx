import React, { useState } from "react";
import { useTemplates, useCreateTemplate, useUpdateTemplate, useDeleteTemplate } from "../../../hooks/useTemplates";
import { ResumeTemplate, CreateTemplateDTO } from "../../../types/template.types";
import { formatPrice } from "../../../lib/utils";
import { AdminTemplateModal } from "./AdminTemplateModal";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  Sliders,
} from "lucide-react";

export const AdminTemplateList: React.FC = () => {
  const { data: templates, isLoading } = useTemplates();
  const createMutation = useCreateTemplate();
  const updateMutation = useUpdateTemplate();
  const deleteMutation = useDeleteTemplate();

  const [modalOpen, setModalOpen] = useState(false);
  const [templateToEdit, setTemplateToEdit] = useState<ResumeTemplate | null>(null);

  const handleOpenCreate = () => {
    setTemplateToEdit(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (t: ResumeTemplate) => {
    setTemplateToEdit(t);
    setModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Confirmez-vous la suppression du modèle "${name}" ?`)) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleToggleStatus = async (t: ResumeTemplate) => {
    await updateMutation.mutateAsync({
      id: t.id,
      dto: { id: t.id, active: !t.active },
    });
  };

  const handleSave = async (dto: CreateTemplateDTO) => {
    if (templateToEdit) {
      await updateMutation.mutateAsync({
        id: templateToEdit.id,
        dto: { ...dto, id: templateToEdit.id },
      });
    } else {
      await createMutation.mutateAsync(dto);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Gestion des Modèles de CV</h2>
          <p className="text-xs text-slate-500">
            Contrôlez les templates disponibles sur la plateforme, leurs prix et leur statut de diffusion.
          </p>
        </div>
        <Button size="sm" onClick={handleOpenCreate} className="gap-1.5 text-xs font-semibold shadow-xs">
          <Plus className="h-3.5 w-3.5" />
          <span>Ajouter un modèle</span>
        </Button>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-xs text-slate-400">Chargement des templates...</div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Vignette</th>
                  <th className="py-3 px-4">Nom & Slug</th>
                  <th className="py-3 px-4">Style</th>
                  <th className="py-3 px-4">Prix</th>
                  <th className="py-3 px-4">Statut</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {templates?.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="h-14 w-10 rounded overflow-hidden border border-slate-200 bg-slate-100">
                        <img
                          src={t.thumbnailUrl}
                          alt={t.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <span>{t.name}</span>
                        {t.isPopular && (
                          <Badge className="bg-amber-100 text-amber-900 text-[10px] px-1.5 py-0 border-amber-200">
                            Populaire
                          </Badge>
                        )}
                      </div>
                      <div className="font-mono text-[11px] text-slate-400 mt-0.5">/{t.slug}</div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className="h-2.5 w-2.5 rounded-full border border-slate-300"
                          style={{ backgroundColor: t.accentColor }}
                        />
                        <span className="text-[10px] text-slate-400 font-mono">{t.accentColor}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 capitalize font-medium text-slate-700">
                      {t.style}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {t.isFree ? (
                        <span className="text-emerald-700 font-sans font-bold">Gratuit</span>
                      ) : (
                        formatPrice(t.priceInCents)
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleStatus(t)}
                        className="flex items-center gap-1.5 cursor-pointer text-left"
                      >
                        {t.active ? (
                          <Badge variant="success" className="gap-1">
                            <CheckCircle className="h-3 w-3 text-emerald-600" />
                            <span>Actif</span>
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="gap-1 text-slate-500">
                            <XCircle className="h-3 w-3 text-slate-400" />
                            <span>Inactif</span>
                          </Badge>
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenEdit(t)}
                          className="text-slate-600 hover:text-slate-900 h-8 px-2"
                          title="Modifier"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(t.id, t.name)}
                          className="text-slate-400 hover:text-rose-600 h-8 px-2"
                          title="Supprimer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit / Create modal */}
      <AdminTemplateModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        templateToEdit={templateToEdit}
        onSave={handleSave}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
};
