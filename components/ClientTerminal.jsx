'use client';

import dynamic from 'next/dynamic';
import TerminalLoading from './TerminalLoading';

// Dynamically import the Terminal component with SSR disabled
// This can only be done in a client component
const Terminal = dynamic(() => import('./Terminal'), {
  loading: () => <TerminalLoading />,
  ssr: false,
});

export default function ClientTerminal() {
  return <Terminal />;
}
