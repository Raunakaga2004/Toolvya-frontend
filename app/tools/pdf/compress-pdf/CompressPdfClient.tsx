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
    body: "Compress PDF shrinks a document's file size by removing redundant data inside the file. It does not re-encode or blur your pages, so text stays sharp and images are unchanged.",
  },
  {
    heading: 'When to use it',
    body: "Useful when a file is too large to email, exceeds a form's upload limit, or just takes too long to send over a slow connection.",
  },
  {
    heading: 'Limitations',
    body: "Compression works best on documents with images or scanned pages; a PDF that's already mostly text may shrink only slightly. The file must be a valid, unlocked PDF up to 100 MB.",
  },
];

const HOW_TO = ['Add the PDF you want to shrink.', 'Select Compress PDF to start the job.', 'Wait for the job to finish, then download the smaller file.'];

const FAQ = [
  {
    q: 'Will compressing reduce the quality of my PDF?',
    a: 'No. Compression removes redundant data inside the file rather than re-encoding your pages, so text stays sharp and images are unchanged.',
  },
  {
    q: 'How much smaller will my file get?',
    a: 'It depends on the file. Documents with scanned pages or images usually shrink the most; text-only PDFs are often already efficient and may only shrink slightly.',
  },
  {
    q: 'Is there a file size limit?',
    a: "Yes, 100 MB per file. Larger files aren't supported at the moment.",
  },
  {
    q: 'What happens to my file afterwards?',
    a: 'Your uploaded file and the compressed result are both removed after the job completes.',
  },
];

export default function CompressPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const { state, job, error, run, reset } = usePdfJob();

  const canCompress = !!file && state !== 'processing';

  const startCompress = () => {
    if (!file) return;
    run(() => pdfApi.compress(file));
  };

  const startOver = () => {
    setFile(null);
    reset();
  };

  const onSelectFile = (f: File) => {
    setFile(f);
    reset();
  };

  return (
    <>
      <ToolHero
        icon="compress"
        title="Compress PDF"
        description="Reduce a PDF's file size so it fits an upload or email limit. Compression is lossless — text and images come through unchanged."
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

          <div className="mt-6 flex flex-wrap items-center gap-3.5 border-t border-border pt-5">
            <ToolActionButton icon="compress" label="Compress PDF" disabled={!canCompress} onClick={startCompress} />
          </div>
        </WorkspaceCard>
      </section>

      <section aria-labelledby="res-h" className="mx-auto max-w-[960px] px-4 sm:px-6 pt-6">
        <ResultCard
          state={state}
          idleText="Your compressed PDF will appear here once you start the job."
          processingText="Compressing your PDF — this usually takes a few seconds."
          resultFilename={job?.result_filename || 'compressed-document.pdf'}
          resultSummary=""
          downloadUrl={job ? pdfApi.downloadUrl(job.id) : null}
          failTitle="The compression failed"
          errorMessage={error ?? ''}
          onRetry={startCompress}
          onStartOver={startOver}
        />
      </section>

      <ToolInfoSections about={ABOUT} howTo={HOW_TO} related={relatedTools('compress-pdf')} faq={FAQ} />
    </>
  );
}
