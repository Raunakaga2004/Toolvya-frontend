'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import ToolHero from '@/components/ToolHero';
import WorkspaceCard from '@/components/WorkspaceCard';
import ResultCard from '@/components/ResultCard';
import ToolActionButton from '@/components/ToolActionButton';
import ToolInfoSections from '@/components/ToolInfoSections';
import SingleFileSlot from '@/components/SingleFileSlot';
import PageReorderGrid from '@/components/PageReorderGrid';
import { pdfApi } from '@/lib/pdfService';
import { usePdfJob } from '@/lib/usePdfJob';
import { relatedTools } from '@/lib/tools';

const ABOUT = [
  {
    heading: 'What it does',
    body: "Reorder pages lets you rearrange the pages inside a single PDF and save the result as a new file, without affecting the content of any page.",
  },
  {
    heading: 'When to use it',
    body: 'Useful for scanned documents where pages were fed in out of sequence, or for putting an appendix, cover page, or signature page where it belongs.',
  },
  {
    heading: 'Limitations',
    body: 'The source file must be a valid, unlocked PDF up to 100 MB. Pages can be moved but not rotated or deleted with this tool.',
  },
];

const HOW_TO = [
  'Add the PDF you want to rearrange.',
  'Drag the page cards into the order you want, or use the arrows on a card to nudge it. Hover a card and select the eye icon to preview it full-size.',
  'Select Save new order to build the corrected file.',
  "Download the reordered PDF once the job finishes.",
];

const FAQ = [
  {
    q: 'Can I delete a page while reordering?',
    a: 'Not with this tool. Reorder pages only changes page positions — use Remove pages if you need to drop pages from the document.',
  },
  {
    q: 'Will reordering affect the content of my pages?',
    a: "No. Each page's content stays exactly as it was; only the order in the document changes.",
  },
  {
    q: 'Is there a limit to how many pages I can reorder?',
    a: 'No fixed page limit, though the file itself must stay under 100 MB.',
  },
  {
    q: 'What happens to my file afterwards?',
    a: 'Your uploaded file and the reordered result are both removed after the job completes.',
  },
];

export default function ReorderPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [order, setOrder] = useState<number[]>([]);
  const { state, job, error, run, reset } = usePdfJob();

  const canReorder = !!file && state !== 'processing' && order.length > 0;
  const canReset = order.some((page, i) => page !== i + 1);
  const resetOrder = () => setOrder((prev) => [...prev].sort((a, b) => a - b));

  const startReorder = () => {
    if (!file || order.length === 0) return;
    run(() => pdfApi.reorder(file, order.join(', ')));
  };

  const startOver = () => {
    setFile(null);
    setOrder([]);
    reset();
  };

  const onSelectFile = (f: File) => {
    setFile(f);
    reset();
  };

  return (
    <>
      <ToolHero
        icon="swap_vert"
        title="Reorder pages"
        description="Rearrange the pages within a PDF and save the corrected file — useful for scans or documents that came out in the wrong order."
      />

      <section aria-labelledby="ws-h" className="mx-auto max-w-[960px] px-4 sm:px-6 pt-8">
        <WorkspaceCard heading="Workspace">
          <h3 className="mb-3 text-sm font-semibold">1 · Add a PDF file</h3>
          <SingleFileSlot
            file={file}
            onSelect={onSelectFile}
            onRemove={() => {
              setFile(null);
              setOrder([]);
              reset();
            }}
          />

          {file && (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold">2 · Drag pages into the order you want</h3>
              <p className="mb-3 text-[13px] text-muted">
                Drag a card to move it, or use its arrows. Hover a card and select the eye icon to preview that page.
              </p>
              <PageReorderGrid
                key={`${file.name}-${file.size}-${file.lastModified}`}
                file={file}
                order={order}
                onOrderChange={setOrder}
              />
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3.5 border-t border-border pt-5">
            <ToolActionButton icon="swap_vert" label="Save new order" disabled={!canReorder} onClick={startReorder} />
            {file && (
              <button
                type="button"
                onClick={resetOrder}
                disabled={!canReset}
                className="flex h-12 items-center gap-2 rounded-tv-md border border-border-strong bg-surface px-[18px] text-[15px] font-semibold disabled:cursor-not-allowed disabled:opacity-40 hover:bg-surface-2"
              >
                <Icon name="restart_alt" className="text-[18px]" />
                Reset order
              </button>
            )}
          </div>
        </WorkspaceCard>
      </section>

      <section aria-labelledby="res-h" className="mx-auto max-w-[960px] px-4 sm:px-6 pt-6">
        <ResultCard
          state={state}
          idleText="Your reordered PDF will appear here once you save the new order."
          processingText="Rebuilding your PDF in the new order."
          resultFilename={job?.result_filename || 'reordered-document.pdf'}
          resultSummary={job?.page_count ? `${job.page_count} pages` : ''}
          downloadUrl={job ? pdfApi.downloadUrl(job.id) : null}
          failTitle="Saving the new order failed"
          errorMessage={error ?? ''}
          onRetry={startReorder}
          onStartOver={startOver}
        />
      </section>

      <ToolInfoSections about={ABOUT} howTo={HOW_TO} related={relatedTools('reorder-pdf')} faq={FAQ} />
    </>
  );
}
