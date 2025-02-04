import { useCallback } from "react";

import html2canvas from "html2canvas";

export default function useExportPng() {
  const exportToPng = useCallback(async () => {
    const posterElement = posterRef.current;
    if (!posterElement) {
      console.error("Poster ref is null");
      return;
    }

    try {
      const canvas = await html2canvas(posterElement, {
        scale: 1,
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
      });

      // Create a new canvas with the correct 1080x1350 size
      const finalCanvas = document.createElement("canvas");
      finalCanvas.width = 1080;
      finalCanvas.height = 1350;
      const ctx = finalCanvas.getContext("2d");
      if (!ctx) {
        console.error("Canvas context is null");
        return;
      }

      // Scale proportionally to fit the new dimensions
      ctx.drawImage(canvas, 0, 0, 1080, 1350);

      const link = document.createElement("a");
      link.download = "poster.png";
      link.href = finalCanvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error exporting PNG:", error);
    }
  }, []);

  return {
    exportToPng,
  };
}
