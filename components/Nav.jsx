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
    <nav className='py-4'>
      <div className='flex justify-between items-center'>
        <Link href='/' className='group'>
          <h1 className='text-2xl font-terminus text-terminal-green'>
            <span className='font-hack mr-1 group-hover:animate-pulse inline-block'>
              λ
            </span>
            <span>stepweaver</span>
            <span className='cursor-blink'>_</span>
          </h1>
        </Link>

        <ul className='hidden md:flex space-x-6 font-terminus'>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`inline-flex items-center ${
                  pathname === item.path
                    ? 'text-terminal-green'
                    : 'text-terminal-text hover:text-terminal-green'
                }`}
              >
                <span className='text-terminal-green mr-1'>&gt;</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}