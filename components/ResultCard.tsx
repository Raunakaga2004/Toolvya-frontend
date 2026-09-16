import Icon from '@/components/Icon';
import type { PdfJobState } from '@/lib/usePdfJob';

export default function ResultCard({
  state,
  idleText,
  processingText,
  resultFilename,
  resultSummary,
  downloadUrl,
  failTitle,
  errorMessage,
  onRetry,
  onStartOver,
}: {
  state: PdfJobState;
  idleText: string;
  processingText: string;
  resultFilename: string;
  resultSummary: string;
  downloadUrl: string | null;
  failTitle: string;
  errorMessage: string;
  onRetry: () => void;
  onStartOver: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-tv-xl border border-border bg-surface">
      <div className="border-b border-border bg-surface-2 px-[22px] py-[18px]">
        <h2 className="text-base font-semibold">Result</h2>
      </div>
      <div className="p-6" aria-live="polite">
        {state === 'idle' && <p className="text-sm text-muted">{idleText}</p>}

        {state === 'processing' && (
          <div className="flex items-center gap-3.5">
            <Icon name="progress_activity" className="tv-spin text-[22px] text-primary" />
            <p className="text-[15px]">{processingText}</p>
          </div>
        )}

        {state === 'success' && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Icon name="check_circle" className="text-2xl text-success" />
              <div>
                <p className="font-semibold">{resultFilename}</p>
                <p className="text-[13px] text-muted">{resultSummary}</p>
              </div>
            </div>
            <div className="flex gap-2.5">
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  className="flex h-11 items-center gap-2 rounded-tv-md bg-primary px-[18px] text-[15px] font-semibold text-on-primary no-underline transition-colors hover:bg-primary-hover"
                >
                  <Icon name="download" className="text-[19px]" />
                  Download
                </a>
              )}
              <button
                type="button"
                onClick={onStartOver}
                className="h-11 rounded-tv-md border border-border-strong bg-surface px-4 text-[15px] font-semibold hover:bg-surface-2"
              >
                Start over
              </button>
            </div>
          </div>
        )}

        {state === 'error' && (
          <div className="flex items-center gap-3.5">
            <Icon name="error" className="text-[22px] text-danger" />
            <div className="flex-1">
              <p className="font-semibold text-danger">{failTitle}</p>
              <p className="text-sm text-muted">{errorMessage}</p>
            </div>
            <button
              type="button"
              onClick={onRetry}
              className="h-10 rounded-tv-md border border-border-strong bg-surface px-4 text-sm font-semibold hover:bg-surface-2"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
