'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import PdfPagePreviewDialog from '@/components/PdfPagePreviewDialog';
import { usePdfThumbnails } from '@/lib/usePdfThumbnails';

/**
 * Shows every page of `file` as a card, in its original order. Selecting the
 * cross on a card marks it for removal — it stays visible but greyed out,
 * with the icon swapping to "restore" so selecting it again brings the page
 * back (as does the "Reset" button, for all marked pages at once).
 */
export default function PageRemoveGrid({
  file,
  removed,
  onRemovedChange,
}: {
  file: File;
  removed: Set<number>;
  onRemovedChange: (removed: Set<number>) => void;
}) {
  const { thumbnails, pageCount, error, pdf } = usePdfThumbnails(file);
  const [previewPage, setPreviewPage] = useState<number | null>(null);

  const toggle = (page: number) => {
    const next = new Set(removed);
    if (next.has(page)) next.delete(page);
    else next.add(page);
    onRemovedChange(next);
  };

  if (error) return <p className="text-sm text-danger">{error}</p>;

  return (
    <>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3 p-0">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNumber) => {
          const isRemoved = removed.has(pageNumber);
          return (
            <li
              key={pageNumber}
              className={`group relative overflow-hidden rounded-tv-md border bg-surface-2 transition-opacity ${
                isRemoved ? 'border-danger opacity-40' : 'border-border'
              }`}
            >
              {thumbnails[pageNumber] ? (
                // eslint-disable-next-line @next/next/no-img-element -- runtime canvas data: URL, not an optimizable asset
                <img src={thumbnails[pageNumber]} alt={`Page ${pageNumber}`} className="block w-full border-b border-border" draggable={false} />
              ) : (
                <div className="flex aspect-[3/4] items-center justify-center">
                  <Icon name="progress_activity" className="tv-spin text-xl text-muted" />
                </div>
              )}

              <div className="absolute right-1.5 top-1.5 flex gap-1.5">
                <button
                  type="button"
                  title="View page"
                  aria-label={`View page ${pageNumber}`}
                  onClick={() => setPreviewPage(pageNumber)}
                  className="grid h-8 w-8 place-items-center rounded-tv-sm bg-surface/90 opacity-0 shadow-tv-sm transition-opacity group-hover:opacity-100 hover:bg-surface"
                >
                  <Icon name="visibility" className="text-[18px] text-text" />
                </button>
                <button
                  type="button"
                  title={isRemoved ? 'Keep this page' : 'Remove this page'}
                  aria-label={isRemoved ? `Keep page ${pageNumber}` : `Remove page ${pageNumber}`}
                  onClick={() => toggle(pageNumber)}
                  className={`grid h-8 w-8 place-items-center rounded-tv-sm shadow-tv-sm transition-opacity hover:bg-danger-container ${
                    isRemoved ? 'bg-danger-container opacity-100' : 'bg-surface/90 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <Icon name={isRemoved ? 'restart_alt' : 'close'} className="text-[18px] text-danger" />
                </button>
              </div>

              <div className="px-2.5 py-1.5 text-[13px] font-medium text-muted">
                {isRemoved ? <span className="text-danger">Removed</span> : <span>Page {pageNumber}</span>}
              </div>
            </li>
          );
        })}
      </ul>

      <PdfPagePreviewDialog pdf={pdf} page={previewPage} onClose={() => setPreviewPage(null)} />
    </>
  );
}
