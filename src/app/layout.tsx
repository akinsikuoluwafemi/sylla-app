import type { Metadata } from 'next';
import { ReactQueryProvider } from '@/lib/react-query';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next.js Candidate Project',
  description: 'A Next.js project for interview candidates',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased'>
      <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
