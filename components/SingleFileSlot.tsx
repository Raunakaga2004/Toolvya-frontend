'use client';

import { useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { formatFileSize } from '@/lib/pdfService';

export default function SingleFileSlot({
  file,
  onSelect,
  onRemove,
  extraMeta,
}: {
  file: File | null;
  onSelect: (file: File) => void;
  onRemove: () => void;
  extraMeta?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const pick = (files: FileList | null) => {
    const picked = files?.[0];
    if (picked) onSelect(picked);
  };

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-tv-md border border-border px-4 py-3.5">
        <Icon name="description" className="text-[22px] text-primary" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-medium">{file.name}</span>
          <span className="block text-[13px] text-muted">
            {formatFileSize(file.size)}
            {extraMeta ? ` · ${extraMeta}` : ''}
          </span>
        </span>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${file.name}`}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-tv-sm border border-border hover:border-danger hover:bg-danger-container"
        >
          <Icon name="close" className="text-[18px] text-muted" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        pick(e.dataTransfer.files);
      }}
      className={`w-full rounded-tv-lg border border-dashed px-5 py-[26px] text-center transition-colors ${
        dragging ? 'border-primary' : 'border-border-strong'
      } bg-surface-2 hover:border-primary`}
    >
      <Icon name="upload_file" className="text-[26px] text-primary" />
      <span className="mt-1.5 block font-semibold">Choose a file or drop it here</span>
      <span className="mt-1 block text-[13px] text-muted">PDF only, up to 100 MB</span>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => pick(e.target.files)}
      />
    </button>
  );
}
