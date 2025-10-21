'use client';

import { useEffect } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check if user prefers dark mode
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Set initial theme
    updateTheme(darkModeQuery);

    // Listen for changes
    darkModeQuery.addEventListener('change', updateTheme);

    return () => darkModeQuery.removeEventListener('change', updateTheme);
  }, []);

  return <>{children}</>;
}