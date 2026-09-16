import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ToolsClient from './ToolsClient';
import { PDF_TOOLS } from '@/lib/tools';

export const metadata: Metadata = {
  title: 'All tools',
  description: "Browse Toolvya's growing directory of free, browser-based tools. PDF tools are live first, with more categories on the way.",
  // No explicit `openGraph` here: this Next.js version replaces (not merges) it when a
  // page sets one, which would drop the og:image inherited from app/opengraph-image.tsx.
  // Leaving it unset lets og:title/og:description auto-derive from title/description above.
  alternates: { canonical: '/tools' },
};

const CATEGORIES = [
  {
    title: 'PDF tools',
    description: 'Merge, split, compress and reorder PDF documents directly in your browser.',
    icon: 'picture_as_pdf',
    link: '/tools/pdf',
    tools: PDF_TOOLS,
  },
];

// BreadcrumbList mirrors the visible nav trail below; CollectionPage/ItemList
// describes the category grid so search engines can read this page's actual
// structure (categories -> tools) rather than inferring it from markup.
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://toolvya.com/' },
      { '@type': 'ListItem', position: 2, name: 'All tools', item: 'https://toolvya.com/tools' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All tools',
    url: 'https://toolvya.com/tools',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: CATEGORIES.map((category, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: category.title,
        url: `https://toolvya.com${category.link}`,
      })),
    },
  },
];

export default async function ToolsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = '' } = await searchParams;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6 pt-7">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'All tools' }]} />
      </div>
      <ToolsClient categories={CATEGORIES} initialQuery={q} />
    </>
  );
}
