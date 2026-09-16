import Link from 'next/link';
import Icon from '@/components/Icon';
import type { ToolMeta } from '@/lib/tools';

export default function RelatedTools({ tools }: { tools: ToolMeta[] }) {
  return (
    <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3.5 p-0">
      {tools.map((tool) => (
        <li key={tool.slug}>
          <Link
            href={tool.url}
            className="flex items-center gap-3 rounded-tv-md border border-border px-4 py-4 text-text no-underline transition-colors hover:border-primary"
          >
            <Icon name={tool.icon} className="text-[22px] text-primary" />
            <span className="text-[15px] font-semibold">{tool.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
