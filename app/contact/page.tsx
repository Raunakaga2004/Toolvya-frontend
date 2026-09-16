import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Toolvya — ask a question, report a bug, or request a new tool.',
  alternates: { canonical: '/contact' },
};

const CONTACT_EMAIL = 'hello@toolvya.com';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 sm:px-6 py-14">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
      <h1 className="mb-2.5 mt-5 text-[clamp(28px,4vw,36px)] font-bold">Contact us</h1>
      <p className="mb-8 text-muted">Questions, bug reports, and tool requests all go to the same inbox.</p>

      <div className="flex flex-col gap-5 text-[15px] leading-relaxed text-text">
        <p>
          Email us directly at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-primary hover:underline">
            {CONTACT_EMAIL}
          </a>{' '}
          and we&rsquo;ll get back to you as soon as we can.
        </p>
        <p>Want a tool that isn&rsquo;t on Toolvya yet? Tell us what it should do and we&rsquo;ll consider it for a future release.</p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Tool request')}`}
          className="inline-flex w-fit min-h-11 items-center rounded-tv-md bg-primary px-5 font-semibold text-on-primary no-underline hover:bg-primary-hover"
        >
          Request a tool
        </a>
      </div>
    </div>
  );
}
