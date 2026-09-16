import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import { PDF_TOOLS } from '@/lib/tools';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Toolvya — free online tools for PDFs and everyday tasks',
    description:
      'Toolvya is a free directory of browser-based tools. Merge, split, compress, reorder and remove pages from PDFs today, with more tool categories on the way.',
    url: '/',
  },
};

// WebSite (+ the on-page search box, so Google can offer a Sitelinks Search
// Box) and Organization schema — the homepage is the canonical place for
// both, and neither changes per tool page.
const jsonLd = [
  // No SearchAction: the on-page search filters client-side only and isn't
  // reachable via a ?q= URL, so a Sitelinks Search Box target would 404.
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Toolvya',
    url: 'https://toolvya.com/',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Toolvya',
    url: 'https://toolvya.com/',
    logo: 'https://toolvya.com/logo.png',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'PDF tools',
    itemListElement: PDF_TOOLS.map((tool, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: tool.name,
      url: `https://toolvya.com${tool.url}`,
    })),
  },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeClient />
    </>
  );
}
