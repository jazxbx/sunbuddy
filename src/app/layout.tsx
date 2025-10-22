import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';
import Providers from './providers';

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
    <html lang='en'>
      <body
        className={`${lato.variable} ${playfair_display.variable} bg-bg p-3 md:py-5 md:px-6 lg:px-11 bg-blue-50`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
