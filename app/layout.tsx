import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://shilpashubham.com'),
  title: 'Shilpa & Shubham Wedding',
  description: 'Please RSVP to our wedding!',
  icons: {
    icon: 'https://shilpashubham.com/favicon.ico',
  },
  openGraph: {
    images: 'https://shilpashubham.com/og-bg.jpeg',
    title: 'Shilpa & Shubham Wedding Website',
    description: 'Please RSVP to our wedding!',
    url: 'https://shilpashubham.com',
    siteName: 'Shilpa & Shubham Wedding',
    locale: 'en_IN',
    alternateLocale: [
      'mr_IN',                     
      'ml_IN',                    
      'hi_IN',
    ],
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Shubham Wagh',
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn('text-gray', inter.className)}>
        <main role="main">{children}</main>
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
