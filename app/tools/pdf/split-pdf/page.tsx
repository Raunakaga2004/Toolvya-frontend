import type { Metadata } from 'next';
import SplitPdfClient from './SplitPdfClient';

export const metadata: Metadata = {
  title: 'Split PDF',
  description: 'Break a PDF into individual pages or custom page ranges, returned as a ZIP. Free, browser-based, no sign-up.',
};

export default function SplitPdfPage() {
  return <SplitPdfClient />;
}
