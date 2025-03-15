'use client';

import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const formatPath = () => {
    if (pathname === '/') return '~';
    return `~${pathname}`;
  };

  return (
    <header className='py-6'>
      <div className='font-terminus text-terminal-muted text-sm'>
        <p>Welcome to my terminal-themed portfolio</p>
        <p className='text-terminal-text'>
          <span className='text-terminal-green'>user@portfolio</span>:
          <span className='text-terminal-blue'>{formatPath()}</span>$
        </p>
      </div>
    </header>
  );
}
