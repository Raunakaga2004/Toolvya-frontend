'use client';

import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'toolvya-theme';

function getSnapshot(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

// The root layout's inline script sets data-theme before hydration, so the
// server can't know the real value in advance — render 'light' on the
// server, then useSyncExternalStore reconciles to the true client value.
function getServerSnapshot(): Theme {
  return 'light';
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

/**
 * Tracks the light/dark theme applied to <html data-theme>, kept in sync via
 * useSyncExternalStore so toggling (or any future external change) is
 * reflected without manually pushing state from an effect.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable (private mode, disabled storage) — theme just won't persist.
    }
    document.documentElement.setAttribute('data-theme', next);
  }, [theme]);

  return { theme, toggleTheme };
}
