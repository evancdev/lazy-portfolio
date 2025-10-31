'use client';

import { createContext, useContext } from 'react';
import { ParsedDoc } from '../types';

const PortfolioContext = createContext<ParsedDoc | null>(null);

export function PortfolioProvider({
  children,
  data
}: {
  children: React.ReactNode;
  data: ParsedDoc;
}) {
  return (
    <PortfolioContext.Provider value={data}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within PortfolioProvider');
  }
  return context;
}