'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import ToolHero from '@/components/ToolHero';
import WorkspaceCard from '@/components/WorkspaceCard';
import ResultCard from '@/components/ResultCard';
import ToolActionButton from '@/components/ToolActionButton';
import ToolInfoSections from '@/components/ToolInfoSections';
import SingleFileSlot from '@/components/SingleFileSlot';
import PageRemoveGrid from '@/components/PageRemoveGrid';
import { pdfApi, pagesToRangeString } from '@/lib/pdfService';
import { usePdfJob } from '@/lib/usePdfJob';
import { relatedTools } from '@/lib/tools';

const ABOUT = [
  {
    heading: 'What it does',
    body: 'Remove pages lets you pick out the pages you don’t need — blank scans, a cover sheet, a duplicate — and saves the rest as a new, shorter PDF.',
  },
  {
    heading: 'When to use it',
    body: 'Useful for trimming a scanned document down to the pages that matter, or dropping a page that was included by mistake.',
  },
  {
    heading: 'Limitations',
    body: 'The source file must be a valid, unlocked PDF up to 100 MB, and at least one page has to remain.',
  },
];

const HOW_TO = [
  'Add the PDF you want to trim.',
  'Hover a card and select the cross to mark that page for removal — hover again and select the eye icon to preview it first.',
  'Select Remove pages to build the shorter file.',
  'Download the result once the job finishes.',
];

const FAQ = [
  {
    q: 'Can I undo a page I marked for removal?',
    a: 'Yes. Select the cross again to keep it, or select Reset to bring back every page you’ve marked.',
  },
  {
    q: 'Does removing pages change the ones that stay?',
    a: 'No. The remaining pages keep their original content and order — only the removed pages are dropped.',
  },
  {
    q: 'Can I remove every page?',
    a: 'No, at least one page has to remain in the result.',
  },
  {
    q: 'What happens to my file afterwards?',
    a: 'Your uploaded file and the shortened result are both removed after the job completes.',
  },
];

export default function RemovePagesClient() {
  const [file, setFile] = useState<File | null>(null);
  const [removed, setRemoved] = useState<Set<number>>(new Set());
  const { state, job, error, run, reset } = usePdfJob();

  const canRemove = !!file && state !== 'processing' && removed.size > 0;
  const canReset = removed.size > 0;

  const startRemove = () => {
    if (!file || removed.size === 0) return;
    run(() => pdfApi.removePages(file, pagesToRangeString(Array.from(removed))));
  };

  const startOver = () => {
    setFile(null);
    setRemoved(new Set());
    reset();
  };

  const onSelectFile = (f: File) => {
    setFile(f);
    setRemoved(new Set());
    reset();
  };

  return (
    <>
      <ToolHero
        icon="delete_sweep"
        title="Remove pages"
        description="Pick out the pages you don’t need and save the rest as a new PDF — useful for trimming blank pages, duplicates, or a cover sheet."
      />

      <section aria-labelledby="ws-h" className="mx-auto max-w-[960px] px-4 sm:px-6 pt-8">
        <WorkspaceCard heading="Workspace">
          <h3 className="mb-3 text-sm font-semibold">1 · Add a PDF file</h3>
          <SingleFileSlot
            file={file}
            onSelect={onSelectFile}
            onRemove={() => {
              setFile(null);
              setRemoved(new Set());
              reset();
            }}
          />

          {file && (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold">2 · Select pages to remove</h3>
              <p className="mb-3 text-[13px] text-muted">
                Hover a card and select the cross to mark it for removal. Select the eye icon to preview a page first.
              </p>
              <PageRemoveGrid
                key={`${file.name}-${file.size}-${file.lastModified}`}
                file={file}
                removed={removed}
                onRemovedChange={setRemoved}
              />
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3.5 border-t border-border pt-5">
            <ToolActionButton icon="delete_sweep" label="Remove pages" disabled={!canRemove} onClick={startRemove} />
            {file && (
              <button
                type="button"
                onClick={() => setRemoved(new Set())}
                disabled={!canReset}
                className="flex h-12 items-center gap-2 rounded-tv-md border border-border-strong bg-surface px-[18px] text-[15px] font-semibold disabled:cursor-not-allowed disabled:opacity-40 hover:bg-surface-2"
              >
                <Icon name="restart_alt" className="text-[18px]" />
                Reset
              </button>
            )}
          </div>
        </WorkspaceCard>
      </section>

      <section aria-labelledby="res-h" className="mx-auto max-w-[960px] px-4 sm:px-6 pt-6">
        <ResultCard
          state={state}
          idleText="Your shortened PDF will appear here once you remove some pages."
          processingText="Removing the selected pages."
          resultFilename={job?.result_filename || 'trimmed-document.pdf'}
          resultSummary={job?.page_count ? `${job.page_count} pages remaining` : ''}
          downloadUrl={job ? pdfApi.downloadUrl(job.id) : null}
          failTitle="Removing pages failed"
          errorMessage={error ?? ''}
          onRetry={startRemove}
          onStartOver={startOver}
        />
      </section>

      <ToolInfoSections about={ABOUT} howTo={HOW_TO} related={relatedTools('remove-pages')} faq={FAQ} />
    </>
  );
}
