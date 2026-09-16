import { Fragment } from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-sm text-muted">
        {items.map((item, i) => (
          <Fragment key={item.label}>
            {item.href ? (
              <li>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ) : (
              <li aria-current="page" className="text-text">
                {item.label}
              </li>
            )}
            {i < items.length - 1 && <li aria-hidden="true">/</li>}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
