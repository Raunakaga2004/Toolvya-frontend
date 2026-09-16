'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { renderPage } from '@/lib/pdfPages';
import type { PDFDocumentProxy } from 'pdfjs-dist';

/**
 * Full-size preview of one PDF page, opened by the eye icon on a page card.
 * `page` set to a number opens it; `null` closes it. Renders are cached per
 * page so re-opening the same one is instant.
 */
export default function PdfPagePreviewDialog({ pdf, page, onClose }: { pdf: PDFDocumentProxy | null; page: number | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cache = useRef<Record<number, string>>({});
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (page == null || !pdf) return;
    dialogRef.current?.showModal();
    setUrl(cache.current[page] ?? null);
    if (!cache.current[page]) {
      renderPage(pdf, page, 900).then((dataUrl) => {
        cache.current[page] = dataUrl;
        setUrl(dataUrl);
      });
    }
  }, [page, pdf]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="m-auto max-h-[85vh] max-w-[90vw] rounded-tv-lg border border-border bg-surface p-0 backdrop:bg-black/50"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="text-sm font-semibold">Page {page}</span>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close preview"
          className="grid h-8 w-8 place-items-center rounded-tv-sm hover:bg-surface-2"
        >
          <Icon name="close" className="text-[18px]" />
        </button>
      </div>
      <div className="grid max-h-[75vh] place-items-center overflow-hidden p-4">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element -- runtime canvas data: URL, not an optimizable asset
          <img src={url} alt={`Page ${page}`} className="max-h-[70vh] max-w-full w-auto object-contain" />
        ) : (
          <Icon name="progress_activity" className="tv-spin text-2xl text-muted" />
        )}
      </div>
    </dialog>
  );
}
