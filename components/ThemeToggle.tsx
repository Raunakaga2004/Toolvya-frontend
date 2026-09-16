'use client';

import { useTheme } from '@/lib/theme';
import Icon from '@/components/Icon';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === 'dark';
  const label = dark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-tv-md border border-border bg-surface transition-colors hover:bg-surface-2"
    >
      <Icon name={dark ? 'light_mode' : 'dark_mode'} className="text-[20px] text-muted" />
    </button>
  );
}
