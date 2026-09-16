'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import Icon from '@/components/Icon';

const navLinkClass = 'flex min-h-10 items-center whitespace-nowrap rounded-tv-sm px-3 py-2 text-[15px] font-medium text-text no-underline hover:bg-surface-2';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  const links = isHome ? (
    <>
      <Link href="#tools" className={navLinkClass} onClick={() => setMenuOpen(false)}>
        Available tools
      </Link>
      <Link href="#how" className={navLinkClass} onClick={() => setMenuOpen(false)}>
        How it works
      </Link>
      <Link href="#faq" className={navLinkClass} onClick={() => setMenuOpen(false)}>
        FAQ
      </Link>
    </>
  ) : (
    <>
      <Link href="/tools" className={navLinkClass} onClick={() => setMenuOpen(false)}>
        All tools
      </Link>
      <Link
        href="/tools/pdf"
        aria-current={pathname.startsWith('/tools/pdf') ? 'page' : undefined}
        onClick={() => setMenuOpen(false)}
        className={`${navLinkClass} ${pathname.startsWith('/tools/pdf') ? 'text-primary font-semibold' : ''}`}
      >
        PDF
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface">
      <div className="mx-auto flex h-[68px] max-w-[1160px] items-center gap-3 px-4 sm:gap-5 sm:px-6">
        <Link href="/" aria-label="Toolvya — home" className="flex shrink-0 items-center gap-[11px] text-text no-underline">
          <Image src="/logo.png" alt="" width={34} height={31} className="block h-[31px] w-auto" />
          <span className="font-display text-xl font-semibold tracking-tight text-text">Toolvya</span>
        </Link>

        <nav aria-label="Main" className="ml-1.5 hidden items-center gap-0.5 md:flex">
          {links}
        </nav>

        <div className="flex-1" />

        <ThemeToggle />

        <Link
          href="/tools"
          className="hidden min-h-10 items-center whitespace-nowrap rounded-tv-md bg-primary px-4 text-[15px] font-semibold text-on-primary no-underline transition-colors hover:bg-primary-hover md:inline-flex"
        >
          Browse tools
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-tv-md border border-border bg-surface md:hidden"
        >
          <Icon name={menuOpen ? 'close' : 'menu'} className="text-[22px] text-text" />
        </button>
      </div>

      {menuOpen && (
        <nav aria-label="Main" className="flex flex-col gap-0.5 border-t border-border bg-surface px-4 py-3 md:hidden">
          {links}
          <Link
            href="/tools"
            onClick={() => setMenuOpen(false)}
            className="mt-1 inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-tv-md bg-primary px-4 text-[15px] font-semibold text-on-primary no-underline hover:bg-primary-hover"
          >
            Browse tools
          </Link>
        </nav>
      )}
    </header>
  );
}
