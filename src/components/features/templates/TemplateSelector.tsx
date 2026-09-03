import React from "react";
import { useTemplates } from "../../../hooks/useTemplates";
import { useFlow } from "../../../lib/store";
import { formatPrice } from "../../../lib/utils";
import { Check, Sparkles } from "lucide-react";
import { Badge } from "../../ui/badge";

export const TemplateSelector: React.FC = () => {
  const { data: templates, isLoading } = useTemplates();
  const { selectedTemplateId, setSelectedTemplateId } = useFlow();

  if (isLoading) {
    return <div className="text-xs text-slate-400 p-4">Chargement des modèles...</div>;
  }

  const activeTemplates = (templates || []).filter((t) => t.active);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
          Modèle actif
        </h3>
        <span className="text-xs text-slate-500">
          Changez de style sans perdre vos données
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {activeTemplates.map((template) => {
          const isSelected = selectedTemplateId === template.id;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => setSelectedTemplateId(template.id)}
              className={`group relative text-left rounded-xl border p-2.5 transition-all cursor-pointer ${
                isSelected
                  ? "border-slate-900 bg-slate-50 ring-2 ring-slate-900/10 shadow-xs"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
              }`}
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 mb-2 relative">
                <img
                  src={template.thumbnailUrl}
                  alt={template.name}
                  className="h-full w-full object-cover object-top"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-slate-900/20 flex items-center justify-center">
                    <div className="h-7 w-7 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md">
                      <Check className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 truncate block">
                  {template.name}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 shrink-0 ml-1">
                  {template.isFree ? "Gratuit" : formatPrice(template.priceInCents)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
