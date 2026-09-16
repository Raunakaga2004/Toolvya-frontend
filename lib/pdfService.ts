// Client for the Toolvaya PDF API — see API_DOCUMENTATION.md at the repo root.

export type JobStatusValue = 'pending' | 'processing' | 'completed' | 'failed' | 'expired';

export interface PDFJob {
  id: string;
  tool: 'merge' | 'split' | 'compress' | 'reorder' | 'remove_pages';
  status: JobStatusValue;
  input_count: number;
  page_count: number | null;
  result_filename: string;
  error_message: string;
  created_at: string;
  updated_at: string;
  started_at: string | null;
  completed_at: string | null;
  expires_at: string;
  download_count: number;
  download_url: string | null;
  status_url: string;
  is_expired: boolean;
}

interface ApiErrorBody {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

interface ApiSuccessBody<T> {
  success: true;
  data: T;
}

export class PdfApiError extends Error {
  code?: string;
  details?: Record<string, string[]>;

  constructor(message: string, code?: string, details?: Record<string, string[]>) {
    super(message);
    this.name = 'PdfApiError';
    this.code = code;
    this.details = details;
  }
}

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000').replace(/\/$/, '');

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, init);
  } catch {
    throw new PdfApiError('Could not reach the Toolvya server. Check your connection and try again.');
  }

  let body: ApiSuccessBody<T> | ApiErrorBody | null = null;
  try {
    body = await res.json();
  } catch {
    // Non-JSON response (e.g. a proxy error page) — fall through to the status-based message.
  }

  if (!res.ok || !body || body.success === false) {
    const err = body && body.success === false ? body.error : undefined;
    throw new PdfApiError(err?.message ?? `Request failed with status ${res.status}.`, err?.code, err?.details);
  }

  return (body as ApiSuccessBody<T>).data;
}

export const pdfApi = {
  merge(files: File[]): Promise<PDFJob> {
    const form = new FormData();
    files.forEach((file) => form.append('files', file));
    return request<PDFJob>('/api/pdf/merge/', { method: 'POST', body: form });
  },

  split(file: File, ranges: string): Promise<PDFJob> {
    const form = new FormData();
    form.append('file', file);
    if (ranges.trim()) form.append('ranges', ranges.trim());
    return request<PDFJob>('/api/pdf/split/', { method: 'POST', body: form });
  },

  compress(file: File): Promise<PDFJob> {
    const form = new FormData();
    form.append('file', file);
    return request<PDFJob>('/api/pdf/compress/', { method: 'POST', body: form });
  },

  // `order` is a comma-separated, 1-indexed page list, e.g. "3, 1, 2".
  reorder(file: File, order: string): Promise<PDFJob> {
    const form = new FormData();
    form.append('file', file);
    form.append('order', order);
    return request<PDFJob>('/api/pdf/reorder/', { method: 'POST', body: form });
  },

  // `pages` is a comma-separated, 1-indexed page list, e.g. "2, 4-6".
  removePages(file: File, pages: string): Promise<PDFJob> {
    const form = new FormData();
    form.append('file', file);
    form.append('pages', pages);
    return request<PDFJob>('/api/pdf/remove-pages/', { method: 'POST', body: form });
  },

  getJob(jobId: string): Promise<PDFJob> {
    return request<PDFJob>(`/api/pdf/jobs/${jobId}/`);
  },

  downloadUrl(jobId: string): string {
    return `${API_BASE}/api/pdf/jobs/${jobId}/download/`;
  },
};

// Turns [2, 4, 5, 6] into "2, 4-6" — the range format the remove-pages API expects.
export function pagesToRangeString(pages: number[]): string {
  const sorted = [...pages].sort((a, b) => a - b);
  const ranges: string[] = [];
  let start = sorted[0];
  let prev = sorted[0];

  for (const page of sorted.slice(1)) {
    if (page === prev + 1) {
      prev = page;
      continue;
    }
    ranges.push(start === prev ? `${start}` : `${start}-${prev}`);
    start = page;
    prev = page;
  }
  if (start !== undefined) ranges.push(start === prev ? `${start}` : `${start}-${prev}`);

  return ranges.join(', ');
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
