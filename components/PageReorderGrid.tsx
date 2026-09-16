'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import PdfPagePreviewDialog from '@/components/PdfPagePreviewDialog';
import { usePdfThumbnails } from '@/lib/usePdfThumbnails';

/**
 * Renders every page of `file` as a draggable card in `order`, so the user
 * can set a new page order visually instead of typing page numbers. Also
 * lets them preview a page full-size via the eye icon on hover.
 */
export default function PageReorderGrid({
  file,
  order,
  onOrderChange,
}: {
  file: File;
  order: number[];
  onOrderChange: (order: number[]) => void;
}) {
  const { thumbnails, pageCount, error, pdf } = usePdfThumbnails(file);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [previewPage, setPreviewPage] = useState<number | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (pageCount > 0 && !initialized.current) {
      initialized.current = true;
      onOrderChange(Array.from({ length: pageCount }, (_, i) => i + 1));
    }
  }, [pageCount, onOrderChange]);

  const move = (from: number, to: number) => {
    if (from === to) return;
    const next = order.slice();
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onOrderChange(next);
  };

  if (error) return <p className="text-sm text-danger">{error}</p>;

  return (
    <>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3 p-0">
        {order.map((pageNumber, index) => (
          <li
            key={pageNumber}
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (dragIndex !== null) move(dragIndex, index);
              setDragIndex(null);
            }}
            onDragEnd={() => setDragIndex(null)}
            className={`group relative cursor-grab overflow-hidden rounded-tv-md border bg-surface-2 transition-shadow active:cursor-grabbing ${
              dragIndex === index ? 'border-primary opacity-60' : 'border-border'
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

            <button
              type="button"
              title="View page"
              aria-label={`View page ${pageNumber}`}
              onClick={() => setPreviewPage(pageNumber)}
              className="absolute right-1.5 top-1.5 grid h-8 w-8 place-items-center rounded-tv-sm bg-surface/90 opacity-0 shadow-tv-sm transition-opacity group-hover:opacity-100 hover:bg-surface"
            >
              <Icon name="visibility" className="text-[18px] text-text" />
            </button>

            <div className="flex items-center justify-between px-2.5 py-1.5 text-[13px] font-medium text-muted">
              <span>Page {pageNumber}</span>
              <span className="flex gap-0.5">
                <button
                  type="button"
                  onClick={() => move(index, index - 1)}
                  disabled={index === 0}
                  aria-label={`Move page ${pageNumber} earlier`}
                  className="grid h-6 w-6 place-items-center rounded-tv-sm disabled:opacity-30 hover:bg-surface-3"
                >
                  <Icon name="arrow_upward" className="text-[16px]" />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, index + 1)}
                  disabled={index === order.length - 1}
                  aria-label={`Move page ${pageNumber} later`}
                  className="grid h-6 w-6 place-items-center rounded-tv-sm disabled:opacity-30 hover:bg-surface-3"
                >
                  <Icon name="arrow_downward" className="text-[16px]" />
                </button>
              </span>
            </div>
          </li>
        ))}
      </ul>

      <PdfPagePreviewDialog pdf={pdf} page={previewPage} onClose={() => setPreviewPage(null)} />
    </>
  );
}
