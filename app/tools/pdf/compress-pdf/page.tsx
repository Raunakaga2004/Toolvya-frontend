import type { Metadata } from 'next';
import CompressPdfClient from './CompressPdfClient';

export const metadata: Metadata = {
  title: 'Compress PDF',
  description: "Reduce a PDF's file size without losing quality, so it fits an upload or email limit. Free, browser-based, no sign-up.",
};

export default function CompressPdfPage() {
  return <CompressPdfClient />;
}
