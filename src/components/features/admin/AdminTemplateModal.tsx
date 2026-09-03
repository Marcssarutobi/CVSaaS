import React, { useState, useEffect } from "react";
import { ResumeTemplate, CreateTemplateDTO, TemplateStyle } from "../../../types/template.types";
import { Dialog } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Select } from "../../ui/select";
import { Upload, Image as ImageIcon } from "lucide-react";

interface AdminTemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateToEdit: ResumeTemplate | null;
  onSave: (data: CreateTemplateDTO) => Promise<void>;
  isLoading: boolean;
}

export const AdminTemplateModal: React.FC<AdminTemplateModalProps> = ({
  open,
  onOpenChange,
  templateToEdit,
  onSave,
  isLoading,
}) => {
  const [formData, setFormData] = useState<CreateTemplateDTO>({
    name: "",
    slug: "",
    description: "",
    thumbnailUrl: "",
    priceInCents: 490,
    isPopular: false,
    isFree: false,
    style: "moderne",
    accentColor: "#2563eb",
    fontFamily: "sans",
    active: true,
  });

  useEffect(() => {
    if (templateToEdit) {
      setFormData({
        name: templateToEdit.name,
        slug: templateToEdit.slug,
        description: templateToEdit.description,
        thumbnailUrl: templateToEdit.thumbnailUrl,
        priceInCents: templateToEdit.priceInCents,
        isPopular: templateToEdit.isPopular || false,
        isFree: templateToEdit.isFree || false,
        style: templateToEdit.style,
        accentColor: templateToEdit.accentColor,
        fontFamily: templateToEdit.fontFamily,
        active: templateToEdit.active,
      });
    } else {
      setFormData({
        name: "",
        slug: "",
        description: "",
        thumbnailUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80",
        priceInCents: 490,
        isPopular: false,
        isFree: false,
        style: "moderne",
        accentColor: "#2563eb",
        fontFamily: "sans",
        active: true,
      });
    }
  }, [templateToEdit, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    onOpenChange(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, thumbnailUrl: fakeUrl }));
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={templateToEdit ? "Modifier le modèle" : "Ajouter un nouveau modèle"}
      description="Configurez le design, les options de mise en page et le tarif du template."
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label required>Nom du modèle</Label>
            <Input
              value={formData.name}
              onChange={(e) => {
                const name = e.target.value;
                const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                setFormData((prev) => ({ ...prev, name, slug: prev.slug || slug }));
              }}
              placeholder="Ex: Moderne Tech"
              required
            />
          </div>
          <div>
            <Label required>Identifiant URL (Slug)</Label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="moderne-tech"
              required
            />
          </div>
        </div>

        <div>
          <Label required>Description courte</Label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Convient aux profils ingénieurs, managers..."
            rows={2}
            required
          />
        </div>

        {/* Preview image upload / URL */}
        <div>
          <Label required>Image de prévisualisation (Vignette)</Label>
          <div className="flex gap-2 items-center">
            <Input
              value={formData.thumbnailUrl}
              onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
              placeholder="https://..."
              required
            />
            <label className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 cursor-pointer text-slate-700 shrink-0 font-medium">
              <Upload className="h-3.5 w-3.5" />
              <span>Fichier</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
          {formData.thumbnailUrl && (
            <div className="mt-2 h-20 w-32 rounded-lg overflow-hidden border border-slate-200">
              <img
                src={formData.thumbnailUrl}
                alt="Aperçu"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Pricing & Free toggle */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <Label required>Prix en centimes d'euro (€)</Label>
            <Input
              type="number"
              step="10"
              min="0"
              disabled={formData.isFree}
              value={formData.isFree ? 0 : formData.priceInCents}
              onChange={(e) => setFormData({ ...formData, priceInCents: parseInt(e.target.value, 10) || 0 })}
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Ex: 490 = 4,90 €
            </p>
          </div>

          <div>
            <Label>Style / Catégorie</Label>
            <Select
              value={formData.style}
              onChange={(e) => setFormData({ ...formData, style: e.target.value as TemplateStyle })}
            >
              <option value="moderne">Moderne</option>
              <option value="classique">Classique / Exécutif</option>
              <option value="creatif">Créatif</option>
              <option value="executif">Minimaliste</option>
            </Select>
          </div>
        </div>

        {/* Color accent */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Couleur d'accentuation</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={formData.accentColor}
                onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                className="h-8 w-10 p-0 rounded border cursor-pointer"
              />
              <Input
                value={formData.accentColor}
                onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                className="font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <Label>Typographie principale</Label>
            <Select
              value={formData.fontFamily}
              onChange={(e) => setFormData({ ...formData, fontFamily: e.target.value as any })}
            >
              <option value="sans">Sans-serif (Moderne)</option>
              <option value="serif">Serif (Classique & Élégant)</option>
              <option value="mono">Monospace (Technique)</option>
            </Select>
          </div>
        </div>

        {/* Checkbox options */}
        <div className="pt-2 flex flex-wrap gap-4 border-t border-slate-100">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="rounded text-slate-900 focus:ring-slate-900"
            />
            <span className="text-slate-700 font-medium">Modèle actif (visible public)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFree}
              onChange={(e) => setFormData({ ...formData, isFree: e.target.checked, priceInCents: e.target.checked ? 0 : 490 })}
              className="rounded text-slate-900 focus:ring-slate-900"
            />
            <span className="text-slate-700 font-medium">Modèle gratuit</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isPopular}
              onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
              className="rounded text-slate-900 focus:ring-slate-900"
            />
            <span className="text-slate-700 font-medium">Badge "Populaire"</span>
          </label>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </Button>
          <Button type="submit" size="sm" isLoading={isLoading}>
            {templateToEdit ? "Mettre à jour" : "Créer le modèle"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
