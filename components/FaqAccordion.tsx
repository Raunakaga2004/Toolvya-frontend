'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

export interface FaqItem {
  q: string;
  a: string;
}

export default function FaqAccordion({ items, questionSize = 'text-base' }: { items: FaqItem[]; questionSize?: string }) {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className="border-t border-border">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q} className="border-b border-border">
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? -1 : i)}
                aria-expanded={open}
                className={`flex w-full items-center justify-between gap-4 py-4 text-left font-display font-semibold ${questionSize}`}
              >
                {item.q}
                <Icon name={open ? 'remove' : 'add'} className="shrink-0 text-[22px] text-muted" />
              </button>
            </h3>
            {open && <p className="max-w-[66ch] pb-[18px] text-muted">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
