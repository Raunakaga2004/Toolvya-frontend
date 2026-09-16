import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of service',
  description: 'The terms that govern your use of Toolvya.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 sm:px-6 py-14">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms' }]} />
      <h1 className="mb-2.5 mt-5 text-[clamp(28px,4vw,36px)] font-bold">Terms of service</h1>
      <p className="mb-8 text-muted">Last updated September 2026.</p>

      <div className="flex flex-col gap-6 text-[15px] leading-relaxed text-text">
        <section>
          <h2 className="mb-2 text-lg font-semibold">Using Toolvya</h2>
          <p>
            Toolvya provides free, browser-based tools (currently PDF merging, splitting, compressing, and
            reordering) on an &ldquo;as is&rdquo; basis. By using the site, you agree to use it only for lawful
            purposes and not to abuse, overload, or attempt to disrupt the service.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold">Your content</h2>
          <p>
            You retain all rights to the files you upload. You&rsquo;re responsible for making sure you have the
            right to process any file you submit — don&rsquo;t upload content you don&rsquo;t have permission to use.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold">No warranty</h2>
          <p>
            Toolvya is provided without warranties of any kind. We do our best to keep tools accurate and reliable,
            but we don&rsquo;t guarantee uninterrupted availability or error-free results, and we recommend keeping a
            backup of important files before processing them.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold">Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Toolvya and its operators are not liable for any indirect,
            incidental, or consequential damages arising from your use of the site or its tools.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold">Changes to these terms</h2>
          <p>We may update these terms as Toolvya evolves. Continued use of the site after a change means you accept the updated terms.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold">Contact</h2>
          <p>
            Questions about these terms? Reach us via the{' '}
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
