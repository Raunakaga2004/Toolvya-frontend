import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: "Toolvya's privacy policy: what data we collect, how files are handled, and your rights.",
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 sm:px-6 py-14">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy' }]} />
      <h1 className="mb-2.5 mt-5 text-[clamp(28px,4vw,36px)] font-bold">Privacy policy</h1>
      <p className="mb-8 text-muted">Last updated September 2026.</p>

      <div className="flex flex-col gap-6 text-[15px] leading-relaxed text-text">
        <section>
          <h2 className="mb-2 text-lg font-semibold">Your files</h2>
          <p>
            Files you process with Toolvya&rsquo;s tools are uploaded only to run the requested job (e.g. merging or
            compressing a PDF) and are automatically deleted from our servers shortly after the job completes. We
            don&rsquo;t inspect, share, or retain the contents of your files.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold">Information we collect</h2>
          <p>
            We collect basic, anonymized analytics (pages visited, general location, browser type) to understand how
            Toolvya is used and to keep it running reliably. We do not require an account and do not knowingly
            collect personal information beyond what&rsquo;s needed to operate the site.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold">Cookies</h2>
          <p>
            Toolvya uses minimal cookies or local storage to remember preferences such as your theme (light/dark).
            These are not used for advertising or cross-site tracking.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold">Third parties</h2>
          <p>
            We may use third-party infrastructure providers (e.g. hosting) to run Toolvya. These providers process
            data only as needed to deliver the service and are not permitted to use it for their own purposes.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold">Changes</h2>
          <p>We may update this policy as Toolvya evolves. Material changes will be reflected here with an updated date.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold">Contact</h2>
          <p>
            Questions about this policy? Reach us via the{' '}
            <a href="/contact" className="text-primary hover:underline">
              contact page
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
