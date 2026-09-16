import type { Metadata } from 'next';
import PdfCategoryClient from './PdfCategoryClient';
import { PDF_TOOLS } from '@/lib/tools';

export const metadata: Metadata = {
  title: 'Free PDF Tools',
  description:
    'Merge, split, compress, reorder and remove pages from PDF files online — free, no sign-up, no watermark, processed right in your browser.',
  alternates: { canonical: '/tools/pdf' },
};

// BreadcrumbList mirrors the visible nav trail below; CollectionPage/ItemList
// describes the tool grid so search engines can read this page's actual
// structure (PDF tools) rather than inferring it from markup. Pattern matches
// app/tools/page.tsx.
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://toolvya.com/' },
      { '@type': 'ListItem', position: 2, name: 'All tools', item: 'https://toolvya.com/tools' },
      { '@type': 'ListItem', position: 3, name: 'PDF', item: 'https://toolvya.com/tools/pdf' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Free PDF Tools',
    url: 'https://toolvya.com/tools/pdf',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: PDF_TOOLS.map((tool, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: tool.name,
        url: `https://toolvya.com${tool.url}`,
      })),
    },
  },
];

export default function PdfCategoryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PdfCategoryClient />
    </>
  );
}
