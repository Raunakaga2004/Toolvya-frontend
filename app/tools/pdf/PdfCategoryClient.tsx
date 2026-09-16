'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import ToolCard from '@/components/ToolCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { PDF_TOOLS } from '@/lib/tools';

export default function PdfCategoryClient() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PDF_TOOLS;
    return PDF_TOOLS.filter((t) => `${t.name} ${t.desc} ${t.keys}`.toLowerCase().includes(q));
  }, [query]);

  const resultLabel = query.trim() ? `${results.length} of ${PDF_TOOLS.length} PDF tools match "${query.trim()}"` : `${PDF_TOOLS.length} PDF tools`;

  return (
    <>
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6 pt-7">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'PDF' }]} />
      </div>

      <div className="mx-auto max-w-[1160px] border-b border-border px-4 sm:px-6 pb-7 pt-5">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-[70ch]">
            <div className="mb-3 flex flex-wrap items-center gap-2.5">
              <Icon name="picture_as_pdf" className="text-[26px] text-primary" />
              <h1 className="text-[clamp(28px,4vw,42px)] font-bold">PDF tools</h1>
              <span className="whitespace-nowrap rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-muted">
                {PDF_TOOLS.length} tools
              </span>
            </div>
            <p className="text-muted">
              Merge, split, compress, reorder and trim PDF documents directly in your browser. Each tool runs as a
              short job you can watch to completion, and every result is available to download as soon as
              it&rsquo;s ready.
            </p>
          </div>

          <div className="relative w-full shrink-0 sm:w-[320px]">
            <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xl text-muted" />
            <input
              type="search"
              autoComplete="off"
              placeholder="Search PDF tools"
              aria-label="Search PDF tools"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-12 w-full rounded-tv-lg border border-border-strong bg-surface pl-11 pr-4 text-base focus:border-primary"
            />
          </div>
        </div>
      </div>

      <section aria-labelledby="tools-h" className="mx-auto max-w-[1160px] px-4 sm:px-6 pb-[72px] pt-7">
        <h2 id="tools-h" className="sr-only">
          PDF tool list
        </h2>
        <p aria-live="polite" className="mb-4 text-sm text-muted">
          {resultLabel}
        </p>

        {results.length > 0 ? (
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(272px,1fr))] gap-4 p-0">
            {results.map((tool) => (
              <li key={tool.slug}>
                <ToolCard tool={tool} badge="PDF" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-tv-lg border border-dashed border-border-strong px-4 sm:px-6 py-[52px] text-center">
            <Icon name="search_off" className="text-[32px] text-muted" />
            <h3 className="mb-2 mt-3 text-xl font-semibold">No PDF tool matches &ldquo;{query}&rdquo;</h3>
            <p className="mx-auto mb-5 max-w-[44ch] text-muted">Try merge, split, compress, reorder or remove.</p>
            <button
              type="button"
              onClick={() => setQuery('')}
              className="min-h-11 rounded-tv-md border border-border-strong bg-surface px-5 font-semibold hover:bg-surface-2"
            >
              Show all PDF tools
            </button>
          </div>
        )}
      </section>

      <section aria-labelledby="seo-h" className="border-t border-border bg-surface-2">
        <div className="mx-auto max-w-[70ch] px-4 sm:px-6 py-14">
          <h2 id="seo-h" className="mb-4 text-2xl font-bold">
            Working with PDFs online
          </h2>
          <p className="mb-4 text-muted">
            A PDF keeps its layout wherever it&rsquo;s opened, which is exactly why the small adjustments — combining
            files, pulling out a page, shrinking a file — usually need a dedicated tool rather than a text editor.
          </p>
          <h3 className="mb-2 text-lg font-semibold">Which tool to use</h3>
          <p className="mb-4 text-muted">
            Sending several documents as one attachment: use <Link href="/tools/pdf/merge-pdf">Merge PDF</Link>. Pulling
            specific pages out of a longer file: use <Link href="/tools/pdf/split-pdf">Split PDF</Link>. A file too
            large to upload or email: use <Link href="/tools/pdf/compress-pdf">Compress PDF</Link>. Pages scanned or
            saved in the wrong order: use <Link href="/tools/pdf/reorder-pdf">Reorder pages</Link>. Dropping a blank
            or unwanted page: use <Link href="/tools/pdf/remove-pages">Remove pages</Link>.
          </p>
          <h3 className="mb-2 text-lg font-semibold">How a job runs</h3>
          <p className="text-muted">
            Each tool uploads your file, starts a processing job, and checks its status until it&rsquo;s finished. Split
            jobs return a ZIP when there&rsquo;s more than one output file; every other job returns a single PDF.
          </p>
        </div>
      </section>
    </>
  );
}
