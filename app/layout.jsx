import localFont from 'next/font/local';
import './globals.css';

// Components
import Header from '@/components/Header';
import Nav from '@/components/Nav';
import MobileNav from '@/components/MobileNav';
import Footer from '@/components/Footer';
import CrtEffect from '@/components/CrtEffect';

const terminus = localFont({
  src: './fonts/TerminusTTFWindows-4.49.3.ttf',
  variable: '--font-terminus',
  weight: '400',
  display: 'swap',
});

const hack = localFont({
  src: './fonts/Hack-Regular.ttf',
  variable: '--font-hack',
  weight: '400',
  display: 'swap',
});

export const metadata = {
  title: {
    template: '%s | Stephen Weaver',
    default: 'Stephen Weaver | Web Developer',
  },
  description:
    'Terminal-inspired portfolio of Stephen Weaver, a web developer and business analyst at the University of Notre Dame',
  icons: {
    icon: { url: '/icons/favicon.svg', type: 'image/svg+xml' },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${terminus.variable} ${hack.variable} antialiased w-full min-h-screen flex flex-col bg-terminal crt-effect`}
      >
        {/* CRT effect overlay */}
        <CrtEffect />

        <div className='mx-auto w-full max-w-4xl px-4 md:px-6 flex flex-col min-h-screen'>
          {/* Header with profile and title */}
          <Header />

          {/* Navigation - sticky */}
          <Nav />

          {/* Mobile navigation */}
          <div className='absolute top-4 right-4 md:hidden'>
            <MobileNav />
          </div>

          {/* Main content - takes available space */}
          <main className='flex-1 w-full pb-8'>{children}</main>

          {/* Footer */}
          <Footer className='py-6 border-t border-terminal-muted/20' />
        </div>
      </body>
    </html>
  );
}
