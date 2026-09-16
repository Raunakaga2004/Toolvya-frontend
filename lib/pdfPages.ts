// Renders PDF pages to images entirely in the browser, for the reorder tool's
// page cards and preview — this never touches the server, it's just a look
// at the file the user already has.

import * as pdfjsLib from 'pdfjs-dist';
import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

export async function loadPdfDocument(file: File): Promise<PDFDocumentProxy> {
  const buffer = await file.arrayBuffer();
  return pdfjsLib.getDocument({ data: buffer }).promise;
}

export async function renderPage(pdf: PDFDocumentProxy, pageNumber: number, targetWidth: number): Promise<string> {
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale: targetWidth / page.getViewport({ scale: 1 }).width });
  const canvas = document.createElement('canvas');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas not supported');
  await page.render({ canvasContext: context, viewport, canvas }).promise;
  return canvas.toDataURL('image/png');
}
