'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import FaqAccordion from '@/components/FaqAccordion';
import ToolCard from '@/components/ToolCard';
import { PDF_TOOLS } from '@/lib/tools';

const FAQ = [
  {
    q: 'Is Toolvya free to use?',
    a: 'Yes. All five PDF tools are free and there is no account to create. You won’t hit a daily limit or find a watermark on your file.',
  },
  {
    q: 'What happens to the files I upload?',
    a: 'A file is uploaded, processed as a job, and made available for you to download. Both the upload and the result are deleted shortly afterwards, and neither is used for anything else.',
  },
  {
    q: 'How large a PDF can I process?',
    a: 'Files up to 100 MB work comfortably. Very large documents take longer, which is why each request runs as a job you can watch rather than a request that appears to hang.',
  },
  {
    q: 'Why does splitting give me a ZIP file?',
    a: 'Splitting produces more than one document — either every page separately or one file per range you asked for — so the pages are bundled into a single ZIP to keep the download to one click.',
  },
  {
    q: 'Does compressing reduce the quality of my PDF?',
    a: 'No. Compression removes redundant data inside the file rather than re-encoding your pages, so text stays sharp and images are unchanged.',
  },
  {
    q: 'Do the tools work on a phone?',
    a: 'Yes. The same five tools work in a mobile browser, including picking files from your device and downloading the finished result.',
  },
];

export default function HomeClient() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PDF_TOOLS;
    return PDF_TOOLS.filter((t) => `${t.name} ${t.desc} ${t.keys}`.toLowerCase().includes(q));
  }, [query]);

  const searchHelp = query.trim()
    ? results.length === 1
      ? '1 tool matches your search.'
      : `${results.length} tools match your search.`
    : 'Five tools available today: merge, split, compress, reorder and remove.';

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-h" className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 pb-[72px] pt-20">
          <div className="max-w-[720px]">
            <p className="mb-[18px] text-[13px] font-semibold uppercase tracking-[.09em] text-primary">
              {PDF_TOOLS.length} tools · free · no sign-up
            </p>
            <h1 id="hero-h" className="mb-[18px] text-[clamp(34px,5.2vw,56px)] font-bold">
              Find the right PDF tool for the job.
            </h1>
            <p className="mb-[30px] max-w-[600px] text-[clamp(17px,2vw,20px)] text-muted">
              Toolvya is a growing directory of fast, browser-based utilities — starting with PDF tools, with more
              categories on the way. Add your file, let the job finish, download the result. Nothing to install and
              nothing to sign up for.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push(query.trim() ? `/tools?q=${encodeURIComponent(query.trim())}` : '/tools');
              }}
              role="search"
              className="mb-[22px] max-w-[560px]"
            >
              <label htmlFor="tool-search" className="mb-2 block text-sm font-semibold">
                What do you need to do?
              </label>
              <div className="flex flex-wrap gap-2.5">
                <div className="relative flex-1 basis-[300px]">
                  <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[22px] text-muted" />
                  <input
                    id="tool-search"
                    type="search"
                    autoComplete="off"
                    placeholder="e.g. merge, split, compress, reorder"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="h-[54px] w-full rounded-tv-lg border border-border-strong bg-surface pl-[46px] pr-4 text-[17px] focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="h-[54px] rounded-tv-lg bg-primary px-4 sm:px-6 text-base font-semibold text-on-primary hover:bg-primary-hover"
                >
                  Find a tool
                </button>
              </div>
              <p id="search-help" className="mt-2.5 text-sm text-muted">
                {searchHelp}
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section aria-label="What to expect" className="border-b border-border">
        <div className="mx-auto grid max-w-[1160px] grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-x-8 gap-y-2.5 px-4 sm:px-6 py-[18px]">
          <p className="flex items-center gap-2.5 text-sm text-muted">
            <Icon name="lock" className="text-[19px] text-primary" />
            Files deleted after processing
          </p>
          <p className="flex items-center gap-2.5 text-sm text-muted">
            <Icon name="hourglass_top" className="text-[19px] text-primary" />
            Live job status while you wait
          </p>
          <p className="flex items-center gap-2.5 text-sm text-muted">
            <Icon name="block" className="text-[19px] text-primary" />
            No watermarks on your output
          </p>
          <p className="flex items-center gap-2.5 text-sm text-muted">
            <Icon name="devices" className="text-[19px] text-primary" />
            Same tools on phone and desktop
          </p>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" aria-labelledby="tools-h" className="mx-auto max-w-[1160px] px-4 sm:px-6 py-[72px]">
        <div className="mb-7 max-w-[640px]">
          <h2 id="tools-h" className="mb-2.5 text-[clamp(24px,3vw,32px)] font-bold">
            Available now
          </h2>
          <p className="text-muted">
            Each tool has its own page, so you can bookmark the one you use most and go straight there next time. PDF
            tools are live first; more categories are coming.
          </p>
        </div>

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
            <h3 className="mb-2 mt-3 text-xl font-semibold">Nothing here matches &ldquo;{query}&rdquo; yet</h3>
            <p className="mx-auto mb-5 max-w-[44ch] text-muted">
              Toolvya currently covers merging, splitting, compressing and reordering PDFs. More categories and tools
              are on the way.
            </p>
            <button
              type="button"
              onClick={() => setQuery('')}
              className="min-h-11 rounded-tv-md border border-border-strong bg-surface px-5 font-semibold hover:bg-surface-2"
            >
              Show all tools
            </button>
          </div>
        )}
      </section>

      {/* How it works */}
      <section id="how" aria-labelledby="how-h" className="border-y border-border bg-surface-2">
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 py-[72px]">
          <div className="mb-9 max-w-[640px]">
            <h2 id="how-h" className="mb-2.5 text-[clamp(24px,3vw,32px)] font-bold">
              How Toolvya works
            </h2>
            <p className="text-muted">The same three steps whichever tool you pick.</p>
          </div>
          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 p-0">
            <li className="border-t-2 border-primary pt-5">
              <p className="mb-2.5 font-display text-sm font-semibold text-primary">Step 1</p>
              <h3 className="mb-2 text-[19px] font-semibold">Pick a tool and add your file</h3>
              <p className="text-muted">
                Choose one of the five tools, then drop in a PDF — or several, if you&rsquo;re merging. Set the order or
                page ranges you want.
              </p>
            </li>
            <li className="border-t-2 border-border-strong pt-5">
              <p className="mb-2.5 font-display text-sm font-semibold text-primary">Step 2</p>
              <h3 className="mb-2 text-[19px] font-semibold">Watch the job run</h3>
              <p className="text-muted">
                Your request becomes a job with its own status. The page keeps checking until it finishes, so a big
                file won&rsquo;t leave you guessing.
              </p>
            </li>
            <li className="border-t-2 border-border-strong pt-5">
              <p className="mb-2.5 font-display text-sm font-semibold text-primary">Step 3</p>
              <h3 className="mb-2 text-[19px] font-semibold">Download the result</h3>
              <p className="text-muted">
                Take the finished PDF — or a ZIP, when you&rsquo;ve split a document into several files. Uploads and
                results are removed afterwards.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* About */}
      <section aria-labelledby="about-h">
        <div className="mx-auto max-w-[720px] px-4 sm:px-6 py-[72px]">
          <h2 id="about-h" className="mb-4 text-[clamp(24px,3vw,32px)] font-bold">
            About Toolvya
          </h2>
          <p className="mb-4 text-muted">
            Toolvya is a small set of online PDF tools for everyday document work — merging files before sending
            them, pulling pages out of a scan, shrinking a file to fit an upload limit, fixing pages that landed in
            the wrong order.
          </p>
          <p className="text-muted">No account, no daily limit, no watermark. Each tool lives on one page and does one job.</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-h" className="border-t border-border bg-surface-2">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 py-[72px]">
          <h2 id="faq-h" className="mb-[26px] text-[clamp(24px,3vw,32px)] font-bold">
            Frequently asked questions
          </h2>
          <FaqAccordion items={FAQ} questionSize="text-[17px]" />
        </div>
      </section>
    </>
  );
}
