import { toPng, toJpeg } from "html-to-image";
import { jsPDF } from "jspdf";

// შენახულ სურათში არ ხვდება: no-print კლასი და Leaflet-ის ზუმის ღილაკები
const filter = (node) =>
  !node.classList?.contains("no-print") &&
  !node.classList?.contains("leaflet-control-zoom");

const download = (dataUrl, name) => {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = name;
  a.click();
};

export async function exportSheet(node, format, fileName) {
  const opts = { pixelRatio: 2, backgroundColor: "#ffffff", filter };

  if (format === "png") {
    download(await toPng(node, opts), `${fileName}.png`);
    return;
  }

  const jpg = await toJpeg(node, { ...opts, quality: 0.92 });

  if (format === "jpg") {
    download(jpg, `${fileName}.jpg`);
    return;
  }

  // PDF: A4, ორიენტაცია ფურცლის პროპორციით, 8 მმ მინდვრით
  const { width, height } = node.getBoundingClientRect();
  const pdf = new jsPDF({
    orientation: width >= height ? "landscape" : "portrait",
    unit: "mm",
    format: "a4",
  });
  const margin = 8;
  const pw = pdf.internal.pageSize.getWidth() - margin * 2;
  const ph = pdf.internal.pageSize.getHeight() - margin * 2;
  const scale = Math.min(pw / width, ph / height);
  const w = width * scale;
  const h = height * scale;
  pdf.addImage(jpg, "JPEG", margin + (pw - w) / 2, margin + (ph - h) / 2, w, h);
  pdf.save(`${fileName}.pdf`);
}