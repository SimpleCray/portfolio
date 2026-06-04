import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'SimpleCray — Senior Fullstack Engineer',
  description:
    'SimpleCray — Senior Fullstack Engineer. Real-time systems, integration architecture, frontend leadership.',
  icons: {
    icon: '/images/site_icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
