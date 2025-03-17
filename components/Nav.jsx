'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Call once to check initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

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
    <nav
      className={`sticky-nav py-2 mb-8 font-terminus transition-all duration-300 z-50 ${
        scrolled
          ? 'bg-terminal-background/70 backdrop-blur-md border-b border-terminal-border/30 shadow-md'
          : ''
      } hidden md:block`}
    >
      <div className='flex items-center justify-center space-x-8'>
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noopener noreferrer' : ''}
            className={`flex items-center text-lg ${
              pathname === item.path && !item.external
                ? 'text-terminal-green'
                : 'text-terminal-text hover:text-terminal-green'
            }`}
          >
            <span className='mr-1'>
              {pathname === item.path && !item.external ? '>' : ''}
            </span>
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
