import Icon from '@/components/Icon';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function ToolHero({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <>
      <div className="mx-auto max-w-[960px] px-4 sm:px-6 pt-7">
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'PDF', href: '/tools/pdf' }, { label: title }]}
        />
      </div>

      <div className="mx-auto max-w-[960px] border-b border-border px-4 sm:px-6 pb-7 pt-5">
        <div className="mb-3.5 flex items-center gap-2.5">
          <Icon name={icon} className="text-[26px] text-primary" />
          <span className="whitespace-nowrap rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-muted">
            PDF
          </span>
        </div>
        <h1 className="mb-3 text-[clamp(28px,4vw,40px)] font-bold">{title}</h1>
        <p className="mb-4 max-w-[70ch] text-muted">{description}</p>
        <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 text-sm text-muted">
          <li className="flex items-center gap-1.5">
            <Icon name="upload_file" className="text-[17px]" />
            Up to 100 MB per file
          </li>
          <li className="flex items-center gap-1.5">
            <Icon name="delete_outline" className="text-[17px]" />
            Files removed after processing
          </li>
          <li className="flex items-center gap-1.5">
            <Icon name="history" className="text-[17px]" />
            Updated August 2026
          </li>
        </ul>
      </div>
    </>
  );
}
