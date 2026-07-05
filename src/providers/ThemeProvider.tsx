'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useDarkMode } from '@/hooks/useDarkMode';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { isDark, theme } = useDarkMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
