import React, { useState } from "react";
import { useFlow } from "../../../lib/store";
import { useTemplates } from "../../../hooks/useTemplates";
import { ModernTemplate } from "./templates/ModernTemplate";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { MinimalistTemplate } from "./templates/MinimalistTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { ZoomIn, ZoomOut, Maximize2, Printer } from "lucide-react";
import { Button } from "../../ui/button";

export const CVPreview: React.FC<{
  showTemplateSelector?: boolean;
  scaleOverride?: number;
}> = ({ showTemplateSelector = true, scaleOverride }) => {
  const { cvData, selectedTemplateId, setSelectedTemplateId } = useFlow();
  const { data: templates } = useTemplates();
  const [zoom, setZoom] = useState<number>(0.85);

  const currentTemplate = templates?.find((t) => t.id === selectedTemplateId);
  const activeScale = scaleOverride !== undefined ? scaleOverride : zoom;

  const renderTemplateContent = () => {
    switch (selectedTemplateId) {
      case "template-classic":
        return <ClassicTemplate cvData={cvData} accentColor={currentTemplate?.accentColor} />;
      case "template-minimalist":
        return <MinimalistTemplate cvData={cvData} accentColor={currentTemplate?.accentColor} />;
      case "template-creative":
        return <CreativeTemplate cvData={cvData} accentColor={currentTemplate?.accentColor} />;
      case "template-modern":
      default:
        return <ModernTemplate cvData={cvData} accentColor={currentTemplate?.accentColor} />;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Top Preview Controls */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Aperçu en direct (A4)</span>
          {currentTemplate && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
              {currentTemplate.name}
            </span>
          )}
        </div>

        {/* Zoom & Print */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100"
            title="Zoom arrière"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="text-xs font-mono text-slate-600 min-w-[3rem] text-center">
            {Math.round(activeScale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(1.2, z + 0.1))}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100"
            title="Zoom avant"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoom(0.85)}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100 text-xs font-mono"
            title="Ajuster"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="text-xs gap-1 ml-2 border-slate-300"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Imprimer</span>
          </Button>
        </div>
      </div>

      {/* Quick template pill bar if requested */}
      {showTemplateSelector && templates && (
        <div className="w-full flex items-center gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
          <span className="text-[11px] font-semibold text-slate-500 shrink-0">Style :</span>
          {templates
            .filter((t) => t.active)
            .map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTemplateId(t.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedTemplateId === t.id
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {t.name}
              </button>
            ))}
        </div>
      )}

      {/* A4 Sheet Container with Scaling */}
      <div className="w-full overflow-auto flex justify-center py-2 bg-slate-100/70 rounded-xl p-4 border border-slate-200">
        <div
          style={{
            transform: `scale(${activeScale})`,
            transformOrigin: "top center",
            width: "794px", // Standard A4 pixel width at 96 DPI
            minHeight: "1123px", // Standard A4 pixel height
            marginBottom: activeScale < 1 ? `-${1123 * (1 - activeScale)}px` : undefined,
          }}
          className="transition-transform duration-150"
        >
          <div
            id="cv-preview-sheet"
            className="cv-preview-sheet bg-white shadow-xl rounded-sm border border-slate-200/80 overflow-hidden"
          >
            {renderTemplateContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
