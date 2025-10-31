'use client';

import Link from 'next/link';

export default function Error({
  error: _error,
  reset: _reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">500</h1>
        <p className="mb-4 text-xl text-muted-foreground">Something went wrong</p>
        <Link href="/" className="text-primary underline hover:text-primary/80 transition-colors">
          Return to Home
        </Link>
      </div>
    </main>
  );
}
