import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Instrument_Sans, Public_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

// Self-hosted by next/font: no request to Google at render time, unlike the
// Material Symbols icon font below (which next/font/google doesn't cover).
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument-sans',
  display: 'swap',
});
const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-public-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://toolvya.com'),
  title: {
    default: 'Toolvya — free online tools for PDFs and everyday tasks',
    template: '%s | Toolvya',
  },
  description:
    'Toolvya is a free directory of browser-based tools. Merge, split, compress, reorder and remove pages from PDFs today, with more tool categories on the way.',
  openGraph: {
    type: 'website',
    siteName: 'Toolvya',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

// Applied before paint so the stored/system theme is correct on first render —
// no flash of the wrong theme while React hydrates.
const themeInitScript = `(function(){try{var t=localStorage.getItem("toolvya-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${instrumentSans.variable} ${publicSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Material Symbols is an icon font next/font/google doesn't cover; loaded here,
            in the root layout, so it applies to every route rather than a single page. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght@20..48,300..600&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
