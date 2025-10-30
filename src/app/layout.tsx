import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Footer from './components/Footer';

const playfair_display = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['500'],
});

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'sunbuddy',
  description: 'your sunny sidekick for safetime',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='h-dvh'>
      <body
        className={`${lato.variable} ${playfair_display.variable} bg-bg py-3 px-4 md:py-5 md:px-10 lg:px-48 bg-blue-50 min-h-full flex flex-col`}
      >
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
