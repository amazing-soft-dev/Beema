// Adds fillable AcroForm checkboxes to a Chromium-printed checklist PDF (#52).
// Chromium writes tagged, accessible text but no form fields; pdf-lib adds a checkbox over
// each printed box. Positions come from the print template's fixed Letter-size pages, so
// CSS pixels map directly to PDF points (x 0.75; the y axis is flipped).
import { readFileSync, writeFileSync } from 'node:fs';
import { PDFDocument, PDFName, PDFString } from 'pdf-lib';

const PX_TO_PT = 0.75;

/**
 * @param {string} file PDF to update in place
 * @param {{ pageIndex: number, x: number, y: number, w: number, h: number, label: string }[]} boxes CSS px within each page
 */
export async function addCheckboxes(file, boxes) {
  const pdf = await PDFDocument.load(readFileSync(file));
  const pages = pdf.getPages();
  const form = pdf.getForm();
  boxes.forEach((b, i) => {
    const page = pages[b.pageIndex];
    if (!page) throw new Error(`${file}: no page ${b.pageIndex + 1} for box "${b.label}"`);
    const field = form.createCheckBox(`item-${i + 1}`);
    field.addToPage(page, {
      x: b.x * PX_TO_PT,
      y: page.getHeight() - (b.y + b.h) * PX_TO_PT,
      width: b.w * PX_TO_PT,
      height: b.h * PX_TO_PT,
      borderWidth: 0, // the printed square stays the visible box
    });
    // Tooltip / accessible name read by screen readers for the form field.
    field.acroField.dict.set(PDFName.of('TU'), PDFString.of(b.label));
  });
  writeFileSync(file, await pdf.save());
  return boxes.length;
}
