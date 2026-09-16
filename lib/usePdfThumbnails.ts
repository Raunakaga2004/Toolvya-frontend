'use client';

import { useEffect, useState } from 'react';
import { loadPdfDocument, renderPage } from '@/lib/pdfPages';
import type { PDFDocumentProxy } from 'pdfjs-dist';

/**
 * Loads `file` and renders every page to a small thumbnail, progressively —
 * shared by the reorder and remove-pages tools, which both show one card
 * per page. Returns the loaded document too, so a caller can render a page
 * again at a larger size (e.g. for a preview).
 */
export function usePdfThumbnails(file: File, thumbnailWidth = 220) {
  const [thumbnails, setThumbnails] = useState<Record<number, string>>({});
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadPdfDocument(file)
      .then(async (doc) => {
        if (cancelled) return;
        setPdf(doc);
        setPageCount(doc.numPages);
        for (let i = 1; i <= doc.numPages; i++) {
          const dataUrl = await renderPage(doc, i, thumbnailWidth);
          if (cancelled) return;
          setThumbnails((prev) => ({ ...prev, [i]: dataUrl }));
        }
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't read this PDF. It may be encrypted or corrupted.");
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-run when the file itself changes
  }, [file]);

  return { thumbnails, pageCount, error, pdf };
}
