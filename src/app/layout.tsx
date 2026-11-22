import type { Metadata } from 'next';
import { Geist, Geist_Mono, Roboto, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

import ProviderComponent from '@/components/providerComponent/provider-component';
const ibmPlexSansHeading = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
});

const roboto = Roboto({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FreshCart',
  description: 'Your one-stop shop for everything',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        roboto.variable,
        ibmPlexSansHeading.variable,
      )}>
      <body className="flex min-h-full flex-col">
        <ProviderComponent>{children}</ProviderComponent>
      </body>
    </html>
  );
}
