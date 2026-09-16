export interface ToolMeta {
  slug: 'merge-pdf' | 'split-pdf' | 'compress-pdf' | 'reorder-pdf' | 'remove-pages';
  name: string;
  url: string;
  icon: string;
  cta: string;
  desc: string;
  keys: string;
}

// Add a tool here to list it across the homepage, the PDF category page and
// each tool's "Related tools" section — no other change needed.
export const PDF_TOOLS: ToolMeta[] = [
  {
    slug: 'merge-pdf',
    name: 'Merge PDF',
    url: '/tools/pdf/merge-pdf',
    icon: 'merge',
    cta: 'Merge files',
    desc: 'Combine several PDFs into a single document, in the order you choose.',
    keys: 'merge combine join append multiple one file together',
  },
  {
    slug: 'split-pdf',
    name: 'Split PDF',
    url: '/tools/pdf/split-pdf',
    icon: 'content_cut',
    cta: 'Split a file',
    desc: 'Break a document into individual pages or custom page ranges, returned as a ZIP.',
    keys: 'split separate extract pages ranges zip divide cut',
  },
  {
    slug: 'compress-pdf',
    name: 'Compress PDF',
    url: '/tools/pdf/compress-pdf',
    icon: 'compress',
    cta: 'Compress a file',
    desc: 'Reduce file size so a document fits an upload or email limit, without losing quality.',
    keys: 'compress reduce shrink size smaller optimise optimize lossless email limit',
  },
  {
    slug: 'reorder-pdf',
    name: 'Reorder pages',
    url: '/tools/pdf/reorder-pdf',
    icon: 'swap_vert',
    cta: 'Reorder pages',
    desc: 'Move pages within a PDF into the right order and save the corrected file.',
    keys: 'reorder rearrange move sort order pages sequence rotate scan',
  },
  {
    slug: 'remove-pages',
    name: 'Remove pages',
    url: '/tools/pdf/remove-pages',
    icon: 'delete_sweep',
    cta: 'Remove pages',
    desc: 'Pick out unwanted pages and save the rest as a new, shorter PDF.',
    keys: 'remove delete pages cut extract unwanted blank',
  },
];

export function relatedTools(currentSlug: ToolMeta['slug']): ToolMeta[] {
  return PDF_TOOLS.filter((t) => t.slug !== currentSlug);
}
