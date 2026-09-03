import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportCvToPdf(
  elementId: string,
  fileName: string = "Mon_CV.pdf"
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element #${elementId} not found`);
  }

  // Create temporary container cloned with 100% scale for highest DPI rendering
  const canvas = await html2canvas(element, {
    scale: 2.5, // 2.5x high density resolution for print-sharp text
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
    windowWidth: 794, // exact A4 pixel width at 96 DPI
  });

  const imgData = canvas.toDataURL("image/png");

  // A4 dimensions in mm: 210 x 297
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(fileName);
}
