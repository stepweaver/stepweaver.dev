'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [imageError, setImageError] = useState(false);

  // Format path for display in the lambda-style format
  const formatPath = () => {
    if (pathname === '/') return '';
    // Remove the leading slash for display
    return `/${pathname.substring(1)}`;
  };

  // Determine role based on current path
  const getRole = () => {
    switch (pathname) {
      case '/about':
        return 'Full Stack Developer';
      case '/projects':
        return 'Software Engineer';
      case '/blog':
        return 'Tech Writer';
      case '/contact':
        return 'Web Developer';
      default:
        return 'Web Developer';
    }
  };

  // Get a dynamic subtitle based on current path
  const getSubtitle = () => {
    switch (pathname) {
      case '/':
        return '[Web Developer] in South Bend';
      case '/about':
        return '[About Me]';
      case '/projects':
        return "[Things I've Built]";
      case '/blog':
        return "[Things I've Written]";
      case '/contact':
        return '[Get In Touch]';
      default:
        return `[${getRole()}] in South Bend`;
    }
  };

  return (
    <header className='py-6 mb-4'>
      {/* Path display in lambda format */}
      <div className='flex flex-col mb-4'>
        <p className='font-terminus text-terminal-green text-xl'>
          <span className='font-hack mr-1 inline-block animate-lambda-bounce'>
            λ
          </span>
          <span>stepweaver{formatPath()}</span>
        </p>
      </div>

      {/* Content with side-by-side layout */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-center gap-8 my-8'>
        {/* Text content on the left */}
        <div className='order-2 md:order-1 text-center md:text-left'>
          <h1 className='text-4xl text-terminal-text font-terminus'>
            Stephen Weaver
          </h1>
          <h2 className='text-xl text-terminal-muted font-terminus mt-2'>
            {getSubtitle()}
          </h2>
        </div>

        {/* Profile image on the right */}
        <div className='order-1 md:order-2 flex justify-center'>
          <div className='w-48 h-48 rounded-full overflow-hidden border-2 border-terminal-green bg-terminal flex items-center justify-center'>
            {imageError ? (
              <div className='text-terminal-green text-5xl'>SW</div>
            ) : (
              <Image
                src='/images/profile.jpg'
                alt='Stephen Weaver'
                width={300}
                height={300}
                className='object-cover w-full h-full transform scale-x-[-1]'
                onError={() => setImageError(true)}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
