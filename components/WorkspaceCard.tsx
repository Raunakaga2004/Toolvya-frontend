import type { ReactNode } from 'react';

export default function WorkspaceCard({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-tv-xl border border-border bg-surface">
      <div className="border-b border-border bg-surface-2 px-[22px] py-[18px]">
        <h2 className="text-base font-semibold">{heading}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
