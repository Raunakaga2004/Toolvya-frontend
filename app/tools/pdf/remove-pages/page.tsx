import type { Metadata } from 'next';
import RemovePagesClient from './RemovePagesClient';

export const metadata: Metadata = {
  title: 'Remove pages',
  description: 'Pick out unwanted pages and save the rest as a new, shorter PDF. Free, browser-based, no sign-up.',
};

export default function RemovePagesPage() {
  return <RemovePagesClient />;
}
