import html2canvas from "html2canvas";

export async function exportToPng() {
  const posterElement = document.getElementById("poster-box");
  const dragIcons = document.querySelectorAll(".drag-icon");

  if (!posterElement) {
    console.error("Poster ref is null");
    return;
  }

  try {
    // Hide drag icons
    dragIcons.forEach((icon) => icon.classList.add("hidden-export-png"));

    const canvas = await html2canvas(posterElement, {
      scale: 1,
      useCORS: true,
      allowTaint: false,
      backgroundColor: null,
    });

    // Restore drag icons after fetching poster element
    dragIcons.forEach((icon) => icon.classList.remove("hidden-export-png"));

    // Create a new poster with the correct 1080x1350 size
    const finalPoster = document.createElement("canvas");
    finalPoster.width = 1080;
    finalPoster.height = 1350;
    const ctx = finalPoster.getContext("2d");
    if (!ctx) {
      console.error("Final Poster context is null");
      return;
    }

    // Scale proportionally to fit the new dimensions
    ctx.drawImage(canvas, 0, 0, 1080, 1350);

    const link = document.createElement("a");
    link.download = "poster.png";
    link.href = finalPoster.toDataURL("image/png");
    link.click();
  } catch (error) {
    console.error("Error exporting PNG:", error);
  }
}
