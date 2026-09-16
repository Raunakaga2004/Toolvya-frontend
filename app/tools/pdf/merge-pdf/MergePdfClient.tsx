'use client';

import { useRef, useState } from 'react';
import Icon from '@/components/Icon';
import ToolHero from '@/components/ToolHero';
import WorkspaceCard from '@/components/WorkspaceCard';
import ResultCard from '@/components/ResultCard';
import ToolActionButton from '@/components/ToolActionButton';
import ToolInfoSections from '@/components/ToolInfoSections';
import { pdfApi, formatFileSize } from '@/lib/pdfService';
import { usePdfJob } from '@/lib/usePdfJob';
import { relatedTools } from '@/lib/tools';

const ABOUT = [
  {
    heading: 'What it does',
    body: "Combines two or more PDFs into one document, in the order you set, keeping each file's text and images intact.",
  },
  {
    heading: 'Limitations',
    body: 'Each file must be under 100 MB and not password-protected.',
  },
];

const HOW_TO = [
  'Add two or more PDF files using the workspace above.',
  "Reorder the files using the arrow buttons — the final document follows this order top to bottom.",
  'Select Merge to start the job.',
  'Wait for the job to finish, then download the combined PDF.',
];

const FAQ = [
  {
    q: 'Is there a limit to how many files I can merge?',
    a: 'No fixed limit, though each individual file needs to stay under 100 MB. Merging many large files will simply take a little longer.',
  },
  {
    q: 'Can I change the order after adding files?',
    a: 'Yes. Use the up and down arrows next to each file to set the order the pages should appear in the final document.',
  },
  {
    q: 'What happens to my files afterwards?',
    a: 'Your uploaded files and the merged result are both removed after the job completes. Nothing is kept or reused.',
  },
  {
    q: 'Will the merged PDF lose quality?',
    a: 'No. Merging combines the original pages as-is — text, images and formatting are preserved exactly as in the source files.',
  },
];

export default function MergePdfClient() {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { state, job, error, run, reset } = usePdfJob();

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    // Snapshot into a plain array now — `list` is the input's live FileList,
    // which the caller clears (input.value = '') right after this returns,
    // and clearing it empties this same reference too.
    const picked = Array.from(list);
    setFiles((prev) => [...prev, ...picked]);
    if (state !== 'idle') reset();
  };

  const move = (index: number, dir: -1 | 1) => {
    setFiles((prev) => {
      const j = index + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = prev.slice();
      [next[index], next[j]] = [next[j], next[index]];
      return next;
    });
  };

  const remove = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index));

  const canMerge = files.length >= 2 && state !== 'processing';
  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  const startMerge = () => {
    if (files.length < 2) return;
    run(() => pdfApi.merge(files));
  };

  const startOver = () => {
    setFiles([]);
    reset();
  };

  return (
    <>
      <ToolHero
        icon="merge"
        title="Merge PDF"
        description="Combine two or more PDF files into a single document, in whatever order you choose. Everything runs as one job — add your files, start the merge, download the result."
      />

      <section aria-labelledby="ws-h" className="mx-auto max-w-[960px] px-4 sm:px-6 pt-8">
        <WorkspaceCard heading="Workspace">
          <h3 className="mb-3 text-sm font-semibold">1 · Add PDF files</h3>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full rounded-tv-lg border border-dashed border-border-strong bg-surface-2 px-5 py-[26px] text-center hover:border-primary"
          >
            <Icon name="upload_file" className="text-[26px] text-primary" />
            <span className="mt-1.5 block font-semibold">Choose files or drop them here</span>
            <span className="mt-1 block text-[13px] text-muted">PDF only, up to 100 MB each</span>
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              multiple
              className="hidden"
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = '';
              }}
            />
          </button>

          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold">2 · Set the order</h3>
              <p className="mb-3 text-[13px] text-muted">Files are merged top to bottom. Use the arrows to reorder.</p>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {files.map((file, i) => (
                  <li key={`${file.name}-${i}`} className="flex items-center gap-3 rounded-tv-md border border-border px-3.5 py-3">
                    <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-tv-sm bg-primary-container text-[13px] font-semibold text-primary">
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-medium">{file.name}</span>
                      <span className="block text-[13px] text-muted">{formatFileSize(file.size)}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => move(i, -1)}
                      disabled={i === 0}
                      aria-label={`Move ${file.name} up`}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-tv-sm border border-border disabled:opacity-40 hover:bg-surface-2"
                    >
                      <Icon name="arrow_upward" className="text-[18px] text-muted" />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(i, 1)}
                      disabled={i === files.length - 1}
                      aria-label={`Move ${file.name} down`}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-tv-sm border border-border disabled:opacity-40 hover:bg-surface-2"
                    >
                      <Icon name="arrow_downward" className="text-[18px] text-muted" />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      aria-label={`Remove ${file.name}`}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-tv-sm border border-border hover:border-danger hover:bg-danger-container"
                    >
                      <Icon name="close" className="text-[18px] text-muted" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3.5 border-t border-border pt-5">
            <ToolActionButton
              icon="merge"
              label={`Merge ${files.length === 1 ? '1 file' : `${files.length} files`}`}
              disabled={!canMerge}
              onClick={startMerge}
            />
            {files.length === 1 && <p className="text-sm text-muted">Add at least two files to merge.</p>}
          </div>
        </WorkspaceCard>
      </section>

      <section aria-labelledby="res-h" className="mx-auto max-w-[960px] px-4 sm:px-6 pt-6">
        <ResultCard
          state={state}
          idleText="Your merged PDF will appear here once you start the job."
          processingText={`Merging ${files.length} files — combining pages`}
          resultFilename={job?.result_filename || 'merged-document.pdf'}
          resultSummary={formatFileSize(totalSize)}
          downloadUrl={job ? pdfApi.downloadUrl(job.id) : null}
          failTitle="The merge failed"
          errorMessage={error ?? ''}
          onRetry={startMerge}
          onStartOver={startOver}
        />
      </section>

      <ToolInfoSections about={ABOUT} howTo={HOW_TO} related={relatedTools('merge-pdf')} faq={FAQ} />
    </>
  );
}
