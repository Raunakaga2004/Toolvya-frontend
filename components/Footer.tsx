'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PDF_TOOLS } from '@/lib/tools';

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (!isHome) {
    return (
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-6 px-4 sm:px-6 py-8">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={26} height={24} className="block h-6 w-auto" />
            <span className="font-display text-base font-semibold text-text">Toolvya</span>
          </div>
          <nav aria-label="Footer">
            <ul className="m-0 flex list-none flex-wrap gap-5 p-0 text-sm">
              <li>
                <Link href="/tools">All tools</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-[1160px] grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-8 px-4 sm:px-6 pb-8 pt-12">
        <div className="max-w-[280px]">
          <div className="mb-3 flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={30} height={27} className="block h-[27px] w-auto" />
            <span className="font-display text-lg font-semibold text-text">Toolvya</span>
          </div>
          <p className="text-sm text-muted">A growing directory of free online tools. PDF tools are live now, with more categories on the way.</p>
        </div>

        <nav aria-labelledby="f-tools">
          <h3 id="f-tools" className="mb-3 text-sm font-semibold text-text">
            PDF tools
          </h3>
          <ul className="m-0 flex list-none flex-col gap-2 p-0 text-sm">
            {PDF_TOOLS.map((tool) => (
              <li key={tool.slug}>
                <Link href={tool.url}>{tool.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="f-explore">
          <h3 id="f-explore" className="mb-3 text-sm font-semibold text-text">
            Explore
          </h3>
          <ul className="m-0 flex list-none flex-col gap-2 p-0 text-sm">
            <li>
              <Link href="/tools">All tools</Link>
            </li>
            <li>
              <Link href="#how">How it works</Link>
            </li>
            <li>
              <Link href="#faq">FAQ</Link>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="f-company">
          <h3 id="f-company" className="mb-3 text-sm font-semibold text-text">
            Company
          </h3>
          <ul className="m-0 flex list-none flex-col gap-2 p-0 text-sm">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6 pb-10">
        <p className="border-t border-border pt-5 text-sm text-muted">© {new Date().getFullYear()} Toolvya. All rights reserved.</p>
      </div>
    </footer>
  );
}
