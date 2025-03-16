'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'home', path: '/' },
    { name: 'about', path: '/about' },
    { name: 'projects', path: '/projects' },
    { name: 'blog', path: '/blog' },
    { name: 'contact', path: '/contact' },
  ];

  return (
    <nav className='sticky-nav py-2 mb-8 font-terminus bg-terminal-background'>
      <div className='flex items-center justify-center space-x-8'>
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center text-lg ${
              pathname === item.path
                ? 'text-terminal-green'
                : 'text-terminal-text hover:text-terminal-green'
            }`}
          >
            <span className='mr-1'>{pathname === item.path ? '>' : ''}</span>
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
