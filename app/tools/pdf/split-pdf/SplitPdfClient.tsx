'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import WorkspaceCard from '@/components/WorkspaceCard';
import ResultCard from '@/components/ResultCard';
import ToolActionButton from '@/components/ToolActionButton';
import ToolInfoSections from '@/components/ToolInfoSections';
import SingleFileSlot from '@/components/SingleFileSlot';
import { pdfApi } from '@/lib/pdfService';
import { usePdfJob } from '@/lib/usePdfJob';
import { relatedTools } from '@/lib/tools';

const ABOUT = [
  {
    heading: 'What it does',
    body: 'Split PDF breaks one document into smaller PDFs — either every page on its own, or the specific ranges you set — and packages them into a single ZIP for download.',
  },
  {
    heading: 'When to use it',
    body: 'Useful for pulling a chapter or section out of a longer report, separating a multi-invoice scan into individual files, or extracting just the pages someone actually needs.',
  },
  {
    heading: 'Limitations',
    body: "The source file must be a valid, unlocked PDF up to 100 MB. Page ranges use the document's own page numbers, starting at 1.",
  },
];

const HOW_TO = [
  'Add the PDF you want to split.',
  'Choose "Every page separately" or "Custom page ranges".',
  'If using ranges, list them separated by commas, e.g. 1-3, 5, 8-10.',
  "Select Split PDF and download the ZIP once it's ready.",
];

const FAQ = [
  {
    q: 'How do I write a page range?',
    a: 'Separate ranges with commas, e.g. "1-3, 5, 8-10". Each range in the list becomes its own file inside the ZIP.',
  },
  {
    q: 'Why do I get a ZIP instead of a PDF?',
    a: "Splitting produces more than one file — either every page or every range — so they're bundled into a single ZIP to keep the download to one click.",
  },
  {
    q: 'Can I split just one page out of a document?',
    a: 'Yes. Enter that page’s number as its own range, e.g. "4", and it will come back as a single-page PDF in the ZIP.',
  },
  {
    q: 'What happens to my file afterwards?',
    a: 'Your uploaded file and the resulting ZIP are both removed after the job completes.',
  },
];

export default function SplitPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<'all' | 'custom'>('all');
  const [ranges, setRanges] = useState('');
  const { state, job, error, run, reset } = usePdfJob();

  const canSplit = !!file && state !== 'processing' && (mode === 'all' || ranges.trim().length > 0);

  const startSplit = () => {
    if (!file) return;
    if (mode === 'custom' && !ranges.trim()) return;
    run(() => pdfApi.split(file, mode === 'custom' ? ranges : ''));
  };

  const startOver = () => {
    setFile(null);
    setMode('all');
    setRanges('');
    reset();
  };

  const onSelectFile = (f: File) => {
    setFile(f);
    reset();
  };

  return (
    <>
      <ToolHero
        icon="content_cut"
        title="Split PDF"
        description="Break a PDF into individual pages, or pull out specific page ranges. The result comes back as a single ZIP file."
      />

      <section aria-labelledby="ws-h" className="mx-auto max-w-[960px] px-4 sm:px-6 pt-8">
        <WorkspaceCard heading="Workspace">
          <h3 className="mb-3 text-sm font-semibold">1 · Add a PDF file</h3>
          <SingleFileSlot
            file={file}
            onSelect={onSelectFile}
            onRemove={() => {
              setFile(null);
              reset();
            }}
          />

          {file && (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold">2 · Choose how to split</h3>
              <div role="radiogroup" aria-label="Split mode" className="mb-4 flex flex-col gap-2.5">
                <label
                  className={`flex items-center gap-2.5 rounded-tv-md border px-3.5 py-3 ${
                    mode === 'all' ? 'border-primary' : 'border-border'
                  }`}
                >
                  <input
                    type="radio"
                    name="split-mode"
                    checked={mode === 'all'}
                    onChange={() => setMode('all')}
                    className="h-[18px] w-[18px] accent-primary"
                  />
                  <span>
                    <span className="block text-[15px] font-semibold">Every page separately</span>
                    <span className="block text-[13px] text-muted">One PDF per page, bundled into a ZIP</span>
                  </span>
                </label>
                <label
                  className={`flex items-center gap-2.5 rounded-tv-md border px-3.5 py-3 ${
                    mode === 'custom' ? 'border-primary' : 'border-border'
                  }`}
                >
                  <input
                    type="radio"
                    name="split-mode"
                    checked={mode === 'custom'}
                    onChange={() => setMode('custom')}
                    className="h-[18px] w-[18px] accent-primary"
                  />
                  <span>
                    <span className="block text-[15px] font-semibold">Custom page ranges</span>
                    <span className="block text-[13px] text-muted">Choose which pages go in which file</span>
                  </span>
                </label>
              </div>

              {mode === 'custom' && (
                <div>
                  <label htmlFor="ranges" className="mb-2 block text-sm font-semibold">
                    Page ranges
                  </label>
                  <input
                    id="ranges"
                    type="text"
                    value={ranges}
                    onChange={(e) => setRanges(e.target.value)}
                    placeholder="e.g. 1-3, 5, 8-10"
                    aria-describedby="ranges-help"
                    className="h-11 w-full max-w-[360px] rounded-tv-md border border-border-strong bg-surface px-3.5 text-[15px] focus:border-primary"
                  />
                  <p id="ranges-help" className="mt-2 text-[13px] text-muted">
                    Separate ranges with commas. Each range becomes its own file in the ZIP.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3.5 border-t border-border pt-5">
            <ToolActionButton icon="content_cut" label="Split PDF" disabled={!canSplit} onClick={startSplit} />
          </div>
        </WorkspaceCard>
      </section>

      <section aria-labelledby="res-h" className="mx-auto max-w-[960px] px-4 sm:px-6 pt-6">
        <ResultCard
          state={state}
          idleText="Your split files will appear here once you start the job."
          processingText="Splitting your PDF — this usually takes a few seconds."
          resultFilename={job?.result_filename || 'split-pages.zip'}
          resultSummary={job?.page_count ? `${job.page_count} pages` : ''}
          downloadUrl={job ? pdfApi.downloadUrl(job.id) : null}
          failTitle="The split failed"
          errorMessage={error ?? ''}
          onRetry={startSplit}
          onStartOver={startOver}
        />
      </section>

      <ToolInfoSections about={ABOUT} howTo={HOW_TO} related={relatedTools('split-pdf')} faq={FAQ} />
    </>
  );
}
