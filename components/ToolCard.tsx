import Link from 'next/link';
import Icon from '@/components/Icon';
import type { ToolMeta } from '@/lib/tools';

export default function ToolCard({ tool, badge }: { tool: ToolMeta; badge: string }) {
  return (
    <Link
      href={tool.url}
      className="flex h-full flex-col gap-2.5 rounded-tv-lg border border-border bg-surface p-[22px] text-text no-underline transition-shadow hover:border-border-strong hover:shadow-tv-md"
    >
      <div className="flex items-center justify-between gap-3">
        <Icon name={tool.icon} className="text-[26px] text-primary" />
        <span className="whitespace-nowrap rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-muted">
          {badge}
        </span>
      </div>
      <h3 className="text-lg font-semibold">{tool.name}</h3>
      <p className="flex-1 text-sm text-muted">{tool.desc}</p>
      <p className="flex items-center gap-2 pt-0.5 text-sm font-semibold text-primary">
        {tool.cta}
        <Icon name="arrow_forward" className="text-[18px]" />
      </p>
    </Link>
  );
}
