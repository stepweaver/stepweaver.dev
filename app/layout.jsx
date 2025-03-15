import localFont from 'next/font/local';
import './globals.css';

// Components
import Header from '@/components/Header';
import Nav from '@/components/Nav';
import MobileNav from '@/components/MobileNav';
import Footer from '@/components/Footer';

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
  title: 'λ Your Name - Web Developer',
  description: 'Personal portfolio and blog with a terminal theme',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${terminus.variable} ${hack.variable} antialiased w-full min-h-screen flex flex-col bg-terminal`}
      >
        {/* Sticky Nav with backdrop blur */}
        <div className='sticky top-0 z-50 backdrop-blur-md'>
          <div className='mx-auto w-full max-w-[820px]'>
            <Nav />
            <div className='absolute top-0 right-0 md:hidden'>
              <MobileNav />
            </div>
          </div>
        </div>

        <div className='mx-auto w-full max-w-[820px]'>
          <Header />
          <main className='flex-1'>{children}</main>
          <Footer className='mt-auto' />
        </div>
      </body>
    </html>
  );
}
