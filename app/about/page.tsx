import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About',
  description: 'Toolvya is a free, browser-based directory of everyday tools — no installs, no accounts, no uploads leaving your control unnecessarily.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 sm:px-6 py-14">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
      <h1 className="mb-2.5 mt-5 text-[clamp(28px,4vw,36px)] font-bold">About Toolvya</h1>
      <p className="mb-8 text-muted">Free, browser-based tools for everyday tasks.</p>

      <div className="flex flex-col gap-5 text-[15px] leading-relaxed text-text">
        <p>
          Toolvya started with a simple frustration: the fastest way to merge or compress a PDF online usually means
          wading through ads, forced sign-ups, and upload limits before you get a result. We wanted something quicker —
          pick a tool, do the job, get your file back.
        </p>
        <p>
          Today that means a set of PDF tools — merge, split, compress, and reorder — with more tool categories on
          the way. Every tool is free to use, with no account required.
        </p>
        <p>
          Toolvya is a small, independently run project. If there&rsquo;s a tool you wish existed, we&rsquo;d like to
          hear about it — see the{' '}
          <a href="/contact" className="text-primary hover:underline">
            contact page
          </a>
          .
        </p>
      </div>
    </div>
  );
}
