'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { PdfApiError, pdfApi, type PDFJob } from '@/lib/pdfService';

export type PdfJobState = 'idle' | 'processing' | 'success' | 'error';

const POLL_INTERVAL_MS = 1500;

/**
 * Drives a single PDF job through the API's async lifecycle: submit the
 * request that creates the job, then poll GET /api/pdf/jobs/{id}/ until it
 * settles as completed, failed, or expired.
 */
export function usePdfJob() {
  const [state, setState] = useState<PdfJobState>('idle');
  const [job, setJob] = useState<PDFJob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  useEffect(() => stopPolling, [stopPolling]);

  const run = useCallback(
    async (start: () => Promise<PDFJob>) => {
      stopPolling();
      setState('processing');
      setError(null);
      setJob(null);

      try {
        const created = await start();
        setJob(created);

        if (created.status === 'completed') {
          setState('success');
          return;
        }
        if (created.status === 'failed' || created.status === 'expired') {
          setError(created.error_message || 'The job failed. Please try again.');
          setState('error');
          return;
        }

        pollRef.current = setInterval(async () => {
          try {
            const latest = await pdfApi.getJob(created.id);
            setJob(latest);
            if (latest.status === 'completed') {
              stopPolling();
              setState('success');
            } else if (latest.status === 'failed' || latest.status === 'expired') {
              stopPolling();
              setError(latest.error_message || 'The job failed. Please try again.');
              setState('error');
            }
          } catch (e) {
            stopPolling();
            setError(e instanceof PdfApiError ? e.message : 'Lost connection while checking job status.');
            setState('error');
          }
        }, POLL_INTERVAL_MS);
      } catch (e) {
        setError(e instanceof PdfApiError ? e.message : 'Something went wrong. Please try again.');
        setState('error');
      }
    },
    [stopPolling]
  );

  const reset = useCallback(() => {
    stopPolling();
    setState('idle');
    setJob(null);
    setError(null);
  }, [stopPolling]);

  return { state, job, error, run, reset };
}
