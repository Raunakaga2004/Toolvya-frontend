import type { Metadata } from 'next';
import MergePdfClient from './MergePdfClient';

export const metadata: Metadata = {
  title: 'Merge PDF',
  description: 'Combine two or more PDF files into one document, in the order you choose. Free, browser-based, no sign-up.',
};

export default function MergePdfPage() {
  return <MergePdfClient />;
}
