'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background dark:bg-background">
      <div className="text-center max-w-md px-4">
        <h1 className="mb-4 text-4xl font-bold text-foreground dark:text-foreground">500</h1>
        <p className="mb-4 text-xl text-muted-foreground dark:text-muted-foreground">Something went wrong</p>
        <p className="mb-8 text-sm text-muted-foreground dark:text-muted-foreground">
          We encountered an unexpected error. Please try again or return home.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground rounded hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-4 py-2 border border-primary text-primary dark:border-primary dark:text-primary rounded hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground transition-all"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
