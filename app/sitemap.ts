import type { MetadataRoute } from 'next';
import { PDF_TOOLS } from '@/lib/tools';

const BASE_URL = 'https://toolvya.com';

// Lists every real route — keep in sync when a page is added or removed.
// Tool URLs come from PDF_TOOLS so a new tool is picked up automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/tools`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/tools/pdf`, changeFrequency: 'weekly', priority: 0.8 },
    ...PDF_TOOLS.map((tool) => ({
      url: `${BASE_URL}${tool.url}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
