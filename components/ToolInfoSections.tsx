import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';
import RelatedTools from '@/components/RelatedTools';
import type { ToolMeta } from '@/lib/tools';

export interface AboutBlock {
  heading: string;
  body: string;
}

export default function ToolInfoSections({
  about,
  howTo,
  related,
  faq,
}: {
  about: AboutBlock[];
  howTo: string[];
  related: ToolMeta[];
  faq: FaqItem[];
}) {
  return (
    <>
      <section aria-labelledby="about-h" className="mx-auto mt-14 max-w-[960px] border-t border-border px-4 sm:px-6 pt-16">
        <h2 id="about-h" className="mb-4 text-2xl font-bold">
          About this tool
        </h2>
        {about.map((block, i) => (
          <div key={block.heading} className={i < about.length - 1 ? 'mb-5' : undefined}>
            <h3 className="mb-2 text-[17px] font-semibold">{block.heading}</h3>
            <p className="max-w-[70ch] text-muted">{block.body}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="how-h" className="mx-auto max-w-[960px] px-4 sm:px-6 pt-12">
        <h2 id="how-h" className="mb-5 text-2xl font-bold">
          How to use this tool
        </h2>
        <ol className="m-0 flex max-w-[70ch] flex-col gap-2.5 pl-[22px] text-muted">
          {howTo.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="rel-h" className="mx-auto mt-12 max-w-[960px] border-t border-border px-4 sm:px-6 pt-14">
        <h2 id="rel-h" className="mb-5 text-2xl font-bold">
          Related PDF tools
        </h2>
        <RelatedTools tools={related} />
      </section>

      <section aria-labelledby="faq-h" className="mx-auto mt-12 max-w-[960px] border-t border-border px-4 sm:px-6 pb-[72px] pt-14">
        <h2 id="faq-h" className="mb-5 text-2xl font-bold">
          Frequently asked questions
        </h2>
        <FaqAccordion items={faq} />
      </section>
    </>
  );
}
