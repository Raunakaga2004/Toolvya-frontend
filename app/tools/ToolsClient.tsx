'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import ToolCard from '@/components/ToolCard';
import type { ToolMeta } from '@/lib/tools';

type Category = {
  title: string;
  description: string;
  icon: string;
  link: string;
  tools: ToolMeta[];
};

export default function ToolsClient({ categories, initialQuery }: { categories: Category[]; initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map((category) => ({
        ...category,
        tools: category.tools.filter((t) => `${t.name} ${t.desc} ${t.keys}`.toLowerCase().includes(q)),
      }))
      .filter((category) => category.tools.length > 0);
  }, [categories, query]);

  const totalTools = categories.reduce((n, c) => n + c.tools.length, 0);
  const matchCount = filtered.reduce((n, c) => n + c.tools.length, 0);

  return (
    <>
      <div className="mx-auto max-w-[1160px] border-b border-border px-4 sm:px-6 pb-7 pt-5">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-[70ch]">
            <h1 className="mb-3 text-[clamp(28px,4vw,42px)] font-bold">All tools</h1>
            <p className="text-muted">
              Toolvya is a growing directory of free, browser-based tools. PDF tools are live first, with more
              categories on the way.
            </p>
          </div>

          <div className="relative w-full shrink-0 sm:w-[320px]">
            <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xl text-muted" />
            <input
              type="search"
              autoComplete="off"
              placeholder="Search all tools"
              aria-label="Search all tools"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-12 w-full rounded-tv-lg border border-border-strong bg-surface pl-11 pr-4 text-base focus:border-primary"
            />
          </div>
        </div>
      </div>

      <section aria-labelledby="tools-h" className="mx-auto max-w-[1160px] px-4 sm:px-6 pb-[72px] pt-7">
        <h2 id="tools-h" className="sr-only">
          Tool list
        </h2>
        <p aria-live="polite" className="mb-4 text-sm text-muted">
          {query.trim() ? `${matchCount} of ${totalTools} tools match "${query.trim()}"` : `${totalTools} tools`}
        </p>

        {filtered.length > 0 ? (
          <div className="flex flex-col gap-6">
            {filtered.map((category) => (
              <section key={category.link} className="rounded-tv-xl border border-border bg-surface p-6">
                <div className="mb-4 flex items-start gap-3.5">
                  <Icon name={category.icon} className="text-[28px] text-primary" />
                  <div>
                    <h3 className="mb-1 text-xl font-semibold">
                      <Link href={category.link} className="text-text no-underline hover:text-primary">
                        {category.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted">{category.description}</p>
                  </div>
                </div>
                <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(272px,1fr))] gap-4 p-0">
                  {category.tools.map((tool) => (
                    <li key={tool.slug}>
                      <ToolCard tool={tool} badge="PDF" />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <div className="rounded-tv-lg border border-dashed border-border-strong px-4 sm:px-6 py-[52px] text-center">
            <Icon name="search_off" className="text-[32px] text-muted" />
            <h3 className="mb-2 mt-3 text-xl font-semibold">No tool matches &ldquo;{query}&rdquo;</h3>
            <p className="mx-auto mb-5 max-w-[44ch] text-muted">Try merge, split, compress, reorder or remove.</p>
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
    </>
  );
}
