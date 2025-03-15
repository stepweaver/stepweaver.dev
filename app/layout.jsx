import localFont from 'next/font/local';
import './globals.css';

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
  title: 'λ Stephen Weaver - Web Developer',
  description: 'Explore my latest projects, learnings, and insights in web development.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${terminus.variable} ${hack.variable} antialiased w-full min-h-screen flex flex-col bg-terminal`}
      >
        {children}
      </body>
    </html>
  );
}
