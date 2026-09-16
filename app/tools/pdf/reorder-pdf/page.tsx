import type { Metadata } from 'next';
import ReorderPdfClient from './ReorderPdfClient';

export const metadata: Metadata = {
  title: 'Reorder pages',
  description: 'Rearrange the pages inside a PDF and save the corrected file. Free, browser-based, no sign-up.',
};

export default function ReorderPdfPage() {
  return <ReorderPdfClient />;
}
