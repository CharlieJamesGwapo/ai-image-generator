import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Theme } from '@/lib/types';

export function useDarkMode() {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'system');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateDarkMode = () => {
      if (theme === 'dark') {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      } else if (theme === 'light') {
        setIsDark(false);
        document.documentElement.classList.remove('dark');
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(prefersDark);
        if (prefersDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    updateDarkMode();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateDarkMode);

    return () => mediaQuery.removeEventListener('change', updateDarkMode);
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return { isDark, toggleDarkMode, theme, setTheme };
}
