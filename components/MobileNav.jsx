'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'home', path: '/' },
    { name: 'about', path: '/about' },
    { name: 'blog', path: '/blog' },
    {
      name: 'bluesky',
      path: 'https://bsky.app/profile/stepweaver.dev',
      external: true,
    },
    { name: 'github', path: 'https://github.com/stepweaver', external: true },
    { name: 'contact', path: '/contact' },
  ];

  return (
    <div className='md:hidden z-50'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='p-3 text-2xl text-terminal-green'
        aria-expanded={isOpen}
        aria-label='Toggle navigation menu'
      >
        {isOpen ? 'X' : '≡'}
      </button>

      {isOpen && (
        <div className='fixed top-14 right-4 w-48 terminal-window z-50'>
          <div className='terminal-header'>
            <div className='terminal-title font-mono text-terminal-green'>
              ~/menu
            </div>
            <div className='terminal-buttons'>
              <div
                className='terminal-button bg-terminal-red'
                onClick={() => setIsOpen(false)}
              ></div>
            </div>
          </div>
          <div className='terminal-body p-0'>
            <ul className='py-2'>
              {navItems.map((item) => (
                <li
                  key={item.path}
                  className='px-4 py-2 hover:bg-terminal-light'
                >
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    target={item.external ? '_blank' : ''}
                    rel={item.external ? 'noopener noreferrer' : ''}
                    className={
                      pathname === item.path && !item.external
                        ? 'text-terminal-green'
                        : 'text-terminal-text'
                    }
                  >
                    <span className='text-terminal-green mr-2'>
                      {pathname === item.path && !item.external ? '>' : ''}
                    </span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
